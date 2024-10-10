import React , { useState , Fragment, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '../components/Rating';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import imgblog1 from '../assets/images/blog/audi.png';
import jana from '../assets/images/blog/jana.jpg';
import tim from '../assets/images/blog/tim.jpg';
import rachel from '../assets/images/blog/becca.jpg';
import marie from '../assets/images/blog/marie.jpg';
import micheal from '../assets/images/blog/micheal.jpg';
import dan from '../assets/images/blog/dan.jpg';
import batman from '../assets/images/blog/batman.JPG';
import Packages from '../components/Packages';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/blog/romantic-getawat.jpeg';
import styled from 'styled-components';



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

import CardModal from '../components/layouts/CardModal';


const LimitedSpotsContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #333;
`;

const NumberContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const DigitBox = styled.div`
  background-color: black;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%; /* Ensures it scales responsively */
  margin: 0 auto; /* Center the div horizontally */
`;

const FullPackages = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalShow, setModalShow] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        serviceType: 'Airport Transfer',
        email: '',
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const openCalendlyPopup = (e) => {
        e.preventDefault();
        if (isMobile) {
            window.open('https://calendly.com/mohamadxnadeem/30min', '_blank');
        } else if (window.Calendly) {
            window.Calendly.initPopupWidget({ url: 'https://calendly.com/mohamadxnadeem/30min' });
        } else {
            console.error("Calendly is not loaded yet");
        }
        return false;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send('service_ptqtluk', 'template_uyicl9l', formData, 'apNJP_9sXnff2q82W')
            .then(
                (result) => {
                    console.log('Email successfully sent!');
                    setFormSubmitted(true);
                },
                (error) => {
                    console.log('There was an error sending the email:', error);
                }
            );
    };

    const items = [

        
        {
             cover_photo: kazi,
             name: 'Sunnah Musk Team',
             title: 'England',
             rating: 5,
             comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
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
            comment: 'The ride to the airport was comfortable and on time. The driver was polite and the vehicle was in great condition. It made my early morning trip much easier.',
        },
        {
            cover_photo: dan,
            name: 'Dan',
            title: 'Jaques',
            rating: 4.7,
            comment: 'A straightforward and reliable service. The car was clean, the driver was polite, and we arrived at the airport without any issues. It’s a service I’ll definitely consider using again',
        },
        {
            cover_photo: tim,
            name: 'Tim',
            title: 'England',
            rating: 5,
            comment: 'I’ve used several airport transfer services in Cape Town, and this one stands out for its reliability. The driver was friendly and professional, and the vehicle was comfortable. Definitely using them again.',
        },
        {
            cover_photo: rachel,
            name: 'rachel',
            title: 'USA',
            rating: 4,
            comment: 'The service was solid—on time, clean car, and a courteous driver. I appreciated the little details like a bottle of water waiting for me. It made the ride more pleasant after a long flight.',
        },
        {
            cover_photo: marie,
            name: 'marie',
            title: 'Netherlands',
            rating: 4,
            comment: 'Punctual and professional—exactly what you want from an airport transfer. The driver knew the best route to avoid traffic, which helped me get to the airport with time to spare. No complaints!',
        },
        {
            cover_photo: micheal,
            name: 'micheal',
            title: 'England',
            rating: 5,
            comment: 'Great service! My driver was right on time, the car was clean, and the ride was smooth. It made getting to the airport hassle-free, which is exactly what I needed after a long day.',
        },

         {
            cover_photo: achmat,
            name: 'Achmat',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
        {
            cover_photo: noor,
            name: 'Noor',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
        {
            cover_photo: luka,
            name: 'Luka',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
        {
            cover_photo: renad,
            name: 'Renad',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
        
        {
            cover_photo: billy,
            name: 'Billy',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
        {
            cover_photo: jones,
            name: 'Jones',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
       
         {
             cover_photo: yusra,
             name: 'Yusra',
             title: 'England',
             rating: 5,
             comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
         },
         {
             cover_photo: moz,
             name: 'Mozna',
             title: 'England',
             rating: 5,
             comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
         },
    ];

    return (
        
        <div className='home-3'>
            <Helmet>
                <title>How to win $20K Rolex Batman</title>
                <meta name="description" content="Stand to win rolex batman when you book an 8 Day luxury package to Cape Town with us." />
                <meta property="og:title" content="How to win $20K Rolex Batman" />
                <meta property="og:description" content="Stand to win rolex batman when you book an 8 Day luxury package to Cape Town with us." />
                <meta property="og:image" content={imgblog1} />
                <meta property="og:url" content="https://whycapetown.s3.eu-central-1.amazonaws.com/batman.JPG" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            
            <section className="flat-title-page inner" style={{ background: `url(${backgroundImage}) center center no-repeat`, backgroundSize: 'cover', padding: '100px 0 20px', position: 'relative' }}>
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="tf-section post-details">
                <div className="themesflat-container">
                    <div className="post">
                        <div className="inner-content">
                            <h2 className="title-post">£15K Rolex Giveaway Competion</h2>
                            <br />
                            <h2 className="title-post">Coming soon...</h2>
                            <div className="divider"></div>
                            <div className="inner-post mg-t-40">
                               
                                <p className="mg-bt-24">
                                    If you love travelling, then we've got the perfect excuse for you to book your trip to the best city in the world!                                
                                </p>

                                <p className="mg-bt-24">
                                    Why? 
                                </p>

                                <p className="mg-bt-24">
                                    Because if you book your trip to Cape Town with us then you stand a good chance to win a Rolex valued at £15K.                                
                                </p>
                                <p className="mg-bt-24">
                                    But how much is this trip going to cost? 
                                </p>
                                <p className="mg-bt-24">
                                    Just £1500 per person.  ( 2 pax package )
                                </p>
 


                                <p className="mg-bt-24">
                                    So pick your best friend, girlfrend, boyfriend or who ever you want to join you on this luxury adventure to Cape Town.
                                </p>

                                <p className="mg-bt-24">
                                    And you might end up with a £15K rolex if you're lucky.
                                </p>

                                


                               


                               {/* <p className="mg-bt-24">
                                    The official launch date for accepting orders is 01 November 2024.
                                </p>

                                <p className="mg-bt-24">
                                See what £1500 gets you for 8 days in Cape Town:
                                </p> */}

                                
            
                                
                            </div>

                            <Packages />

                            <Fragment>
                                    <section className="tf-section live-auctions">
                                        <div className="themesflat-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="">
                                                        <h2 className="tf-title">Past Clients </h2>
                                                        <center>
                                                        {/* <p >( Past Clients )</p> */}
                                                        <br></br>
                                                        </center>
                                                        
                              

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
                                                        {items.slice(0, 99).map((item, index) => (
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
                                                                                            <Rating value={item.rating} color={'#f8e825'} />
                                                                                        </h5>
                                                                                    </div>
                                                                                    {/* <div className="meta-info">
                                                                                        <div className="author">
                                                                                            <div className="info">
                                                                                                <h6>"{item.comment}"</h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> */}
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


                                    <CardModal show={modalShow} onHide={() => setModalShow(false)} />
                            </Fragment>

                          

                            
                            
                      

                            <LimitedSpotsContainer>
                            
                           

                            <h2 className="title-post">1 in 35  chance to own a Rolex</h2> 
                                {/* <p className="mg-bt-24">
                                    1 in 35 Chance this could be yours   
                                </p>
                                <NumberContainer>
                                    <DigitBox>0</DigitBox>
                                    <DigitBox>0</DigitBox>
                                </NumberContainer>
                                <br></br> */}
                                <p className="mg-bt-24">
                                    Follow us on Instagram to stay in the know <a href='' target='__blank' >@whycapetown</a>   
                                </p>
                            <img className="custom-image" src={batman} alt="table mountain" />
                            <h2 className="title-post">Competition Coming Soon</h2> 

                            <p className="mg-bt-24">
                                Please Note, this competition is limited to the first 35 customers only.                             
                            </p>
                            <p className="mg-bt-24">
                                So sign up to our email list to be the first to know when this competition is going live.                               
                            </p>
                           
                            
                            <FormWrapper>
                                <div class="klaviyo-form-Yy2tkk"></div>
                            </FormWrapper>

                            <p className="mg-bt-24">
                                Lastly this package is only for people who genuinly enjoy luxury travel experiences and adventures in new places. 
                            </p>
                            <p className="mg-bt-24">
                                 So if you're a couch potato and only in it to win the rolex then this is not for you.         
                            </p>
                           

                            
                               
                                
                            </LimitedSpotsContainer>

                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                          
                            <p className="mg-bt-24">
                                Ts and Cs Apply
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FullPackages;
