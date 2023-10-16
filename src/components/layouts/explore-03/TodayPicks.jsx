import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

const TodayPicks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://web-production-1ab9.up.railway.app/api/experiences/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Fragment>
      <section className="tf-explore-2 tf-section live-auctions">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 mg-bt-13">
                Top 10 Experiences in Cape Town
              </h2>
              <p className="sub-title ct small mg-bt-20 pad-420">
                Below you will find the Best Experiences you need to do if it's your first time in Cape Town!
              </p>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.slice(0, 7).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className={`sc-card-product ${item.feature ? 'comingsoon' : ''}`}>
                              <div className="card-media">
                                <Link to={`/itemDetails01/${item.id}`}>
                                  <img src={item.cover_photo} alt={item.title} />
                                </Link>
                              </div>
                              <div className="card-title">
                                <h5 className="style2">
                                  <Link to={`/itemDetails01/${item.id}`}>{item.title}</Link>
                                </h5>
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  <div className="price">
                                    <span>Usual Price</span>
                                    <h5>{item.price}</h5>
                                  </div>
                                  {item.discountedprice && (
                                    <div className="price">
                                      <span>Discounted Price</span>
                                      <h5>{item.discountedprice}</h5>
                                    </div>
                                  )}
                                </div>
                              </div>
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
  );
};

export default TodayPicks;
