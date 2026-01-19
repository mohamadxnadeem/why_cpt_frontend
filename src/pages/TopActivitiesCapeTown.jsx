import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

/* Hero background */
import backgroundImage from "../assets/images/item-background/benz.jpg";

/* Activities Images */
import hike from "../assets/images/activities/hike.jpg";
import chapmans from "../assets/images/activities/cobra.jpeg";
import aquila from "../assets/images/activities/aquila.jpg";
import helicopter from "../assets/images/activities/helicopter.jpg";
import cablecar from "../assets/images/activities/cablecar.jpg";
import bokaap from "../assets/images/activities/bokaap.jpg";
import capepoint from "../assets/images/activities/capepoint.jpg";
import boulders from "../assets/images/activities/boulders.JPG";
import winelands from "../assets/images/activities/winelands.JPG";

import { FaWhatsapp } from "react-icons/fa";
import { Accordion } from "react-bootstrap-accordion";

/* GLOBAL STYLE */
const GlobalStyle = createGlobalStyle`
  body { font-family: 'Poppins', sans-serif; color: #2a2a2a; background: #fff; }
  h1,h2,h3 { font-family: 'Playfair Display', serif; color: #111; }
`;

/* SHIMMER EFFECT */
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const ShimmerBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,#e0e0e0 0px,#f5f5f5 40px,#e0e0e0 80px);
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s infinite linear;
  border-radius: 14px;
`;

/* EMERALD CTA */
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg,#0b5b33,#063e23);
  color: white;
  padding: 40px 32px;
  border-radius: 18px;
  margin: 40px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0,0,0,0.18);
`;

const EmeraldTitle = styled.h2`
  font-size: 32px;
  color: #fff;
  font-weight: 700;
`;

const EmeraldSub = styled.p`
  font-size: 18px;
  color: #fff;
  opacity: .95;
`;

/* CTA BUTTONS */
const WhatsAppButton = styled.a`
  display: inline-flex; 
  align-items: center; 
  gap: 10px;
  background: #111; 
  padding: 13px 32px;
  color: #fff !important; 
  border-radius: 14px;
  text-decoration: none; 
  font-size: 17px;
  transition: .3s; 
  border: 1px solid #111;
  margin-top: 14px;

  &:hover { 
    background: #222; 
    transform: translateY(-1px);
  }
`;

/* LAYOUT */
const SectionTitle = styled.h2`
  font-size: 30px; 
  margin-top: 40px;
`;

const SectionIntro = styled.p`
  max-width: 760px; 
  font-size: 17px; 
  margin-bottom: 25px;
`;

const ActivitiesWrapper = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 26px;
  margin: 40px 0 60px;
`;

const ActivityCard = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 22px; 
  padding: 20px;
  border-radius: 16px;
  background: #fafafa;
  box-shadow: 0 10px 24px rgba(0,0,0,0.06);

  @media(max-width:768px){
    grid-template-columns:1fr;
  }
`;

const ActivityImage = styled.div`
  border-radius: 14px; 
  overflow: hidden; 
  min-height: 220px; 
  position:relative;

  img { 
    width:100%; 
    height:100%; 
    object-fit:cover; 
    transition:opacity .6s; 
  }
`;

const ActivityContent = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`;

const ActivityName = styled.h3`
  font-size:22px;
  margin-bottom:6px;
`;

const ActivityMeta = styled.p`
  font-size:15px;
  color:#555;
  margin-bottom:4px;
`;

const ActivityHighlight = styled.p`
  font-size:16px;
  margin-bottom:10px;
`;

const TagRow = styled.div`
  margin-bottom:12px;
`;

const Tag = styled.span`
  display:inline-block;
  background:#f1f1f1;
  padding:5px 10px;
  border-radius:999px;
  margin-right:6px;
  font-size:13px;
`;

const CardActions = styled.div`
  display:flex;
  gap:10px;
  flex-wrap:wrap; 
  margin-top:10px;
`;

/* PROMO BANNER INSIDE CARD */
const PromoBanner = styled.div`
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg,#0b5b33,#063e23);
  color: #fff;
  text-align: left;
`;

const PromoTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const PromoPriceLine = styled.div`
  font-size: 15px;
  margin-bottom: 4px;

  .old {
    text-decoration: line-through;
    opacity: 0.7;
    margin-right: 8px;
  }

  .new {
    font-weight: 700;
  }
`;

const PromoNote = styled.div`
  font-size: 13px;
  opacity: 0.95;
