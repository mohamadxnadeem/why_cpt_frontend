import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Accordion } from "react-bootstrap-accordion";

import backgroundImage from "../assets/images/item-background/benz.jpg";
import { FaWhatsapp } from "react-icons/fa";

const TestimonialCarousel = React.lazy(() =>
  import("../components/TestimonialCarousel")
);
const Cars4Hire = React.lazy(() =>
  import("../components/Cars4hire")
);
const BudgetCars4Hire = React.lazy(() =>
  import("../components/BudgetCars")
);

/* GLOBAL TYPOGRAPHY */
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
  padding: 50px 45px;
  margin: 60px 0;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0,0,0,0.18);
`;

const EmeraldTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 19px;
  opacity: .95;
  margin-bottom: 26px;
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
  margin: 40px 0 20px;
`;

const HighlightText = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

const BulletList = styled.ul`
  list-style: none; padding: 0; margin-bottom: 35px;
  li {
    font-size: 18px;
    padding-left: 26px;
    margin: 10px 0;
    position: relative;
    &::before {
      content: "•";
      color: #d4af37;
      font-size: 24px;
      position: absolute; left: 0; top: -2px;
    }
  }
`;

/* FAQ STYLES — SAME AS ACTIVITIES PAGE */
const FAQSectionWrapper = styled.div`
  margin: 60px 0;
`;

const FAQAccordionWrapper = styled.div`
  .accordion {
    border: none !important;
  }
  .accordion-title {
    background: #f7f7f7 !important;
    padding: 18px 20px !important;
    font-weight: 600;
    border-radius: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    border: 1px solid #eee;
    transition: 0.3s ease;
  }
  .accordion-title:hover {
    background: #f0f0f0 !important;
  }
  .accordion-body {
    padding: 20px 22px !important;
    background: #fff;
    border-left: 3px solid #0b5b33;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.05);
    margin-top: -10px;
    margin-bottom: 18px;
    font-size: 16px;
    color: #444;
  }
`;

/* VEHICLE GUIDE */
const VehicleGuide = styled.div`
  background: linear-gradient(135deg, #0b5b33, #063e23);
  color: white;
  border-radius: 16px;
  padding: 40px 35px;
  margin: 60px 0;
`;

const VehicleGuideTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
`;

const GuideRow = styled.div`
  display: flex; justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.18);
  &:last-child { border-bottom: none; }
  span:first-child { opacity: 0.85; }
  span:last-child { font-weight: 600; }
`;

/* INCLUDED BOX */
const IncludedBox = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 32px;
  margin-bottom: 60px;
  border: 1px solid #e9e6df;
`;

const IncludedTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 16px;
`;

const IncludedList = styled.ul`
  list-style: none; padding: 0;
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
  /* FAQ CONTENT (SEO-RICH) */
  const faqs = [
    {
      title: "How much does a private chauffeur cost in Cape Town?",
      text: "Rates depend on the vehicle class and number of hours. Most travellers book 4–10 hours per day. Luxury vehicles like the Mercedes S-Class are naturally higher, while the Mercedes C-Class is ideal for couples. All bookings include fuel, insurance, unlimited stops and concierge support."
    },
    {
      title: "Is a private driver safer than renting a car?",
      text: "Yes. With a professional chauffeur, you avoid unfamiliar roads, strict speed zones, mountain passes, night driving and parking challenges. Your driver handles navigation, safety and timing — so you can relax completely."
    },
    {
      title: "Can my chauffeur help plan my itinerary?",
      text: "Absolutely. We assist with restaurant bookings, wine tastings, tour planning, timing each attraction and recommending the best scenic routes. Most travellers rely on us as their on-the-ground concierge."
    },
    {
      title: "What areas do you service?",
      text: "We cover the entire Cape: Cape Town, Camps Bay, Stellenbosch, Franschhoek, Hermanus, Cape Point, Constantia, Blouberg, Somerset West and more. Long-distance travel is also available."
    }
  ];

  /* JSON-LD SCHEMA */
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.text
      }
    }))
  };

  return (
    <div className="home-3">
      <GlobalStyle />
      
      <Helmet>
        <title>Luxury Chauffeur Hire & Private Driver Service | Cape Town</title>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      {/* HERO */}
      <section
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          height: "70vh",
        }}
      >
        <div className="overlay"></div>
      </section>

      <div className="themesflat-container">

        {/* CTA */}
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

        {/* GUIDE */}
        {/* <VehicleGuide>
          <VehicleGuideTitle>Which Vehicle Is Best for You?</VehicleGuideTitle>
          <GuideRow><span>VIP / CEO Transfer</span><span>Range Rover</span></GuideRow>
          <GuideRow><span>Executive</span><span>BMW 5 Series</span></GuideRow>
          <GuideRow><span>Solo / Couples</span><span>Audi A4</span></GuideRow>
          <GuideRow><span>3–6 Guests</span><span>Mercedes V-Class</span></GuideRow>
          <GuideRow><span>6–9 Guests</span><span>Hyundai Staria</span></GuideRow>
        </VehicleGuide> */}

        {/* Cars */}
        <Suspense fallback={<div style={{ height: 300 }} />}>
          <BudgetCars4Hire />
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

      

        {/* FAQ SECTION */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>

        <FAQSectionWrapper>
          <FAQAccordionWrapper>
            {faqs.map((f, i) => (
              <Accordion key={i} title={f.title}>
                <p>{f.text}</p>
              </Accordion>
            ))}
          </FAQAccordionWrapper>
        </FAQSectionWrapper>

        {/* CTA BOTTOM */}
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