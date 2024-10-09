import React, { useState, useEffect } from 'react';
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
import backgroundImage from '../assets/images/item-background/rolex.jpg'; 
import styled from 'styled-components';


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

const FullPackages = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
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
            cover_photo: jana,
            name: 'Lungi',
            title: 'South Africa',
            rating: 5,
            comment: 'The ride to the airport was comfortable and on time. The driver was polite and the vehicle was in great condition. It made my early morning trip much easier.',
        },
        {
            cover_photo: dan,
            name: 'Jaques',
            title: 'Jaques',
            rating: 4.7,
            comment: 'A straightforward and reliable service. The car was clean, the driver was polite, and we arrived at the airport without any issues. It’s a service I’ll definitely consider using again',
        },
        {
            cover_photo: tim,
            name: 'Jodi',
            title: 'England',
            rating: 5,
            comment: 'I’ve used several airport transfer services in Cape Town, and this one stands out for its reliability. The driver was friendly and professional, and the vehicle was comfortable. Definitely using them again.',
        },
        {
            cover_photo: rachel,
            name: 'Serisha',
            title: 'USA',
            rating: 4,
            comment: 'The service was solid—on time, clean car, and a courteous driver. I appreciated the little details like a bottle of water waiting for me. It made the ride more pleasant after a long flight.',
        },
        {
            cover_photo: marie,
            name: 'Amina',
            title: 'Netherlands',
            rating: 4,
            comment: 'Punctual and professional—exactly what you want from an airport transfer. The driver knew the best route to avoid traffic, which helped me get to the airport with time to spare. No complaints!',
        },
        {
            cover_photo: micheal,
            name: 'Gunnar',
            title: 'England',
            rating: 5,
            comment: 'Great service! My driver was right on time, the car was clean, and the ride was smooth. It made getting to the airport hassle-free, which is exactly what I needed after a long day.',
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
                            <h2 className="title-post">Your Dream Honeymoon to Cape Town – Only $3500</h2>
                            <br />
                            <h2 className="title-post">Plus, Stand 1 out of 35 Chance to Win a Rolex Batman Worth $20,000!</h2>
                            <div className="divider"></div>
                            <div className="inner-post mg-t-40">
                                <img className="custom-image" src={batman} alt="table mountain" />
                                <p className="mg-bt-24">
                                    We’ve curated the perfect 8-day honeymoon package, combining the best luxury experiences Cape Town has to offer. From 5-star accommodation to private chauffeured drives, and exclusive tours to all the top attractions, you’ll discover why Cape Town is hailed as the most breathtaking city on the planet.
                                </p>
                                <p className="mg-bt-24">
                                    For just $3500, everything is taken care of—from your stay to the unforgettable experiences that will create lifelong memories.
                                </p>
                                <p className="mg-bt-24">
                                    And here’s the icing on the cake:
                                </p>
                                <p className="mg-bt-24">
                                    When you book this package, you’ll be automatically entered to win a stunning Rolex Batman, valued at $20,000. This is more than a trip—it’s the adventure of a lifetime, with a luxury timepiece as the ultimate keepsake.
                                </p>
                                
                            </div>

                            <LimitedSpotsContainer>
                            <h2 className="title-post">Limited to 35 Bookings</h2> 
                            <p className="mg-bt-24">
                            Once this number hits 0, then you've missed this opportunity!
                                </p>

                                
                                <NumberContainer>
                                    <DigitBox>3</DigitBox>
                                    <DigitBox>5</DigitBox>
                                </NumberContainer>
                            </LimitedSpotsContainer>

                            <Packages />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FullPackages;