`;

/* WhatsApp helper */
const WHATSAPP_NUMBER = "27636746131";

const generateActivityWhatsAppLink = (activityName) => {
  const message = `Hello, I would like to book the ${activityName} for ___ people.\nPreferred date: _______`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const generateGeneralWhatsAppLink = (contextLabel) => {
  const message = `Hello, I would like help planning ${contextLabel} in Cape Town.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/* CHILD COMPONENT – FIXES HOOK ERROR */
const ActivityCardItem = ({ activity, index, onWhatsAppClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ActivityCard>
      <ActivityImage>
        {!loaded && <ShimmerBox />}
        <img
          src={activity.image}
          alt={activity.name}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
        />
      </ActivityImage>

      <ActivityContent>
        <div>
          <ActivityName>{index + 1}. {activity.name}</ActivityName>

          <ActivityMeta><strong>Area:</strong> {activity.area}</ActivityMeta>
          <ActivityMeta><strong>Type:</strong> {activity.type}</ActivityMeta>
          <ActivityMeta><strong>Duration:</strong> {activity.duration}</ActivityMeta>

          <ActivityHighlight>{activity.highlight}</ActivityHighlight>

          <TagRow>
            {activity.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </TagRow>

          {activity.promo && (
            <PromoBanner>
              <PromoTitle>{activity.promo.title}</PromoTitle>
              <PromoPriceLine>
                {activity.promo.oldPrice && (
                  <span className="old">{activity.promo.oldPrice}</span>
                )}
                <span className="new">{activity.promo.newPrice}</span>
              </PromoPriceLine>
              {activity.promo.note && <PromoNote>{activity.promo.note}</PromoNote>}
            </PromoBanner>
          )}
        </div>

        <CardActions>
          <WhatsAppButton
            href={generateActivityWhatsAppLink(activity.name)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => onWhatsAppClick(e, generateActivityWhatsAppLink(activity.name))}
          >
            <FaWhatsapp size={18} /> Ask About This Activity
          </WhatsAppButton>
        </CardActions>
      </ActivityContent>
    </ActivityCard>
  );
};

/* MAIN PAGE */
const TopActivitiesCapeTown = () => {

  // ✅ Paid-only conversion tracking helper
  const handleWhatsAppClick = (e, url) => {
    // stop default navigation, we will open ourselves
    if (e && e.preventDefault) e.preventDefault();

    // Use the global helper from index.html (fires conversion ONLY if gclid exists)
    if (window.WCT_trackWhatsAppConversionAndOpen) {
      return window.WCT_trackWhatsAppConversionAndOpen(url);
    }

    // fallback
    window.open(url, "_blank", "noopener,noreferrer");
    return false;
  };

  /* --- PAS COPYWRITING INTRO --- */
  const pasIntro = `
Cape Town has so many incredible activities that planning the perfect itinerary can feel overwhelming.
But choosing wrong means missing out on once-in-a-lifetime experiences.

That’s why we created this curated list — so you get the best of Cape Town without wasting a single day.
And with a private chauffeur, every activity becomes effortless, safe and stress-free.
`;

  const activities = [
    {
      name: "Table Mountain Cableway",
      area: "Table Mountain",
      type: "Scenic • Landmark",
      duration: "1–2 hours",
      highlight: "Ride the rotating cable car for 360° views.",
      tags: ["Bucket List", "Scenic"],
      image: cablecar
    },
    {
      name: "Cape Peninsula & Cape Point Tour",
      area: "Cape Peninsula",
      type: "Private Tour",
      duration: "8–10 hours",
      highlight: "Chapman's Peak, Cape Point & Boulders penguins.",
      tags: ["Scenic Drive", "Wildlife"],
      image: capepoint
    },
    {
      name: "Winelands Experience",
      area: "Stellenbosch & Franschhoek",
      type: "Wine Tasting",
      duration: "4–8 hours",
      highlight: "Premium tasting in world-class vineyards with a private driver.",
      tags: ["Wine", "Luxury", "Scenic Views"],
      image: winelands
    },
    {
      name: "Helicopter Flight Over Cape Town",
      area: "V&A Waterfront",
      type: "Scenic Flight",
      duration: "12–45 minutes",
      highlight: "See Cape Town’s mountains, beaches and city bowl from above.",
      tags: ["Luxury", "Aerial Views"],
      image: helicopter
    },
    {
      name: "Bo-Kaap Photoshoot",
      area: "Bo-Kaap",
      type: "Culture",
      duration: "1 hour",
      highlight: "Colorful houses & Cape Malay heritage with local storytelling.",
      tags: ["Culture", "Photography"],
      image: bokaap
    },
    {
      name: "Boulders Beach Penguins",
      area: "Simon's Town",
      type: "Wildlife",
      duration: "1 hour",
      highlight: "Visit the famous African penguins on a sheltered, picturesque beach.",
      tags: ["Family Friendly", "Beach", "Wildlife"],
      image: boulders
    },
    {
      name: "Big 5 Sunset Safari",
      area: "Game Reserve",
      type: "Safari",
      duration: "Full Afternoon & Evening",
      highlight: "Guided Big 5 sunset game drive with private return transport from Cape Town.",
      tags: ["Safari", "Wildlife", "Sunset"],
      image: aquila
    },
    {
      name: "Signal Hill Sunset",
      area: "City Bowl",
      type: "Viewpoint",
      duration: "2–3 hours",
      highlight: "Romantic sunset overlooking the Atlantic and city lights.",
      tags: ["Sunset", "Romantic"],
      image: hike
    },
    {
      name: "Chapman's Peak Sunset Drive",
      area: "Atlantic Coast",
      type: "Scenic Drive",
      duration: "2–4 hours",
      highlight: "One of the most beautiful coastal roads in the world, especially at sunset.",
      tags: ["Scenic", "Sunset", "Photography"],
      image: chapmans
    }
  ];

  /* SEO-OPTIMIZED FAQ */
  const faqs = [
    {
      title: "What are the must-do activities in Cape Town?",
      text: "The most essential experiences are Table Mountain, Cape Point, Chapman’s Peak, the Winelands, the penguins at Boulders Beach and a scenic helicopter flight. These offer a perfect mix of nature, scenery and culture."
    },
    {
      title: "Is a private chauffeur worth it?",
      text: "Absolutely. Cape Town’s attractions are spread far apart. A chauffeur removes the stress of driving, parking, unfamiliar roads and long travel days — letting you enjoy each experience fully."
    },
    {
      title: "How many days do I need in Cape Town?",
      text: "A perfect trip is 4–7 days. This gives enough time for the peninsula, Table Mountain, Winelands, a safari-style day trip and city attractions — without rushing."
    },
    {
      title: "Do I need to book in advance?",
      text: "Yes. Activities like helicopter flights, safari trips and Table Mountain can sell out quickly in high season (Dec–March). Booking early ensures the best times and weather windows."
    }
  ];

  /* JSON-LD SCHEMA FOR SEO */
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: { "@type": "Answer", text: f.text }
    }))
  };

  return (
    <div>
      <GlobalStyle />

      <Helmet>
        <title>Best Activities in Cape Town | Private Tours & Chauffeur</title>
        <meta
          name="description"
          content="Discover the best activities in Cape Town — Table Mountain, Cape Point, Winelands, Big 5 sunset safari and more — with private chauffeur service for a relaxed, luxury experience."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      {/* HERO */}
      <section style={{
        background: `url(${backgroundImage}) center/cover no-repeat`,
        height: "60vh"
      }}>
        <div className="overlay"></div>
      </section>

      <div className="themesflat-container">

        {/* PAS Intro */}
        <EmeraldBlock>
          <EmeraldTitle>Best Activities in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>
          <WhatsAppButton
            href={generateGeneralWhatsAppLink("the best activities and tours")}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleWhatsAppClick(e, generateGeneralWhatsAppLink("the best activities and tours"))}
          >
            <FaWhatsapp size={20} /> Plan My Itinerary
          </WhatsAppButton>
        </EmeraldBlock>

        <SectionTitle>Top Things To Do</SectionTitle>
        <SectionIntro>Luxury-curated activities with private chauffeur service for stress-free days.</SectionIntro>

        <ActivitiesWrapper>
          {activities.map((a, i) => (
            <ActivityCardItem
              key={a.name}
              activity={a}
              index={i}
              onWhatsAppClick={handleWhatsAppClick}
            />
          ))}
        </ActivitiesWrapper>

        {/* FAQ SECTION */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="flat-accordion2">
          {faqs.map((item, i) => (
            <Accordion key={i} title={item.title}>
              <p>{item.text}</p>
            </Accordion>
          ))}
        </div>

        <EmeraldBlock>
          <EmeraldTitle>Ready to Plan?</EmeraldTitle>
          <EmeraldSub>Tell us your dates & interests — we’ll build a Cape Town itinerary around you.</EmeraldSub>
          <WhatsAppButton
            href={generateGeneralWhatsAppLink("my Cape Town itinerary")}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleWhatsAppClick(e, generateGeneralWhatsAppLink("my Cape Town itinerary"))}
          >
            <FaWhatsapp size={20} /> Chat to Your Concierge
          </WhatsAppButton>
        </EmeraldBlock>

      </div>

      <Footer />
    </div>
  );
};

export default TopActivitiesCapeTown;