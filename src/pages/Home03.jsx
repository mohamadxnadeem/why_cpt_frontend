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

import Packages from '../components/Packages'
import { Accordion } from 'react-bootstrap-accordion'

import TestimonialCarousel from "../components/TestimonialCarousel";


import hof1 from '../assets/images/blog/accomomdation.png'
import hof2 from '../assets/images/blog/winefarm.png'
import hof from '../assets/images/blog/moz.png'


import cobra from '../assets/images/blog/cobra.jpg'
import chopper from '../assets/images/blog/chopper.jpg'
import bokaap from '../assets/images/blog/bokaap.jpg'
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



import emailjs from 'emailjs-com';
import IGimage from '../assets/images/slider/legends.svg'
import { Link } from 'react-router-dom';

import CardList from '../components/CardList'
import FullPackages from './FullPackages';


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
           
           
          
           
          
        ]
    )

    

    



    
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

    
    

    
   // Form Function Starts here =====================================================================
  
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    serviceType: "Full Package Enquiry", // Hardcoded value
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
        <div className='home-3'>    

            <Header />
            <Slider data={heroSliderData} />
            <ImageBar /> 
              

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
                                    Plan your trip to Cape Town with us for a Stress Free vacation                                
                                </h1>

                                <hr></hr>

                            

                               

                                <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                    What you can expect when planning your trip with us:                               
                                </h1>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - We secure your dates at the best 5 star hotels                               
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - Chauffeured drives with a local tour guide to show you all the best spots and share the secrets of Cape Town with you                                
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - You get access to full day itinaries for the best experiences in Cape Town                               
                                </p>

                                <p className="sub-title ct small mg-bt-20 pad-420">
                                    - And anything else you might want or need.                             
                                </p>

                                <Fragment>
                                

                                 <TestimonialCarousel />
                            </Fragment>



                                {/* <p className="sub-title ct small mg-bt-20 pad-420">
                                    Drop your details below if you're interested in visiting Cape Town and want to plan your trip with us for a stress free vacation.             
                                </p> */}

                                           

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

                < Packages />

            </section>

            

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
                              Contact Us:
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
                                        placeholder="We need some details from you to help you have the best experience in Cape Town. Which City are you travelling from, what is the reason for your visit, how much time do you want to spend in Cape Town, how many people are travelling with you and what is your budget. If you have any questions then let us know and we will get back to you ASAP. "
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

                            
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            

            

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
