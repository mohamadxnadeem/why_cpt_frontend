import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { FaWhatsapp } from "react-icons/fa";
import { Accordion } from "react-bootstrap-accordion";

// ✅ HERO IMAGE
import backgroundImage from "../assets/images/item-background/benz.jpg";

/* GLOBAL STYLES */
const GlobalStyle = createGlobalStyle`
  body { 
    font-family: 'Poppins', sans-serif; 
    background: #fff;
    color: #2a2a2a; 
    line-height: 1.8; 
  }

  h1,h2,h3 {
    font-family: 'Playfair Display', serif;
    color: #111;
  }
`;

/* PAGE WRAP */
const PageWrap = styled.div`
  .themesflat-container {
    padding-bottom: 40px;
  }
`;

/* EMERALD CTA BLOCK */
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
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 18px;
  opacity: 0.95;
  margin-bottom: 22px;
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
  padding: 13px 32px;
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

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin: 40px 0 10px;
`;

const SectionIntro = styled.p`
  font-size: 17px;
  margin-bottom: 22px;
  max-width: 860px;
`;

/* FILTER BAR */
const FilterBar = styled.div`
  margin: 18px 0 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: 600;
`;

const FilterPill = styled.button`
  border: 1px solid #e6e6e6;
  background: ${(p) => (p.active ? "#0b5b33" : "#fff")};
  color: ${(p) => (p.active ? "#fff" : "#333")};
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    border-color: #0b5b33;
    transform: translateY(-1px);
  }
`;

/* CARD LAYOUT */
const HotelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin: 22px 0 60px;
`;

const HotelCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
  gap: 22px;
  padding: 20px;
  border-radius: 16px;
  background: #fafafa;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HotelImage = styled.div`
  border-radius: 14px;
  overflow: hidden;
  min-height: 220px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const HotelContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HotelName = styled.h3`
  font-size: 22px;
  margin-bottom: 6px;
`;

const HotelMeta = styled.p`
  font-size: 15px;
  margin-bottom: 6px;
  color: #555;
`;

const HotelHighlight = styled.p`
  font-size: 16px;
  margin: 10px 0 10px;
`;

const TagRow = styled.div`
  margin-bottom: 14px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 13px;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 999px;
  margin-right: 8px;
  margin-bottom: 6px;
`;

const SmallNote = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 8px;
`;

const RatingLine = styled.div`
  font-size: 13px;
  color: #444;
  margin-top: 6px;
`;

const CardActions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

/* ✅ View Details Button (same styling vibe) */
const DetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #0b5b33;
  padding: 13px 32px;
  color: #fff !important;
  font-weight: 800;
  border-radius: 14px;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s ease;
  border: 1px solid #0b5b33;

  &:hover {
    background: #084626;
    transform: translateY(-1px);
  }
`;

/* SHIMMER LOADER */
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const ShimmerBox = styled.div`
  background: linear-gradient(90deg, #e3e3e3 0%, #f5f5f5 50%, #e3e3e3 100%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s infinite ease-in-out;
  border-radius: 12px;
`;

const ShimmerCard = styled(HotelCard)`
  grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
`;

const ShimmerImage = styled(ShimmerBox)`
  height: 220px;
`;

const ShimmerLine = styled(ShimmerBox)`
  height: ${(props) => props.height || "16px"};
  width: ${(props) => props.width || "100%"};
  margin: 8px 0;
`;

