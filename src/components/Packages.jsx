import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import FlipMove from "react-flip-move";
import styled, { keyframes } from "styled-components";

// 💫 Shimmer animation
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

// 💎 Styled shimmer placeholder
const Shimmer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: ${(props) => props.height || "100%"};
  background: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  z-index: 1;
  border-radius: 10px;
`;

// 🖼️ Image container
const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
`;

// 🖼️ Image styling
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

// 💰 Luxury pricing row
const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

const PriceLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6f6f6f;
`;

const PriceValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #0b5b33; /* Deep luxury emerald */
  margin-top: 2px;
`;

const PriceValueInline = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #0b5b33; /* emerald */
  margin-left: 6px;
`;

const Packages = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch & Cache Data
  useEffect(() => {
    fetch("https://web-production-1ab9.up.railway.app/api/full-travel-packages/all/")
      .then((res) => res.json())
      .then((fetched) => {
        const updatedData = fetched.map((item) => {
          const photo =
            item.cover_photos?.[0]?.cover_photos ||
            item.cover_photos?.[0]?.image?.cover_photos ||
            null;

          return {
            ...item,
            firstPhoto: photo ? { url: photo, imageLoaded: false } : null,
          };
        });
        setData(updatedData);
      })
      .catch((error) => console.error("Error fetching packages:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleImageLoad = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.fullpackage.id === id && item.firstPhoto
          ? { ...item, firstPhoto: { ...item.firstPhoto, imageLoaded: true } }
          : item
      )
    );
  };

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <h2 className="tf-title-heading ct style-2 mg-bt-13">
              Choose Your Dream <span style={{ color: "#d4af37" }}>Cape Town Package</span>
            </h2>

            {loading ? (
              <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{ width: "250px", height: "200px", position: "relative" }}
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
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="slider-item">
                      <div className="sc-card-product">
                        <div className="card-media">
                          <Link to={`/travel-package/${item.fullpackage.id}`}>
                            <SlideContainer>
                              {!item.firstPhoto?.imageLoaded && <Shimmer />}
                              {item.firstPhoto && (
                                <ImageStyled
                                  src={item.firstPhoto.url}
                                  alt={item.fullpackage.title}
                                  onLoad={() => handleImageLoad(item.fullpackage.id)}
                                  imageLoaded={item.firstPhoto.imageLoaded}
                                />
                              )}
                            </SlideContainer>
                          </Link>
                        </div>

                        <div className="card-title">
                          <h5 className="style2">
                            <Link to={`/travel-package/${item.fullpackage.id}`}>
                              {item.fullpackage.title}
                            </Link>
                          </h5>
                        </div>

                        {/* ✅ Updated Pricing */}
                        <PriceRow>
                          <PriceLabel>
                            Starting from: <PriceValueInline>${Math.round(item.fullpackage.price)}</PriceValueInline>
                          </PriceLabel>
                        </PriceRow>

                        <center>
                          <Link
                            to={`/travel-package/${item.fullpackage.id}`}
                            className="sc-button loadmore style fl-button pri-3"
                          >
                            <span>View Package</span>
                          </Link>
                        </center>
                      </div>
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

export default Packages;