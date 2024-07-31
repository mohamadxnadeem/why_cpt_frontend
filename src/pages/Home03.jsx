import React , { useState , Fragment } from 'react';
import Header from '../components/header/Header';
import heroSliderData from '../assets/fake-data/data-slider-3';
import Slider from '../components/slider/Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Link } from 'react-router-dom';
import CardModal from '../components/layouts/CardModal';
import Rating from '../components/Rating'

import Footer from '../components/footer/Footer'


import ReactGA from "react-ga4";
import Tours from '../components/Tours';
import { Accordion } from 'react-bootstrap-accordion'

import imgblog2 from '../assets/images/blog/airport2.jpeg'

import hof1 from '../assets/images/blog/hof1.jpg'
import hof2 from '../assets/images/blog/hof2.jpg'
import hof from '../assets/images/blog/hof.jpg'
import hof4 from '../assets/images/blog/hof4.png'
import hof5 from '../assets/images/blog/hof5.png'
import hof6 from '../assets/images/blog/hof6.png'
import hof7 from '../assets/images/blog/hof7.png'

import cobra from '../assets/images/blog/cobra.jpg'
import chopper from '../assets/images/blog/chopper.jpg'
import bokaap from '../assets/images/blog/bokaap.jpg'



import jana from '../assets/images/blog/jana.jpg'
import tim from '../assets/images/blog/tim.jpg'
import rachel from '../assets/images/blog/becca.jpg'
import marie from '../assets/images/blog/marie.jpg'
import micheal from '../assets/images/blog/micheal.jpg'
import dan from '../assets/images/blog/dan.jpg'











