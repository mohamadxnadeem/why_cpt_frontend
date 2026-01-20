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
import { Accordion } from "react-bootstrap-accordion";

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
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
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

// 📨 Form styling (kept if you want to re-enable later)
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

// 🔎 FAQ styling
const FAQSection = styled.section`
  margin: 40px 0 20px;
`;

const FAQTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #111;
`;

const FAQIntro = styled.p`
  font-size: 15px;
  color: #555;
  margin-bottom: 16px;
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

  const primaryImage = heroSliderData[0]?.src;

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

  // ✅ Dynamic SEO text bits
  const priceNumber = car?.price ? Math.round(car.price) : null;
  const vehicleName = car?.title || "Chauffeur Vehicle";

  const pageTitle = car
    ? `${vehicleName} for Hire from R${priceNumber || "____"} per Day in Cape Town`
    : "Chauffeur Vehicle Hire in Cape Town";

  const metaDescription = car
    ? `Hire a chauffeur-driven ${vehicleName} in Cape Town from ${
        priceNumber ? `R${priceNumber} per day` : "a competitive daily rate"
      }. Professional driver, fuel included and up to 10 hours / 200km per day. Perfect for airport transfers, business and private tours.`
    : "Book luxury chauffeur-driven vehicles in Cape Town with professional drivers, fuel included and customised daily itineraries.";

  // ✅ WhatsApp
  const whatsappNumber = "27636746131"; // no '+' for wa.me
  const waText = car
    ? `Hi Cape Town Concierge, I’d like to reserve ${vehicleName}. Date: ____ | Guests: ____ | Budget: ____`
    : "Hi Cape Town Concierge, I’d like to reserve a private experience. Date: ____ | Guests: ____ | Budget: ____";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    waText
  )}`;

  // ✅ Paid-only WhatsApp click tracker (uses your index.html helper)
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const url = whatsappLink;

    if (window.WCT_trackWhatsAppConversionAndOpen) {
      window.WCT_trackWhatsAppConversionAndOpen(url);
      return;
    }

    // fallback
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ✅ FAQ content (SEO–oriented, vehicle-aware)
  const faqs = [
    {
      title: `What is included when I hire the ${vehicleName} with a chauffeur?`,
      text: `
Your booking includes a professional private driver, the ${vehicleName} reserved exclusively for your use, fuel, and up to 10 hours / 200km per day (unless otherwise stated in your quote).

You can use the vehicle for airport transfers, hotel-to-hotel transfers, business meetings, sightseeing and restaurant visits within your booked time. Standard concierge support — such as restaurant recommendations and basic itinerary suggestions — is also included.`,
    },
    {
      title: "Can I use this vehicle for airport, winelands and long-distance trips?",
      text: `
Yes. Most guests use this chauffeur service for a mix of airport transfers, city transfers and full-day hire (for the Winelands, Cape Peninsula or long-distance trips like safari lodges).

Some trips outside Cape Town or beyond the daily km allowance may carry a small additional charge per km or per hour. When you send us your dates and basic plan, we’ll confirm a clear, all-inclusive quote before you book.`,
    },
    {
      title: "How much does it cost per day to hire this chauffeur vehicle?",
      text: `
Daily rates vary slightly by season, exact route and how many days you book — but for this vehicle you can generally expect a daily chauffeur rate starting from ${
        priceNumber ? `around R${priceNumber}` : "a competitive rate"
      } per day for up to 10 hours / 200km.

If you share a full-day hire between friends or family, it often works out more cost-effective (and far more convenient) than renting a car, paying for fuel, parking, tolls and navigation stress yourself.`,
    },
    {
      title: "How do I confirm availability and make a booking?",
      text: `
The easiest way is to contact us on WhatsApp with your preferred dates, pick-up area, drop-off area and how many guests will be travelling.

From there, your chauffeur concierge will confirm:
• Whether this specific vehicle is available on your dates  
• The exact daily rate based on your route and season  
• Any add-ons you may need (child seats, trailer, guide, etc.)

Once you’re happy, we’ll lock in your booking and send confirmation details.`,
    },
    {
      title: "Is this chauffeur service suitable for business travellers and VIP guests?",
      text: `
Absolutely. Many of our guests are business travellers, executives and VIP clients who value punctuality, discretion and a clean, well-presented vehicle.

Your driver will assist with luggage, route optimisation and smooth timing between meetings or venues. If you’re travelling with a larger team or require multiple vehicles, we can also coordinate a small fleet and help with simple scheduling.`,
    },
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
    <div className="item-details">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Basic Open Graph for social / SEO */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        {primaryImage && <meta property="og:image" content={primaryImage} />}
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {primaryImage && <meta name="twitter:image" content={primaryImage} />}

        {/* FAQ JSON-LD for rich results */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
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
              <Title>
                {vehicleName} for Hire from{" "}
                {priceNumber ? `R${priceNumber}` : "a competitive rate"} per Day
                in Cape Town
              </Title>
              <SubTitle>
                Chauffeur-driven {vehicleName} with professional driver in Cape
                Town and surrounds.
              </SubTitle>

              <BadgeRow>
                <Badge>Private Chauffeur</Badge>
                <Badge>Fuel Included</Badge>
                <Badge>10 Hours / 200km per day</Badge>
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

                {priceNumber && (
                  <>
                    <PriceValue>R{priceNumber} / day</PriceValue>
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

          {/* 🟢 High-Intent WhatsApp CTA (tracked for paid Google Ads only) */}
          <EmeraldBlock>
            <EmeraldTitle>Ready to Reserve This Vehicle?</EmeraldTitle>
            <EmeraldSub>
              Weekends and peak season book out quickly. Send us your dates and
              we’ll confirm availability and final pricing for this vehicle.
            </EmeraldSub>

            <WhatsAppButton
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp size={20} />
              Chat with a Chauffeur Concierge on WhatsApp
            </WhatsAppButton>
          </EmeraldBlock>

          {/* ⭐ Testimonials */}
          <TestimonialCarousel />

          {/* 🔎 FAQ SECTION FOR SEO */}
          <FAQSection>
            <FAQTitle>Frequently Asked Questions</FAQTitle>
            <FAQIntro>
              Here are some of the most common questions guests ask when
              booking this chauffeur vehicle in Cape Town.
            </FAQIntro>
            <div className="flat-accordion2">
              {faqs.map((item, index) => (
                <Accordion key={index} title={item.title}>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      marginBottom: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </Accordion>
              ))}
            </div>
          </FAQSection>

          {/* (form stays commented out) */}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default CarHireDetails;