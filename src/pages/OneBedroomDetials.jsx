import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import SliderStyle3 from '../components/slider/SliderStyle3';
import 'react-tabs/style/react-tabs.css';
import parse from 'html-react-parser';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';

// 🔥 Shimmer animation
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// ✅ Shimmer styled component
const Shimmer = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '20px'};
  border-radius: ${(props) => props.radius || '6px'};
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: ${(props) => props.marginBottom || '10px'};
`;

const SliderWrapper = styled.div`
  padding-top: 20px;
`;

const OneBedroom = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    serviceType: '',
    email: '',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
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

  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/one_bedroom/${id}/details/`)
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          serviceType: ` ${data.accomodation.title}`,
        }));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');

    emailjs.send('service_ptqtluk', 'template_uyicl9l', formData, 'apNJP_9sXnff2q82W')
      .then(() => setFormSubmitted(true))
      .catch((error) => console.error('Email error:', error));
  };

  const heroSliderData = itemData && itemData.cover_photos
    ? itemData.cover_photos.map((cover) => ({ src: cover.image.cover_photos }))
    : [];

  return (
    <div className='item-details'>
      <Helmet>
        <title>Don't miss out on this accomodation if you're in Cape Town</title>
        <meta name="description" content={itemData?.accomodation?.title + ' click for more info'} />
        <meta property="og:title" content="Look what I found" />
      </Helmet>

      <Header />

      {/* Hero Title */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  {loading ? (
                    <Shimmer width="250px" height="32px" radius="6px" />
                  ) : (
                    <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-10" style={{ color: 'white' }}>
                      {itemData.accomodation.title}
                    </h4>
                  )}
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>

      {/* Slider */}
      <SliderWrapper>
        {loading ? (
          <Shimmer height="400px" radius="12px" />
        ) : (
          <SliderStyle3 data={heroSliderData} />
        )}
      </SliderWrapper>

      {/* Details Body */}
      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-center">
                <div className="sc-item-details">
                  {loading ? (
                    <>
                      <Shimmer height="20px" width="60%" />
                      <Shimmer height="20px" width="90%" />
                      <Shimmer height="20px" width="80%" />
                      <Shimmer height="20px" width="70%" />
                    </>
                  ) : (
                    parse(itemData.accomodation.body)
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="tf-section tf-item-details">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="content-center">
                    <div className="sc-item-details">
                      {formSubmitted ? (
                        <div className="thank-you-message">
                          <h2>Thank You!</h2>
                          <p>Your enquiry has been successfully submitted. We will get back to you soon.</p>
                        </div>
                      ) : (
                        <Fragment>
                          <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            {loading ? <Shimmer width="200px" height="28px" /> : 'Let us know the dates you want to book'}
                          </h1>

                          <div className="form-inner">
                            <form id="contactform" noValidate="novalidate" onSubmit={handleSubmit}>
                              <div className="row">
                                {loading ? (
                                  <>
                                    <Shimmer height="40px" width="100%" marginBottom="12px" />
                                    <Shimmer height="40px" width="100%" marginBottom="12px" />
                                    <Shimmer height="100px" width="100%" marginBottom="12px" />
                                    <Shimmer height="50px" width="150px" marginBottom="12px" />
                                  </>
                                ) : (
                                  <>
                                    <div className="col-md-6">
                                      <input type="text" name="name" value={formData.name} placeholder="Your Name" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                      <input type="email" name="email" value={formData.email} placeholder="Your Email" onChange={handleChange} />
                                      {formError && <p style={{ color: 'red' }}>{formError}</p>}
                                    </div>
                                    <div className="col-md-12">
                                      <textarea name="message" value={formData.message} placeholder="Let us know the date you want to book" onChange={handleChange}></textarea>
                                    </div>
                                    <div className="col-md-12">
                                      <button type="submit" className="sc-button loadmore style fl-button pri-3">
                                        <span>Submit Booking Request</span>
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

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OneBedroom;
