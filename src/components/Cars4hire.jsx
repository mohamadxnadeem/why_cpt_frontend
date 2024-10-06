import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FlipMove from 'react-flip-move';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';
import Loader from './Loader'; // Import the Loader component

// Styled components
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* 16:9 aspect ratio for landscape */
  border-radius: 10px;
  overflow: hidden;
`;

const BlurhashStyled = styled(Blurhash)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.loaded ? 0 : 1)};
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers the container */
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
          firstPhoto: item.cover_photos.length > 0 ? item.cover_photos[0] : null,
        }));
        setData(updatedData);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  const handleImageLoad = (carId) => {
    setData(prevData => {
      return prevData.map(item => {
        if (item.car.id === carId && item.firstPhoto) {
          return {
            ...item,
            firstPhoto: {
              ...item.firstPhoto,
              imageLoaded: true,
            }
          };
        }
        return item;
      });
    });
  };

  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src, e);
    e.target.style.display = 'none'; // Hide broken images
  };

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                
                  <h2 className="tf-title-heading ct style-2 mg-bt-13">
                    Your Chauffer drive options:
                  </h2>
                  <p className="sub-title ct small mg-bt-20 pad-420">
                    Price includes vehicle, local tour guide, fuel, 200km distance and up to 12 hours.
                  </p>
                  

                {loading ? (
                  <Loader /> // Show the loader while loading
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
                                          <React.Fragment>
                                            <BlurhashStyled
                                              hash={item.firstPhoto.blurhash}
                                              resolutionX={32}
                                              resolutionY={32}
                                              width={500} /* Match with container width */
                                              height={281} /* Match with container height for 16:9 */
                                              punch={1}
                                              loaded={item.firstPhoto.imageLoaded}
                                            />
                                            <ImageStyled
                                              src={item.firstPhoto.image.cover_photos}
                                              alt={item.car.title}
                                              onLoad={() => handleImageLoad(item.car.id)}
                                              onError={handleImageError}
                                              imageLoaded={item.firstPhoto.imageLoaded}
                                            />
                                          </React.Fragment>
                                        )}
                                      </SlideContainer>
                                    
                                  </div>
                                  <div className="card-title">
                                    <h5 className="style2">
                                      {item.car.title}
                                    </h5>
                                  </div>

                                  <div className="meta-info">
                                    <div className="author">
                                      <div className="price" style={{ textAlign: 'left' }}>
                                       
                                        
                                        <p>${item.car.price} - Full Day</p>

                                        
                                       
                                      </div>
                                    </div>
                                  </div>
                                  <center>
                                    {/* <Link
                                      target="__blank"
                                      to={`https://wa.link/kdchjk`}
                                      className="sc-button loadmore style fl-button pri-3"
                                    >
                                      <span>Reserve Now</span>
                                    </Link> */}
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
