import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* Styling */
const Wrapper = styled.div`
  text-align: center;
  margin: 40px auto;
  max-width: 700px;
`;

const PriceCardWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
`;

const PriceTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 12px;
`;

const PriceValue = styled.div`
  font-size: 44px;
  font-weight: 800;
  color: #0b5b33;
  margin-bottom: 4px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #777;
`;

const CurrencySelector = styled.select`
  margin-top: 15px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
`;

/* ─────────────────────────────────────────────── */

const PricingOfferCard = ({ price }) => {
  const [currency, setCurrency] = useState("ZAR");
  const [convertedPrice, setConvertedPrice] = useState(price);

  /*  
    ► STATIC TEST RATES (Update this daily manually)
    ► These rates are correct as of: "example day"
    ► Purpose: Verify that conversion UI & logic works
  */
  const STATIC_RATES = {
    ZAR: 1,
    USD: 0.054, // 1 ZAR = 0.054 USD (example)
    GBP: 0.043, // 1 ZAR = 0.043 GBP (example)
    EUR: 0.050, // 1 ZAR = 0.050 EUR (example)
  };

  /* Currency Symbols */
  const SYMBOLS = {
    ZAR: "R",
    USD: "$",
    GBP: "£",
    EUR: "€",
  };

  /* 👉 Convert price whenever currency changes */
  useEffect(() => {
    const rate = STATIC_RATES[currency];

    if (!rate) {
      setConvertedPrice(price);
      return;
    }

    const newPrice = price * rate;
    setConvertedPrice(newPrice);
  }, [currency, price]);

  return (
    <Wrapper>
      <PriceCardWrapper>
        <PriceTitle>Private Tour Price</PriceTitle>

        <PriceValue>
          {SYMBOLS[currency]}
          {Math.round(convertedPrice).toLocaleString()}
        </PriceValue>

        <Label>Per Private Tour up to 8 pax (not per person)</Label>

        {/* Currency Dropdown */}
        <CurrencySelector
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="ZAR">🇿🇦 ZAR — South African Rand</option>
          <option value="USD">🇺🇸 USD — US Dollar</option>
          <option value="GBP">🇬🇧 GBP — British Pound</option>
          <option value="EUR">🇪🇺 EUR — Euro</option>
        </CurrencySelector>
      </PriceCardWrapper>
    </Wrapper>
  );
};

export default PricingOfferCard;