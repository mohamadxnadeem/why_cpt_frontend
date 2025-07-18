import React, { useState, Fragment } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '../components/Rating';

import { Helmet } from "react-helmet";
import styled from "styled-components";
import emailjs from "emailjs-com";


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

  const items = [

        
    {
         cover_photo: kazi,
         name: 'Sunnah Musk Team',
         title: 'England',
         rating: 5,
         comment: 'Highly recommend touring Cape Town with a local guide than trying to plan all the logistics yourself. Thank you to the team at WhyCapeTown'
     },

     {
        cover_photo: yaasir,
        name: 'Yaasir',
        title: 'England',
        rating: 5,
        comment: 'Cape Town one of the cities that you can never get board of with such great vibes, people, positive energy and endless adventures that can be done apart from the food that you can always enjoy with a reasonable price and all thanks to the best Cape Town tour guide @whycapetown'
    },
    {
        cover_photo: jana,
        name: 'Jana',
        title: 'South Africa',
        rating: 5,
        comment: 'This tour is a must, you get to see the majority of the beautiful spots in Cape Town in one day! Nadeem is great, talking with him was fun and he was very considerate and kind he even helped out another person when his car was out of water. He took amazing pictures of us and of others because he was asked to do so a lot 😂',
    },
    {
        cover_photo: dan,
        name: 'Dan',
        title: 'Jaques',
        rating: 4.7,
        comment: 'An absolute must-do in Cape Town! The tour took us to hidden gems, and I felt like I was in a different world. The Cape Peninsulas beauty is indescribable. If you want a once-in-a-lifetime experience, this is it',
    },
    {
        cover_photo: tim,
        name: 'Tim',
        title: 'England',
        rating: 5,
        comment: 'Nadeem was a great guide! We had an amazing day sightseeing, including a fantastic little stop for fish chips. A very chilled out and relaxing drive in some of the most amazing scenery. The next day he also very kindly helped us out a very early airport transfer. A great driver and a lovely guy. Highly recommend.',
    },
    {
        cover_photo: rachel,
        name: 'rachel',
        title: 'USA',
        rating: 4,
        comment: 'Good guide. Took us to all the places we wanted to see and talked about some of the history. Provided snacks and water for the trip.',
    },
    {
        cover_photo: marie,
        name: 'marie',
        title: 'Netherlands',
        rating: 4,
        comment: 'Mohammed Nadeem gave us lots of time to enjoy the whole day. He had a comfortable vehicle and great snacks for the road! He always watched over our things as we wandered about each location. If youre someone who likes great pictures, hes your guy.',
    },
    {
        cover_photo: micheal,
        name: 'micheal',
        title: 'England',
        rating: 5,
        comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.',
    },

     {
        cover_photo: achmat,
        name: 'Achmat',
        title: 'England',
        rating: 5,
        comment: 'Mohamad was a great guide, we booked a Cape Point tour with him and then ended up booking a stellenbosch tour as well! Cant wait to come back to Cape Town!'
    },
    {
        cover_photo: noor,
        name: 'Noor',
        title: 'England',
        rating: 5,
        comment: 'Everything in Cape Town looks like a wallpaper, what a beautiful city and great food! Thank you to Mohamad our tourguide for keeping us safe and chauffeuring us around to all the best spots in the city!'
    },
    {
        cover_photo: luka,
        name: 'Luka',
        title: 'England',
        rating: 5,
        comment: 'The Cape Point tour is must do! Scenic views and some cool spots along the way and even better if you got a private tour with mohamad as your tour guide, driver and photographer! Thanks for the awesome trip'
    },
    {
        cover_photo: renad,
        name: 'Renad',
        title: 'England',
        rating: 4,
        comment: 'Did a Cape Point Tour with Mohamad as my guide, but you need to pack in clothes for the beach, something to hike and jacket because Cape Town has all 4 seasons in 1 day!'
    },
    
    {
        cover_photo: billy,
        name: 'Billy',
        title: 'England',
        rating: 5,
        comment: 'Mohamad is my go to guide and chauffeur driver when ever I come to Cape Town, from stellenbosch winelands drives and cape peninsular roadtrips and even helicopter rides at times. You can count on whycapetown for a safe, fun and premium service!'
    },
    {
        cover_photo: jones,
        name: 'Jones',
        title: 'England',
        rating: 5,
        comment: 'Thank you Mohamad for a wonderful Cape Point Experience, we even got to swim with some penguins at boulders beach and managed to squeeze in a wine tasting at the Beau Constantia! Highly recommend'
    },
   
     {
         cover_photo: yusra,
         name: 'Yusra',
         title: 'England',
         rating: 5,
         comment: 'We booked a custom winelands chauffeur drive with whycapetown and Mo took us to some of the most amazing spots you have to visit, lunch at the cellers hornet, wine tasting at beau constantia and a scenic chapmans peak drive'
     },
     {
         cover_photo: moz,
         name: 'Mozna',
         title: 'England',
         rating: 5,
         comment: 'I booked a girls trip to Cape Town with my best friend and I booked all my tours and chauffeured drives with whycapetown and Mo was professional, great photographer and made sure my friend and I was always safe and comfortable! Cape Town is the best!'
     },
     {
        cover_photo: aashish,
        name: 'Aashish',
        title: 'England',
        rating: 5,
        comment: 'We did a custom stellenbosch winelands tour and Cape Point on our honeymoon with whycapetown and Mo was fun and professional'
    },
    {
        cover_photo: kresmir,
        name: 'Kresmir',
        title: 'Crotia',
        rating: 5,
        comment: 'Life is all about having the best experiences, and you cant go wrong with a trip to Cape Town especially if you having whycapetown arrange your tours and chauffeur drives.'
    },
    {
        cover_photo: lungi,
        name: 'Lungi',
        title: 'England',
        rating: 5,
        comment: 'Mo from WhyCapeTown is my go to chauffeur driver for airport transfers, trustworthy, kind and reliable! Highly recommend'
    },
    {
        cover_photo: mampuru,
        name: 'Billy',
        title: 'England',
        rating: 5,
        comment: 'Mohamad is my go to guide and chauffeur driver when ever I come to Cape Town, from stellenbosch winelands drives and cape peninsular roadtrips and even helicopter rides at times. You can count on whycapetown for a safe, fun and premium service!'
    },
    {
        cover_photo: gunnar,
        name: 'Gunnar',
        title: 'Germany',
        rating: 5,
        comment: 'Can always count on Mo to be on time for my airport transfers from Simons Town, good conversation and trustworthy guy!'
    },
    {
        cover_photo: ru,
        name: 'Ru',
        title: 'England',
        rating: 5,
        comment: 'Cape Town is one of my favorite cities in the world! Thank you mohamad for showing us around and k'
    },
    {
        cover_photo: ruth,
        name: 'Ruth',
        title: 'England',
        rating: 5,
        comment: 'We arranged all our tours with whycapetown, safari drives, winelands tour, cape peninsular tour and airport transfers! Cant wait to come back to Cape Town!'
    },
    {
        cover_photo: saad,
        name: 'Saad',
        title: 'Morocco',
        rating: 5,
        comment: '5 stars for whycapetown for arranging all of our experiences at the best prices!'
    },
    {
        cover_photo: sarah,
        name: 'Sarah',
        title: 'Morocco',
        rating: 4,
        comment: 'Cape Town is a beautiful city, good food and great people! Thank you whycapetown for the best experience'
    },
    {
        cover_photo: tuleen,
        name: 'Tuleen',
        title: 'Syria',
        rating: 5,
        comment: 'safe, fun and reliable! Mohamad showed me the best of the Cape! Thank you whycapetown for a trip of a lifetime!'
    },
    {
        cover_photo: yasmin,
        name: 'Yasmin',
        title: 'Bahrain',
        rating: 5,
        comment: 'Cape Town is the best, great weather, food and people! Need to come back to do the garden route!'
    },
    {
        cover_photo: nadine,
        name: 'Nadine',
        title: 'Bahrain',
        rating: 5,
        comment: 'Best tour guide and photographer! Thank you for showing us the best of Cape Town!'
    },

    {
        cover_photo: nicolas,
        name: 'Nicolas',
        title: 'Bahrain',
        rating: 5,
        comment: 'Highly recomend mohamad from Cape Town for chauffeur services and tours! '
    },

    {
        cover_photo: jodi,
        name: 'Jodi',
        title: 'Bahrain',
        rating: 5,
        comment: 'My go-to chauffeur for years now. Mo gets me there and back safley always. I regularly use his services when im going on my own, because he makes sure im always safe'
    },

    {
        cover_photo: asad,
        name: 'Asad',
        title: 'Bahrain',
        rating: 5,
        comment: 'Mohamad took us to all the top attractions and best resturants in Cape Town and even saved us from getting robbed in Long Street!'
    },


];

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
              <section className="tf-section live-auctions">
                                    <div className="themesflat-container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="">
                                                    <h2 className="tf-title">
                                                        Client Reviews:
                                                    </h2>
                                                    <div className="heading-line"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <Swiper
                                                    spaceBetween={30}
                                                    breakpoints={{
                                                        0: { slidesPerView: 1 },
                                                        767: { slidesPerView: 2 },
                                                        991: { slidesPerView: 3 },
                                                        1300: { slidesPerView: 4 },
                                                    }}
                                                    navigation
                                                    pagination={{ clickable: true }}
                                                    scrollbar={{ draggable: true }}
                                                >
                                                    {items
                                                        .slice(0, 99)
                                                        .map((item, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className="swiper-container show-shadow carousel auctions">
                                                                    <div className="swiper-wrapper">
                                                                        <div className="swiper-slide">
                                                                            <div className="slider-item">
                                                                                <div className="sc-card-product">
                                                                                <div className="card-media">
                                                                                        <img src={item.cover_photo} alt="cape town" />
                                                                                    </div>

                                                                                    <div className="card-title">
                                                                                        <h5>{item.name}</h5>
                                                                                    </div>
                                                                                    <div className="card-title">
                                                                                        <h5>
                                                                                            <Rating
                                                                                                value={item.rating}
                                                                                                color={'#f8e825'}
                                                                                            />
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div className="meta-info">
                                                                                        <div className="author">
                                                                                            <div className="info">
                                                                                                <h6>
                                                                                                    "{item.comment}"
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
              </section>

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
                              Special Request
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
                                        placeholder="Let us know if you have any special requests or questions and we will get back to you as soon as we can"
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

            <Tours />

          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AirportTransfers;
