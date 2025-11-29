import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import backgroundImage from "../assets/images/item-background/benz.jpg";

import delairgraff from "../assets/images/winefarms/graff.jpg";
import lanzarac from "../assets/images/winefarms/lanzarac.jpg";
import grootconstantia from "../assets/images/winefarms/groot.jpg";

import { FaWhatsapp } from "react-icons/fa";
import { Accordion } from "react-bootstrap-accordion";

/* GLOBAL STYLE */
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

/* SHIMMER EFFECT */
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const ShimmerBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f5f5f5 40px,
    #e0e0e0 80px
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s infinite linear;
  border-radius: 14px;
`;

/* Emerald CTA Block */
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
  transition: 0.3s;
  border: 1px solid #111;
  &:hover { background: #222; }
`;

const SecondaryButton = styled(WhatsAppButton)`
  background: transparent;
  border-color: #fff;
  margin-left: 10px;
  &:hover { background: rgba(255,255,255,0.08); }
`;

/* Content Section Titles */
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

/* Wine Farm Cards Layout */
const FarmsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin: 30px 0 60px;
`;

const FarmCard = styled.div`
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

const FarmImage = styled.div`
  border-radius: 14px;
  overflow: hidden;
  background: #ddd;
  min-height: 220px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.6s ease-in-out;
  }
`;

const FarmContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FarmName = styled.h3`
  font-size: 22px;
  margin-bottom: 6px;
`;

const FarmMeta = styled.p`
  font-size: 15px;
  margin-bottom: 6px;
  color: #555;
`;

const FarmHighlight = styled.p`
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

/* Child component – shimmer + image per farm */
const FarmCardItem = ({ farm, index }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <FarmCard>
      <FarmImage>
        {!loaded && <ShimmerBox />}
        <img
          src={farm.image}
          alt={farm.name}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
        />
      </FarmImage>

      <FarmContent>
        <div>
          <FarmName>
            {index + 1}. {farm.name}
          </FarmName>
          <FarmMeta>
            <strong>Area:</strong> {farm.area}
          </FarmMeta>
          <FarmMeta>
            <strong>Speciality:</strong> {farm.speciality}
          </FarmMeta>
          <FarmHighlight>{farm.highlight}</FarmHighlight>

          <TagRow>
            {farm.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagRow>
        </div>

        <CardActions>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
            <FaWhatsapp size={18} /> Book Chauffeur + Tastings
          </WhatsAppButton>

          <SecondaryButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
            Only Reserve Tastings
          </SecondaryButton>
        </CardActions>
      </FarmContent>
    </FarmCard>
  );
};

const TopWineFarmsCapeTown = () => {
  /* PAS-style intro */
  const pasIntro = `
Cape Town’s winelands are world famous – but with hundreds of estates to choose from, it’s easy to feel overwhelmed.
Pick randomly, and you might miss the truly unforgettable, luxury wine experiences.

We’ve handpicked three of the most iconic wine estates – Delaire Graff, Lanzerac and Groot Constantia –
so you can enjoy world-class wines, views and service in one seamless, chauffeur-driven day.
You simply sit back, sip and soak in the scenery while we handle timing, tastings and transport.
  `;

  // Only top 3 farms WITH images
  const farms = [
    {
      name: "Delaire Graff Estate",
      area: "Stellenbosch",
      speciality: "Luxury tasting • Iconic views",
      highlight:
        "Ultra-premium wines paired with breathtaking mountain views, art, and refined architecture. Known as one of Africa’s most luxurious wine estates.",
      tags: ["Luxury", "Fine Dining", "Art", "Mountain Views"],
      image: delairgraff,
    },
    {
      name: "Lanzerac Wine Estate",
      area: "Stellenbosch",
      speciality: "Heritage estate • Premium tastings",
      highlight:
        "An iconic 300-year-old estate offering world-class wines, elegant tasting rooms and a grand, historic hotel surrounded by vineyards.",
      tags: ["Heritage", "Historic", "Premium Wines"],
      image: lanzarac,
    },
    {
      name: "Groot Constantia",
      area: "Constantia",
      speciality: "Historic estate • Flagship reds",
      highlight:
        "The oldest wine farm in South Africa with award-winning reds, estate tours and beautiful walks under ancient oak trees.",
      tags: ["Heritage", "Red Wines", "Estate Tour"],
      image: grootconstantia,
    },
  ];

  /* SEO-optimised FAQs – option C (longer answers) */
  const faqs = [
    {
      title: "What makes these 3 wine farms the best choice for a luxury tasting day?",
      text: `
We specifically chose Delaire Graff, Lanzerac and Groot Constantia because together they give you the most complete luxury wine experience in one day.

• Delaire Graff offers ultra-premium wines, designer architecture, fine dining and some of the most dramatic mountain views in Stellenbosch.  
• Lanzerac brings old-world charm and heritage, with centuries of wine-making history and a beautiful estate atmosphere.  
• Groot Constantia connects you to the roots of South African wine, combining historic cellars, museum-style spaces and highly regarded reds.

