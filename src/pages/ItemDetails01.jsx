import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Rating from '../components/Rating';
import styled, { keyframes } from 'styled-components';
import parse from 'html-react-parser';
import emailjs from 'emailjs-com';
import Tours from '../components/Tours';
import { Helmet } from 'react-helmet';
import SliderStyle3 from '../components/slider/SliderStyle3';

// Shimmer animation
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const ShimmerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  z-index: 1;
  border-radius: 10px;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: ${(props) => (props.imageLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  border-radius: 10px;
`;

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

  // Fetch data
  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/experiences/${id}/with-reviews`)
      .then((response) => response.json())
      .then((data) => {
        // Add imageLoaded property for shimmer effect
        const updatedData = {
          ...data,
          cover_photos: data.cover_photos?.map(photo => ({
            ...photo,
            imageLoaded: false,
          })) || [],
        };
        setItemData(updatedData);
        setLoading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          serviceType: ` ${data.experience?.title || ''}`,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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

    emailjs
      .send('service_ptqtluk', 'template_uyicl9l', formData, 'apNJP_9sXnff2q82W')
      .then(
        () => setFormSubmitted(true),
        (error) => console.error('Error sending email:', error)
      );
  };

  const handleImageLoad = (index) => {
    setItemData(prev => {
      const updatedPhotos = [...prev.cover_photos];
      updatedPhotos[index].imageLoaded = true;
      return { ...prev, cover_photos: updatedPhotos };
    });
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  // Guard clause for blank page
  if (!itemData) {
    // Shimmer placeholder while data is loading
    return (
      <LoaderWrapper>
        <ShimmerDiv style={{ width: '500px', height: '325px' }} />
      </LoaderWrapper>
    );
  }

  const heroSliderData = itemData.cover_photos.map((coverPhoto) => ({
    src: coverPhoto.image.cover_photos,
    imageLoaded: coverPhoto.imageLoaded,
  }));

  return (
    <div className='item-details'>
      <Helmet>
        <title>{itemData.experience?.title || ''} - Cape Town Experience</title>
        <meta name="description" content={`${itemData.experience?.title || ''} click for more info`} />
      </Helmet>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-10" style={{ color: 'white' }}>
                    {itemData.experience?.title}
                  </h4>
                  <h1 className="heading text-center">
                    <Rating value={itemData.average_rating} color={'#f8e825'} />
                  </h1>
                </div>
              </center>
              <div className="breadcrumbs style2">
                <ul>
                  <li>Based on {itemData.reviews?.length || 0} reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Slider with shimmer */}
      <SliderStyle3
        data={heroSliderData}
        renderImage={(src, _, index) => (
          <SlideContainer key={index}>
            {!itemData.cover_photos[index].imageLoaded && <ShimmerDiv />}
            <ImageStyled
              src={src}
              alt={itemData.experience?.title || 'Cover'}
              onLoad={() => handleImageLoad(index)}
              onError={handleImageError}
              imageLoaded={itemData.cover_photos[index].imageLoaded}
            />
          </SlideContainer>
        )}
      />

      {/* Experience body */}
      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-center">
                <div className="sc-item-details">
                  {parse(itemData.experience?.body || '')}
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

          <LiveAuction data={itemData.reviews || []} />
          <Tours />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails01;
