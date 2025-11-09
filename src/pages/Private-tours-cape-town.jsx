import React, { useState, Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import emailjs from "emailjs-com";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import backgroundImage from "../assets/images/item-background/benz.jpg";
import CTASection from "../components/CTASection";

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

  return (
    <div className="tours-page">
      <GlobalStyle />

      <Helmet>
        <title>Private Tours & Exclusive Experiences in Cape Town</title>
        <meta
          name="description"
          content="Premium private tours in Cape Town including Winelands, Cape Peninsula, Safari & luxury curated experiences."
        />
      </Helmet>

      <Header />

      {/* HERO - CLEAN & PREMIUM */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          padding: "140px 0 60px",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
      </section>

      <div className="tf-section post-details">
        <div className="themesflat-container">

          <SectionTitle>
            Private Tours Curated with <Highlight>Heart & Detail</Highlight>
          </SectionTitle>

          <Paragraph>
            Whether you're here to discover breathtaking coastlines, savor
            world-class wine, or explore wildlife up close — your journey in Cape
            Town should feel effortless, personal and unforgettable.
          </Paragraph>

          <SectionTitle>What Makes Our Experiences Special</SectionTitle>
          <BulletList>
            <li>Private tours tailored to your pace — zero rushing</li>
            <li>Local expert guide who knows the city deeply</li>
            <li>Photographer-like guidance for perfect pictures</li>
            <li>Dining recommendations + planning assistance included</li>
          </BulletList>

          {/* ⭐ Testimonials */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <TestimonialCarousel />
          </Suspense>

          {/* 💎 CTA SECTION */}
          <CTASection />

          {/* 🌍 Tour Packages List */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <ToursList />
          </Suspense>

          {/* CONTACT FORM */}
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
                        Tell us what kind of experience you’re looking for.
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
                            placeholder="Tell us about your ideal experience"
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

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivateToursCapeTown;