import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SliderStyle3 from "../components/slider/SliderStyle3";
import "react-tabs/style/react-tabs.css";
import parse from "html-react-parser";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { Accordion } from "react-bootstrap-accordion";
import { FaWhatsapp } from "react-icons/fa";
import PricingOfferCard from "../components/PricingOfferCard";

const Cars4Hire = React.lazy(() =>
  import("../components/Cars4hire")
);
const BudgetCars4Hire = React.lazy(() =>
  import("../components/BudgetCars")
);

/* ---------------- Shimmer for slider ---------------- */
const LoaderWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
`;
const Shimmer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

/* ---------------- Layout + Typography ---------------- */
const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 32px 0 14px;
  font-family: "Playfair Display", serif;
`;

const SectionIntro = styled.p`
  font-size: 17px;
  margin-bottom: 20px;
  max-width: 760px;
`;

const Highlight = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

/* ---------------- Emerald WhatsApp CTA ---------------- */
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 18px;
  padding: 40px 26px;
  margin: 40px 0 35px;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
`;

const EmeraldTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 17px;
  opacity: 0.97;
  margin-bottom: 24px;
  color: #fff;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #111;
  padding: 13px 32px;
  color: #fff !important;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.3s ease;
  border: 1px solid #111;

  &:hover {
    background: #222;
    transform: translateY(-1px);
  }
`;

/* ---------------- Pricing Block ---------------- */
const PricingCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 26px 24px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.06);
  margin: 20px 0 32px;
`;

const PriceLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const PriceMain = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #0b5b33;
  margin-bottom: 6px;
`;

const PriceSecondary = styled.div`
  font-size: 15px;
  color: #777;
  margin-bottom: 12px;
`;

const CurrencyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const CurrencyLabel = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

const CurrencySelect = styled.select`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #ddd;
  font-size: 14px;
  background: #fafafa;
`;

/* ---------------- FAQ Wrapper ---------------- */
const FAQWrapper = styled.div`
  margin: 50px 0 70px;
`;

