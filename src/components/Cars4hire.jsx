import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper';
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
  transition: opacity 1.4s ease-in-out; /* ✅ slower, cinematic fade */
  border-radius: 10px;
`;

const Cars4Hire = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load & refetch logic
  useEffect(() => {
    const cacheKey = 'carsData';
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
      } catch (err) {}
    }

    fetch('https://web-production-1ab9.up.railway.app/api/cars-for-hire/premium/', { cache: 'no-store' })
      .then((response) => response.json())
      .then((newData) => {
        const updated = newData.map((item) => {
          const photo =
            item.cover_photos?.[0]?.cover_photos ||
            item.cover_photos?.[0]?.image?.cover_photos ||
            item.cover_photos?.[0]?.url ||
            null;

          return {
            ...item,
            firstPhoto: photo ? { url: photo, imageLoaded: false } : null,
          };
        });

        setData(updated);
        localStorage.setItem(cacheKey, JSON.stringify(updated));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageLoad = (carId) => {
    setData((prev) =>
      prev.map((item) =>
        item.car?.id === carId && item.firstPhoto
          ? { ...item, firstPhoto: { ...item.firstPhoto, imageLoaded: true } }
          : item
      )
    );
  };

  const handleImageError = (e) => (e.target.style.display = 'none');

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <h2 className="tf-title-heading ct style-2 mg-bt-13">Premium Options</h2>
            <p className="sub-title ct small mg-bt-20 pad-420">All Black top of the line vehicles</p>

            {loading ? (
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ width: '250px', height: '200px', position: 'relative' }}>
                    <Shimmer />
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                speed={1100} /* ✅ smooth slow transition */
                breakpoints={{
                  0: { slidesPerView: 1, effect: 'fade' }, /* cinematic fade on mobile */
                  767: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="sc-card-product">
                      <div className="card-media">
                        <SlideContainer>
                          {!item.firstPhoto?.imageLoaded && <Shimmer />}
                          {item.firstPhoto && (
                            <ImageStyled
                              src={item.firstPhoto.url}
                              alt={item.car?.title}
                              onLoad={() => handleImageLoad(item.car?.id)}
                              onError={handleImageError}
                              imageLoaded={item.firstPhoto.imageLoaded}
                            />
                          )}
                        </SlideContainer>
                      </div>

                      <h5 className="style2">{item.car?.title}</h5>

                      {item.car?.number_of_seats && (
                        <p style={{ fontSize: '14px', color: '#6f6f6f', marginTop: '6px' }}>
                          Up to {item.car.number_of_seats} guests
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                        <span style={{ fontSize: '15px', color: '#555' }}>Starting from:</span>
                        <span style={{ fontSize: '20px', fontWeight: '700', color: '#0b5b33' }}>
                          R{Math.round(item.car?.price)} / Per Day
                        </span>
                      </div>

                      <center>
                        <Link target="_blank" to="https://wa.link/i3muj9" className="sc-button loadmore style fl-button pri-3">
                          <span>Reserve Now</span>
                        </Link>
                      </center>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </section>
      </Fragment>
    </FlipMove>
  );
});

export default Cars4Hire;