Instead of visiting many average estates, you visit a few exceptional ones – with each stop offering something different in terms of scenery, history and style. It’s a curated route built for travellers who value quality over quantity.
      `,
    },
    {
      title: "Do I really need a private chauffeur for wine tasting in Cape Town?",
      text: `
Yes – if you want to relax fully and taste freely, a private chauffeur is one of the best decisions you can make for a wine day.

Most top estates are a 30–60 minute drive from Cape Town and often spread far apart. That means navigating unfamiliar roads, judging your tastings carefully and worrying about driving back after a full day.

With a chauffeur:

• You never have to limit your tastings because of driving.  
• Timing between estates is professionally managed, so you’re never rushed.  
• You arrive and depart at the estate entrance – no searching for parking or walking long distances.  
• Your vehicle is reserved just for you, with space for wine purchases and luggage if needed.

It turns a normal “wine tour” into a smooth, VIP-style experience where safety, comfort and discretion are all taken care of.
      `,
    },
    {
      title: "How long do I need to properly enjoy these 3 wine farms?",
      text: `
For a relaxed luxury experience, we recommend planning a full day – around 7 to 9 hours from pickup to drop-off.

A typical flow might look like this:

• Late morning tasting at Groot Constantia or Lanzerac  
• Estate walk or short cellar / heritage tour  
• Leisurely lunch at one of the estates or a nearby restaurant  
• Afternoon tasting and time to enjoy the views, art or photo moments at Delaire Graff  

Your exact timing depends on your pace: some guests love slow, unhurried tastings; others prefer to see more in less time. When you message us, we’ll suggest a schedule that matches your energy and style.
      `,
    },
    {
      title: "Can you customise the wine tour for couples, families or small groups?",
      text: `
Absolutely. Every wine experience we arrange is customised.

• Couples often prefer a slower, more intimate route with fewer stops and more time at each estate – ideal for anniversaries, honeymoons or proposals.  
• Friends and small groups might prefer a slightly more social day with a mix of iconic estates and relaxed lunch spots.  
• Families can choose estates with open lawns, walking areas and more space for kids to move around while adults enjoy tastings.

We can also adapt the day around dietary requirements, mobility considerations and your starting location (Cape Town, Stellenbosch, Franschhoek or surrounds). The goal is always the same: an effortless, beautifully paced day that feels tailored to you.
      `,
    },
    {
      title: "When is the best time of year to go wine tasting near Cape Town?",
      text: `
Cape Town’s winelands are beautiful all year, but your ideal season depends on the experience you’re after.

• Summer (November–March): Warm, long days, green vineyards and outdoor seating – perfect for photos and late afternoon tastings. It’s also the busiest season, so advance bookings are essential.  
• Autumn (April–May): Slightly cooler with golden vineyard colours – very scenic and less crowded than peak season.  
• Winter (June–August): Cosy firesides, red wine tastings and quieter estates. This can be a romantic time to visit, especially for those who prefer calm over crowds.  
• Spring (September–October): Fresh, bright landscapes as vineyards come back to life – a lovely in-between season.

Whatever time you’re visiting, we’ll help choose the best estates and time slots for weather, light and overall experience.
      `,
    },
  ];

  /* JSON-LD Schema for FAQ SEO */
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
          Top 3 Wine Tasting Experiences in Cape Town | Luxury Wine Tours & Chauffeur
        </title>
        <meta
          name="description"
          content="Discover Cape Town's top 3 luxury wine tasting experiences at Delaire Graff, Lanzerac and Groot Constantia. Chauffeur-driven wine tours with curated routes and VIP service."
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
        {/* PAS intro in Emerald block */}
        <EmeraldBlock>
          <EmeraldTitle>Top 3 Wine Tasting Experiences in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
            <FaWhatsapp size={20} /> Plan My Wine Day
          </WhatsAppButton>
        </EmeraldBlock>

        {/* INTRO */}
        <SectionTitle>Best Wine Tasting Spots</SectionTitle>
        <SectionIntro>
          These three estates offer the best combination of luxury, scenery,
          wine quality and guest experience. When you contact us, we’ll recommend
          the ideal order, book your tastings and arrange{" "}
          <strong>chauffeur-driven transport</strong> so you never need to drive.
        </SectionIntro>

        {/* FARMS LIST WITH SHIMMER */}
        <FarmsWrapper>
          {farms.map((farm, index) => (
            <FarmCardItem key={farm.name} farm={farm} index={index} />
          ))}
        </FarmsWrapper>

        {/* FAQ SECTION – same styling as activities page */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="flat-accordion2">
          {faqs.map((item, i) => (
            <Accordion key={i} title={item.title}>
              <p style={{ fontSize: "16px", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {item.text}
              </p>
            </Accordion>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Ready to Plan Your Wine Experience?</EmeraldTitle>
          <EmeraldSub>
            Tell us your dates, where you’re staying and the type of wines you
            love. We’ll recommend the perfect route and handle all tastings and
            transport for a truly relaxed, luxury wine day.
          </EmeraldSub>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
            <FaWhatsapp size={20} /> Chat with Your Concierge
          </WhatsAppButton>
        </EmeraldBlock>
      </div>

      <Footer />
    </div>
  );
};

export default TopWineFarmsCapeTown;