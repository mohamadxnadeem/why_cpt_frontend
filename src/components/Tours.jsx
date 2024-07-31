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
    fetch('https://web-production-1ab9.up.railway.app/api/experiences/with-reviews/')
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
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <center>
<h2 className="tf-title-heading ct style-2 mg-bt-13">Free Full-Day Itineraries: 

</h2>

<h2 className="tf-title-heading ct style-2 mg-bt-13">Your Ultimate Guide to Cape Town

</h2>
                  <p  className="sub-title ct small mg-bt-20 pad-420"> Planning your trip just got easier. Our complimentary full-day itineraries cover all of Cape Town’s top attractions, the finest restaurants, and secret spots only locals know. Discover the best experiences this vibrant city has to offer, curated especially for discerning travelers like you.</p>

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
                                    <img
                                      src={item.cover_photos[0].cover_photos}
                                      alt={item.experience.title}
                                      loading="lazy"
                                      style={{ width: '100%', height: '100%' }}
                                    />
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
                                      {/* <h5>Prices Starting From ${item.experience.price}</h5> */}

                                    </div>
                                  </div>
                                </div>
                                <center>
                                <Link to={`/experience/${item.experience.id}`} className="sc-button loadmore style  fl-button pri-3"><span>MORE INFO</span></Link>

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
