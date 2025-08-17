import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import SliderStyle3 from '../components/slider/SliderStyle3';
import 'react-tabs/style/react-tabs.css';
import parse from 'html-react-parser';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import Tours from '../components/Tours';
import { Helmet } from 'react-helmet';
import Cars4Hire from '../components/Cars4hire';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
        setItemData(data);
        setLoading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          serviceType: ` ${data.experience.title}`,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
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

  // Map the cover photos to the slider format
  const heroSliderData = itemData?.cover_photos?.map((cover) => ({
    src: cover.image.cover_photos,
    title: itemData.experience.title,
    category: 'Experience', // Optional, you can adjust
  })) || [];

  return (
    <div className="item-details">
      <Helmet>
        <title>{itemData?.experience.title || 'Loading...'} - Cape Town Experience</title>
        <meta
          name="description"
          content={itemData?.experience.body ? parse(itemData.experience.body).toString() : ''}
        />
      </Helmet>

      <Header />

      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}

      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-10" style={{ color: 'white' }}>
                    {itemData?.experience.title || 'Loading...'}
                  </h4>
                  {itemData && <Rating value={itemData.average_rating} color="#f8e825" />}
                </div>
              </center>
              {itemData && (
                <div className="breadcrumbs style2">
                  <ul>
                    <li>Based on {itemData.reviews.length} reviews</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slider with shimmer effect */}
      <SliderStyle3 data={heroSliderData} />

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
                            <form id="contactform" onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-md-6">
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    disabled={loading}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Your Email"
                                    onChange={handleChange}
                                    disabled={loading}
                                  />
                                  {formError && <p style={{ color: 'red' }}>{formError}</p>}
                                </div>
                                <div className="col-md-12">
                                  <textarea
                                    name="message"
                                    value={formData.message}
                                    placeholder="Please let us know the date you would like to do this tour, how many passengers, and any special requests"
                                    onChange={handleChange}
                                    disabled={loading}
                                  />
                                </div>
                                <div className="col-md-12">
                                  <button type="submit" className="sc-button loadmore style fl-button pri-3" disabled={loading}>
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

          <LiveAuction data={itemData?.reviews || []} />
          <Tours />
          <Cars4Hire />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetails01;