/* ---------------------------------------------------------
   PAGE COMPONENT
--------------------------------------------------------- */
const BestHotelsCapeTown = () => {
  // ✅ Paid-only WhatsApp conversion tracking (Google Ads only via gclid)
  const handleWhatsAppClick = (e, url) => {
    if (e && e.preventDefault) e.preventDefault();

    if (window.WCT_trackWhatsAppConversionAndOpen) {
      return window.WCT_trackWhatsAppConversionAndOpen(url);
    }

    window.open(url, "_blank", "noopener,noreferrer");
    return false;
  };

  // WhatsApp message templates
  const WHATSAPP_NUMBER = "27636746131";
  const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const getGeneralHotelMessage = () =>
    "Hi Cape Town Concierge, I’d like help choosing the best hotel in Cape Town.\nDates: ____ | Guests: ____ | Budget per night: ____ | Area preference: ____";

  const getHotelMessage = (hotelName) =>
    `Hi Cape Town Concierge, please recommend and help me book ${hotelName} (or similar).\nDates: ____ | Guests: ____ | Budget per night: ____ | Special requests: ____`;

  const getHotelPlusChauffeurMessage = (hotelName) =>
    `Hi Cape Town Concierge, please arrange ${hotelName} (or similar) + a private chauffeur for my trip.\nDates: ____ | Guests: ____ | Budget per night: ____ | Airport transfer: ____`;

  const pasIntro = `
Cape Town has incredible hotels — but the “best” one depends on your travel style, location and the kind of trip you want.

The problem? It’s easy to book the wrong area, miss the most exclusive options, or overpay without getting premium value.

Below is a curated shortlist of Cape Town’s most loved stays — and if you message us, we’ll match you with the perfect hotel and plan the full experience around it.
`.trim();

  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ API data
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setApiError("");

        const res = await fetch(
          "https://web-production-1ab9.up.railway.app/api/hotel/",
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setApiData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Hotel API error:", err);
        setApiError("We couldn’t load hotels right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // ✅ Normalize API objects into UI-friendly hotels
  const hotels = useMemo(() => {
    return (apiData || [])
      .map((item) => {
        const h = item?.hotel || {};

        const coverFromHotel =
          Array.isArray(h.cover_photos) && h.cover_photos.length > 0
            ? h.cover_photos[0]?.cover_photos
            : null;

        const coverFromImages =
          Array.isArray(item.images) && item.images.length > 0
            ? item.images[0]?.image?.cover_photos
            : null;

        const imageUrl = coverFromHotel || coverFromImages || null;

        // ✅ Optional tag normalizer (Sea Views -> Sea View)
        const tags = (Array.isArray(h.tags) ? h.tags : []).map((t) => {
          if (t === "Sea Views") return "Sea View";
          return t;
        });

        return {
          id: h.id,
          title: h.title,
          slug: h.slug,
          area: h.area,
          short_description: h.short_description,
          highlight: h.highlight,
          tags,
          min_price: h.min_price,
          max_price: h.max_price,
          currency: h.currency,
          booking_link: h.booking_link,
          website_link: h.website_link,
          body: h.body,
          meta_description: h.meta_description,
          og_image: h.og_image,
          is_featured: h.is_featured,
          sort_order: h.sort_order,
          imageUrl,
          average_rating: item.average_rating || 0,
          reviews_count: Array.isArray(item.reviews) ? item.reviews.length : 0,
        };
      })
      .filter((x) => x?.id && x?.title)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [apiData]);

  // ✅ Dynamic FILTERS from DB tags (same UI)
  const FILTERS = useMemo(() => {
    const allTags = (hotels || []).flatMap((h) => h.tags || []);
    const uniqueTags = Array.from(new Set(allTags)).filter(Boolean).sort();
    return ["All", ...uniqueTags];
  }, [hotels]);

  // ✅ Prevent “stuck filter” if DB tags change
  useEffect(() => {
    if (!FILTERS.includes(activeFilter)) setActiveFilter("All");
  }, [FILTERS, activeFilter]);

  const filteredHotels =
    activeFilter === "All"
      ? hotels
      : hotels.filter((h) => (h.tags || []).includes(activeFilter));

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const n = Number(value);
    if (Number.isNaN(n)) return value;
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
  };

  const priceLine = (h) => {
    const min = formatPrice(h.min_price);
    const max = formatPrice(h.max_price);
    const cur = h.currency || "USD";

    if (min && max) return `${cur} ${min} – ${max} per night`;
    if (min) return `From ${cur} ${min} per night`;
    return "Rates on request";
  };

  /* SEO FAQs */
  const faqs = [
    {
      title: "What area is best to stay in Cape Town?",
      text:
        "For first-time visitors, the V&A Waterfront and the Atlantic Seaboard (Sea Point, Bantry Bay, Camps Bay) are the most convenient luxury bases. If you prefer a quieter, more residential feel with easy access to restaurants and attractions, the City Bowl (Gardens, Oranjezicht, Tamboerskloof) is excellent.",
    },
    {
      title: "Is Camps Bay a good place to stay?",
      text:
        "Yes — Camps Bay is ideal if you want beach lifestyle, ocean views, and walkable restaurants. It’s especially popular with couples and luxury travellers who want a scenic base with energy and atmosphere.",
    },
    {
      title: "Can you plan hotel booking + chauffeur + tours?",
      text:
        "Yes. We arrange complete packages: hotel selection and booking, airport transfers, private chauffeur days, Winelands tours, Cape Peninsula experiences, restaurant reservations and VIP add-ons. One WhatsApp concierge coordinates everything.",
    },
    {
      title: "Do you help with Cape Town + Garden Route trips too?",
      text:
        "Absolutely. Many clients combine Cape Town with the Garden Route. We can plan transport, overnight stays, and experiences — and recommend properties like nature retreats for a more spacious, relaxing second leg of the trip.",
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

  return (
    <PageWrap className="home-3">
      <GlobalStyle />

      <Helmet>
        <title>Best Hotels in Cape Town | Luxury Stays & Concierge Booking</title>
        <meta
          name="description"
          content="Discover the best hotels in Cape Town — curated stays in the Waterfront, Camps Bay and the City Bowl. We help you choose, book and plan your full trip with a private chauffeur."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      {/* HERO */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          height: "60vh",
        }}
      >
        <div className="overlay"></div>
      </section>

      <div className="themesflat-container">
        {/* TOP CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Best Hotels in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>

          <ButtonRow>
            <WhatsAppButton
              href={buildWhatsAppUrl(getGeneralHotelMessage())}
              target="_blank"
              rel="noreferrer"
              onClick={(e) =>
                handleWhatsAppClick(e, buildWhatsAppUrl(getGeneralHotelMessage()))
              }
            >
              <FaWhatsapp size={20} /> Help Me Choose & Book
            </WhatsAppButton>

            <SecondaryButton
              href={buildWhatsAppUrl(
                "Hi Cape Town Concierge, please send me your best hotel picks for: Waterfront / Camps Bay / Sea Views.\nDates: ____ | Guests: ____ | Budget per night: ____"
              )}
              target="_blank"
              rel="noreferrer"
              onClick={(e) =>
                handleWhatsAppClick(
                  e,
                  buildWhatsAppUrl(
                    "Hi Cape Town Concierge, please send me your best hotel picks for: Waterfront / Camps Bay / Sea Views.\nDates: ____ | Guests: ____ | Budget per night: ____"
                  )
                )
              }
            >
              Get 3 Hotel Options
            </SecondaryButton>
          </ButtonRow>
        </EmeraldBlock>

        {/* INTRO */}
        <SectionTitle>Hand-Picked Luxury Stays</SectionTitle>
        <SectionIntro>
          A curated shortlist designed for travellers who want the best experience — not endless browsing.
          Message us and we’ll match your hotel to your itinerary (Winelands, Peninsula, restaurants) and
          arrange a private chauffeur so your trip feels effortless.
        </SectionIntro>

        {/* FILTERS (now dynamic from DB tags, same UI) */}
        <FilterBar>
          <FilterLabel>Filter:</FilterLabel>
          {FILTERS.map((f) => (
            <FilterPill
              key={f}
              type="button"
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </FilterPill>
          ))}
        </FilterBar>

        {/* LIST */}
        <HotelsWrapper>
          {loading ? (
            [...Array(6)].map((_, index) => (
              <ShimmerCard key={index}>
                <ShimmerImage />
                <div>
                  <ShimmerLine width="60%" height="22px" />
                  <ShimmerLine width="45%" />
                  <ShimmerLine width="55%" />
                  <ShimmerLine width="85%" height="14px" />
                  <ShimmerLine width="35%" height="14px" />
                  <ShimmerLine width="70%" height="14px" />
                </div>
              </ShimmerCard>
            ))
          ) : apiError ? (
            <p style={{ color: "#b00020", marginTop: 10 }}>{apiError}</p>
          ) : filteredHotels.length === 0 ? (
            <p style={{ marginTop: 10 }}>
              No hotels found for this filter. Try “All”.
            </p>
          ) : (
            filteredHotels.map((h, index) => (
              <HotelCard key={h.id}>
                <HotelImage>
                  {h.imageUrl ? (
                    <img src={h.imageUrl} alt={h.title} />
                  ) : (
                    <div style={{ padding: 18, color: "#666" }}>
                      No image available
                    </div>
                  )}
                </HotelImage>

                <HotelContent>
                  <div>
                    <HotelName>
                      {index + 1}. {h.title}
                    </HotelName>

                    {h.area && (
                      <HotelMeta>
                        <strong>Area:</strong> {h.area}
                      </HotelMeta>
                    )}

                    {h.short_description && (
                      <HotelMeta>
                        <strong>Summary:</strong> {h.short_description}
                      </HotelMeta>
                    )}

                    {h.highlight && (
                      <HotelMeta>
                        <strong>Highlight:</strong> {h.highlight}
                      </HotelMeta>
                    )}

                    {h.average_rating > 0 && (
                      <RatingLine>
                        ⭐ {h.average_rating}/5 · {h.reviews_count} review
                        {h.reviews_count === 1 ? "" : "s"}
                      </RatingLine>
                    )}

                    <HotelHighlight>
                      {h.meta_description ||
                        "Message us for best room options & availability."}
                    </HotelHighlight>

                    <TagRow>
                      {(h.tags || []).slice(0, 8).map((tag, i) => (
                        <Tag key={`${h.id}-${i}`}>{tag}</Tag>
                      ))}
                    </TagRow>

                    <SmallNote>
                      <strong>Typical rate:</strong> {priceLine(h)}
                    </SmallNote>
                  </div>

                  <CardActions>
                    {/* ✅ NEW: View Details */}
                    <DetailsButton to={`/hotel/${h.id}`}>
                      View Details
                    </DetailsButton>

                    <WhatsAppButton
                      href={buildWhatsAppUrl(getHotelPlusChauffeurMessage(h.title))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) =>
                        handleWhatsAppClick(
                          e,
                          buildWhatsAppUrl(getHotelPlusChauffeurMessage(h.title))
                        )
                      }
                    >
                      <FaWhatsapp size={18} /> WhatsApp Us
                    </WhatsAppButton>

                    <SecondaryButton
                      href={buildWhatsAppUrl(getHotelMessage(h.title))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) =>
                        handleWhatsAppClick(e, buildWhatsAppUrl(getHotelMessage(h.title)))
                      }
                    >
                      Enquire
                    </SecondaryButton>
                  </CardActions>
                </HotelContent>
              </HotelCard>
            ))
          )}
        </HotelsWrapper>

        {/* FAQ */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="flat-accordion2">
          {faqs.map((item, i) => (
            <Accordion key={i} title={item.title}>
              <p>{item.text}</p>
            </Accordion>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Want Us To Plan The Full Trip?</EmeraldTitle>
          <EmeraldSub>
            Send your dates + budget and we’ll reply with:
            {"\n"}• 2–3 hotel options (matched to your style)
            {"\n"}• a suggested itinerary
            {"\n"}• private chauffeur pricing
          </EmeraldSub>

          <WhatsAppButton
            href={buildWhatsAppUrl(getGeneralHotelMessage())}
            target="_blank"
            rel="noreferrer"
            onClick={(e) =>
              handleWhatsAppClick(e, buildWhatsAppUrl(getGeneralHotelMessage()))
            }
          >
            <FaWhatsapp size={20} /> Chat To Your Concierge
          </WhatsAppButton>
        </EmeraldBlock>
      </div>

      <Footer />
    </PageWrap>
  );
};

export default BestHotelsCapeTown;