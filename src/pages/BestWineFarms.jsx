import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import backgroundImage from "../assets/images/item-background/benz.jpg";

import delairgraff from "../assets/images/winefarms/graff.jpg";
import lanzarac from "../assets/images/winefarms/lanzarac.jpg";
import grootconstantia from "../assets/images/winefarms/groot.jpg";
import boschendal from "../assets/images/activities/winelands.JPG";      // ✅ add your actual path
import winetram from "../assets/images/winefarms/winetram.jpg";          // ✅ add your actual path

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

/* Wine Experience Cards Layout */
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
            <strong>Experience type:</strong> {farm.speciality}
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
            Only Reserve Experience
          </SecondaryButton>
        </CardActions>
      </FarmContent>
    </FarmCard>
  );
};

const TopWineFarmsCapeTown = () => {
  /* PAS-style intro */
  const pasIntro = `
Cape Town’s winelands are world famous – but with hundreds of estates and tours to choose from, it’s easy to feel overwhelmed.
Pick randomly, and you might miss the truly unforgettable, luxury wine experiences.

We’ve handpicked five of the most iconic wine experiences – Delaire Graff, Lanzerac, Groot Constantia, Boschendal and the Franschhoek Wine Tram –
so you can enjoy world-class wines, scenery and service in one or two perfectly curated, chauffeur-driven days.
You simply sit back, sip and soak in the views while we handle timing, tastings, tickets and transport.
  `;

  // ⭐ Top 5 wine experiences WITH images
  const farms = [

     {
      name: "Franschhoek Wine Tram Experience",
      area: "Franschhoek",
      speciality: "Hop-on hop-off wine tram • Multiple estates",
      highlight:
        "Ride the famous Franschhoek Wine Tram through vineyards and charming villages, hopping off at various estates for tastings – ideal for guests who love variety and a playful, scenic day out.",
      tags: ["Wine Tram", "Scenic Route", "Multiple Estates"],
      image: winetram,
    },
    {
      name: "Boschendal Wine Farm",
      area: "Franschhoek / Simondium",
      speciality: "Farm-style estate • Picnics & tastings",
      highlight:
        "A picture-perfect Cape Dutch farm offering relaxed lawn picnics, family-friendly spaces, markets, cottages and versatile wine tastings surrounded by mountains.",
      tags: ["Family Friendly", "Picnics", "Historic Farm"],
      image: boschendal,
    },
    {
      name: "Delaire Graff Estate",
      area: "Stellenbosch",
      speciality: "Luxury wine estate • Iconic views",
      highlight:
        "Ultra-premium wines paired with breathtaking mountain views, sculpted gardens, fine dining and a world-class art collection. Often called the ‘jewel of the Cape Winelands’.",
      tags: ["Luxury", "Fine Dining", "Art", "Mountain Views"],
      image: delairgraff,
    },
    {
      name: "Lanzerac Wine Estate",
      area: "Stellenbosch",
      speciality: "Heritage estate • Premium tastings",
      highlight:
        "An iconic 300-year-old estate offering elegant tasting rooms, historic charm and a grand hotel atmosphere surrounded by vineyards and oak-lined driveways.",
      tags: ["Heritage", "Historic", "Premium Wines"],
      image: lanzarac,
    },
    {
      name: "Groot Constantia",
      area: "Constantia",
      speciality: "Historic estate • Flagship reds",
      highlight:
        "The oldest wine farm in South Africa with award-winning reds, cellar tours, museums and beautiful walking paths under ancient oak trees in the Constantia valley.",
      tags: ["Heritage", "Red Wines", "Estate Tour"],
      image: grootconstantia,
    },
    
   
  ];

  /* SEO-optimised FAQs – option C (longer answers) */
  const faqs = [
    {
      title: "What makes these 5 wine experiences the best choice for a luxury wine day near Cape Town?",
      text: `
We specifically chose Delaire Graff, Lanzerac, Groot Constantia, Boschendal and the Franschhoek Wine Tram because together they give you the most complete luxury wine experience in and around Cape Town.

• Delaire Graff offers ultra-premium wines, designer architecture, fine dining and some of the most dramatic mountain views in Stellenbosch.  
• Lanzerac brings old-world charm and heritage, with centuries of winemaking history and a beautifully preserved estate atmosphere.  
• Groot Constantia connects you to the roots of South African wine, combining historic cellars, museum-style exhibits and highly regarded reds.  
• Boschendal delivers a relaxed, farm-style experience with picnics, lawns, markets and family-friendly spaces set against a dramatic mountain backdrop.  
• The Franschhoek Wine Tram adds a fun, iconic way to move between multiple estates without driving – a scenic, social experience that many guests describe as a highlight of their trip.

Instead of visiting many average estates, you focus on a handful of truly exceptional experiences – each offering something different in terms of history, style, atmosphere and scenery. It’s a curated route designed for travellers who value quality over quantity.
      `,
    },
    {
      title: "Do I really need a private chauffeur for wine tasting and the wine tram?",
      text: `
If you want to relax fully and taste freely, a private chauffeur is one of the best decisions you can make for your wine day – even if you’re using the Franschhoek Wine Tram for part of the experience.

Most top estates are a 30–60 minute drive from Cape Town and often spread far apart. That means navigating unfamiliar roads, planning your route and limiting how much you drink if you’re driving yourself.

With a chauffeur:

• You don’t need to worry about driving after tastings or a long day out.  
• Timing between estates, the tram terminal and lunch stops is carefully managed, so you’re never rushed.  
• You’re dropped directly at entrances and collections – no parking stress or long walks.  
• The vehicle is reserved just for you, with space for wine purchases, bags and jackets.  

It turns a normal “wine tour” into a true VIP experience where safety, comfort and logistics are handled for you – so you can simply enjoy.
      `,
    },
    {
      title: "How long do I need to properly enjoy these wine experiences?",
      text: `
For a relaxed luxury experience, we recommend planning a full day – around 7 to 9 hours from pickup to drop-off. If you’d like to combine more estates or spend time both in Stellenbosch and Franschhoek, you can also stretch this into two separate wine days.

A typical full-day flow might look like:

• Morning pickup from your accommodation in Cape Town, Stellenbosch or Franschhoek  
• First tasting at Groot Constantia or Lanzerac, with time for an estate walk or short tour  
• Leisurely lunch at one of the estates or a recommended restaurant nearby  
• Afternoon visit to Delaire Graff for views, photos and a final premium tasting  
• Optional: a second day combining Boschendal and the Franschhoek Wine Tram for a more relaxed, multi-estate experience  

Your exact schedule depends on your pace, the season and how many stops you’d like to include. When you message us, we’ll help design the timing so it feels smooth, not rushed.
      `,
    },
    {
      title: "Can you customise these wine tours for couples, families or small groups?",
      text: `
Absolutely. Every wine experience we arrange is customised around who you are travelling with and how you like to spend your day.

• Couples often prefer a slower, more intimate route with fewer stops and more time at each estate – ideal for anniversaries, proposals or honeymoons.  
• Friends and small groups may prefer a more social day with the Franschhoek Wine Tram included, combining multiple estates, photo moments and a relaxed, festive energy.  
• Families can focus on estates like Boschendal and Groot Constantia that offer open spaces, lawns, picnics and areas for kids to move around while adults enjoy tastings.  

We also adapt the day around dietary preferences, mobility needs, where you’re staying and whether you’d like a photographer, special occasion setup or restaurant reservations built into your route.
      `,
    },
    {
      title: "When is the best time of year to book wine tasting near Cape Town?",
      text: `
The winelands are beautiful all year, but the best season depends on the type of experience you want.

• Summer (November–March): Warm, long days, green vineyards and lots of outdoor seating. This is peak season, perfect for photos and sunset views, but estates and trams can book out early – so advance reservations are essential.  
• Autumn (April–May): Slightly cooler with golden vineyard colours, softer light and fewer crowds. A fantastic time for guests who love photography and a calmer atmosphere.  
• Winter (June–August): Cosy fireplaces, red wine tastings and quieter estates. This is a romantic, slow-travel season with great value and fewer visitors.  
• Spring (September–October): Fresh, bright landscapes as vines come back to life, blossoms return and temperatures rise – an ideal “in-between” season.  

Whenever you’re visiting, we’ll help you choose the right mix of estates, timeslots and routes based on weather, opening hours and your travel dates.
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
          Top 5 Wine Tasting Experiences in Cape Town | Luxury Wine Tours & Chauffeur
        </title>
        <meta
          name="description"
          content="Discover Cape Town's top 5 luxury wine tasting experiences at Delaire Graff, Lanzerac, Groot Constantia, Boschendal and on the Franschhoek Wine Tram. Chauffeur-driven wine tours with curated routes and VIP service."
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
          <EmeraldTitle>Top 5 Wine Tasting Experiences in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
            <FaWhatsapp size={20} /> Plan My Wine Day
          </WhatsAppButton>
        </EmeraldBlock>

        {/* INTRO */}
        <SectionTitle>Best Wine Tasting Experiences</SectionTitle>
        <SectionIntro>
          These five experiences offer an incredible mix of luxury estates,
          historic farms, family-friendly spaces and a bucket-list wine tram
          journey. When you contact us, we’ll recommend the ideal combination,
          book your tastings and arrange{" "}
          <strong>chauffeur-driven transport</strong> so you never need to drive.
        </SectionIntro>

        {/* EXPERIENCES LIST WITH SHIMMER */}
        <FarmsWrapper>
          {farms.map((farm, index) => (
            <FarmCardItem key={farm.name} farm={farm} index={index} />
          ))}
        </FarmsWrapper>

        {/* FAQ SECTION – same styling approach as activities page */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="flat-accordion2">
          {faqs.map((item, i) => (
            <Accordion key={i} title={item.title}>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {item.text}
              </p>
            </Accordion>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Ready to Plan Your Cape Town Wine Experience?</EmeraldTitle>
          <EmeraldSub>
            Tell us your dates, where you’re staying and the type of wines and
            atmosphere you love. We’ll recommend the perfect combination of
            estates and the wine tram, then handle all tastings and transport
            for a truly relaxed, luxury wine day.
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