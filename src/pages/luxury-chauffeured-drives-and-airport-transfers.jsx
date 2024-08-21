import React, { useState, Fragment } from 'react';
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

import Cars4Hire from '../components/Cars4hire';


const AirportTransfers = () => {
    const [modalShow, setModalShow] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false); // Add this state


    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        serviceType: 'Airport Transfer',
        email: '',
    });

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
                    setFormSubmitted(true); // Show the thank-you message
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
        // Other review items...
    ];

    return (
        <div className='home-3'>
            <Helmet>
                <title>Reliable Airport Transfers in Cape Town</title>
                <meta
                    name="description"
                    content="Experience stress-free and reliable airport transfers in Cape Town with our professional drivers and comfortable vehicles. Ideal for sophisticated professionals."
                />
                <meta property="og:title" content="Reliable Airport Transfers in Cape Town" />
                <meta
                    property="og:description"
                    content="Experience stress-free and reliable airport transfers in Cape Town with our professional drivers and comfortable vehicles. Ideal for sophisticated professionals."
                />
                <meta property="og:image" content={imgblog1} /> {/* Use your image URL here */}
                <meta property="og:url" content="http://whycapetown.com/airport-transfers" /> {/* Replace with your page URL */}
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <br />
                                <br />

                                <h1 className="heading text-center">
                                    Luxury Chauffeured Drives for VIPs in Cape Town
                                </h1>
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
                                Warning! Not for brokies.
                            </h2>
                            <div className="divider"></div>

                            <div className="inner-post mg-t-40">

                            <p className="mg-bt-24">
                                If you're flying on economy, don't value your safety, don't value relationships and have a broke scarcity mindset,                            </p>
                            <p className="mg-bt-24">
                                Then our services are not for you because we offer elite-level chauffeur services in premium vehicles to clients with class.                            </p>
                               
                            <p className="mg-bt-24">
                                So, if you're a sophisticated intellectual who enjoys the finer things in life, then book with us and discover the secrets of Cape Town with us.                            </p>
                            <p className="mg-bt-24">
                                Request King Mo ( our top tour guide ) if you would like to include photography services.                             </p>
                               
                               
                            </div>

                            
                            <br />
                            <br />

                            <Cars4Hire/>
                            <div className="inner-post mg-t-40">
                                <h2 className="title-post">
                                    Why so expensive?
                                </h2>
                                <br></br>
                                <br></br>

                                <p className="mg-bt-24">
                                    We're not expensive. We offer Premiums services to high-profile clients who value time and experiences over money.
                                </p>
                                <p className="mg-bt-24">
                                    Infact we guarantee we can offer you the best value for money on the market.  
                                </p>
                                
                                
                               
                               
                             
                               


                                
                               
                            </div>

                            <Fragment>
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
                            </Fragment>

                           

                            

                            {/* {formSubmitted ? (
    <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>Your enquiry has been successfully submitted. We will get back to you soon.</p>
    </div>
) : (
    <Fragment>
        <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
            Ready to book your Airport Transfer?
        </h1>

        <div className="form-inner">
            <form
                id="contactform"
                noValidate="novalidate"
                className="form-submit"
                onSubmit={handleSubmit}
            >
                <input
                    id="name"
                    name="name"
                    tabIndex="1"
                    aria-required="true"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    id="contactNumber"
                    name="contactNumber"
                    tabIndex="1"
                    aria-required="true"
                    type="text"
                    placeholder="Your Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />
                
                <input
                    id="email"
                    name="email"
                    tabIndex="2"
                    aria-required="true"
                    type="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="sc-button loadmore style fl-button pri-3"
                >
                    Submit
                </button>
            </form>
        </div>
    </Fragment>
)} */}


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
