import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import desktopImage from '../../assets/images/slider/cpt.jpg';
import mobileImage from '../../assets/images/slider/mobile.jpeg';

const Slider = props => {
    const [isMobile, setIsMobile] = useState(false);
    const data = props.data;

    // Function to check if screen width is mobile or desktop size
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // Run on initial load and whenever the window is resized
    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className="mainslider">
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
            >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index} className={item.class}>
                            <SliderItem item={item} isMobile={isMobile} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
};

const SliderItem = ({ item, isMobile }) => (
    <div className="flat-title-page" style={{ backgroundImage: `url(${isMobile ? mobileImage : desktopImage})` }}>
        <div className="overlay"></div>
        <div className="swiper-container mainslider home">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="slider-item">    
                        <div className="themesflat-container">
                            <div className="wrap-heading flat-slider flex">
                                <div className="content">
                                    <h2 className="heading">97% SAFE</h2>
                                    <h2 className="heading">AND</h2>
                                    <h2 className="heading">100% FUN</h2>

                                </div>
                                <div className="image">
                                    <img className="img-bg" src={isMobile ? mobileImage : desktopImage} alt="cape town" />
                                    <img src={item.img} alt="cape town" />
                                </div>
                            </div>   
                        </div>                                  
                    </div>
                </div>
            </div>
        </div>        
    </div>
);

export default Slider;
