// Import necessary dependencies at the top of your file
import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Rating from './Rating';
import FlipMove from 'react-flip-move';
import { Blurhash } from 'react-blurhash';

const TopTenResturants = forwardRef((ref) => {
  const [data, setData] = useState([]);
  const [blurhashArray, setBlurhashArray] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log('this is the item data:', data)

        // Fetch blurhash for each item
        const blurhashPromises = data.slice(0, 10).map((item) =>
          generateBlurhash(item.cover_photos[0].cover_photos)
        );

        Promise.all(blurhashPromises)
          .then((hashArray) => setBlurhashArray(hashArray))
          .catch((error) => console.error('Error fetching blurhash:', error));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      console.log('this is the new ', data)
  }, []);

  const generateBlurhash = async (imageUrl, width, height) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const blurhash = Blurhash.encode(new Uint8Array(buffer), width, height);
      return blurhash;
    } catch (error) {
      console.error('Error generating Blurhash:', error);
      return null;
    }
  };

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">Or rent a car with us: </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                  Swipe to see our selections of vehicles available for you to hire and click for more info: 
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
                                  <Link to={`/car-for-hire/${item.car.id}`}>

                                    {blurhashArray[index] ? (
                                      <Blurhash
                                        hash={'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
                                        width="100%"
                                        height="100%"
                                        resolutionX={32}
                                        resolutionY={32}
                                      />
                                    ) : (
                                      <img
                                        src={item.cover_photos[0].cover_photos}
                                        alt={item.car.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%' }}
                                      />
                                    )}
                                  </Link>

                                </div>
                                <div className="card-title">
                                  <h5 className="style2">
                                    <Link to={`/car-for-hire/${item.car.id}`}>{item.car.title}</Link>
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
                                      <h5>Starting From ${item.car.price}</h5>
                                    </div>
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
    </FlipMove>
  );
});

export default TopTenResturants;

