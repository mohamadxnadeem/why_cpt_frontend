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

// 🔥 Shimmer Animation Keyframes
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// ✅ Shimmer Placeholder
const ShimmerPlaceholder = styled.div`
  width: 100%;
  height: 325px;
  border-radius: 10px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  margin-top: 20px;
`;

// ✅ Image Container
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const VillaDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    serviceType: '',
    email: '',
  });

  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/villa/${id}/details/`)
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
        setFormData((prev) => ({
          ...prev,
          serviceType: `${data.accomodation.title}`,
        }));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

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
      .catch((error) => console.error('Error sending email:', error));
  };

  if (!itemData) {
    // Simple shimmer while fetching data
    return (
      <>
        <Header />
        <div style={{ padding: '50px 0' }}>
          <div className="themesflat-container">
            <ShimmerPlaceholder />
            <ShimmerPlaceholder style={{ height: '30px', marginTop: '15px' }} />
            <ShimmerPlaceholder style={{ height: '20px', width: '80%', marginTop: '10px' }} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const heroSliderData = itemData.cover_photos
    ? itemData.cover_photos.map((photo) => photo.image.cover_photos)
    : [];

  return (
    <div className="item-details">
      <Helmet>
        <title>{itemData.accomodation.title} - WhyCapeTown</title>
        <meta
          name="description"
          content={`Don't miss out on ${itemData.accomodation.title} — click for more info!`}
        />
      </Helmet>

      <Header />

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
                    {itemData.accomodation.title}
                  </h4>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>

      <div className="themesflat-container">
        {!imagesLoaded && <ShimmerPlaceholder />}

        <ImageContainer>
          {heroSliderData.length > 0 &&
            heroSliderData.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Villa ${index + 1}`}
                onLoad={handleImageLoad}
                onError={(e) => (e.target.style.display = 'none')}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  display: imagesLoaded ? 'block' : 'none',
                }}
              />
            ))}
        </ImageContainer>
      </div>

      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="content-center">
            <div className="sc-item-details">
              <div>{parse(itemData.accomodation.body)}</div>
            </div>
          </div>

          <div className="tf-section tf-item-details">
            <div className="container">
              <div className="content-center">
                <div className="sc-item-details">
                  {formSubmitted ? (
                    <div className="thank-you-message">
                      <h2>Thank You!</h2>
                      <p>Your enquiry has been successfully submitted. We’ll get back to you soon.</p>
                    </div>
                  ) : (
                    <Fragment>
                      <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        Request to book 
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
                                placeholder="Let us know the dates you wouldl like to book"
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
                          </div>
                        </form>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
