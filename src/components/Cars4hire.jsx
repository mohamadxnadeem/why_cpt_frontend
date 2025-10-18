import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';

// 🎨 Styled components
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: ${(props) => (props.imageLoaded ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  border-radius: 10px;
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: ${(props) => props.height || '100%'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  z-index: 1;
  border-radius: 10px;

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
`;

const Cars4Hire = forwardRef((ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚗 Load from local cache first, then fetch new data
  useEffect(() => {
    const cached = localStorage.getItem('carsData');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error parsing cached cars data:', err);
      }
    }

    fetch('https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/')
      .then((response) => response.json())
      .then((newData) => {
        const updatedData = newData.map((item) => ({
          ...item,
          firstPhoto:
            item.cover_photos.length > 0
              ? { ...item.cover_photos[0], imageLoaded: false }
              : null,
        }));
        setData(updatedData);
        setLoading(false);
        localStorage.setItem('carsData', JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.error('Error fetching cars data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (carId) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.car.id === carId && item.firstPhoto) {
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
                              <div
                                className={`sc-card-product ${
                                  item.car.feature ? 'comingsoon' : ''
                                }`}
                              >
                                <div className="card-media">
                                  <SlideContainer
                                    style={{
                                      aspectRatio:
                                        item.firstPhoto?.imageWidth &&
                                        item.firstPhoto?.imageHeight
                                          ? `${item.firstPhoto.imageWidth} / ${item.firstPhoto.imageHeight}`
                                          : '16 / 9',
                                    }}
                                  >
                                    {item.firstPhoto && (
                                      <>
                                        {!item.firstPhoto.imageLoaded && (
                                          <Shimmer
                                            height={
                                              item.firstPhoto.imageHeight
                                                ? `${
                                                    (item.firstPhoto.imageHeight /
                                                      item.firstPhoto.imageWidth) *
                                                    100
                                                  }%`
                                                : '100%'
                                            }
                                          />
                                        )}
                                        <ImageStyled
                                          src={
                                            item.firstPhoto.image.cover_photos
                                          }
                                          alt={item.car.title}
                                          onLoad={() =>
                                            handleImageLoad(item.car.id)
                                          }
                                          onError={handleImageError}
                                          imageLoaded={
                                            item.firstPhoto.imageLoaded
                                          }
                                        />
                                      </>
                                    )}
                                  </SlideContainer>
                                </div>

                                <div className="card-title">
                                  <h5 className="style2">{item.car.title}</h5>
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
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </FlipMove>
  );
});

export default Cars4Hire;
