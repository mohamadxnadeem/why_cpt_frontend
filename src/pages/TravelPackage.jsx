import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SliderStyle3 from '../components/slider/SliderStyle3';
import 'react-tabs/style/react-tabs.css';
import parse from 'html-react-parser';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';

// ✅ Styled shimmer loader
const LoaderWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
`;

const Shimmer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const TravelPackage = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    serviceType: '',
    email: '',
    message: ''
  });

  // ✅ Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Fetch Full Package Data
  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/full-travel-packages/${id}/details/`)
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          serviceType: data?.fullpackage?.title || '',
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  // ✅ Form Handling
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
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    emailjs
      .send('service_ptqtluk', 'template_uyicl9l', formData, 'apNJP_9sXnff2q82W')
      .then(() => setFormSubmitted(true))
      .catch((error) => console.log('Email error:', error));
  };

  // ✅ Safely Map Hero Images
  const heroSliderData =
    itemData?.cover_photos?.map((cover) => ({
      src: cover?.cover_photos || cover?.image || ''
    })) || [];

  const packageInfo = itemData?.fullpackage;

  return (
    <div className='item-details'>
      <Helmet>
        <title>
          {packageInfo?.title || "Don't miss out on this package if you're in Cape Town"}
        </title>
        <meta
          name="description"
          content={
            packageInfo?.title
              ? `${packageInfo.title} - click for more info`
              : 'Cape Town travel package details'
          }
        />
        <meta property="og:title" content={packageInfo?.title || 'Full Package'} />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Hero section */}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  <h4 
                    className="tf-title-heading ct style-2 fs-30 mg-bt-10"
                    style={{ color: 'white' }}
                  >
                    {loading ? "Loading package..." : packageInfo?.title}
                  </h4>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>

      {/* Slider section with shimmer */}
      <div style={{ padding: '20px 0' }}>
        {loading ? (
          <LoaderWrapper><Shimmer /></LoaderWrapper>
        ) : (
          <SliderStyle3 data={heroSliderData} />
        )}
      </div>

      {/* Package details */}
      <div className="tf-section tf-item-details">
        <div className="container">
          {loading ? (
            <p>Loading details...</p>
          ) : (
            <div className="content-center">
              <div className="sc-item-details">
                {packageInfo?.body ? parse(packageInfo.body) : <p>No description available.</p>}
              </div>
            </div>
          )}

          <br />

          {/* Contact Form */}
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
                            Enquire Now
                          </h1>
                          <div className="form-inner">
                            <form id="contactform" noValidate="novalidate" onSubmit={handleSubmit}>
                              <div className="row">
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
                                  {formError && <p style={{ color: 'red' }}>{formError}</p>}
                                </div>
                                <div className="col-md-12">
                                  <textarea
                                    name="message"
                                    value={formData.message}
                                    placeholder="Let us know your preferred travel dates and any special requests"
                                    onChange={handleChange}
                                  ></textarea>
                                </div>
                                <div className="col-md-12">
                                  <button type="submit" className="sc-button loadmore style fl-button pri-3">
                                    <span>Enquire Now</span>
                                  </button>
                                </div>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TravelPackage;