const Home03 = () => {
    const [modalShow, setModalShow] = useState(false);

    const socialList = [
     
        {
            icon: "fab fa-instagram",
            link: "https://www.instagram.com/whycapetown"
        },
     
        
        

    ]

    const [data] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'Is Cape Town safe?',
                text: 'Cape Town is one of the safest cities in the world but there are some places on the outskirts of the city that is extremely dangerous. Especially if you not from the area. Thats why its best to travel with a guide for the first time to teach you about where not to go and what not to do',
            },
            {
                key: "1",
                title: 'What is the best time of year to visit Cape Town?',
                text: 'Summer is the most popular time to visit, the best weather with temperatues averaging around 30 degrees calcius, clear skys and beach days. (September - May)',
            },
            {
                key: "2",
                title: 'How do I get from the airport to the city center?',
                text: 'We are going to be biased and say that its best to arrange your airport transfers with us, but its best to arrange it with a reputable company before hand or someone that you know. ',
            },
            {
                key: "3",
                title: 'What are the best neighborhoods to stay in Cape Town for tourists?',
                text: 'Best Neighborhoods: Camps Bay, Sea Point, Gardens, Die Waterkant, Stellenbosch, Franshoek, Century City, Bloubergstand, Fishoek',
            },
            {
                key: "4",
                title: 'What are some traditional South African dishes I should try in Cape Town?',
                text: 'Cape Town has the best food in the world. You have to try the breakfast at the Bokaap Deli, make sure you try a koeksister while you there, a gatsby from steelies at waterfront, ',
            },
            {
                key: "5",
                title: 'What language do people speak in Cape Town?',
                text: 'South Africa has 9 offical languages but everyone speaks English and Afrikaans (similar to dutch and german)',
            },
            {
                key: "6",
                title: 'What are the best places and attractions to visit in Cape Town?',
                text: 'You cant travel all the way to Cape Town and not visit Table Mountain, Cape of Goodhope, Chapmans Peak, Stellenbosch and the V and A Waterfront',
            },
            {
                key: "7",
                title: 'Do you offer photography services?',
                text: 'Yes, all our tour guides has special photography skills. 99% of all the images of our website were taken by our tourguides. So if you happy with those angles and quality.',
            },
           
          
           
          
        ]
    )

    const items = [
        {
            cover_photo: jana,
            name: 'Jana',
            title: 'Saudi Arabia',
            rating: 5,
            comment: 'This tour is a must, you get to see the majority of the beautiful spots in Cape Town in one day! Nadeem is great, talking with him was fun and he was very considerate and kind he even helped out another person when his car was out of water. He took amazing pictures of us and of others because he was asked to do so a lot 😂'
        },
        {
            cover_photo: dan,
            name: 'Dan',
            title: 'England',
            rating: 4.7,
            comment: 'An absolute must-do in Cape Town! The tour took us to hidden gems, and I felt like I was in a different world. The Cape Peninsulas beauty is indescribable. If you want a once-in-a-lifetime experience, this is it'
        },
        {
            cover_photo: tim,
            name: 'Tim',
            title: 'England',
            rating: 5,
            comment: 'Nadeem was a great guide! We had an amazing day sightseeing, including a fantastic little stop for fish chips. A very chilled out and relaxing drive in some of the most amazing scenery. The next day he also very kindly helped us out a very early airport transfer. A great driver and a lovely guy. Highly recommend.'
        },
        {
            cover_photo: rachel,
            name: 'Rachel',
            title: 'USA',
            rating: 5,
            comment: 'Good guide. Took us to all the places we wanted to see and talked about some of the history. Provided snacks and water for the trip.'
        },
        {
            cover_photo: marie,
            name: 'Ann',
            title: 'Netherlands',
            rating: 4,
            comment: 'Mohammed Nadeem gave us lots of time to enjoy the whole day. He had a comfortable vehicle and great snacks for the road! He always watched over our things as we wandered about each location. If youre someone who likes great pictures, hes your guy.'
        },
        {
            cover_photo: micheal,
            name: 'Micheal',
            title: 'England',
            rating: 5,
            comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        },
       
        

        
    ];


   
    
    return (
        <div className='home-3'>    

            <Header />
            <Slider data={heroSliderData} />

            <section className="tf-help-left tf-section">
                <div className="themesflat-container">
                    <div className="row">

                        <div className="col-12">
                            <br></br>

                                <center>
                                    {/* Youtube Video Link: */}
                                    {/* <div class="video-container">
                                        <iframe src="https://www.youtube.com/embed/3abEtWTaYqY?si=qh8RlhCKHHYyZpVZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                    </div> */}
                                </center>

                                <br></br>

                            <div className="text-container">

                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Excited to plan your first trip to Cape Town?
                                </h1>
                                

                                {/* <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    As you should be because it is the best city in the world!
                                </h1> */}

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    And in just a few moments, you're going to find out everything you need to know about Cape Town.
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Top attractions, 
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    best restaurants, 
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    safety tips 
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    and the common mistakes all the first-time visitors make, but not you.
                                </p>
                      
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Because you just found the holy grail of all guides to Cape Town.
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    And before we get into that, let's first check out some of the photographs taken for our clients by some of our tour guides at the most iconic attractions in Cape Town.

                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                </p>
                                <br></br>
                                <br></br>
                                <br></br>

                              




                                {/* <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Discover Cape Town's Top 10 Attractions and Best Kept Secrets
                                </h1>
                           
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    And Everything you need to know before planning your trip to Cape Town. Top attractions, restaurants, and all the best-kept secrets revealed right here.
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    We've been in the travel industry since 1997, that's 27 years of providing excellent service to our esteemed clients and forging relationships with other service providers, which means we can hook you up with the best deals, exclusive tours and VIP treatment when you travel with us.                                
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Some of our clients included Abid Kazi, CEO of Sunnah Musk and many more high-profile clients from over 30 different cities.
                                </p>

                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    RELIABLE TRAVEL PARTNER YOU CAN TRUST 
                                </h1>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    To help arrange your package to Cape Town, Accommodation, Transportation and Tours.
                                </p>

                                <br></br>

                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>Tours in </strong>English, German, Spanish and Portuguese.</p>


                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>Exlusive Transport </strong>with local guides to showcase the best of Cape Town.                        </p>
                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>Customized Itineraries </strong> to explore at your own pace.                      </p>
                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>Safety and Comfort </strong> throughout your journey.                       </p>
                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>VIP Access </strong> to the best restaurants and hidden gems.                        </p>
                                <p  className="sub-title ct small mg-bt-20 pad-420">- <strong>Personalized Service </strong> to meet all your needs and desires.                        </p>

                               */}

                             

                            
                     

                              


                          

                                <div className="image-grid">
                                    <div className="image-box">
                                        <center>
                                            <h4>Table Mountain</h4>
                                            <br></br>
                                            <img className="homeImages" src={hof1} alt="Axies" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                     
                                        <h4>Aquila Safari</h4>
                                        <br></br>
                                        <img className="homeImages" src={hof2} alt="Axies" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                            <h4>Chapmans Peak</h4>
                                            <br></br>
                                            <img className="homeImages" src={hof} alt="Axies" />
                                        </center>
                                    </div>
                                </div>

                                <br></br>
                                <br></br>

                                <Fragment>
                                    <section className="tf-section live-auctions">
                                        <div className="themesflat-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="">
                                                        <h2 className="tf-title">Genuine Reviews </h2>
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
                                                                                        <p>From {item.title}</p>
                                                                                    </div>
                                                                                    <div className="card-title">
                                                                                        <h5>
                                                                                            <Rating value={item.rating} color={'#f8e825'} />
                                                                                        </h5>
                                                                                    </div>
                                                                                    <div className="meta-info">
                                                                                        <div className="author">
                                                                                            <div className="info">
                                                                                                <h6>"{item.comment}"</h6>
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


                                    <CardModal show={modalShow} onHide={() => setModalShow(false)} />
                                </Fragment>

                                
            <section className="tf-section wrap-accordion">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Everything You Need To Know:
                                </h2>

                            </center>
                            
                            
                        </div>
                        <div className="col-md-12">
                            <div className="flat-accordion2">
                                {
                                    data.map((item,index) => (
                                        <Accordion key={index} title={item.title} >
                                            <p>{item.text}</p>
                                        </Accordion>
                                    ))
                                }                             
                            </div>
                        </div>
                        {/* <div className="col-md-12">
                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                Any Other Questions?                            
                            </h2>
                           
                            <center>
                                <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Let us know</span></Link>
                            </center>
  
                        </div> */}
                    </div>
                </div>
            </section>


                                
                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            GET A FREE QUOTE                            </h2>
                            <p  className="sub-title ct small mg-bt-20 pad-420">If you're ready to get a taste of the luxury life in Cape Town then,  </p>

                            <p  className="sub-title ct small mg-bt-20 pad-420">Contact us via WhatsApp to get a free, no-obligation quote for your trip to Cape Town. Best Price Guaranteed.  </p>

                            <center>
                                <Link target='__blank' to="https://wa.link/zi8605" className="sc-button loadmore style  fl-button pri-3"><span>Contact Us Now</span></Link>
                            </center> 
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>


                        
                                


                                <div className="image-grid">
                                    <div className="image-box">
                                        <center>
                                            <h4>Helicopter Tour</h4>
                                            <br></br>

                                            <img className="homeImages" src={chopper} alt="helicopter ride in cape town" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                        <h4>Chapmans Peak with a Cobra</h4>
                                        <br></br>
                                        <img className="homeImages" src={cobra} alt="cobra experience around chapmans peak" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                            <h4>Bokaap</h4>
                                            <br></br>
                                            <img className="homeImages" src={bokaap} alt="bokaap" />
                                        </center>
                                    </div>
                                </div>

                        
                            </div>
                        </div>                                    
                    </div>
                </div>

            </section>

            <Tours />

           

            <Footer />     
        </div>
    );
}

export default Home03;
