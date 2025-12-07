import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import backgroundImage from "../assets/images/item-background/benz.jpg";

import delairgraff from "../assets/images/winefarms/graff.jpg";
import lanzarac from "../assets/images/winefarms/lanzarac.jpg";
import grootconstantia from "../assets/images/winefarms/groot.jpg";
import boschendal from "../assets/images/activities/winelands.JPG";
import winetram from "../assets/images/winefarms/winetram.jpg";

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
  background: linear-gradient(90deg, #e0e0e0 0px, #f5f5f5 40px, #e0e0e0 80px);
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s infinite linear;
  border-radius: 14px;
`;

/* EMERALD BLOCK — ALWAYS WHITE TEXT */
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: #fff;
  border-radius: 18px;
  padding: 40px 32px;
  margin: 40px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0,0,0,0.18);

  h2, p, span { color: #fff !important; }
`;

const OfferBlock = styled(EmeraldBlock)`
  position: relative;
`;

const StickyOffer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #0b5b33, #063e23);
  padding: 18px 26px;
  border-radius: 16px;
  color: white;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  gap: 14px;
  align-items: center;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  z-index: 999;
`;

const OfferPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  span {
    text-decoration: line-through;
    opacity: 0.6;
    margin-right: 8px;
    color: #fff;
  }
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
  &:hover { background: rgba(255,255,255,0.08); }
`;

/* TITLES */
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

/* EXPERIENCES */
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
  gap: 10px;
`;

/* Dynamic WhatsApp Link */
const generateWhatsAppLink = (experienceName) => {
  const message = `Hi! I'm interested in the ${experienceName}. Can you assist with availability?`;
  return `https://wa.link/rsupjp?text=${encodeURIComponent(message)}`;
};

/* CTA Conversion Event */
const fireConversion = (label) => {
  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-CONVERSION-ID",
      event_label: label,
    });
  }
  if (window.fbq) {
    window.fbq("track", "Lead", { value: 1, currency: "ZAR", label });
  }
};

/* EXPERIENCE ITEM */
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
          <FarmName>{index + 1}. {farm.name}</FarmName>
          <FarmMeta><strong>Area:</strong> {farm.area}</FarmMeta>
          <FarmMeta><strong>Experience type:</strong> {farm.speciality}</FarmMeta>
          <FarmHighlight>{farm.highlight}</FarmHighlight>

          <TagRow>
            {farm.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </TagRow>
        </div>

        <CardActions>
          <WhatsAppButton
            href={generateWhatsAppLink(farm.name)}
            target="_blank"
            onClick={() => fireConversion(`Book Chauffeur + ${farm.name}`)}
          >
            <FaWhatsapp size={18} /> Book Chauffeur + Tastings
          </WhatsAppButton>

          <SecondaryButton
            href={generateWhatsAppLink(`${farm.name} Experience Only`)}
            target="_blank"
            onClick={() => fireConversion(`Reserve Only ${farm.name}`)}
          >
            Only Reserve Experience
          </SecondaryButton>
        </CardActions>
      </FarmContent>
    </FarmCard>
  );
};

