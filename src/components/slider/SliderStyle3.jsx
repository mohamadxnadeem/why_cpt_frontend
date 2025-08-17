import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
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
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 10px;
  overflow: hidden;
`;

const ShimmerPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    #eeeeee 0%,
    #dddddd 50%,
    #eeeeee 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  z-index: 1;
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.loaded ? 'block' : 'none')};
  border-radius: 10px;
  z-index: 2;
`;

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
                {data.map((item, index) => {
                  const [loaded, setLoaded] = useState(false);
                  return (
                    <SwiperSlide key={index}>
                      <SlideContainer>
                        {!loaded && <ShimmerPlaceholder />}
                        <ImageStyled
                          src={item.src}
                          alt="Experience"
                          loaded={loaded}
                          onLoad={() => setLoaded(true)}
                        />
                      </SlideContainer>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </SliderContainer>
  );
};

export default SliderStyle3;
