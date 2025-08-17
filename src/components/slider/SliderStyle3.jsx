import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const ShimmerDiv = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: ${(props) => (props.imageLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const SliderItem = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <SlideContainer>
      {!imageLoaded && <ShimmerDiv />}
      <ImageStyled
        src={src}
        alt="Cover"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => { e.target.style.display = 'none'; }}
        imageLoaded={imageLoaded}
      />
    </SlideContainer>
  );
};

const SliderStyle3 = ({ data }) => {
  if (!data || !data.length) return null;

  return (
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
              {data.map((photo, index) => (
                <SwiperSlide key={index}>
                  <SliderItem src={photo.image.cover_photos} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderStyle3;
