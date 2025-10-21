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

const Shimmer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: ${(props) => props.height || '100%'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
  z-index: 1;
  border-radius: 10px;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
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
  transition: opacity 0.5s ease-in-out;
  border-radius: 10px;
`;

const Cars4Hire = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load cache and always refetch for fresh data
  useEffect(() => {
    const cacheKey = 'carsData';
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
      } catch (err) {
        console.error('Error parsing cached cars data:', err);
      }
    }

    // Always refetch fresh data
    fetch('https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((newData) => {
        const updatedData = newData.map((item) => {
          const photo =
            item.cover_photos?.[0]?.cover_photos ||
            item.cover_photos?.[0]?.image ||
            item.cover_photos?.[0]?.image?.cover_photos ||
            item.cover_photos?.[0]?.url ||
            null;

          return {
            ...item,
            firstPhoto: photo ? { url: photo, imageLoaded: false } : null,
          };
        });

        setData(updatedData);
        localStorage.setItem(cacheKey, JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.error('Error fetching cars data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageLoad = (carId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.car?.id === carId && item.firstPhoto
          ? { ...item, firstPhoto: { ...item.firstPhoto, imageLoaded: true } }
          : item
      )
    );
  };

  const handleImageError = (e) => {
    console.warn('Error loading car image:', e.target.src);
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
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      overflowX: 'auto',
                      paddingBottom: '10px',
                    }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '250px',
                          height: '200px',
                          position: 'relative',
                          borderRadius: '10px',
                          flexShrink: 0,
                        }}
                      >
                        <Shimmer />
                      </div>
                    ))}
                  </div>
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
                  >
                    {data.length === 0 ? (
                      <p>No cars available.</p>
                    ) : (
                      data.slice(0, 10).map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="swiper-slide">
                            <div className="slider-item">
                              <div
                                className={`sc-card-product ${
                                  item.car?.feature ? 'comingsoon' : ''
                                }`}
                              >
                                <div className="card-media">
                                  <SlideContainer>
                                    {item.firstPhoto && (
                                      <>
                                        {!item.firstPhoto.imageLoaded && <Shimmer />}
                                        <ImageStyled
                                          src={item.firstPhoto.url}
                                          alt={item.car?.title}
                                          onLoad={() => handleImageLoad(item.car?.id)}
                                          onError={handleImageError}
                                          imageLoaded={item.firstPhoto.imageLoaded}
                                        />
                                      </>
                                    )}
                                  </SlideContainer>
                                </div>

                                <div className="card-title">
                                  <h5 className="style2">{item.car?.title}</h5>
                                </div>

                                <center>
                                  <Link
                                    target="__blank"
                                    to="https://wa.link/i3muj9"
                                    className="sc-button loadmore style fl-button pri-3"
                                  >
                                    <span>Reserve Now</span>
                                  </Link>
                                </center>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    )}
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