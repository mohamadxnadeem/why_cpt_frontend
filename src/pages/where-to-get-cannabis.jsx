import React, { useState, Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Rating from '../components/Rating';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import { Link } from 'react-router-dom';


import imgblog1 from '../assets/images/blog/cannabis.jpg';

import jana from '../assets/images/blog/jana.jpg';
import tim from '../assets/images/blog/tim.jpg';
import rachel from '../assets/images/blog/becca.jpg';
import marie from '../assets/images/blog/marie.jpg';
import micheal from '../assets/images/blog/micheal.jpg';
import dan from '../assets/images/blog/dan.jpg';
import Tours from '../components/Tours';

import emailjs from 'emailjs-com';

import { Helmet } from 'react-helmet';


const WhereToGetCannabis = () => {
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
            cover_photo: imgblog1,
            name: 'Super Cheese',
            info: 'https://www.leafly.com/strains/slurricane',
            price: '$99 for 10 grams',
            grade: 'AAA Grade',
            rating: 5,
            comment: 'Super Cheese, an indica-dominant hybrid, blends skunky musk with pungent blue cheese flavors. Bred by Positronics, its a nostalgic nod to Amsterdams 1980s strains offering a smooth, earthy buttermilk taste.',
        },
        
        {
            cover_photo: imgblog1,
            name: 'Slurricane',
            info: 'https://www.leafly.com/strains/slurricane',
            price: '$99 for 10 grams',
            grade: 'AAA Grade',
            thc: '21%',
            cbg: '1%',
            rating: 4.5,
            comment: 'Slurricane, an indica strain from Do-Si-Dos and Purple Punch, offers slow-building relaxation with sweet grape and berry flavors. Ideal for unwinding, it helps with insomnia and leaves you sofa-bound.'
        },
        
        {
            cover_photo: imgblog1,
            name: 'Kosher Kush',
            info: 'https://www.leafly.com/strains/slurricane',
            price: '$99 for 10 grams',
            grade: 'AAA Grade',
            thc: '21%',
            cbg: '1%',
            rating: 4.5,
            comment: 'Kosher Kush, or "Kosher OG," is an award-winning indica strain with high THC, offering deep relaxation and pain relief with a rich, earthy, fruity flavor. Perfect for restful sleep'
        },

        {
            cover_photo: imgblog1,
            name: 'AK-47',
            info: 'https://www.leafly.com/strains/slurricane',
            price: '$99 for 10 grams',
            grade: 'AAA Grade',
            thc: '19%',
            cbg: '1%',
            rating: 4.5,
            comment: 'AK-47 is a sativa-dominant hybrid offering a long-lasting cerebral buzz, keeping you relaxed, mentally alert, and creative. It blends sour, earthy aromas with sweet, floral flavors for a mellow experience.'
        },
       
        
       
        // Other review items...
    ];

    return (
        <div className='home-3'>
            <Helmet>
                <title>Premium Medical grade cannabis in Cape Town</title>
                <meta
                    name="description"
                    content="discrete deliveries delivered at your convenience"
                />
                <meta property="og:title" content="Premium Medical grade cannabis in Cape Town" />
                <meta
                    property="og:description"
                    content="discrete deliveries delivered at your convenience"
                />
                <meta property="og:image" content={imgblog1} /> {/* Use your image URL here */}
                <meta property="og:url" content="http://whycapetown.com/where-to-get-cannabis" /> {/* Replace with your page URL */}
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
                                    Premium Medical Grade Cannabis
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
                                Cannabis Products delivered discreetly to your doorstep!
                            </h2>
                            <div className="divider"></div>

                            <div className="inner-post mg-t-40">
                                <p className="mg-bt-24">
                                    We have sourced the best cannabis strains in Cape Town,
                                </p>
                                <p className="mg-bt-24">
                                    Checkout what suits your needs,
                                </p>
                                <p className="mg-bt-24">
                                    Same day delivery available within 10km radius of the CBD,
                                </p>
                                <p className="mg-bt-24">
                                    Click the "Order Now" button to connect you to your plug and place your order via whatsapp,
                                </p>
                                
                                
                            </div>

                            {/* <div className="image">
                                <img src={imgblog1} alt="audi" />
                            </div> */}
                            <br />
                            <br />

                            <Fragment>
                                <section className="tf-section live-auctions">
                                    <div className="themesflat-container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="">
                                                    <h2 className="tf-title">
                                                       5 Most Popular Cannabis Strains in Cape Town:
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

                                                                                    <div className="card-media">
                                                                                        <img src={item.cover_photo} alt="cape town" />
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
                                                                                                    {item.comment}
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <br></br>
                                                                                    <div className="card-title">
                                                                                        <h5>{item.price}</h5>
                                                                                    </div>
                                                                                    <center>
                                                                                    <Link target='__blank' to="https://wa.link/252zbt" className="sc-button loadmore style fl-button pri-3"><span>Whatsapp Us Now</span></Link>
                                                                                    </center>
                                                                                    
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

                           

                        </div>
                    </div>

                    <Tours />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WhereToGetCannabis;
