import React, { useState, useEffect, Fragment, Suspense } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import emailjs from "emailjs-com";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import backgroundImage from "../assets/images/item-background/benz.jpg";

// 🧩 Lazy imports for performance, preloaded for instant revisits
const TestimonialCarousel = React.lazy(() => import("../components/TestimonialCarousel"));
const Tours = React.lazy(() => import("../components/Tours"));
const Cars4Hire = React.lazy(() => import("../components/Cars4hire"));

// 🧩 Global Luxury Fonts + Base Text Styling
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    color: #2a2a2a;
    line-height: 1.8;
    background-color: #fff;
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: #111;
  }
`;

// 💫 Luxury Typography Enhancements
const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: #111;
  font-size: 32px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 17px;
  color: #333;
  line-height: 1.9;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;

  li {
    position: relative;
    margin: 8px 0;
    font-size: 16px;
    color: #444;
    padding-left: 22px;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #d4af37;
      font-size: 18px;
      line-height: 1;
    }
  }
`;

const HighlightText = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

// ✨ Shimmer placeholder
const ShimmerBox = styled.div`
  width: 100%;
  height: ${(props) => props.height || "200px"};
  border-radius: 10px;
  margin: 20px 0;
  background: linear-gradient(90deg, #f5f5f5 0%, #eaeaea 50%, #f5f5f5 100%);
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
    message: "",
    serviceType: "Passed through chauffeur hire",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cachedDataLoaded, setCachedDataLoaded] = useState(false);

  // ✅ Preload components for next visit
  useEffect(() => {
    import("../components/TestimonialCarousel");
    import("../components/Tours");
    import("../components/Cars4hire");
  }, []);

  // ✅ Simulate API caching (if your Tours/Cars4Hire fetch data)
  useEffect(() => {
    const cached = sessionStorage.getItem("airportTransfersCache");
    if (cached) {
      setCachedDataLoaded(true);
    } else {
      // simulate initial fetch delay (first visit)
      const timer = setTimeout(() => {
        sessionStorage.setItem("airportTransfersCache", "true");
        setCachedDataLoaded(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
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

  return (
    <div className="home-3">
      <GlobalStyle />
      <Helmet>
        <title>Best Chauffeur Hire and Private Tours in Cape Town</title>
        <meta
          name="description"
          content="Luxury chauffeur service and private tours in Cape Town. Premium vehicles, professional drivers, and unforgettable experiences."
        />
      </Helmet>

      <Header />

      {/* Hero section */}
      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center / cover no-repeat`,
          padding: "100px 0 20px",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
      </section>

      {/* Main content */}
      <div className="tf-section post-details">
        <div className="themesflat-container">
          <div className="post">
            <div className="inner-content">
              <SectionTitle>
                Premium Chauffeur Services and Private Tours in{" "}
                <HighlightText>Cape Town</HighlightText>
              </SectionTitle>

              <Paragraph>
                If it’s your first time in Cape Town, discover all the top
                attractions with us — completely bespoke to your requirements.
                Whether you’re visiting for business or pleasure, our private
                chauffeurs ensure a seamless, premium experience.
              </Paragraph>

              <Paragraph>
                You might be asking: <em>“Why should I book with them?”</em>
              </Paragraph>

              <Paragraph>Here’s why:</Paragraph>

              <List>
                <li>You're safe with us</li>
                <li>Luxury vehicles for every occasion</li>
                <li>Local guides who share Cape Town’s hidden gems</li>
                <li>Carefully planned itineraries designed for comfort</li>
              </List>

              <Paragraph>
                Still not convinced? Take a look at what our clients have to say:
              </Paragraph>

              {!cachedDataLoaded ? (
                <ShimmerBox height="300px" />
              ) : (
                <Suspense fallback={<ShimmerBox height="300px" />}>
                  <TestimonialCarousel />
                </Suspense>
              )}

              {!cachedDataLoaded ? (
                <ShimmerBox height="300px" />
              ) : (
                <Suspense fallback={<ShimmerBox height="300px" />}>
                  <Tours />
                </Suspense>
              )}

              <SectionTitle>
                We can also assist with{" "}
                <HighlightText>Special Events</HighlightText>
              </SectionTitle>

              <List>
                <li>Weddings</li>
                <li>Matric Balls</li>
                <li>Corporate Events</li>
                <li>Any occasion needing prestige vehicles and drivers</li>
              </List>

              {!cachedDataLoaded ? (
                <ShimmerBox height="280px" />
              ) : (
                <Suspense fallback={<ShimmerBox height="280px" />}>
                  <Cars4Hire />
                </Suspense>
              )}
            </div>
          </div>

          {/* Contact Form */}
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
                            Your enquiry has been received. We’ll get back to
                            you soon.
                          </p>
                        </div>
                      ) : (
                        <Fragment>
                          {!loading && (
                            <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                              Let us know how we can assist you
                            </h1>
                          )}
                          <div className="form-inner">
                            <form
                              id="contactform"
                              noValidate
                              onSubmit={handleSubmit}
                            >
                              <div className="row">
                                {!loading && (
                                  <>
                                    <div className="col-md-6">
                                      <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        placeholder="Your Name"
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Your Email"
                                        onChange={handleChange}
                                      />
                                      {formError && (
                                        <p style={{ color: "red" }}>
                                          {formError}
                                        </p>
                                      )}
                                    </div>
                                    <div className="col-md-12">
                                      <textarea
                                        name="message"
                                        value={formData.message}
                                        placeholder="Tell us more about your trip or booking request"
                                        onChange={handleChange}
                                      ></textarea>
                                    </div>
                                    <div className="col-md-12">
                                      <button
                                        type="submit"
                                        className="sc-button loadmore style fl-button pri-3"
                                      >
                                        <span>Send Message</span>
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AirportTransfers;
