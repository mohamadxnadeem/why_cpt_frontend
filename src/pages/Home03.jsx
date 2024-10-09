import React , { useState , Fragment, useEffect } from 'react';
import Header from '../components/header/Header';
import heroSliderData from '../assets/fake-data/data-slider-3';
import Slider from '../components/slider/Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardModal from '../components/layouts/CardModal';
import ImageBar from '../components/ImageBar';
import Rating from '../components/Rating'
import Footer from '../components/footer/Footer'
import Tours from '../components/Tours';
import { Accordion } from 'react-bootstrap-accordion'
import Packages from '../components/Packages';

import hof1 from '../assets/images/blog/hof1.jpg'
import hof2 from '../assets/images/blog/hof2.jpg'
import hof from '../assets/images/blog/hof.jpg'
import cobra from '../assets/images/blog/cobra.jpg'
import chopper from '../assets/images/blog/chopper.jpg'
import bokaap from '../assets/images/blog/bokaap.jpg'
import jana from '../assets/images/blog/jana.jpg'
import tim from '../assets/images/blog/tim.jpg'
import rachel from '../assets/images/blog/becca.jpg'
import marie from '../assets/images/blog/marie.jpg'
import micheal from '../assets/images/blog/micheal.jpg'
import dan from '../assets/images/blog/dan.jpg'

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



import emailjs from 'emailjs-com';
import IGimage from '../assets/images/slider/legends.svg'
import { Link } from 'react-router-dom';

import CardList from '../components/CardList'


