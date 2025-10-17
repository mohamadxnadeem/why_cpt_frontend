import React, { useState, Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '../components/Rating';

import { Helmet } from "react-helmet";
import styled from "styled-components";
import emailjs from "emailjs-com";

import TestimonialCarousel from "../components/TestimonialCarousel";

import Tours from '../components/Tours';

import jana from '../assets/images/blog/jana.jpg';
import tim from '../assets/images/blog/tim.jpg';
import rachel from '../assets/images/blog/becca.jpg';
import marie from '../assets/images/blog/marie.jpg';
import micheal from '../assets/images/blog/micheal.jpg';
import dan from '../assets/images/blog/dan.jpg';
import achmat from '../assets/images/blog/achmat.png'
import luka from '../assets/images/blog/luka.png'
import noor from '../assets/images/blog/noor.png'
import renad from '../assets/images/blog/renad.png'
import yaasir from '../assets/images/blog/yaasir.png'
import billy from '../assets/images/blog/mampuru.png'
import jones from '../assets/images/blog/jones.png'
import yusra from '../assets/images/blog/yusra.png'
import moz from '../assets/images/blog/moz.png'
import kazi from '../assets/images/blog/Allen and Kazi.png'

import aashish from '../assets/images/blog/Aashish.jpg'
import kresmir from '../assets/images/blog/kresmir.jpg'
import lungi from '../assets/images/blog/lungi.jpg'
import mampuru from '../assets/images/blog/mampuru.jpg'
import gunnar from '../assets/images/blog/mr gunnar.jpg'
import ru from '../assets/images/blog/ru.jpg'
import ruth from '../assets/images/blog/ruth.jpg'
import saad from '../assets/images/blog/saad.jpg'
import sarah from '../assets/images/blog/sarah.jpg'
import tuleen from '../assets/images/blog/tuleen.jpg'
import yasmin from '../assets/images/blog/yasmin.jpg'

import asad from '../assets/images/blog/asad.jpg'
import jodi from '../assets/images/blog/jodi.jpg'
import nicolas from '../assets/images/blog/nicholas.jpg'
import nadine from '../assets/images/blog/nadine.jpg'

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Cars4Hire from "../components/Cars4hire";
import backgroundImage from "../assets/images/item-background/benz.jpg";

const AirportTransfers = () => {

  // Form Function Starts here =====================================================================
  
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    serviceType: "Passed through chauffeur hire", // Hardcoded value
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    emailjs
      .send("service_ptqtluk", "template_uyicl9l", formData, "apNJP_9sXnff2q82W")
      .then(
        (result) => {
          console.log("Email successfully sent!");
          setFormSubmitted(true);
        },
        (error) => {
          console.log("There was an error sending the email:", error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  // Form Function ends here =====================================================================



  return (
    <div className="home-3">
      <Helmet>
        <title>Best chauffeur hire and private tours in Cape Town</title>
        <meta
          name="description"
          content="Safe, premium chauffeur service for executives and single travelers in Cape Town. Enjoy luxury vehicles, affordable rates, and professional drivers."
        />
        <meta
          property="og:title"
          content="Best chauffeur hire and airport transfers in Cape Town"
        />
        <meta
          property="og:description"
          content="Safe, premium chauffeur service for executives and single travelers in Cape Town. Enjoy luxury vehicles, affordable rates, and professional drivers."
        />
        <meta
          name="keywords"
          content="chauffeur hire Cape Town, airport transfers, Stellenbosch wine tours, Cape Peninsula tours, luxury car rentals, executive travel, professional drivers, luxury vehicles"
        />
      </Helmet>
      <Header />

      <section
        className="flat-title-page inner"
        style={{
          background: `url(${backgroundImage}) center center no-repeat`,
          backgroundSize: "cover",
          padding: "100px 0 20px",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
      </section>

      <div className="tf-section post-details">
        <div className="themesflat-container">
          <div className="post">
            <div className="inner-content">
              <h2 className="title-post">
                Premium Chauffeur Services and Private tours in Cape Town
              </h2>
              <div className="divider"></div>
              <div className="inner-post mg-t-40">
                <p className="mg-bt-24">
                  If it's your first time in Cape Town, then why not discover all the top attractions with us bespoke to your requirements. 
                </p>

                <p className="mg-bt-24">
                  Okay so now you might be asking yourself: "Why Should I book with them?"
                </p>

                <p className="mg-bt-24">
                  And that's a good question, so you should consider booking with us because:
                </p>

                <p className="mg-bt-24">
                  - You're safe with us,
                </p>
                <p className="mg-bt-24">
                  - We've got the best vehicles for any occasion,
                </p>
                <p className="mg-bt-24">
                  - Local guides to share the secrets of Cape Town,
                </p>
                <p className="mg-bt-24">
                  - And the best itinaries,
                </p>

                 <p className="mg-bt-24">
                  And if that's not enough for you then maybe some client testimonials would be enough to persuade you 
                </p>

                
              </div>
               <TestimonialCarousel />

              <Tours />

              <h2 className="title-post">
                We can also assist with special events like:
              </h2>

                <p className="mg-bt-24">
                  - Weddings,
                </p>

                <p className="mg-bt-24">
                  - Matric Balls,
                </p>

                <p className="mg-bt-24">
                  - Corporate events,
                </p>

                <p className="mg-bt-24">
                  - And anything else that requires high status vehicles and professional drivers
                </p>


              <Cars4Hire />
            </div>
          </div>

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
                            Your enquiry has been successfully submitted. We
                            will get back to you soon.
                          </p>
                        </div>
                      ) : (
                        <Fragment>
                          {!loading && (
                            <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                              Let us know how we can help you
                            </h1>
                          )}

                          <div className="form-inner">
                            <form
                              id="contactform"
                              noValidate="novalidate"
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
                                        placeholder="Let us know if you want to book your tour or chauffeur drive with us and the details for your trip"
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

                            <Fragment>
                                
                            </Fragment>
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
