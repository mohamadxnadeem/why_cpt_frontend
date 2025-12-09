import React, { useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import emailjs from "emailjs-com";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import backgroundImage from "../assets/images/item-background/benz.jpg";
import CTASection from "../components/CTASection";
import { Accordion } from "react-bootstrap-accordion";

// Lazy-loaded components
const TestimonialCarousel = React.lazy(() =>
  import("../components/TestimonialCarousel")
);
const ToursList = React.lazy(() => import("../components/Tours"));

/* ---------------- Global Page Fonts ---------------- */
const GlobalStyle = createGlobalStyle`
  body { 
    font-family: 'Poppins', sans-serif; 
    background: #fff;
    color: #222;
    line-height: 1.75;
  }
  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: #111;
  }
`;

/* ---------------- Styled Components ---------------- */
const SectionTitle = styled.h2`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 18px;
`;

const Highlight = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 35px;

  li {
    font-size: 17px;
    margin: 12px 0;
    padding-left: 28px;
    position: relative;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      top: -2px;
      font-size: 24px;
      color: #d4af37;
    }
  }
`;

const ShimmerBox = styled.div`
  width: 100%;
  height: ${(p) => p.height || "260px"};
  border-radius: 10px;
  background: linear-gradient(90deg, #f5f5f5, #ececec, #f5f5f5);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  margin: 25px 0;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

/* ---------- Hero content overlay ---------- */
const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  padding: 90px 0 40px;
`;

const HeroContent = styled.div`
  max-width: 780px;
  color: #fff;
`;

const HeroHeading = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 14px;
  color: #fff;
`;

const HeroSub = styled.p`
  font-size: 18px;
  max-width: 640px;
  margin-bottom: 16px;
  color: #f7f7f7;
`;

const HeroList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;

  li {
    font-size: 16px;
    margin: 5px 0;
  }
`;

/* ---------- FAQ section ---------- */
const FAQWrapper = styled.div`
  margin: 50px 0 70px;
`;

/* ---------------- Component ---------------- */
const PrivateToursCapeTown = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tourDate: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setFormError("Please enter a valid email address.");
    setFormError("");

    emailjs
      .send("service_ptqtluk", "template_uyicl9l", formData, "apNJP_9sXnff2q82W")
      .then(() => setFormSubmitted(true));
  };

  /* --- SEO-optimised FAQs for "private tours Cape Town" --- */
  const faqs = [
    {
      title: "What is included in a private tour in Cape Town?",
      text:
        "Our private tours in Cape Town typically include a professional driver-guide, hotel or villa pickup and drop-off, a fully licensed vehicle, curated routes and basic itinerary planning. Entrance fees, meals and optional activities can be added based on the private tour you choose."
    },
    {
      title: "Why choose a private tour instead of a group tour?",
      text:
        "A private tour in Cape Town runs completely on your schedule. You decide when to stop for photos, how long to spend at each attraction and which places matter most to you. There is no rushing, no fixed timetable and no sharing the vehicle with strangers — just a relaxed, tailored experience."
    },
    {
      title: "How long is a typical private day tour in Cape Town?",
      text:
        "Most full-day private tours in Cape Town run for about 8 to 10 hours. This gives enough time for highlights like the Cape Peninsula, Cape Point, Boulders Beach penguins, the Winelands or a combination of coastal and city attractions, without feeling rushed."
    },
    {
      title: "Can I customise my private tour itinerary?",
      text:
        "Yes. Every private tour can be customised around your interests — from photography stops and hidden beaches to specific restaurants, coffee shops, wine farms or neighbourhoods. You can also combine multiple areas like the Cape Peninsula and Winelands over two or more days."
    },
    {
      title: "Do your private tours include a private driver and vehicle?",
      text:
        "All our Cape Town private tours are chauffeur-driven. That means you enjoy a dedicated vehicle and private driver for the duration of your tour. This is ideal for couples, families, small groups and travellers who prefer comfort, safety and convenience over self-driving."
    }
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
    <div className="tours-page">
      <GlobalStyle />

      <Helmet>
        <title>
          Private Tours Cape Town | Chauffeur-Driven Private Day Trips & Experiences
        </title>
        <meta
          name="description"
          content="Book premium private tours in Cape Town with a dedicated driver-guide. Cape Peninsula, Winelands, safari day trips and tailor-made private tours with hotel pickup."
        />
        <meta
          name="keywords"
          content="private tours Cape Town, Cape Town private tours, private tour guide Cape Town, private day trips Cape Town, Cape Peninsula private tour, Cape Town private wine tour"
        />
        <link
          rel="canonical"
          href="https://www.whycapetown.com/private-tours-cape-town"
        />
        <meta
          property="og:title"
          content="Private Tours in Cape Town | Chauffeur-Driven Day Trips"
        />
        <meta
          property="og:description"
          content="Discover Cape Town with a private driver-guide. Customised private tours including Cape Peninsula, Winelands and safari day trips."
        />
        <meta
          property="og:image"
          content="https://www.whycapetown.com/og/private-tours-cape-town.jpg"
        />
        <meta
          property="og:url"
          content="https://www.whycapetown.com/private-tours-cape-town"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* FAQ schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />

      {/* HERO - CLEAN & PREMIUM WITH H1 */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          padding: "140px 0 60px",
          position: "relative",
        }}
      >
        <div className="overlay"></div>

        <div className="themesflat-container">
          <HeroInner>
            <HeroContent>
              <HeroHeading>Private Tours in Cape Town</HeroHeading>
              <HeroSub>
                Chauffeur-driven private tours and day trips across Cape Town,
                the Cape Peninsula and Winelands — designed around your pace,
                interests and travel style.
              </HeroSub>
              <HeroList>
                <li>✓ Private driver & vehicle just for your group</li>
                <li>✓ Custom routes: Cape Peninsula, Winelands, safari & more</li>
                <li>✓ Ideal for couples, families & small groups</li>
              </HeroList>
            </HeroContent>
          </HeroInner>
        </div>
      </section>

      <div className="tf-section post-details">
        <div className="themesflat-container">
          <SectionTitle>
            Private Tours Curated with <Highlight>Heart & Detail</Highlight>
          </SectionTitle>

          <Paragraph>
            Whether you're here to discover breathtaking coastlines, savour
            world-class wine or explore wildlife up close, your{" "}
            <strong>private tour in Cape Town</strong> should feel effortless,
            personal and unforgettable. Every experience is planned around what
            matters most to you — not a rigid group itinerary.
          </Paragraph>

          <SectionTitle>Why Choose a Private Tour in Cape Town?</SectionTitle>
          <BulletList>
            <li>
              Private tours tailored to your pace — no rushing from stop to stop
            </li>
            <li>
              Chauffeur-driven comfort with a local expert who knows Cape Town
              deeply
            </li>
            <li>
              Flexible routes: Cape Peninsula, Table Mountain, Winelands, city
              and safari day trips
            </li>
            <li>
              Photo stops, restaurant bookings and hidden viewpoints built into
              your day
            </li>
          </BulletList>

          <SectionTitle>Popular Private Day Tours in Cape Town</SectionTitle>
          <Paragraph>
            Our most requested <strong>Cape Town private tours</strong> include:
            the Cape Peninsula & Cape Point, Boulders Beach penguins, the
            Stellenbosch & Franschhoek Winelands and custom city highlights.
            Each tour is completely private, with door-to-door transport and a
            dedicated driver-guide.
          </Paragraph>

          {/* ⭐ Testimonials */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <TestimonialCarousel />
          </Suspense>

          {/* 💎 CTA SECTION (WhatsApp / enquiry etc.) */}
          <CTASection />

          {/* 🌍 Private Tour Packages List */}
          <SectionTitle>Private Tour Packages in Cape Town</SectionTitle>
          <Paragraph>
            Browse our curated selection of <strong>private tours in Cape Town</strong>{" "}
            below. Each tour can be customised by switch­ing activities, start
            times or adding extra days to match your ideal itinerary.
          </Paragraph>

          <Suspense fallback={<ShimmerBox height="300px" />}>
            <ToursList />
          </Suspense>

          {/* OPTIONAL CONTACT FORM (still here if you want to re-enable later) */}
          {/* 
          <div className="tf-section tf-item-details">
            <div className="container">
              <div className="content-center">
                <div className="sc-item-details">
                  {formSubmitted ? (
                    <div className="thank-you-message">
                      <h2>Thank You!</h2>
                      <p>We’ll be in touch shortly to help plan your trip.</p>
                    </div>
                  ) : (
                    <Fragment>
                      <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        Tell us what kind of private tour you’re looking for.
                      </h1>

                      <div className="form-inner">
                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Your Name"
                            onChange={handleChange}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Your Email"
                            onChange={handleChange}
                          />
                          {formError && <p style={{ color: "red" }}>{formError}</p>}

                          <input
                            type="date"
                            name="tourDate"
                            value={formData.tourDate}
                            onChange={handleChange}
                          />

                          <textarea
                            name="message"
                            value={formData.message}
                            placeholder="Tell us about your ideal private tour in Cape Town"
                            onChange={handleChange}
                          ></textarea>

                          <button type="submit" className="sc-button loadmore style fl-button pri-3">
                            <span>Enquire Now</span>
                          </button>
                        </form>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          */}

          {/* 🔍 FAQ SECTION FOR SEO */}
          <FAQWrapper>
            <SectionTitle>Private Tours Cape Town – Frequently Asked Questions</SectionTitle>
            <div className="flat-accordion2">
              {faqs.map((item, i) => (
                <Accordion key={i} title={item.title}>
                  <p style={{ fontSize: "16px", lineHeight: 1.8 }}>
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

export default PrivateToursCapeTown;