import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SliderStyle3 from "../components/slider/SliderStyle3";
import { Blurhash } from "react-blurhash";
import parse from "html-react-parser";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet";
import { Accordion } from "react-bootstrap-accordion";
import { FaWhatsapp } from "react-icons/fa";
import { useCurrency } from "../contexts/CurrencyContext";

const TestimonialCarousel = React.lazy(() =>
  import("../components/TestimonialCarousel")
);

/* ================= SHIMMER ================= */

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const ShimmerBox = styled.div`
  background: linear-gradient(90deg, #e3e3e3 0%, #f5f5f5 50%, #e3e3e3 100%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s infinite;
  border-radius: 12px;
  height: ${(p) => p.h || "20px"};
  width: ${(p) => p.w || "100%"};
  margin-bottom: 12px;
`;

/* ================= EMERALD CTA (same vibe as other pages) ================= */

const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 18px;
  padding: 42px 32px;
  margin: 40px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
`;

const EmeraldTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 17px;
  opacity: 0.95;
  margin-bottom: 18px;
  color: #fff;
  white-space: pre-line;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #111;
  padding: 13px 26px;
  color: #fff !important;
  font-weight: 700;
  border-radius: 14px;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s ease;
  border: 1px solid #111;

  &:hover {
    background: #222;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(WhatsAppButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.9);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

/* ================= PAGE ================= */

const HotelDetails = () => {
  const { id } = useParams();

  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { format } = useCurrency();

  // ✅ Paid-only WhatsApp conversion tracking (Google Ads only via gclid)
  const handleWhatsAppClick = (e, url) => {
    if (e && e.preventDefault) e.preventDefault();

    if (window.WCT_trackWhatsAppConversionAndOpen) {
      return window.WCT_trackWhatsAppConversionAndOpen(url);
    }

    window.open(url, "_blank", "noopener,noreferrer");
    return false;
  };

  // WhatsApp templates
  const WHATSAPP_NUMBER = "27636746131";
  const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  /* ================= FETCH ================= */

  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/hotel/${id}/details/`)
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading || !itemData) {
    return (
      <div style={{ padding: "120px 20px" }}>
        <ShimmerBox h="38px" w="42%" />
        <ShimmerBox h="18px" w="60%" />
        <ShimmerBox h="320px" />
        <ShimmerBox h="18px" w="90%" />
        <ShimmerBox h="18px" w="80%" />
      </div>
    );
  }

  const hotel = itemData.hotel;

  const heroSliderData = (itemData.images || []).map((img) => ({
    src: img.image.cover_photos,
    blurhash: img.blurhash,
  }));

  /* ================= FAQ + Schema ================= */

  const faqs = [
    {
      title: `Where is ${hotel.title} located?`,
      text: `${hotel.title} is located in ${hotel.area}. This area is one of the most popular choices for luxury travellers in Cape Town, depending on your itinerary and vibe.`,
    },
    {
      title: `How much does ${hotel.title} cost per night?`,
      text: `Rates are seasonal. A typical guide is from ${format(hotel.min_price)}${
        hotel.max_price ? ` up to ${format(hotel.max_price)}` : ""
      } per night, depending on room type and dates.`,
    },
    {
      title: `Can you arrange the hotel + chauffeur + experiences?`,
      text: `Yes. We can handle your hotel recommendation, booking assistance, airport transfers, private chauffeur days, Winelands and Peninsula experiences — all through one WhatsApp concierge.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  };

  /* ================= WhatsApp Messages ================= */

  const enquiryMsg = `Hi Cape Town Concierge, I’m interested in ${hotel.title}.\nDates: ____ | Guests: ____ | Budget per night: ____ | Any special requests: ____`;

  const bookMsg = `Hi Cape Town Concierge, please help me book ${hotel.title}.\nDates: ____ | Guests: ____ | Room preference: ____ | Budget per night: ____`;

  const chauffeurMsg = `Hi Cape Town Concierge, please arrange ${hotel.title} + a private chauffeur for my trip.\nDates: ____ | Guests: ____ | Airport transfer: ____ | Chauffeur days needed: ____`;

  const ctaIntro = `
Want the best rates + the best room options for ${hotel.title}?

Message us with your dates and we’ll:
• confirm availability
• recommend the best room type
• assist with booking + chauffeur planning
`.trim();

  /* ================= UI ================= */

  return (
    <div className="item-details">
      <Helmet>
        <title>{hotel.title} | Luxury Hotel in {hotel.area}</title>
        <meta name="description" content={hotel.meta_description || `${hotel.title} in ${hotel.area}. View details, photos and book with Cape Town Concierge.`} />
        <meta property="og:title" content={hotel.title} />
        <meta property="og:description" content={hotel.meta_description || `${hotel.title} in ${hotel.area}.`} />
        <meta property="og:image" content={hotel.og_image || (heroSliderData[0]?.src || "")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <center>
            <h4
              className="tf-title-heading ct style-2 fs-30 mg-bt-10"
              style={{ color: "white" }}
            >
              {hotel.title}
            </h4>
            <p style={{ color: "white" }}>{hotel.area}</p>
          </center>
        </div>
      </section>

      {/* SLIDER */}
      <SliderStyle3
        data={heroSliderData}
        renderImage={(src, blurhash) => (
          <div style={{ position: "relative" }}>
            <Blurhash
              hash={blurhash}
              width={500}
              height={325}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <img src={src} alt={hotel.title} />
          </div>
        )}
      />

      {/* INFO */}
      <div className="tf-section">
        <div className="container">
          {hotel.short_description && <h3>{hotel.short_description}</h3>}

          <p>
            <strong>From:</strong> {format(hotel.min_price)}
            {hotel.max_price ? ` – ${format(hotel.max_price)}` : ""}{" "}
            <strong>per night</strong>
          </p>

          {hotel.highlight && (
            <p>
              <strong>Highlight:</strong> {hotel.highlight}
            </p>
          )}

          {/* TAGS */}
          {!!(hotel.tags || []).length && (
            <div style={{ marginBottom: 20 }}>
              {hotel.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    marginRight: 10,
                    background: "#eee",
                    padding: "6px 12px",
                    borderRadius: 20,
                    display: "inline-block",
                    marginBottom: 8,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* BODY */}
          <div>{parse(hotel.body || "")}</div>

          {/* EMERALD CTA */}
          <EmeraldBlock>
            <EmeraldTitle>Want Us To Book This For You?</EmeraldTitle>
            <EmeraldSub>{ctaIntro}</EmeraldSub>

            <ButtonRow>
              <WhatsAppButton
                href={buildWhatsAppUrl(bookMsg)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => handleWhatsAppClick(e, buildWhatsAppUrl(bookMsg))}
              >
                <FaWhatsapp size={18} /> Book {hotel.title}
              </WhatsAppButton>

              <SecondaryButton
                href={buildWhatsAppUrl(chauffeurMsg)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) =>
                  handleWhatsAppClick(e, buildWhatsAppUrl(chauffeurMsg))
                }
              >
                Hotel + Chauffeur
              </SecondaryButton>

              <SecondaryButton
                href={buildWhatsAppUrl(enquiryMsg)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) =>
                  handleWhatsAppClick(e, buildWhatsAppUrl(enquiryMsg))
                }
              >
                Quick Enquiry
              </SecondaryButton>
            </ButtonRow>
          </EmeraldBlock>
        </div>
      </div>

      <Suspense fallback={<div style={{ height: 300 }} />}>
        <TestimonialCarousel />
      </Suspense>

      {/* FAQ */}
      <div className="tf-section">
        <div className="container">
          <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-20">
            Frequently Asked Questions
          </h2>

          <div className="flat-accordion2">
            {faqs.map((item, i) => (
              <Accordion key={i} title={item.title}>
                <p>{item.text}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;