const TopWineFarmsCapeTown = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSticky(true), 4500);
    const onScroll = () => window.scrollY > 600 && setShowSticky(true);

    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pasIntro = `
Cape Town’s winelands are world famous – but with hundreds of estates to choose from, it can be overwhelming.
We curated the top 5 must-experience wine adventures so you enjoy luxury tastings, scenery and VIP chauffeur service effortlessly.
  `;

  const farms = [
    {
      name: "Franschhoek Wine Tram Experience",
      area: "Franschhoek",
      speciality: "Hop-on hop-off tram • Multiple estates",
      highlight: "Explore multiple vineyards on the iconic Franschhoek Wine Tram.",
      tags: ["Wine Tram", "Multiple Estates", "Scenic Route"],
      image: winetram,
    },
    {
      name: "Boschendal Wine Farm",
      area: "Franschhoek / Simondium",
      speciality: "Farm-style picnics • Family friendly",
      highlight: "Heritage lawns, mountain views and relaxed outdoor tastings.",
      tags: ["Picnics", "Family Friendly", "Heritage"],
      image: boschendal,
    },
    {
      name: "Delaire Graff Estate",
      area: "Stellenbosch",
      speciality: "Luxury estate • Fine dining",
      highlight: "Ultra-premium wines, curated art and breathtaking views.",
      tags: ["Luxury", "Art", "Fine Dining"],
      image: delairgraff,
    },
    {
      name: "Lanzerac Wine Estate",
      area: "Stellenbosch",
      speciality: "Heritage estate • Premium tastings",
      highlight: "Historic 300-year-old estate with elegant tasting rooms.",
      tags: ["Historic", "Premium Wines"],
      image: lanzarac,
    },
    {
      name: "Groot Constantia",
      area: "Constantia",
      speciality: "Oldest wine farm • Red wines",
      highlight: "Historic cellar tours and award-winning reds.",
      tags: ["Heritage", "Red Wines"],
      image: grootconstantia,
    },
  ];

  /* FULL SEO FAQS (kept short here for ChatGPT limit but structured correctly) */
  const faqs = [
    {
      title: "Why are these the top 5 wine experiences in Cape Town?",
      text: "These experiences offer the best combination of scenery, wine quality, history and luxury service…",
    },
    {
      title: "Do I need a private chauffeur for wine tasting?",
      text: "A chauffeur provides safety, comfort, no driving stress and perfect timing between estates…",
    },
    {
      title: "How long do I need for a wine tour?",
      text: "A full 7–9 hour day is ideal to enjoy tastings, lunch and scenic stops without rushing…",
    },
    {
      title: "Can the tour be customised?",
      text: "Yes — for couples, families, groups and special occasions…",
    },
    {
      title: "When is the best time of year to visit?",
      text: "Summer offers green vineyards; winter offers cosy firesides; spring offers blossoms…",
    },
  ];

  /* FAQ Schema */
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
    <div className="home-3">
      <GlobalStyle />

      <Helmet>
        <title>Top 5 Wine Tasting Experiences in Cape Town | Chauffeur & Luxury Wine Tours</title>
        <meta name="description" content="Discover Cape Town's top wine experiences including Delaire Graff, Boschendal, Wine Tram and more. Chauffeur-driven wine tours." />
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

        {/* INTRO BLOCK */}
        <EmeraldBlock>
          <EmeraldTitle>Top 5 Wine Tasting Experiences in Cape Town</EmeraldTitle>
          <EmeraldSub>{pasIntro}</EmeraldSub>

          <WhatsAppButton
            href={generateWhatsAppLink("Cape Town Wine Experiences")}
            target="_blank"
            onClick={() => fireConversion("Plan My Wine Day CTA")}
          >
            <FaWhatsapp size={20} /> Plan My Wine Day
          </WhatsAppButton>
        </EmeraldBlock>

        {/* OFFER BLOCK */}
        <OfferBlock>
          <EmeraldTitle>Limited-Time Chauffeur Offer</EmeraldTitle>
          <EmeraldSub>Book your luxury private driver for the winelands today.</EmeraldSub>

          <OfferPrice>
            <span>R5500</span> Now Only <strong>R3500</strong>
          </OfferPrice>

          <WhatsAppButton
            href={generateWhatsAppLink("R3500 Chauffeur Offer")}
            target="_blank"
            onClick={() => fireConversion("Chauffeur Offer CTA")}
          >
            <FaWhatsapp size={18} /> Claim Offer
          </WhatsAppButton>
        </OfferBlock>

        {/* EXPERIENCES */}
        <SectionTitle>Best Wine Experiences</SectionTitle>
        <SectionIntro>
          Choose from luxury estates, relaxed farm-style tastings, heritage vineyards or the iconic Franschhoek Wine Tram.
        </SectionIntro>

        <FarmsWrapper>
          {farms.map((farm, index) => (
            <FarmCardItem key={farm.name} farm={farm} index={index} />
          ))}
        </FarmsWrapper>

        {/* FAQ SECTION */}
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

        {/* STICKY OFFER CTA */}
        <StickyOffer visible={showSticky}>
          <OfferPrice>
            <span>R5500</span> R3500 Chauffeur Offer
          </OfferPrice>

          <WhatsAppButton
            href={generateWhatsAppLink("R3500 Chauffeur Offer")}
            target="_blank"
            onClick={() => fireConversion("Sticky Offer CTA")}
          >
            <FaWhatsapp size={18} /> Book Now
          </WhatsAppButton>
        </StickyOffer>

        <Footer />
      </div>
    </div>
  );
};

export default TopWineFarmsCapeTown;