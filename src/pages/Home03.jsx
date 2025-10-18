import React, { useState, Fragment, useEffect, Suspense } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../components/header/Header";
import Slider from "../components/slider/Slider";
import heroSliderData from "../assets/fake-data/data-slider-3";
import ImageBar from "../components/ImageBar";
import Packages from "../components/Packages";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/footer/Footer";
import emailjs from "emailjs-com";
import { Accordion } from "react-bootstrap-accordion";
import { Link } from "react-router-dom";

// ✨ Global luxury typography
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    color: #2a2a2a;
    line-height: 1.8;
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: #111;
  }
`;

// ✨ Styled sections
const Section = styled.section`
  padding: 80px 0;
`;

const Title = styled.h2`
  font-size: 34px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #111;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 30px auto;
  font-size: 17px;
  color: #555;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 700px;
  margin: 0 auto 40px auto;
  text-align: left;

  li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    font-size: 17px;
    color: #333;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #d4af37;
      font-size: 20px;
    }
  }
`;

const Home03 = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    serviceType: "Full Package Enquiry",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calendly integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    setLoading(true);

    emailjs
      .send("service_ptqtluk", "template_uyicl9l", formData, "apNJP_9sXnff2q82W")
      .then(() => setFormSubmitted(true))
      .catch((error) => console.log("Email error:", error))
      .finally(() => setLoading(false));
  };

  const faqData = [
    {
      key: "0",
      title: "Is Cape Town safe?",
      text: "Cape Town is a safe city when you know where to go. Traveling with a trusted guide helps you explore confidently while discovering hidden local gems.",
    },
    {
      key: "1",
      title: "When is the best time to visit?",
      text: "September through May offers the best weather — warm days, blue skies, and vibrant outdoor energy everywhere you go.",
    },
    {
      key: "2",
      title: "How do I get from the airport to the city?",
      text: "Book your airport transfer with us for a smooth, professional experience. Your driver will meet you right at arrivals.",
    },
    {
      key: "3",
      title: "What are the best neighborhoods to stay in?",
      text: "Camps Bay, Sea Point, Stellenbosch, and De Waterkant are among the most loved areas — each offering its own unique charm and views.",
    },
    {
      key: "4",
      title: "What local dishes should I try?",
      text: "Try Cape Malay cuisine — bobotie, koeksisters, and a classic gatsby. You’ll thank us later.",
    },
  ];

  return (
    <div className="home-3">
      <GlobalStyle />
      <Helmet>
        <title>
          Luxury Cape Town Travel Packages | Private Tours & Chauffeur Service
        </title>
        <meta
          name="description"
          content="Book your dream Cape Town holiday with exclusive 5-star stays, private chauffeur tours, and personalized itineraries. Stress-free luxury travel, tailored to you."
        />
        <meta
          property="og:title"
          content="Luxury Travel Packages in Cape Town | Private Chauffeur & Tours"
        />
        <meta
          property="og:description"
          content="Discover Cape Town in style. From private airport transfers to luxury villas and guided tours — our team plans everything for you."
        />
        <meta
          property="og:image"
          content="https://www.whycapetown.com/your-cover-image.jpg"
        />
        <meta property="og:url" content="https://www.whycapetown.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <Slider data={heroSliderData} />
      <ImageBar />

      {/* 🏖 Intro Section */}
      <Section>
        <Title>Plan Your Luxury Trip to Cape Town</Title>
        <Subtitle>
          Let our team handle every detail — from 5-star hotels and private
          chauffeurs to curated experiences across the Cape. Sit back, relax,
          and enjoy a trip designed entirely for you.
        </Subtitle>

        <BulletList>
          <li>Exclusive rates at top-rated hotels and villas</li>
          <li>Private chauffeurs and expert local guides</li>
          <li>Tailored itineraries built around your interests</li>
          <li>24/7 assistance while you’re in Cape Town</li>
        </BulletList>

        <Suspense fallback={<div>Loading testimonials...</div>}>
          <TestimonialCarousel />
        </Suspense>

        <Packages />
      </Section>

      {/* 📨 Contact Form */}
      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-center">
                <div className="sc-item-details">
                  {formSubmitted ? (
                    <div className="thank-you-message" style={{ textAlign: "left" }}>
                      <h2
                        style={{
                          fontFamily: "Playfair Display, serif",
                          color: "#111",
                        }}
                      >
                        Thank You!
                      </h2>
                      <p style={{ fontSize: "16px", color: "#444" }}>
                        We’ve received your enquiry. Our team will contact you
                        soon with your personalized Cape Town itinerary.
                      </p>
                    </div>
                  ) : (
                    <Fragment>
                      {!loading && (
                        <>
                          <h1
                            className="tf-title-heading ct style-2 fs-30 mg-bt-10"
                            style={{
                              textAlign: "left",
                              fontFamily: "Playfair Display, serif",
                              color: "#111",
                            }}
                          >
                            Let’s Start Planning Your Trip
                          </h1>
                          <p
                            style={{
                              textAlign: "left",
                              fontSize: "16px",
                              color: "#555",
                              marginBottom: "30px",
                              maxWidth: "700px",
                            }}
                          >
                            Tell us about your dream Cape Town experience —
                            when you’d like to visit, how many people are
                            traveling, and what you’d love to see and do. Our
                            travel team will send a tailored proposal shortly.
                          </p>
                        </>
                      )}

                      <div className="form-inner" style={{ textAlign: "left" }}>
                        <form id="contactform" noValidate="novalidate" onSubmit={handleSubmit}>
                          <div className="row">
                            {!loading && (
                              <>
                                <div className="col-md-6">
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Your Full Name"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Your Email Address"
                                    onChange={handleChange}
                                  />
                                  {formError && (
                                    <p style={{ color: "red", fontSize: "14px" }}>
                                      {formError}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-12">
                                  <textarea
                                    name="message"
                                    value={formData.message}
                                    placeholder="Example: We’re visiting from Dubai for 7 days in February. We’d love private tours, luxury stays, and airport transfers."
                                    onChange={handleChange}
                                    style={{ minHeight: "150px" }}
                                  ></textarea>
                                </div>
                                <div className="col-md-12" style={{ textAlign: "left" }}>
                                  <button
                                    type="submit"
                                    className="sc-button loadmore style fl-button pri-3"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <span>Send My Travel Request</span>
                                  </button>
                                </div>
                              </>
                            )}
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

      {/* 🧭 FAQ Section */}
      <Section>
        <Title>Everything You Need To Know</Title>
        <div className="container">
          <div className="flat-accordion2">
            {faqData.map((item, index) => (
              <Accordion key={index} title={item.title}>
                <p>{item.text}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Home03;
