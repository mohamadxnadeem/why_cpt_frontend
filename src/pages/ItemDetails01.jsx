import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Rating from '../components/Rating';
import SliderStyle3 from '../components/slider/SliderStyle3';
import parse from 'html-react-parser';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import Tours from '../components/Tours';
import { Helmet } from 'react-helmet';
import LiveAuction from '../components/layouts/home-3/LiveAuction';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const Shimmer = styled.div`
  width: 100%;
  height: 100%;
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

const ItemDetails01 = () => {
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
    fetch(`https://web-production-1ab9.up.railway.app/api/experiences/${id}/with-reviews`)
      .then((response) => response.json())
      .then((data) => {
        // Map AWS URLs correctly for slider
        const heroSliderData = data.cover_photos.map((cover) => ({
          src: cover.image.cover_photos,
        }));

        setItemData({ ...data, heroSliderData });
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          serviceType: ` ${data.experience.title}`,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

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
      .then(
        () => setFormSubmitted(true),
        (error) => console.error('Email error:', error)
      );
  };

  return (
    <div className='item-details'>
      <Helmet>
        <title>Don't miss out on this experience if you're in Cape Town</title>
        <meta name="description" content={itemData?.experience.title + ' click for more info'} />
        <meta property="og:title" content="Look what I found" />
      </Helmet>

      <Header />

      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              {itemData ? (
                <center>
                  <div className="page-title-heading mg-bt-12">
                    <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-10" style={{ color: 'white' }}>
                      {itemData.experience.title}
                    </h4>
                    <h1 className="heading text-center">
                      <Rating value={itemData.average_rating} color={'#f8e825'} />
                    </h1>
                  </div>
                </center>
              ) : null}

              <div className="breadcrumbs style2">
                <ul>
                  <li>{itemData ? `Based on ${itemData.reviews.length} reviews` : ''}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      {loading ? (
        <LoaderWrapper>
          <Shimmer />
        </LoaderWrapper>
      ) : (
        <SliderStyle3 data={itemData.heroSliderData} />
      )}

      {/* Experience Details */}
      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-center">
                <div className="sc-item-details">
                  {itemData && parse(itemData.experience.body)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
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
                        Secure your booking now
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
                                placeholder="Please let us know the date you would like to do this tour, how many passengers and any special requests"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-12">
                              <button type="submit" className="sc-button loadmore style fl-button pri-3">
                                <span>Send Message</span>
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

      {/* Reviews & Tours */}
      {itemData && <LiveAuction data={itemData.reviews} />}
      <Tours />

      <Footer />
    </div>
  );
};

export default ItemDetails01;
