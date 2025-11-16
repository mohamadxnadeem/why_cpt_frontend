import React, { useState, useEffect } from "react";
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
import { FaWhatsapp } from "react-icons/fa";

// ✨ Shimmer loader for hero gallery
const LoaderWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
`;
const Shimmer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: linear-gradient(
    to right,
    #f5f5f5 0%,
    #e5e5e5 20%,
    #f5f5f5 40%,
    #f5f5f5 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// 🧩 Layout + cards (modern minimal)
const PageContainer = styled.div`
  padding: 20px 0 60px;
`;

const HeaderBlock = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 32px;
  margin-bottom: 8px;
  color: #111;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 4px;
`;

const BadgeRow = styled.div`
  margin-top: 10px;
`;

const Badge = styled.span`
  display: inline-block;
  background: #0b5b33;
  color: #fff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
`;

const RatingLine = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 6px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr);
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 22px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 22px;
  margin-bottom: 14px;
  color: #111;
`;

const BodyContent = styled.div`
  font-size: 16px;
  color: #333;

  p {
    margin-bottom: 12px;
  }

  ul {
    margin-left: 20px;
    margin-bottom: 12px;
  }
`;

// 💰 Pricing + key info
const PriceValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0b5b33;
  margin-bottom: 6px;
`;

const PriceLabel = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 18px;
`;

const KeyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px;

  li {
    font-size: 15px;
    margin: 6px 0;
    color: #444;
  }

  span.label {
    font-weight: 600;
    color: #111;
  }
`;

const TagPill = styled.span`
  display: inline-block;
  background: #f1f4f6;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  color: #555;
  margin-right: 8px;
  margin-top: 6px;
`;

// 🟢 Emerald CTA Block
const EmeraldBlock = styled.div`
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  border-radius: 18px;
  padding: 40px 26px;
  margin: 40px 0 35px;
  text-align: center;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
`;

const EmeraldTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
`;

const EmeraldSub = styled.p`
  font-size: 17px;
  opacity: 0.97;
  margin-bottom: 24px;
  color: #fff;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #111;
  padding: 13px 38px;
  color: #fff !important;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.3s ease;
  &:hover {
    background: #222;
    transform: translateY(-1px);
  }
`;

// 📨 Form styling
const FormTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 24px;
  margin-bottom: 12px;
  color: #111;
`;

const FormSubText = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 18px;
`;

const ThankYouBox = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const ErrorText = styled.p`
  color: #c0392b;
  font-size: 14px;
  margin-top: 4px;
