import React, { useState, Fragment, useEffect } from 'react';
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
import Tours from '../components/Tours';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Cars4Hire from '../components/Cars4hire';

// Import the background image correctly
import backgroundImage from '../assets/images/item-background/tour.jpeg'; 

const Top3Tours = () => {

    

    const [modalShow, setModalShow] = useState(false);
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
            // Open Calendly link in a new tab for mobile devices
            window.open('https://calendly.com/mohamadxnadeem/30min', '_blank');
        } else if (window.Calendly) {
            // Trigger Calendly popup for desktop users
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
            comment: 'A straightforward and reliable service. The car was clean, the driver was polite, and we arrived at the airport without any issues. It’s a service I’ll definitely consider using again'
        },
        {
            cover_photo: tim,
            name: 'Jodi',
            title: 'England',
            rating: 5,
            comment: 'I’ve used several airport transfer services in Cape Town, and this one stands out for its reliability. The driver was friendly and professional, and the vehicle was comfortable. Definitely using them again.'
        },
        {
            cover_photo: rachel,
            name: 'Serisha',
            title: 'USA',
            rating: 4,
            comment: 'The service was solid—on time, clean car, and a courteous driver. I appreciated the little details like a bottle of water waiting for me. It made the ride more pleasant after a long flight.'
        },
        {
            cover_photo: marie,
            name: 'Amina',
            title: 'Netherlands',
            rating: 4,
            comment: 'Punctual and professional—exactly what you want from an airport transfer. The driver knew the best route to avoid traffic, which helped me get to the airport with time to spare. No complaints!'
        },
        {
            cover_photo: micheal,
            name: 'Gunnar',
            title: 'England',
            rating: 5,
            comment: 'Great service! My driver was right on time, the car was clean, and the ride was smooth. It made getting to the airport hassle-free, which is exactly what I needed after a long day.'
        },
    ];

    return (
        <div className='home-3'>
            <Helmet>
                <title>5 Tours you have to add to your Cape Town bucket list</title>
                <meta name="description" content="Best value for money, check website for pricing" />
                <meta property="og:title" content="Luxury tours and transport in Cape Town to fit every budget" />
                <meta property="og:description" content="Best value for money, check website for pricing" />
                <meta property="og:image" content={imgblog1} />
                <meta property="og:url" content="http://whycapetown.com/luxury-chauffeured-drives-airport-transfers" />
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
                                {/* <h1 className="heading text-center">
                                    Luxury Chauffeured Drives for VIPs in Cape Town
                                </h1> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="tf-section post-details">
                <div className="themesflat-container">
                    <div className="post">
                        <div className="inner-content">
                            <h2 className="title-post">
                                The Best Tours   
                            </h2>
                            <h2 className="title-post">
                                And most Exclusive Experiences in Cape Town 
                            </h2>
                           
                            <div className="divider"></div>

                            <div className="inner-post mg-t-40">
                                <p className="mg-bt-24">
                                    We specialize in providing private tours to new honey moon couples, girls trips, guys trips, business executives and international millionares who wants a luxury stay in Cape Town and to dicover:
                                </p>
                               
                                    <p className="mg-bt-24">
                                        - All the top attractions,
                                    </p>
                                    <p className="mg-bt-24">
                                        - Instagram worthy locations,
                                    </p>
                                    <p className="mg-bt-24">
                                        - Best resturants,
                                    </p>
                                    <p className="mg-bt-24">
                                        - Secret spots,
                                    </p>
                                    <p className="mg-bt-24">
                                        - hidden gems,
                                    </p>
                                    <p className="mg-bt-24">
                                        - and more...
                                    </p>
                                
                               
                            </div>
                            <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Ready to secure your Private Tour?                              
                                </h1>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Then click the button below to book a quick meeting to plan your private tours to your requirments now. 
                                 </p>

                                <center>

                                 <Link
                                    to="#"
                                    onClick={openCalendlyPopup}
                                    className="sc-button loadmore style fl-button pri-3"
                                >
                                    <span>Schedule Free Consultation with a Travel Expert</span>
                                </Link>

                                  </center>
                            <Tours />


                            <br />
                            <br />

                            
                            
                            {/* <Fragment>
                                <section className="tf-section live-auctions">
                                    <div className="themesflat-container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="">
                                                    <h2 className="tf-title">
                                                        Reviews
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
                            </Fragment> */}
                        </div>
                    </div>

                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Top3Tours;