/* ---------------- Component ---------------- */
const ItemDetails01 = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  // currency state
  const [rates, setRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("ZAR");
  const [loadingRates, setLoadingRates] = useState(true);

  // ✅ Fetch Experience Details
  useEffect(() => {
    fetch(
      `https://web-production-1ab9.up.railway.app/api/experiences/${id}/details/`
    )
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const experience = itemData?.experience;
  const heroSliderData =
    itemData?.cover_photos?.map((cover) => ({
      src: cover?.cover_photos || "",
    })) || [];

  const basePriceZAR = experience?.price || 0;

  /* ---------- Currency: detect + fetch live rates ---------- */
  useEffect(() => {
    // auto-detect currency from browser language (best-effort)
    if (typeof window !== "undefined" && window.navigator) {
      const lang = navigator.language || "";
      let detected = "ZAR";

      if (lang.includes("en-GB")) detected = "GBP";
      else if (lang.includes("en-US")) detected = "USD";
      else if (
        ["de", "fr", "it", "es", "nl", "pt"].some((code) =>
          lang.toLowerCase().startsWith(code)
        )
      ) {
        detected = "EUR";
      } else if (!lang.toLowerCase().includes("za")) {
        detected = "USD";
      }

      setSelectedCurrency(detected);
    }

    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate.host/latest?symbols=ZAR,USD,GBP,EUR"
        );
        const data = await res.json();
        if (data && data.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.error("Error fetching FX rates:", err);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  const formatPrice = (value, currencyCode) => {
    if (!value) return "";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 0,
      }).format(value);
    } catch {
      return `${currencyCode} ${Math.round(value).toLocaleString()}`;
    }
  };

  // ✅ Correct conversion using ZAR as logical base
  let displayPrice = basePriceZAR;
  if (rates && selectedCurrency) {
    const rateZAR = rates["ZAR"];
    const rateTarget = rates[selectedCurrency];

    if (selectedCurrency === "ZAR" || !rateZAR || !rateTarget) {
      displayPrice = basePriceZAR;
    } else {
      displayPrice = basePriceZAR * (rateTarget / rateZAR);
    }
  }

  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.whycapetown.com/private-tours-cape-town";

  // WhatsApp CTA dynamic text
  const tourName = experience?.title || "Cape Town Private Tour & Experience";
  const whatsappMessage = `Hello, I would like to book the ${tourName} for ___ people.\nPreferred date: _______`;
  const whatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // ✅ NEW: paid-only WhatsApp conversion tracking (uses helper you added in index.html)
  const trackWhatsApp = (url) => {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.WCT_trackWhatsAppConversionAndOpen === "function"
      ) {
        window.WCT_trackWhatsAppConversionAndOpen(url);
        return;
      }
    } catch (e) {
      // fall back below
    }

    // fallback: still open WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* ---------- SEO-optimised FAQs for tour details ---------- */
  const faqs = [
    {
      title: "What is included in this private tour?",
      text: `This private tour typically includes a dedicated vehicle, professional driver-guide, door-to-door pick-up and drop-off in Cape Town, and a curated route based on the ${tourName} itinerary. Entrance fees, meals and optional extras can be added depending on your preferences.`,
    },
    {
      title: "Can I customise the itinerary for this tour?",
      text: `Yes. All our Cape Town private tours are customisable. You can adjust timing, add extra stops, or combine this ${tourName} with other highlights such as the Winelands, Table Mountain or a sunset coastal drive.`,
    },
    {
      title: "How many guests can join this private tour?",
      text: "Most private tours comfortably cater for couples, families and small groups. The exact capacity depends on the vehicle selected, but we can usually arrange options for 2–8 guests and, on request, larger groups in multiple vehicles.",
    },
    {
      title: "How long does a typical private day tour in Cape Town last?",
      text: "A standard full-day private tour runs for around 8–10 hours, depending on the experience and how many stops you decide to include. Half-day and multi-day options can also be arranged if you’d like a slower pace.",
    },
    {
      title: "Do I need to book this private tour in advance?",
      text: "We recommend booking as early as possible, especially for peak season (November to March) and weekends. This helps us secure the best time slots for attractions, restaurants and any special requests you may have.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.text,
      },
    })),
  };

  return (
    <div className="item-details">
      <Helmet>
        <title>{tourName} | Private Tour in Cape Town with Chauffeur</title>
        <meta
          name="description"
          content={
            experience?.meta_description ||
            `Book ${tourName} as a private tour in Cape Town with a dedicated driver, hotel pick-up and curated route. Perfect for couples, families and small groups.`
          }
        />
        <meta
          name="keywords"
          content="private tour Cape Town, Cape Town private tours, Cape Peninsula tour, Cape Town chauffeur, private day trips Cape Town"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${tourName} | Private Tour Cape Town`} />
        <meta
          property="og:description"
          content={`Chauffeur-driven private tour: ${tourName} in Cape Town. Door-to-door service, flexible itinerary and curated highlights.`}
        />
        <meta property="og:url" content={canonicalUrl} />
        {experience?.og_image && <meta property="og:image" content={experience.og_image} />}

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      {/* Hero (simple overlay) */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
      </section>

      {/* Slider */}
      <div style={{ padding: "20px 0" }}>
        {loading ? (
          <LoaderWrapper>
            <Shimmer />
          </LoaderWrapper>
        ) : heroSliderData.length > 0 ? (
          <SliderStyle3 data={heroSliderData} />
        ) : null}
      </div>

      <div className="tf-section tf-item-details">
        <div className="container">
          {/* TOUR TITLE + INTRO */}
          {!loading && experience && (
            <>
              <SectionTitle>{experience.title}</SectionTitle>
              <SectionIntro>
                Discover Cape Town with a{" "}
                <strong>private driver and tailor-made itinerary</strong>. This
                experience is designed for travellers who want comfort,
                flexibility and unforgettable views — without the stress of
                driving or group tour schedules.
              </SectionIntro>
            </>
          )}

          {/* PACKAGE BODY */}
          {!loading && experience?.body && (
            <div className="content-center sc-item-details">{parse(experience.body)}</div>
          )}

          {/* PRICING COMPONENT */}
          {!loading && experience?.price && <PricingOfferCard price={experience.price} />}


  
          <Suspense fallback={<div style={{ height: 300 }} />}>
            <BudgetCars4Hire />
          </Suspense>

          {/* WHATSAPP CTA (tracked) */}
          <EmeraldBlock>
            <EmeraldTitle>Ready to Reserve This Private Tour?</EmeraldTitle>
            <EmeraldSub>
              Weekends and high season dates in Cape Town book up quickly. Send
              us a quick WhatsApp with your{" "}
              <strong>tour name and preferred dates</strong>, and your concierge
              will confirm availability and next steps.
            </EmeraldSub>

            <WhatsAppButton
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                trackWhatsApp(whatsappLink);
              }}
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp About {tourName}
            </WhatsAppButton>
          </EmeraldBlock>

          {/* TESTIMONIALS */}
          <TestimonialCarousel />

          {/* FAQ SECTION */}
          <FAQWrapper>
            <SectionTitle>Private Tours in Cape Town – Frequently Asked Questions</SectionTitle>
            <div className="flat-accordion2">
              {faqs.map((item, i) => (
                <Accordion key={i} title={item.title}>
                  <p style={{ fontSize: "16px", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                    {item.text}
                  </p>
                </Accordion>
              ))}
            </div>
          </FAQWrapper>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetails01;