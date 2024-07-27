import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import imgbg from '../../assets/images/slider/cpt.jpg'


const Slider = props => {
    const data = props.data
    return (
        <div className="mainslider" >
            <Swiper
                modules={[Navigation,  Scrollbar, A11y ]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index} className={item.class}>
                            <SliderItem item={item} />
                        </SwiperSlide>
                        
                    ))
                }
        </Swiper>
        </div>
    );
}

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}
const SliderItem = props => (
    <div className="flat-title-page" style={{backgroundImage: `url(${imgbg})`}}>


       
        <div className="overlay"></div>
        <div className="swiper-container mainslider home">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="slider-item">	
                        <div className="themesflat-container ">
                            <div className="wrap-heading flat-slider flex">
                                <div className="content">
                                    <h2 className="heading">The Ultimate Guide to Cape Town</h2>	
                                    <h1 className="heading mb-style"><span className="tf-text s1">Must Do Experiences for 1st Time Visitors</span>                                          
                                    </h1>
                                    <h1 className="heading mb-style"><span className="tf-text s1">And 5 Attractions you don't want to regret missing.</span>                                          
                                    </h1>


                                  
                                    
                                </div>
                                <div className="image">
                                    <img className="img-bg" src={props.item.imgbg} alt="cape town" />
                                    <img src={props.item.img} alt="cape town" />
                                </div>
                            </div>   
                        </div>					                           
                    </div>
                </div>
            </div>
        </div>        
    </div>
    
)
export default Slider;
