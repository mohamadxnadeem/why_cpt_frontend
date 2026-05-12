import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Global currency context.
 *
 * Backend prices are quoted in ZAR. This context:
 *   1. Auto-detects the visitor's preferred currency (geo first, language second).
 *   2. Fetches live FX rates (with a small static fallback so the site keeps working).
 *   3. Exposes `convert` and `format` helpers used by every price on the site.
 *   4. Persists the user's manual choice in localStorage.
 */

export const SUPPORTED_CURRENCIES = [
  { code: "ZAR", symbol: "R",  label: "ZAR — South African Rand", flag: "ZA" },
  { code: "USD", symbol: "$",  label: "USD — US Dollar",          flag: "US" },
  { code: "GBP", symbol: "£",  label: "GBP — British Pound",      flag: "GB" },
  { code: "EUR", symbol: "€",  label: "EUR — Euro",               flag: "EU" },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar",  flag: "AU" },
  { code: "CAD", symbol: "C$", label: "CAD — Canadian Dollar",    flag: "CA" },
];

// Fallback rates: 1 ZAR -> X (used if the live rates API fails).
// Approximate values; live API will overwrite these on load.
const FALLBACK_RATES_FROM_ZAR = {
  ZAR: 1,
  USD: 0.054,
  GBP: 0.043,
  EUR: 0.050,
  AUD: 0.083,
  CAD: 0.075,
};

const STORAGE_KEY = "wct_currency";

// Map ISO country code -> preferred display currency.
const COUNTRY_TO_CURRENCY = {
  ZA: "ZAR",
  US: "USD",
  GB: "GBP",
  IE: "EUR", FR: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", NL: "EUR",
  BE: "EUR", PT: "EUR", AT: "EUR", FI: "EUR", GR: "EUR", LU: "EUR",
  AU: "AUD",
  CA: "CAD",
};

const detectFromLanguage = () => {
  if (typeof navigator === "undefined") return "ZAR";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.includes("en-za") || lang.endsWith("-za")) return "ZAR";
  if (lang.includes("en-gb")) return "GBP";
  if (lang.includes("en-au")) return "AUD";
  if (lang.includes("en-ca") || lang.includes("fr-ca")) return "CAD";
  if (lang.includes("en-us")) return "USD";
  if (["de", "fr", "it", "es", "nl", "pt"].some((c) => lang.startsWith(c))) return "EUR";
  if (lang.startsWith("en")) return "USD";
  return "ZAR";
};

const isSupported = (code) =>
  !!code && SUPPORTED_CURRENCIES.some((c) => c.code === code);

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [ratesFromZAR, setRatesFromZAR] = useState(FALLBACK_RATES_FROM_ZAR);
  const [ratesReady, setRatesReady] = useState(false);

  const initialCurrency = (() => {
    try {
      const saved = typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
      if (isSupported(saved)) return saved;
    } catch (_) { /* ignore */ }
    return "ZAR";
  })();

  const [currency, setCurrencyState] = useState(initialCurrency);
  // Track whether the user has explicitly chosen — geo should not override that.
  const [userChose, setUserChose] = useState(() => {
    try {
      return typeof window !== "undefined"
        && !!window.localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return false;
    }
  });

  const setCurrency = useCallback((code) => {
    if (!isSupported(code)) return;
    setCurrencyState(code);
    setUserChose(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (_) { /* ignore */ }
  }, []);

  // Geo + language auto-detect (only if user hasn't chosen)
  useEffect(() => {
    if (userChose) return;

    let cancelled = false;
    const fromLang = detectFromLanguage();
    if (isSupported(fromLang)) setCurrencyState(fromLang);

    const geoDetect = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const country = (data && data.country_code) || "";
        const mapped = COUNTRY_TO_CURRENCY[country];
        if (!cancelled && isSupported(mapped)) {
          setCurrencyState(mapped);
        }
      } catch (_) {
        // silent — language fallback already applied
      }
    };

    geoDetect();
    return () => { cancelled = true; };
  }, [userChose]);

  // Live FX rates (ZAR base)
  useEffect(() => {
    let cancelled = false;

    const fetchRates = async () => {
      const symbols = SUPPORTED_CURRENCIES.map((c) => c.code).join(",");
      try {
        const res = await fetch(
          `https://open.er-api.com/v6/latest/ZAR`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("rates http " + res.status);
        const data = await res.json();
        if (data && data.rates && !cancelled) {
          const filtered = { ZAR: 1 };
          SUPPORTED_CURRENCIES.forEach((c) => {
            if (typeof data.rates[c.code] === "number") {
              filtered[c.code] = data.rates[c.code];
            }
          });
          setRatesFromZAR((prev) => ({ ...prev, ...filtered }));
          setRatesReady(true);
        }
      } catch (_) {
        // keep fallback rates silently
        if (!cancelled) setRatesReady(true);
      }
      // touch symbols so the var is not flagged unused in some lint setups
      void symbols;
    };

    fetchRates();
    return () => { cancelled = true; };
  }, []);

  const symbolFor = useCallback((code) => {
    const c = SUPPORTED_CURRENCIES.find((x) => x.code === code);
    return c ? c.symbol : code + " ";
  }, []);

  /**
   * Convert a ZAR-denominated value into the active currency.
   */
  const convert = useCallback(
    (zarValue, code = currency) => {
      const n = Number(zarValue);
      if (!Number.isFinite(n)) return 0;
      const rate = ratesFromZAR[code];
      if (!rate) return n;
      return n * rate;
    },
    [currency, ratesFromZAR]
  );

  /**
   * Format a ZAR-denominated value in the active currency.
   * Pass { showCode: true } to append the currency code (e.g. "R 1,200 ZAR").
   */
  const format = useCallback(
    (zarValue, options = {}) => {
      const { code = currency, showCode = false, maximumFractionDigits = 0 } = options;
      const converted = convert(zarValue, code);
      const rounded = Math.round(converted * Math.pow(10, maximumFractionDigits)) / Math.pow(10, maximumFractionDigits);
      const symbol = symbolFor(code);
      let body;
      try {
        body = new Intl.NumberFormat(undefined, {
          maximumFractionDigits,
          minimumFractionDigits: 0,
        }).format(rounded);
      } catch (_) {
        body = String(rounded);
      }
      return showCode ? `${symbol}${body} ${code}` : `${symbol}${body}`;
    },
    [convert, currency, symbolFor]
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      currencies: SUPPORTED_CURRENCIES,
      symbol: symbolFor(currency),
      symbolFor,
      convert,
      format,
      ratesReady,
    }),
    [currency, setCurrency, symbolFor, convert, format, ratesReady]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Safe fallback so individual components never crash during SSR/tests.
    return {
      currency: "ZAR",
      setCurrency: () => {},
      currencies: SUPPORTED_CURRENCIES,
      symbol: "R",
      symbolFor: (c) => (SUPPORTED_CURRENCIES.find((x) => x.code === c) || {}).symbol || "R",
      convert: (v) => Number(v) || 0,
      format: (v) => `R${Math.round(Number(v) || 0).toLocaleString()}`,
      ratesReady: false,
    };
  }
  return ctx;
};

export default CurrencyContext;
