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

const Packages = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load + refetch logic
  useEffect(() => {
    const cacheKey = "packagesData";
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
      } catch (err) {
        console.warn("Error parsing cached packages:", err);
      }
    }

    // Always refetch from API to keep fresh data
    fetch("https://web-production-1ab9.up.railway.app/api/full-travel-packages/all/", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((fetched) => {
        const updatedData = fetched.map((item) => {
          // 🧩 Handle flexible image structure
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
        localStorage.setItem(cacheKey, JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Safe image loading
  const handleImageLoad = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.fullpackage.id === id && item.firstPhoto
          ? { ...item, firstPhoto: { ...item.firstPhoto, imageLoaded: true } }
          : item
      )
    );
  };

  const handleImageError = (e) => {
    console.warn("Error loading image:", e.target.src);
    e.target.style.display = "none";
  };

  return (
    <FlipMove>
      <Fragment ref={ref}>
        <section className="tf-explore-2 tf-section live-auctions">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">
                  Choose Your Dream{" "}
                  <span style={{ color: "#d4af37" }}>Cape Town Package</span>
                </h2>

                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      overflowX: "auto",
                      paddingBottom: "10px",
                    }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "250px",
                          height: "200px",
                          position: "relative",
                          borderRadius: "10px",
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
                      <p>No packages available.</p>
                    ) : (
                      data.slice(0, 10).map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="swiper-slide">
                            <div className="slider-item">
                              <div
                                className={`sc-card-product ${
                                  item.fullpackage?.feature ? "comingsoon" : ""
                                }`}
                              >
                                <div className="card-media">
                                  <Link to={`/travel-package/${item.fullpackage?.id}`}>
                                    <SlideContainer>
                                      {item.firstPhoto && (
                                        <>
                                          {!item.firstPhoto.imageLoaded && <Shimmer />}
                                          <ImageStyled
                                            src={item.firstPhoto.url}
                                            alt={item.fullpackage?.title}
                                            onLoad={() => handleImageLoad(item.fullpackage?.id)}
                                            onError={handleImageError}
                                            imageLoaded={item.firstPhoto.imageLoaded}
                                          />
                                        </>
                                      )}
                                    </SlideContainer>
                                  </Link>
                                </div>

                                <div className="card-title">
                                  <h5 className="style2">
                                    <Link to={`/travel-package/${item.fullpackage?.id}`}>
                                      {item.fullpackage?.title}
                                    </Link>
                                  </h5>
                                </div>

                                <div className="meta-info">
                                  <div className="author">
                                    <div className="price" style={{ textAlign: "left" }}>
                                      <p>Total Price: ${item.fullpackage?.price}</p>
                                    </div>
                                  </div>
                                </div>

                                <center>
                                  <Link
                                    to={`/travel-package/${item.fullpackage?.id}`}
                                    className="sc-button loadmore style fl-button pri-3"
                                  >
                                    <span>View Package</span>
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

export default Packages;