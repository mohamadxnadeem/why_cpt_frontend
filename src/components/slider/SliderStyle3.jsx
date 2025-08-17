import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -450px 0;
  }
  100% {
    background-position: 450px 0;
  }
`;

const SliderContainer = styled.div`
  .swiper-wrapper {
    position: relative;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px; /* Adjust height */
  border-radius: 10px;
  overflow: hidden;
`;

const ShimmerPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  background-image: linear-gradient(
    to right,
    #f6f6f6 0%,
    #eaeaea 20%,
    #f6f6f6 40%,
    #f6f6f6 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.imageLoaded ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 10px;
`;

const SliderItem = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <SlideContainer>
      {!imageLoaded && <ShimmerPlaceholder />}
      <ImageStyled
        src={item.src} // Use the direct AWS S3 URL
        alt={item.title}
        imageLoaded={imageLoaded}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.error('Error loading image:', e);
          e.target.style.display = 'none';
        }}
      />
      <div className="content" style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', zIndex: 3 }}>
        <div className="fs-16">
          <Link to="/item-details-01" style={{ color: 'white', textDecoration: 'none' }}>
            {item.title}
          </Link>
        </div>
        <p>{item.category}</p>
      </div>
    </SlideContainer>
  );
};

const SliderStyle3 = ({ data }) => {
  return (
    <SliderContainer>
      <section className="flat-cart-item home6 style2 mainslider">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  767: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <SliderItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </SliderContainer>
  );
};

export default SliderStyle3;