const Home03 = () => {
    const [modalShow, setModalShow] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false); // Add state to manage form submission status


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
            cover_photo: yaasir,
            name: 'Yaasir',
            title: 'England',
            rating: 5,
            comment: 'Cape Town one of the cities that you can never get board of with such great vibes, people, positive energy and endless adventures that can be done apart from the food that you can always enjoy with a reasonable price and all thanks to the best Cape Town tour guide @whycapetown'
        },

        {
            cover_photo: yaasir,
            name: 'Yaasir',
            title: 'England',
            rating: 5,
            comment: 'Cape Town one of the cities that you can never get board of with such great vibes, people, positive energy and endless adventures that can be done apart from the food that you can always enjoy with a reasonable price and all thanks to the best Cape Town tour guide @whycapetown'
        },
        
        // {
        //     cover_photo: achmat,
        //     name: 'Achmat',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: noor,
        //     name: 'Noor',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: luka,
        //     name: 'Luka',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: renad,
        //     name: 'Renad',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        
        // {
        //     cover_photo: billy,
        //     name: 'Billy',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: jones,
        //     name: 'Jones',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: kazi,
        //     name: 'Kazi and Allen',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: yusra,
        //     name: 'Yusra',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },
        // {
        //     cover_photo: moz,
        //     name: 'Mozna',
        //     title: 'England',
        //     rating: 5,
        //     comment: 'What a perfect tour, gave us a a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore and see what we wanted. I’d highly recommend anyone visiting Cape Town to do this tour- especially if you want to see penguins, beautiful beaches with a friendly and knowledgeable and attentive guide.'
        // },


       
        

        
    ];

    



    const [formData, setFormData] = useState({
        name: '',
        fromWhere: '',
        isStudent: '',
        honeymoon: '',
        familyVacation: '',
        businessTrip: '',
        stayDuration: '',
        soloTrip: '',
        accommodationPreference: '',
        budget: '',
        email: '',
        message: ''
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
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_ptqtluk', // Replace with your EmailJS service ID
            'template_138c67b', // Replace with your EmailJS template ID
            e.target,
            'apNJP_9sXnff2q82W' // Replace with your EmailJS user ID
        ).then((result) => {
            console.log('Email successfully sent!', result.text);
            setFormSubmitted(true); // Set formSubmitted to true on successful submission
        }, (error) => {
            console.error('There was an error sending the email:', error.text);
            alert('Failed to send enquiry. Please try again later.');
        });

        // Optionally reset form data here if needed
        setFormData({
            name: '',
            fromWhere: '',
            isStudent: '',
            honeymoon: '',
            familyVacation: '',
            businessTrip: '',
            stayDuration: '',
            soloTrip: '',
            accommodationPreference: '',
            budget: '',
            email: '',
            message: ''
        });
    };

   
    
    return (
        <div className='home-3'>    

            <Header />
            <Slider data={heroSliderData} />
            <ImageBar 
                imageUrl={IGimage}   // Replace with your image link
                linkUrl="https://www.instagram.com/whycapetown/"             // Replace with the target link
                altText="Why Cape Town Instagram"                    // Replace with your alt text
            />

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
                                    You don't need to be a Millionare                               
                                </h1>
                               

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    But you have to have class.       
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    We provide exclusive experiences and travel packages to Cape Town for VIP clients from around the world.      
                                </p>

                                {/* <p className="sub-title ct small mg-bt-20 pad-420">
                                    Invite only.      
                                </p> */}



                                <br></br>

                                
                                {/* 
                                
                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Top 3 Attractions:                               
                                </h1>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    What we offer:                                
                                </p>

                                

                            


                                
                                
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Handpicked Luxury Accommodations: Cape Town’s finest hotels and private villas.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Chauffeured Drives: Elegant and safe transportation for comfort and convenience.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Private Guided Tours: Personal insights from local experts showcasing Cape Town’s hidden gems.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Bespoke Safaris: Curated wildlife adventures in exclusive, private reserves.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Scenic Helicopter Rides: Unparalleled views of Cape Town’s dramatic landscapes
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Private Yacht Charters: Luxury sailing experiences along the Cape’s stunning coastline.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Professional Photography Services: Capturing the beauty of the journey.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Exclusive Art & Culture Tours: VIP access to Cape Town’s vibrant art scene.
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    And any other special requests you might have.
                                </p>

                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    Why Choose WhyCapeTown.com?                           
                                </h1>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Personalized Itineraries: Every trip is custom-tailored to fit your unique desires and needs.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Expert Local Knowledge: Our team is based in Cape Town, giving us access to the best experiences, accommodations, and services.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Luxury and Convenience: From the moment you arrive to the moment you leave, we handle every detail to ensure a seamless and luxurious experience.
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Unmatched Experiences: Whether it’s a romantic dinner at a top-rated restaurant or a private safari tour, we create moments you’ll cherish forever.
                                </p>
                                <br></br> */}

                                
                                

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

                             

                            
                     

                              


                          

                                {/* <div className="image-grid">
                                    <div className="image-box">
                                        <center>
                                            <h4>Table Mountain</h4>
                                            <br></br>
                                            <img className="homeImages" src={hof1} alt="table mountain" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                     
                                        <h4>Aquila Safari</h4>
                                        <br></br>
                                        <img className="homeImages" src={hof2} alt="aquila safari" />
                                        </center>
                                    </div>
                                    <div className="image-box">
                                        <center>
                                            <h4>Chapmans Peak</h4>
                                            <br></br>
                                            <img className="homeImages" src={hof} alt="chapmans peak" />
                                        </center>
                                    </div>
                                </div> */}

                              

                                <Fragment>
                                    <section className="tf-section live-auctions">
                                        <div className="themesflat-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="">
                                                        <h2 className="tf-title">Legends </h2>
                                                        <center>
                                                        <p >( Past Clients )</p>
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

                                
                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    About Us                            
                                </h1>
                               

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    We're a team of trustworthy and genuine local tour guides with a passion for creating fun and safe experiences for awesome people like you.

                                </p>

                                <Fragment>
                                    <section className="tf-section live-auctions">
                                        <div className="themesflat-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="">
                                                        <h2 className="tf-title">Testimonials </h2>
                                                        <center>
                                                        <p >( What they say )</p>
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
                                                                                    {/* <div className="card-media">
                                                                                        <img src={item.cover_photo} alt="cape town" />
                                                                                    </div> */}
                                                                                    <div className="card-title">
                                                                                        <h5>{item.name}</h5>
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
                                {/* <p className="sub-title ct small mg-bt-20 pad-420">
                                    And the secret code
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    
                                </p> */}


                                {/* <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    How to Plan Your Trip to Cape Town                         
                                </h1>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Planning your dream Cape Town getaway has never been easier. Let our travel experts craft an itinerary that fits your style, from adventure-packed days to laid-back luxury escapes.                                
                                </p>
                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    Click the button below to schedule a virtual meeting with one of our travel experts and start planning your trip to Cape Town today.                                
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
                                 */}

                                
                               

                                    {/* 
                                    <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                        Ready to plan your trip to Cape Town?                              
                                    </h1>
                                    <p className="sub-title ct small mg-bt-20 pad-420">
                                        Click the button below to schedule a virtual meeting with one of our travel experts to assist you with booking your package to Cape Town.                               
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
                                    
                                    */}

            


                                
                           
                            

{/* 
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
                                </div> */}

                        
                            </div>
                        </div>                                    
                    </div>
                </div>

            </section>

            <Packages />

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

           

            <Footer />     
        </div>
    );
}

export default Home03;
