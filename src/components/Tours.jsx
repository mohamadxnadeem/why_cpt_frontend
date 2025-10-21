import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FlipMove from 'react-flip-move';
import styled, { keyframes } from 'styled-components';

// 💫 Shimmer animation
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

// 🎨 Styled components
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  z-index: 1;
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: ${(props) => (props.imageLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  border-radius: 10px;
`;

const Tours = forwardRef((ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // 🧠 Check for cached data before fetching
  useEffect(() => {
    const cached = localStorage.getItem('toursData');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error parsing cached tours:', err);
      }
    }

    // Fetch fresh data (background revalidation)
    fetch('https://web-production-1ab9.up.railway.app/api/experiences/all/')
      .then((response) => response.json())
      .then((newData) => {
        const updatedData = newData.map(item => ({
          ...item,
          firstPhoto: item.cover_photos.length > 0
            ? { ...item.cover_photos[0], imageLoaded: false }
            : null,
        }));

        setData(updatedData);
        setLoading(false);
        localStorage.setItem('toursData', JSON.stringify(updatedData)); // cache it
      })
      .catch((error) => {
        console.error('Error fetching tours data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (experienceId) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.experience.id === experienceId && item.firstPhoto) {
          return {
            ...item,
            firstPhoto: { ...item.firstPhoto, imageLoaded: true },
          };
        }
        return item;
      })
    );
  };

  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src, e);
    e.target.style.display = 'none';
  };

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">
                  5 Best Tours to do in Cape Town 2025
                </h2>

                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    767: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: false }}
                >
                  {data.slice(0, 10).map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-container show-shadow carousel auctions">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="slider-item">
                              <div className={`sc-card-product ${item.experience.feature ? 'comingsoon' : ''}`}>
                                <div className="card-media">
                                  <Link to={`/experience/${item.experience.id}`}>
                                    <SlideContainer>
                                      {item.firstPhoto && (
                                        <>
                                          {!item.firstPhoto.imageLoaded && <Shimmer />}
                                          <ImageStyled
                                            src={item.firstPhoto.image.cover_photos}
                                            alt={item.experience.title}
                                            onLoad={() => handleImageLoad(item.experience.id)}
                                            onError={handleImageError}
                                            imageLoaded={item.firstPhoto.imageLoaded}
                                          />
                                        </>
                                      )}
                                    </SlideContainer>
                                  </Link>
                                </div>
                                <div className="card-title">
                                  <h5 className="style2">
                                    <Link to={`/experience/${item.experience.id}`}>
                                      {item.experience.title}
                                    </Link>
                                  </h5>
                                </div>

                                <center>
                                  <Link
                                    to={`/experience/${item.experience.id}`}
                                    className="sc-button loadmore style fl-button pri-3"
                                  >
                                    <span>View Experience</span>
                                  </Link>
                                </center>
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
      </Fragment>
    </FlipMove>
  );
});

export default Tours;
