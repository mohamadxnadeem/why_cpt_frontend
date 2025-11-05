import React, { useState, useEffect, Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import emailjs from "emailjs-com";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import backgroundImage from "../assets/images/item-background/benz.jpg";
import CTASection from "../components/CTASection";

const TestimonialCarousel = React.lazy(() => import("../components/TestimonialCarousel"));
const Tours = React.lazy(() => import("../components/Tours"));
const Cars4Hire = React.lazy(() => import("../components/Cars4hire"));

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500&display=swap');

  body { 
    font-family: 'Poppins', sans-serif; 
    color: #2a2a2a; 
    line-height: 1.8; 
  }

  h1,h2,h3 {
    font-family: 'Playfair Display', serif;
    color: #111;
  }
`;

const SectionTitle = styled.h2`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 22px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.85;
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

const ShimmerBox = styled.div`
  width: 100%;
  height: ${(props) => props.height || "260px"};
  border-radius: 10px;
  margin: 25px 0;
  background: linear-gradient(90deg, #f5f5f5, #eaeaea, #f5f5f5);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  @keyframes shimmer { 
    0% { background-position: -200% 0; } 
    100% { background-position: 200% 0; } 
  }
`;

const AirportTransfers = () => {
  const [formData, setFormData] = useState({
      name: "",
      contactNumber: "",
      tourDate: "",
      serviceType: "",
      email: "",
      message: "",
    });
    
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setFormError("Please enter a valid email.");

    setFormError("");
    emailjs.send("service_ptqtluk","template_uyicl9l",formData,"apNJP_9sXnff2q82W")
    .then(() => setFormSubmitted(true));
  };

  return (
    <div className="home-3">
      <GlobalStyle />

      <Helmet>
        <title>Private Chauffeur & Bespoke Travel Experiences</title>
      </Helmet>

      <Header />

      {/* ✅ Clean Cinematic Hero */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          padding: "160px 0 80px",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
      </section>

      {/* ✅ Main Intro */}
      <div className="tf-section post-details">
        <div className="themesflat-container">
          
          <SectionTitle>
            Private Chauffeur & Bespoke Travel Experiences in <HighlightText>Cape Town</HighlightText>
          </SectionTitle>

          <Paragraph>
            Arrive in comfort. Explore with confidence. Enjoy Cape Town with your own dedicated private driver — tailored to your schedule, pace, and preferences.
          </Paragraph>

          <SectionTitle>Why Travelers Choose Us</SectionTitle>
          <BulletList>
            <li>Private & discreet service — your comfort always comes first</li>
            <li>Professional chauffeurs & premium vehicles</li>
            <li>Local insider access to the best restaurants, beaches & wine estates</li>
            <li>Itineraries tailored to your pace, preferences & style</li>
          </BulletList>

          {/* ⭐ Testimonials */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <TestimonialCarousel />
          </Suspense>

          {/* 💎 CTA Block */}
          <CTASection />

          {/* Tours */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <Tours />
          </Suspense>

          <SectionTitle>Trusted for Life’s Most Important Moments</SectionTitle>
          <Paragraph>
            Many of our guests also request us for weddings, fine dining evenings, corporate hosting, private celebrations, and VIP stays. When your experience matters — you choose a team that takes it personally.
          </Paragraph>

          {/* Cars */}
          <Suspense fallback={<ShimmerBox height="300px" />}>
            <Cars4Hire />
          </Suspense>

          {/* ✅ Restored Original Contact Form */}
           {/* 📨 Contact Form */}
                    <div className="tf-section tf-item-details">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="content-center">
                              <div className="sc-item-details">
                                {formSubmitted ? (
                                  <div className="thank-you-message">
                                    <h2>Thank You!</h2>
                                    <p>
                                      You're one step closer to booking your tour with us.
                                      Your concierge will be in touch soon.
                                    </p>
                                  </div>
                                ) : (
                                  <Fragment>
                                    <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                      Fill in the form below and our team will respond shortly to help plan your perfect Cape Town experience.
                                    </h1>
                                    <div className="form-inner">
                                      <form
                                        id="contactform"
                                        noValidate="novalidate"
                                        onSubmit={handleSubmit}
                                      >
                                        <div className="row">
                                          <div className="col-md-12">
                                            <input
                                              type="text"
                                              name="name"
                                              value={formData.name}
                                              placeholder="Full Name for Your Booking"
                                              onChange={handleChange}
                                            />
                                          </div>
                                          <div className="col-md-12">
                                            <input
                                              type="email"
                                              name="email"
                                              value={formData.email}
                                              placeholder="Your Email for Tour Confirmation"
                                              onChange={handleChange}
                                            />
                                            {formError && (
                                              <p style={{ color: "red" }}>{formError}</p>
                                            )}
                                          </div>
                                          <div className="col-md-12">
                                            <input
                                              type="tel"
                                              name="contactNumber"
                                              value={formData.contactNumber}
                                              placeholder="Optional: Mobile for urgent updates"
                                              onChange={handleChange}
                                              style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #ccc",
                                                fontSize: "16px",
                                                marginBottom: "12px",
                                                boxSizing: "border-box",
                                              }}
                                            />
                                          </div>
          
                                          <div className="col-md-12">
                                            <label
                                              style={{
                                                display: "block",
                                                paddingLeft: "0px",
                                                marginBottom: "6px",
                                                fontWeight: "500",
                                                color: "#555",
                                              }}
                                            >
                                              Preferred date for your adventure
                                            </label>
                                            <input
                                              type="date"
                                              name="tourDate"
                                              value={formData.tourDate}
                                              onChange={handleChange}
                                              style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #ccc",
                                                fontSize: "16px",
                                              }}
                                            />
                                          </div>
          
                                          <div className="col-md-12">
                                            <textarea
                                              name="message"
                                              value={formData.message}
                                              placeholder="Any preferences or questions for your tour?"
                                              onChange={handleChange}
                                            ></textarea>
                                          </div>
          
                                          <div className="col-md-12">
                                            <button
                                              type="submit"
                                              className="sc-button loadmore style fl-button pri-3"
                                            >
                                              <span>Enquire Now</span>
                                            </button>
                                          </div>
                                        </div>
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

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AirportTransfers;