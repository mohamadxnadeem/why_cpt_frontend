import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

// Styled components
const SliderContainer = styled.div`
  .swiper-wrapper {
    position: relative;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
`;

const ShimmerPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.loaded ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
`;

const SliderItem = ({ item }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <SlideContainer>
      {!loaded && <ShimmerPlaceholder />}
      <ImageStyled
        src={item.src}
        alt="Experience"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error('Image load error:', e.target.src);
          e.target.src = '/fallback-image.png'; // fallback image if broken
          setLoaded(true);
        }}
      />
    </SlideContainer>
  );
};

const SliderStyle3 = ({ data }) => {
  return (
    <SliderContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          767: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <SliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  );
};

export default SliderStyle3;
