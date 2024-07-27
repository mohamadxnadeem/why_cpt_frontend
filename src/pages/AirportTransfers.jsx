import React , { useState , Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardModal from '../components/layouts/CardModal';
import Rating from '../components/Rating'

import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/box-item/icon1-recont-post.jpg'
import img2 from '../assets/images/box-item/icon2-recont-post.jpg'
import img3 from '../assets/images/box-item/icon3-recont-post.jpg'
import img4 from '../assets/images/box-item/icon4-recont-post.jpg'
import imgblog1 from '../assets/images/blog/airport.png'
import jana from '../assets/images/blog/jana.jpg'
import tim from '../assets/images/blog/tim.jpg'
import rachel from '../assets/images/blog/becca.jpg'
import marie from '../assets/images/blog/marie.jpg'
import micheal from '../assets/images/blog/micheal.jpg'
import dan from '../assets/images/blog/dan.jpg'
import Tours from '../components/Tours';



const AirportTransfers = () => {

    const [modalShow, setModalShow] = useState(false);
   
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
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <br></br>
                                <br></br>

                                <h1 className="heading text-center">Premium Airport Transfers in Cape Town  </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">

                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post">For VIPs with a Taste for Class</h2>
                                <div className="divider"></div>
                              
                               
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">And what better vehicle is there for high-status individuals than a Mercedes? 
                                    </p>
                                    <p className="mg-bt-24">Experience unparalleled luxury and comfort with our top-of-the-line Mercedes fleet, 
                                    </p>
                                    <p className="mg-bt-24">ensuring your journey is as stylish and sophisticated as you are.
                                    </p>


                                   
                                </div> 

                                 
                                <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div> 

                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">Our service doesn't stop at luxury vehicles. 
                                    </p>
                                    <p className="mg-bt-24">We pride ourselves on offering professional drivers and guides who are dedicated to getting you safely to your destination. 
                                    </p>
                                    <p className="mg-bt-24">Each of our chauffeurs is expertly trained, discreet, and knowledgeable about Cape Town, ensuring a smooth and enjoyable ride from the moment you step off the plane. 
                                    </p>
                                    <p className="mg-bt-24">Travel with confidence, knowing that our team prioritizes your comfort, safety, and privacy above all else.
                                    </p>

                                    <p className="mg-bt-24">With us, you can relax and enjoy the journey, leaving the details to our experienced professionals.
                                    </p>
                                 

                                   
                                </div> 
                                    
                                <div className="inner-post mg-t-24">
                                    <p>Contact us today to learn more about our bespoke airport transfer services, tailored exclusively for VIP clients like you.                                     </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Contact Us</span></Link>
                                    
                                    </center>
                                                <br></br>        
                                </div>
                                
                               
                                <div className="divider d2"></div>
                                       
                            </div>
                      
                        </div>

                        <Tours />


                </div>
            </div>
            <Footer />
        </div>
    );
}
export default AirportTransfers;
