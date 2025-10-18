import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SliderStyle3 from "../components/slider/SliderStyle3";
import "react-tabs/style/react-tabs.css";
import parse from "html-react-parser";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";
import TestimonialCarousel from "../components/TestimonialCarousel";
import PricingOfferCard from "../components/PricingOfferCard";

// ✨ Styled shimmer loader for hero image
const LoaderWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
`;
const Shimmer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const ItemDetails01 = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    tourDate: "",
    serviceType: "",
    email: "",
    message: "",
  });

  // ✅ Load Calendly script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Fetch Experience Data
  useEffect(() => {
    fetch(
      `https://web-production-1ab9.up.railway.app/api/experiences/${id}/with-reviews`
    )
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          serviceType: ` ${data.experience.title}`,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  // ✅ Form Handling
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    emailjs
      .send("service_ptqtluk", "template_uyicl9l", formData, "apNJP_9sXnff2q82W")
      .then(() => setFormSubmitted(true))
      .catch((error) => console.log("Email error:", error));
  };

  const experience = itemData?.experience;
  const heroSliderData =
    itemData?.cover_photos?.map((cover) => ({
      src: cover.image.cover_photos,
    })) || [];

  return (
    <div className="item-details">
      <Helmet>
        <title>
          {experience?.title ||
            "Don't miss out on this experience if you're in Cape Town"}
        </title>
        <meta
          name="description"
          content={
            experience?.title
              ? `${experience.title} - click for more info`
              : "Cape Town tour experience details"
          }
        />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  <h4
                    className="tf-title-heading ct style-2 fs-30 mg-bt-10"
                    style={{ color: "white" }}
                  >
                    {loading ? "Loading package..." : experience?.title}
                  </h4>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <div style={{ padding: "20px 0" }}>
        {loading ? (
          <LoaderWrapper>
            <Shimmer />
          </LoaderWrapper>
        ) : (
          <SliderStyle3 data={heroSliderData} />
        )}
      </div>

      {/* Package Details */}
      <div className="tf-section tf-item-details">
        <div className="container">
          {loading ? (
            <p>Loading details...</p>
          ) : (
            <div className="content-center">
              <div className="sc-item-details">{parse(experience?.body)}</div>
            </div>
          )}

          <br />

          {/* 🟢💎 Pricing Offer Card */}
          {!loading && (
            // <PricingOfferCard
            //   price={experience?.price}
            //   discountedPrice={experience?.discountedprice}
            //   offerDuration={300}
            //   experienceId={id}
            // />



            // // 🔥 Run promotional offer (countdown active)
            // <PricingOfferCard
            //   price={experience?.price}
            //   discountedPrice=experience?.discountedprice}
            //   offerDuration={300}
            //   experienceId={experience?.id}
            //   isDealActive={true}
            // />

            // 💰 Show only regular price (no countdown)
            <PricingOfferCard
              price={experience?.price}
              isDealActive={false}
            />

          )}

          {/* 💬 Testimonials */}
          <TestimonialCarousel />

          <br />

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
                            Lock in the best Price by contacting us below before timer runs out
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
                                    <span>Secure My Spot Today</span>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItemDetails01;
