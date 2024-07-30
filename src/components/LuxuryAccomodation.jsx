import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Rating from './Rating';
import FlipMove from 'react-flip-move';

const Tours = forwardRef((ref) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://web-production-1ab9.up.railway.app/api/accomodation-for-hire/all/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <FlipMove>
      <center>

        <Fragment ref={ref}>
          <section className="tf-explore-2 tf-section live-auctions">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h2 className="tf-title-heading ct style-2 mg-bt-13">Swipe to see more </h2>
                
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
                                <div className={`sc-card-product ${item.accomodation.feature ? 'comingsoon' : ''}`}>
                                  <div className="card-media">
                                    <Link to={`/accomodation/${item.accomodation.id}`}>
                                      <img
                                        src={item.cover_photos[0].cover_photos}
                                        alt={item.accomodation.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%' }}
                                      />
                                    </Link>
                                  </div>
                                  <div className="card-title">
                                    <h5 className="style2">
                                      <Link to={`/accomodation/${item.accomodation.id}`}>{item.accomodation.title}</Link>
                                    </h5>
                                  </div>
                                  <Link to={`/accomodation/${item.accomodation.id}`} className="sc-button loadmore style  fl-button pri-3"><span>More Info</span></Link>


                                  {/* <div className="meta-info">
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
                                        <h5>From ${item.accomodation.min_price} Per Night</h5>
                                      </div>
                                    </div>
                                  </div> */}

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
      </center>

    </FlipMove>
  );
});

export default Tours;
