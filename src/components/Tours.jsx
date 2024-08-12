import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Rating from './Rating';
import FlipMove from 'react-flip-move';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';

// Styled components
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
`;

const BlurhashStyled = styled(Blurhash)`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 325px;
  z-index: 1;
  transition: opacity 1s ease-in-out;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
  opacity: ${(props) => (props.imageLoaded ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  border-radius: 10px;
`;

const Tours = forwardRef((ref) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://web-production-1ab9.up.railway.app/api/experiences/with-reviews/')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map(item => ({
          ...item,
          firstPhoto: item.cover_photos.length > 0 ? item.cover_photos[0] : null,
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleImageLoad = (experienceId) => {
    setData(prevData => {
      return prevData.map(item => {
        if (item.experience.id === experienceId && item.firstPhoto) {
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
                <center>
                  <h2 className="tf-title-heading ct style-2 mg-bt-13">
                    What to do in Cape Town:
                  </h2>
                  <p className="sub-title ct small mg-bt-20 pad-420">
                    Planning your trip just got easier. Our complimentary full-day itineraries cover all of Cape Town’s top attractions, best restaurants, and secret spots to add to your bucket list.
                  </p>
                </center>

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
                              <div className={`sc-card-product ${item.experience.feature ? 'comingsoon' : ''}`}>
                                <div className="card-media">
                                  <Link to={`/experience/${item.experience.id}`}>
                                    <SlideContainer>
                                      {item.firstPhoto && (
                                        <React.Fragment>
                                          {!item.firstPhoto.imageLoaded && (
                                            <BlurhashStyled
                                              hash={item.firstPhoto.blurhash}
                                              resolutionX={32}
                                              resolutionY={32}
                                              punch={1}
                                            />
                                          )}
                                          <ImageStyled
                                            src={item.firstPhoto.image.cover_photos}
                                            alt={item.experience.title}
                                            onLoad={() => handleImageLoad(item.experience.id)}
                                            onError={handleImageError}
                                            imageLoaded={item.firstPhoto.imageLoaded}
                                          />
                                        </React.Fragment>
                                      )}
                                    </SlideContainer>
                                  </Link>
                                </div>
                                <div className="card-title">
                                  <h5 className="style2">
                                    <Link to={`/experience/${item.experience.id}`}>{item.experience.title}</Link>
                                  </h5>
                                </div>

                                <div className="meta-info">
                                  <div className="author">
                                    <div className="review">
                                      <span>Based on {item.reviews.length} reviews</span>
                                      <h5>
                                        <Rating value={item.average_rating} color={'#f8e825'} />
                                      </h5>
                                    </div>
                                  </div>
                                </div>

                                <div className="meta-info">
                                  <div className="author">
                                    <div className="price">
                                    </div>
                                  </div>
                                </div>
                                <center>
                                  <Link to={`/experience/${item.experience.id}`} className="sc-button loadmore style fl-button pri-3">
                                    <span>MORE INFO</span>
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
