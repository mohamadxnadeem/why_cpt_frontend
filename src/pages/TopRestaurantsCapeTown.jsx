import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import backgroundImage from "../assets/images/resturants/chefswarehouse.webp";
import graff from "../assets/images/resturants/graff.jpg";
import fyn from "../assets/images/resturants/fyn.jpg";
import saray from "../assets/images/resturants/saray.jpg";
import kloofstreethouse from "../assets/images/resturants/kloof-street-house.jpg";
import chefswarehouse from "../assets/images/resturants/chefswarehouse.webp";
import roundhouse from "../assets/images/resturants/roundhouse.jpg";
import gold from "../assets/images/resturants/gold.jpg";
import clubkloof from "../assets/images/resturants/clubkloof.jpg";
import butchersgrill from "../assets/images/resturants/butchersshop.jpg";
import menoushe from "../assets/images/resturants/menoushe.jpg";

import { FaWhatsapp } from "react-icons/fa";
import { Accordion } from "react-bootstrap-accordion";

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

/* EMERALD CTA BLOCK */
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 18px;
  padding: 40px 32px;
  margin: 40px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0,0,0,0.18);
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

  &:hover { background: #222; }
`;

const SecondaryButton = styled(WhatsAppButton)`
  background: transparent;
  border: 1px solid #fff;
  margin-left: 10px;

  &:hover { background: rgba(255,255,255,0.08); }
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin: 40px 0 10px;
`;

const SectionIntro = styled.p`
  font-size: 17px;
  margin-bottom: 25px;
  max-width: 760px;
`;

/* CARD LAYOUT */
const RestaurantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin: 30px 0 60px;
`;

const RestaurantCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: 22px;
  padding: 20px;
  border-radius: 16px;
  background: #fafafa;
  box-shadow: 0 10px 24px rgba(0,0,0,0.04);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RestaurantImage = styled.div`
  border-radius: 14px;
  overflow: hidden;
  min-height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RestaurantContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RestaurantName = styled.h3`
  font-size: 22px;
  margin-bottom: 6px;
`;

const RestaurantMeta = styled.p`
  font-size: 15px;
  margin-bottom: 6px;
  color: #555;
`;

const RestaurantHighlight = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const TagRow = styled.div`
  margin-bottom: 16px;
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

const CardActions = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

const ShimmerCard = styled(RestaurantCard)`
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
`;

const ShimmerImage = styled(ShimmerBox)`
  height: 200px;
`;

const ShimmerLine = styled(ShimmerBox)`
  height: ${(props) => props.height || "16px"};
  width: ${(props) => props.width || "100%"};
  margin: 8px 0;
`;

/* ---------------------------------------------------------
   PAGE COMPONENT
--------------------------------------------------------- */
const TopRestaurantsCapeTown = () => {
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

  const getGeneralDiningMessage = () =>
    "Hi Cape Town Concierge, I’d like to reserve a private experience. Date: ____ | Guests: ____ | Budget: ____";

  const getRestaurantMessage = (restaurantName) =>
    `Hi Cape Town Concierge, I'd like to reserve ${restaurantName}.\nDate: ____ | Guests: ____ | Time: ____ | Budget: ____`;

  const getChauffeurAndDiningMessage = (restaurantName) =>
    `Hi Cape Town Concierge, please arrange a restaurant reservation + private chauffeur.\nRestaurant: ${restaurantName}\nDate: ____ | Guests: ____ | Pickup: ____ | Return: ____`;

  // PAS intro text
  const pasIntro = `
Cape Town has more incredible restaurants than you could possibly try in one trip — from fine dining tasting menus to live African feasts and hidden local favourites.

The problem? It’s easy to waste time on average meals, struggle with bookings, or stress about parking, traffic and getting back safely after a few glasses of wine.

That’s why we’ve handpicked our Top 10 dining experiences and paired them with a private chauffeur option — so all you have to do is arrive, enjoy, and let us handle the rest.
  `.trim();

  const restaurants = [
    {
      name: "Delaire Graff Restaurant",
      image: graff,
      area: "Stellenbosch",
      cuisine: "Fine dining • Contemporary",
      price: "Tasting menu ± R1 600 PER PERSON",
      highlight:
        "Dine with breathtaking panoramic vineyard views at one of South Africa’s most luxurious wine estates.",
      tags: ["Fine Dining", "Wine Estate", "Luxury"],
    },
    {
      name: "FYN Restaurant",
      image: fyn,
      area: "Cape Town CBD",
      cuisine: "Modern South African • Japanese Fusion",
      price: "Tasting menu ± R1 600 PER PERSON",
      highlight:
        "Cape Town skyline views paired with bold, elegant dishes in a dramatic contemporary space.",
      tags: ["Fine Dining", "City Views", "Signature Experience"],
    },
    {
      name: "Saray Restaurant",
      image: saray,
      area: "V&A Waterfront",
      cuisine: "Turkish • Mediterranean",
      price: "Mains ± R180–R350 PER PERSON",
      highlight:
        "Authentic Turkish dishes, fresh grills and vibey ambience on the Waterfront.",
      tags: ["Waterfront", "Mediterranean", "Family Friendly"],
    },
    {
      name: "Kloof Street House",
      image: kloofstreethouse,
      area: "Gardens",
      cuisine: "Modern bistro • Global comfort",
      price: "Mains ± R250–R500 PER PERSON",
      highlight:
        "Fairy-lit Victorian mansion with one of Cape Town’s most sought-after dining atmospheres.",
      tags: ["Romantic", "Bistro", "Atmospheric"],
    },
    {
      name: "Chefs Warehouse at Beau Constantia",
      image: chefswarehouse,
      area: "Constantia",
      cuisine: "Tapas for two • Modern",
      price: "Set tapas experience ± R1 250–R2 000 PER COUPLE",
      highlight:
        "Unmatched vineyard views with a world-class tapas-style dining journey.",
      tags: ["Wine Estate", "Views", "Tapas Experience"],
    },
    {
      name: "Salsify at The Roundhouse",
      image: roundhouse,
      area: "Camps Bay",
      cuisine: "Fine dining • Seasonal ingredient-driven",
      price: "Tasting menu ± R1 400 PER PERSON",
      highlight:
        "Historical building overlooking the Atlantic with award-winning, beautifully plated dishes.",
      tags: ["Sea Views", "Fine Dining", "Heritage"],
    },
    {
      name: "GOLD Restaurant",
      image: gold,
      area: "Green Point",
      cuisine: "African Feast • Live Performances",
      price: "Set feast ± R605 PER PERSON",
      highlight:
        "14-dish African tasting feast with interactive drumming and live cultural performances.",
      tags: ["African", "Entertainment", "Group Friendly"],
    },
    {
      name: "Club Kloof",
      image: clubkloof,
      area: "Kloof Street",
      cuisine: "Contemporary • Stylish",
      price: "Plates ± R120–R260",
      highlight:
        "Trendy hotspot for cocktails, elevated bar bites and late-night energy on Kloof Street.",
      tags: ["Trendy", "Cocktails", "Modern"],
    },
    {
      name: "The Butcher’s Grill",
      image: butchersgrill,
      area: "Long Street",
      cuisine: "Steakhouse • Grills",
      price: "Mains ± R200–R350",
      highlight:
        "Premium steaks, generous portions and a lively atmosphere — a long-time favourite for meat lovers.",
      tags: ["Steakhouse", "Grill", "Local Favourite"],
    },
    {
      name: "Menoushe Stellenbosch",
      image: menoushe,
      area: "Stellenbosch",
      cuisine: "Lebanese • Middle Eastern",
      price: "Mains ± R120–R260",
      highlight:
        "Authentic Lebanese cuisine, fresh mezze and warm hospitality in the heart of Stellenbosch.",
      tags: ["Lebanese", "Stellenbosch", "Authentic"],
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  /* SEO-Optimised FAQs */
  const faqs = [
    {
      title: "How far in advance should I book top restaurants in Cape Town?",
      text:
        "For the most in-demand restaurants in Cape Town – especially places like FYN, Delaire Graff or Salsify – it’s safest to book at least 2–4 weeks in advance. During peak travel periods (December to March, major public holidays and big events), prime dinner slots can be fully booked even earlier. If you’re travelling as a couple or small group and you’re flexible with dates and times, we can often still secure excellent options at shorter notice. Our concierge team can also waitlist you for cancellations and suggest equally special alternatives if your first choice is unavailable.",
    },
    {
      title: "Do these restaurants cater for halal, vegetarian or vegan guests?",
      text:
        "Many of Cape Town’s premium restaurants are very accommodating when it comes to dietary requirements, but it’s important to plan ahead. Several of the venues on this list can offer vegetarian, pescatarian and vegan-friendly menus with advance notice. Some can also cater for halal-friendly dining by avoiding pork and alcohol in specific dishes or by arranging special options in the kitchen. However, if you require fully certified halal, we’ll guide you to the most appropriate restaurants and confirm details directly with the venue before we secure your booking.",
    },
    {
      title: "What is the typical dress code for these dining experiences?",
      text:
        "Most of the fine dining restaurants and luxury wine estates operate on a smart-casual to smart-elegant dress code. For venues such as FYN, Delaire Graff, Salsify or Chefs Warehouse at Beau Constantia, we recommend neat trousers or chinos, a shirt or smart top, and closed shoes for gentlemen; and stylish dresses, blouses or tailored outfits for ladies. More relaxed spots like Kloof Street House, Saray or Menoushe are slightly more casual, but beachwear, gym clothes and flip-flops are generally best avoided for evening dining. If you’re unsure, our team can advise the ideal dress code based on your reservation.",
    },
    {
      title: "Can you arrange both the restaurant booking and chauffeur transfer?",
      text:
        "Yes – that’s exactly what we specialise in. Instead of worrying about driving, parking in busy areas or limiting your wine or cocktails, we coordinate your restaurant reservation and your private chauffeur as one seamless experience. Your driver collects you from your hotel, villa or apartment, waits nearby while you dine, and returns you safely at the end of the night. If your dinner runs longer than expected, our team adjusts your schedule so you never feel rushed. This is especially valuable for wine estate dinners in Stellenbosch or Constantia, or when you’re unfamiliar with Cape Town’s roads at night.",
    },
    {
      title: "How much should I budget for a premium dining experience in Cape Town?",
      text:
        "Budgets vary depending on the type of experience you’re looking for. As a guideline, fine dining tasting menus at restaurants like Delaire Graff, FYN or Salsify typically range from around R1 200 to R1 800 per person before drinks. Bistros and atmospheric spots such as Kloof Street House or Club Kloof usually come in between R250 and R500 per main course, with cocktails, starters and desserts on top. Experiences like GOLD Restaurant’s African feast are usually a fixed per-person price. When you contact us, we’ll recommend venues that match your budget and style – whether you want one big “wow” night or a series of relaxed but memorable dinners.",
    },
  ];

  /* JSON-LD SCHEMA FOR FAQ SEO */
  const schema = {
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
    <div className="home-3">
      <GlobalStyle />

      <Helmet>
        <title>
          Top 10 Dining Experiences in Cape Town | Reservations & Private Chauffeur Service
        </title>
        <meta
          name="description"
          content="Discover the top 10 dining experiences in Cape Town – from fine dining and wine estate restaurants to African feasts and city favourites. We book your table and private chauffeur."
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
        {/* PAS-STYLE CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Top 10 Dining Experiences in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>

          <WhatsAppButton
            href={buildWhatsAppUrl(getGeneralDiningMessage())}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleWhatsAppClick(e, buildWhatsAppUrl(getGeneralDiningMessage()))}
          >
            <FaWhatsapp size={20} /> Help Me Reserve
          </WhatsAppButton>
        </EmeraldBlock>

        <SectionTitle>Where to Eat in Cape Town</SectionTitle>
        <SectionIntro>
          A curated list of Cape Town’s best dining experiences — including wine estate restaurants,
          skyline-view tasting menus, live African feasts and stylish inner-city favourites. When you
          message us, we’ll match the right venue to your occasion and arrange both{" "}
          <strong>restaurant bookings and chauffeur-driven transfers</strong>.
        </SectionIntro>

        {/* RESTAURANT LIST / SHIMMER */}
        <RestaurantsWrapper>
          {loading
            ? [...Array(6)].map((_, index) => (
                <ShimmerCard key={index}>
                  <ShimmerImage />
                  <div>
                    <ShimmerLine width="60%" height="22px" />
                    <ShimmerLine width="40%" />
                    <ShimmerLine width="50%" />
                    <ShimmerLine width="80%" height="14px" />
                    <ShimmerLine width="30%" height="14px" />
                  </div>
                </ShimmerCard>
              ))
            : restaurants.map((r, index) => (
                <RestaurantCard key={r.name}>
                  <RestaurantImage>
                    <img src={r.image} alt={r.name} />
                  </RestaurantImage>

                  <RestaurantContent>
                    <div>
                      <RestaurantName>
                        {index + 1}. {r.name}
                      </RestaurantName>
                      <RestaurantMeta>
                        <strong>Area:</strong> {r.area}
                      </RestaurantMeta>
                      <RestaurantMeta>
                        <strong>Cuisine:</strong> {r.cuisine}
                      </RestaurantMeta>
                      <RestaurantMeta>
                        <strong>Typical spend:</strong> {r.price}
                      </RestaurantMeta>

                      <RestaurantHighlight>{r.highlight}</RestaurantHighlight>

                      <TagRow>
                        {r.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagRow>
                    </div>

                    <CardActions>
                      {/* ✅ CTA 1: Reservation + Chauffeur */}
                      <WhatsAppButton
                        href={buildWhatsAppUrl(getChauffeurAndDiningMessage(r.name))}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) =>
                          handleWhatsAppClick(e, buildWhatsAppUrl(getChauffeurAndDiningMessage(r.name)))
                        }
                      >
                        <FaWhatsapp size={18} /> Reserve + Chauffeur
                      </WhatsAppButton>

                      {/* ✅ CTA 2: Reservation Only */}
                      <SecondaryButton
                        href={buildWhatsAppUrl(getRestaurantMessage(r.name))}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) =>
                          handleWhatsAppClick(e, buildWhatsAppUrl(getRestaurantMessage(r.name)))
                        }
                      >
                        Reserve Table Only
                      </SecondaryButton>
                    </CardActions>
                  </RestaurantContent>
                </RestaurantCard>
              ))}
        </RestaurantsWrapper>

        {/* FAQ SECTION */}
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
          <EmeraldTitle>Ready to Plan Your Dining in Cape Town?</EmeraldTitle>
          <EmeraldSub>
            Share your dates, budget and the kind of evening you’re dreaming of — romantic, celebration,
            business or a friends’ night out. We’ll recommend the perfect restaurant, secure your booking
            and arrange a private chauffeur so your entire evening feels effortless from start to finish.
          </EmeraldSub>

          <WhatsAppButton
            href={buildWhatsAppUrl(getGeneralDiningMessage())}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleWhatsAppClick(e, buildWhatsAppUrl(getGeneralDiningMessage()))}
          >
            <FaWhatsapp size={20} /> Chat to Your Concierge
          </WhatsAppButton>
        </EmeraldBlock>
      </div>

      <Footer />
    </div>
  );
};

export default TopRestaurantsCapeTown;