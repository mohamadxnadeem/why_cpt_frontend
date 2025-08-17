import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FlipMove from 'react-flip-move';
import styled, { keyframes } from 'styled-components';
import Loader from './Loader';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
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
  transition: opacity 1s ease-in-out;
  border-radius: 10px;
`;

const Cars4Hire = forwardRef((ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map(item => ({
          ...item,
          firstPhoto: item.cover_photos.length > 0 ? { ...item.cover_photos[0], imageLoaded: false } : null,
        }));
        setData(updatedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (carId) => {
    setData(prevData =>
      prevData.map(item =>
        item.car.id === carId && item.firstPhoto
          ? { ...item, firstPhoto: { ...item.firstPhoto, imageLoaded: true } }
          : item
      )
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
                  Why settle for less when you can have the best
                </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                  Choose your ride and let us know the dates.
                </p>

                {loading ? (
                  <Loader />
                ) : (
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
                    scrollbar={{ draggable: true }}
                  >
                    {data.slice(0, 10).map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="swiper-container show-shadow carousel auctions">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="slider-item">
                                <div className={`sc-card-product ${item.car.feature ? 'comingsoon' : ''}`}>
                                  <div className="card-media">
                                    <SlideContainer>
                                      {item.firstPhoto && (
                                        <>
                                          {!item.firstPhoto.imageLoaded && <Shimmer />}
                                          <ImageStyled
                                            src={item.firstPhoto.image.cover_photos}
                                            alt={item.car.title}
                                            onLoad={() => handleImageLoad(item.car.id)}
                                            onError={handleImageError}
                                            imageLoaded={item.firstPhoto.imageLoaded}
                                          />
                                        </>
                                      )}
                                    </SlideContainer>
                                  </div>
                                  <div className="card-title">
                                    <h5 className="style2">{item.car.title}</h5>
                                  </div>
                                  <div className="meta-info">
                                    <div className="author">
                                      <div className="price" style={{ textAlign: 'left' }}></div>
                                    </div>
                                  </div>
                                  <center>
                                    <Link
                                      target="__blank"
                                      to={'https://wa.link/i3muj9'}
                                      className="sc-button loadmore style fl-button pri-3"
                                    >
                                      <span>Reserve Now</span>
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
                )}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </FlipMove>
  );
});

export default Cars4Hire;
