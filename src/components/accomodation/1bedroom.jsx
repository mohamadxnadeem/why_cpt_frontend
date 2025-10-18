import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FlipMove from 'react-flip-move';
import styled, { keyframes } from 'styled-components';

// 💫 Unified shimmer animation (same as Tours & Cars4Hire)
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

// 🎨 Styled shimmer placeholder
const Shimmer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: ${(props) => props.height || '100%'};
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  z-index: 1;
  border-radius: 10px;
`;

// 🖼️ Image container & styling
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

const OneBedroom = forwardRef((ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load cached accommodations first, then fetch new data
  useEffect(() => {
    const cached = localStorage.getItem('oneBedroomData');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error parsing cached one-bedroom data:', err);
      }
    }

    fetch('https://web-production-1ab9.up.railway.app/api/one_bedroom/all/')
      .then((response) => response.json())
      .then((newData) => {
        const updatedData = newData.map((item) => ({
          ...item,
          firstPhoto: item.cover_photos.length > 0
            ? { ...item.cover_photos[0], imageLoaded: false }
            : null,
        }));

        setData(updatedData);
        setLoading(false);
        localStorage.setItem('oneBedroomData', JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.error('Error fetching one-bedroom data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (accommodationId) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.accomodation.id === accommodationId && item.firstPhoto) {
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
                  Luxury Apartments in Camps Bay
                </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                  2-Minute walk to the beach — the safest suburb in Cape Town.
                </p>

                {/* 🪞 Shimmer placeholders while loading */}
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
                    scrollbar={{ draggable: false }}
                  >
                    {data.slice(0, 10).map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product">
                              <div className="card-media">
                                <SlideContainer>
                                  {item.firstPhoto && (
                                    <>
                                      {!item.firstPhoto.imageLoaded && (
                                        <Shimmer />
                                      )}
                                      <ImageStyled
                                        src={item.firstPhoto.image.cover_photos}
                                        alt={item.accomodation.title}
                                        onLoad={() =>
                                          handleImageLoad(item.accomodation.id)
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
                                <h5 className="style2">
                                  {item.accomodation.title}
                                </h5>
                              </div>

                              <div className="meta-info">
                                <div className="author">
                                  <div className="price" style={{ textAlign: 'left' }}>
                                    <p>
                                      From ${item.accomodation.min_price} per night
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <center>
                                <Link
                                  to={`/1-Bedroom-Apartments/${item.accomodation.id}`}
                                  className="sc-button loadmore style fl-button pri-3"
                                >
                                  <span>View Accommodation</span>
                                </Link>
                              </center>
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

export default OneBedroom;
