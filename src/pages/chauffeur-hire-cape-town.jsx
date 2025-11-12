import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import backgroundImage from "../assets/images/item-background/benz.jpg";
import { FaWhatsapp } from "react-icons/fa";

const TestimonialCarousel = React.lazy(() =>
  import("../components/TestimonialCarousel")
);
const Cars4Hire = React.lazy(() => import("../components/Cars4hire"));

const BudgetCars4Hire = React.lazy(() => import("../components/BudgetCars"));


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

/* ✅ Shared Emerald CTA Style */
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 18px;
  padding: 50px 45px;
  margin: 60px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0,0,0,0.18);
`;

const EmeraldTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 19px;
  opacity: 0.95;
  margin-bottom: 28px;
  color: #fff;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #111;
  padding: 15px 42px;
  color: #fff !important;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  font-size: 19px;
  transition: 0.3s ease;
  &:hover { background: #222; }
`;

const SectionTitle = styled.h2`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 22px;
`;



const HighlightText = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 35px;
  li {
    font-size: 18px;
    padding-left: 26px;
    margin: 10px 0;
    position: relative;
    &::before {
      content: "•";
      color: #d4af37;
      font-size: 24px;
      position: absolute;
      left: 0;
      top: -2px;
    }
  }
`;

/* ✅ Vehicle Guide Block */
const VehicleGuide = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 16px;
  padding: 40px 35px;
  margin: 60px 0;
`;

const VehicleGuideTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  margin-bottom: 22px;
  color: white; /* ✅ FIXED */
`;

const GuideRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.18);
  &:last-child { border-bottom: none; }
  span:first-child { font-size: 18px; opacity: 0.9; }
  span:last-child { font-size: 18px; font-weight: 600; }
`;

/* ✅ What's Included */
const IncludedBox = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 32px;
  margin-bottom: 60px;
  border: 1px solid #e9e6df;
`;

const IncludedTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 16px;
  color: #111;
`;

const IncludedList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    font-size: 17px;
    margin: 10px 0;
    padding-left: 28px;
    position: relative;
    &::before {
      content: "✓";
      color: #0b5b33;
      font-weight: 700;
      position: absolute;
      left: 0;
    }
  }
`;

const AirportTransfers = () => {
  return (
    <div className="home-3">
      <GlobalStyle />
      <Helmet>
        <title>Luxury Chauffeur Hire & Private Driver Service | Cape Town</title>
      </Helmet>
      <Header />

      {/* ✅ Clean Hero */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          height: "70vh",
        }}
      >
        <div className="overlay"></div>
      </section>

      <div className="themesflat-container">

        {/* ✅ HERO CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Private Chauffeur Service in Cape Town</EmeraldTitle>
          <EmeraldSub>Your Time. Your Pace. Your Private Driver.</EmeraldSub>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank">
            <FaWhatsapp size={22} /> Chat on WhatsApp
          </WhatsAppButton>
        </EmeraldBlock>

        <SectionTitle>
          Why Travelers Choose <HighlightText>Us</HighlightText>
        </SectionTitle>

        <BulletList>
          <li>Professional, discreet & highly experienced drivers</li>
          <li>Luxury vehicles detailed & sanitized daily</li>
          <li>Smooth, relaxed driving — no rushing</li>
          <li>Restaurant & itinerary planning included</li>
          <li>Photography assistance available</li>
        </BulletList>

        <Suspense fallback={<div style={{ height: 300 }} />}>
          <TestimonialCarousel />
        </Suspense>

        <VehicleGuide>
          <VehicleGuideTitle>Which Vehicle Is Best for You?</VehicleGuideTitle>
          <GuideRow><span>VIP / CEO Transfer</span><span>Mercedes S-Class </span></GuideRow>
          <GuideRow><span>Executive</span><span>Mercedes E-Class </span></GuideRow>
          <GuideRow><span>Solo / Couples</span><span>Mercedes C-Class</span></GuideRow>
          <GuideRow><span>3–6 Guests</span><span>Mercedes V-Class</span></GuideRow>
          <GuideRow><span>6–9 Guests</span><span>Hyundai Staria</span></GuideRow>
        </VehicleGuide>

        

        <Suspense fallback={<div style={{ height: 300 }} />}>
          <Cars4Hire />
        </Suspense>

        <IncludedBox>
          <IncludedTitle>Your Chauffeur Service Includes:</IncludedTitle>
          <IncludedList>
            <li>Professional private driver</li>
            <li>Fuel, tolls & insurance included</li>
            <li>Unlimited stops within booked hours</li>
            <li>Vehicle cleaned before every journey</li>
            <li>Concierge support & reservations</li>
          </IncludedList>
        </IncludedBox>

        <Suspense fallback={<div style={{ height: 300 }} />}>
          <BudgetCars4Hire />
        </Suspense>

        {/* ✅ BOTTOM CTA */}
        <EmeraldBlock>
          <EmeraldTitle>Ready to Reserve Your Chauffeur?</EmeraldTitle>
          <EmeraldSub>Availability is limited — especially weekends & travel season.</EmeraldSub>
          <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank">
            <FaWhatsapp size={22} /> Check Availability Now
          </WhatsAppButton>
        </EmeraldBlock>

      </div>

      <Footer />
    </div>
  );
};

export default AirportTransfers;