`;

const CarHireDetails = () => {
  const { id } = useParams();

  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    tourDate: "",
    serviceType: "",
    email: "",
    message: "",
  });

  // ✅ Fetch Car for Hire Details
  useEffect(() => {
    fetch(
      `https://web-production-1ab9.up.railway.app/api/cars-for-hire/${id}/details/`
    )
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          serviceType: data?.car?.title || "",
        }));
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
        setLoading(false);
      });
  }, [id]);

  const car = itemData?.car;
  const reviews = itemData?.reviews || [];
  const averageRating = itemData?.average_rating || 0;

  const heroSliderData =
    itemData?.cover_photos?.map((cover) => ({
      src: cover?.cover_photos || "",
    })) || [];

  // ✅ Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      .catch((err) => console.error("Email error:", err));
  };

  return (
    <div className="item-details">
      <Helmet>
        <title>
          {car?.title
            ? `${car.title} Chauffeur Hire | Cape Town`
            : "Chauffeur Vehicle Hire | Cape Town"}
        </title>
        <meta
          name="description"
          content={
            car?.title
              ? `Luxury chauffeur-driven ${car.title} in Cape Town. Professional driver, fuel included and tailored service.`
              : "Luxury chauffeur-driven vehicles for hire in Cape Town with professional drivers."
          }
        />
      </Helmet>

      <Header />

      {/* HERO BAR (simple, clean) */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
      </section>

      {/* IMAGE GALLERY */}
      <div style={{ padding: "20px 0" }}>
        {loading ? (
          <LoaderWrapper>
            <Shimmer />
          </LoaderWrapper>
        ) : heroSliderData.length > 0 ? (
          <SliderStyle3 data={heroSliderData} />
        ) : null}
      </div>

      <PageContainer className="tf-section tf-item-details">
        <div className="container">
          {/* HEADER BLOCK */}
          {!loading && car && (
            <HeaderBlock>
              <Title>{car.title}</Title>
              <SubTitle>Premium Chauffeur Vehicle – Cape Town</SubTitle>

              <BadgeRow>
                <Badge>Most booked in peak season</Badge>
                <Badge>Perfect for airport & hotel transfers</Badge>
              </BadgeRow>

              {averageRating > 0 && (
                <RatingLine>
                  ⭐ {averageRating}/5 · {reviews.length} review
                  {reviews.length === 1 ? "" : "s"}
                </RatingLine>
              )}
            </HeaderBlock>
          )}

          <DetailsGrid>
            {/* LEFT: OVERVIEW / BODY */}
            <div>
              <Card>
                <CardTitle>Vehicle Overview</CardTitle>
                <BodyContent>
                  {car?.body && typeof car.body === "string" ? (
                    parse(car.body)
                  ) : (
                    <p>
                      This vehicle is ideal for guests who value comfort, privacy
                      and a seamless chauffeur-driven experience in Cape Town.
                    </p>
                  )}
                </BodyContent>
              </Card>
            </div>

            {/* RIGHT: PRICING + KEY FACTS */}
            <div>
              <Card>
                <CardTitle>Rates & Details</CardTitle>

                {car?.price && (
                  <>
                    <PriceValue>R{Math.round(car.price)} / day</PriceValue>
                    <PriceLabel>
                      Includes up to <strong>10 hours</strong> and{" "}
                      <strong>200km</strong> per day with a private chauffeur,
                      fuel and standard concierge support.
                    </PriceLabel>
                  </>
                )}

                <KeyList>
                  {car?.number_of_seats && (
                    <li>
                      <span className="label">Guests:&nbsp;</span>
                      Up to {car.number_of_seats} passengers
                    </li>
                  )}
                  {car?.airport_transfer && (
                    <li>
                      <span className="label">Airport Transfers:&nbsp;</span>
                      {car.airport_transfer}
                    </li>
                  )}
                  {car?.safari_transfer && (
                    <li>
                      <span className="label">Safari / Long-distance:&nbsp;</span>
                      {car.safari_transfer}
                    </li>
                  )}
                  <li>
                    <span className="label">Extras:&nbsp;</span>
                    Additional hours & km can be added at a preferred rate.
                  </li>
                </KeyList>

                <div>
                  <TagPill>Private Chauffeur</TagPill>
                  <TagPill>Fuel Included</TagPill>
                  <TagPill>200km / 10hrs per day</TagPill>
                </div>
              </Card>
            </div>
          </DetailsGrid>

          {/* 🟢 High-Intent WhatsApp CTA */}
          <EmeraldBlock>
            <EmeraldTitle>Ready to Reserve This Vehicle?</EmeraldTitle>
            <EmeraldSub>
              Weekends and peak season book out quickly. Send us your dates and
              we’ll confirm availability and final pricing for this vehicle.
            </EmeraldSub>
            <WhatsAppButton href="https://wa.link/r5z0sb" target="_blank" rel="noreferrer">
              <FaWhatsapp size={20} />
              Chat with a Chauffeur Concierge
            </WhatsAppButton>
          </EmeraldBlock>

          {/* ⭐ Testimonials */}
          <TestimonialCarousel />

          <br />
          <br />

          {/* 📨 ENQUIRY FORM */}
          <div className="tf-section tf-item-details">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="content-center">
                    <div className="sc-item-details">
                      {formSubmitted ? (
                        <ThankYouBox>
                          <h2>Thank you!</h2>
                          <p>
                            Your enquiry has been received. Your chauffeur concierge
                            will be in touch shortly to confirm availability and
                            finalise your booking.
                          </p>
                        </ThankYouBox>
                      ) : (
                        <>
                          <FormTitle>Prefer Email? Send Us Your Details</FormTitle>
                          <FormSubText>
                            Share your dates, pick-up area and group size below and
                            we’ll reply with availability and tailored options for
                            this vehicle.
                          </FormSubText>

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
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-md-12">
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                  />
                                  {formError && <ErrorText>{formError}</ErrorText>}
                                </div>

                                <div className="col-md-12">
                                  <label
                                    style={{
                                      display: "block",
                                      marginBottom: "6px",
                                      fontWeight: 500,
                                      color: "#555",
                                    }}
                                  >
                                    Preferred Date
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
                                    placeholder="Tell us your pick-up location, number of guests and any special requirements."
                                    onChange={handleChange}
                                  ></textarea>
                                </div>

                                <div className="col-md-12">
                                  <button
                                    type="submit"
                                    className="sc-button loadmore style fl-button pri-3"
                                  >
                                    <span>Enquire About This Vehicle</span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default CarHireDetails;