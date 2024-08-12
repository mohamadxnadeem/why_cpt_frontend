import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';

// Styled components
const SliderContainer = styled.div`
  .swiper-wrapper {
    position: relative;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px; /* Adjust as needed */
  border-radius: 10px;
  overflow: hidden; /* Ensures border radius is applied to child elements */
`;

const BlurhashStyled = styled(Blurhash)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  opacity: ${(props) => (props.imageLoaded ? 0 : 1)};
  transition: opacity 0.5s ease;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers the container */
  display: ${(props) => (props.imageLoaded ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 10px;
`;

const SliderItem = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    console.log('Image loaded:', item.src); // Debug image load
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('Error loading image:', e);
    e.target.style.display = 'none'; // Hide broken images
  };

  return (
    <SlideContainer>
      <BlurhashStyled
        hash={item.blurhash}
        width={400}
        height={300}
        resolutionX={32}
        resolutionY={32}
        punch={1}
        imageLoaded={imageLoaded}
      />
      <ImageStyled
        src={item.src}
        alt="Cover"
        imageLoaded={imageLoaded}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className="content">
        <div className="fs-16">
          <Link to="/item-details-01">{item.title}</Link>
        </div>
        <p>{item.category}</p>
      </div>
    </SlideContainer>
  );
};

const SliderStyle3 = ({ data }) => {
  console.log('this is the slider data', data);

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
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
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
