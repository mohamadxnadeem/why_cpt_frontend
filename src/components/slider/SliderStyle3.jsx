import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';




const SliderStyle2 = ({data}) => {
    console.log('this is the slider data', data)

    return (
        <div>
            <section className="flat-cart-item home6 style2 mainslider">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                        <Swiper
                            modules={[Navigation, Pagination,  Scrollbar, A11y ]}
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
                                {
                                    data.map((item,index) => (
                                        <SwiperSlide key={index} >
                                            <SliderItem item={item}  />
                                        </SwiperSlide>
                                    ))
                                }

                        </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const SliderItem = props => (
    <div className="swiper-wrapper">
        <div className="swiper-slide">
            <div className="slider-item">	
                <div className="wrap-cart">
                    <div className="cart_item style2 style3">
                        <div className="inner-cart">
                            <div className="overlay"></div>
                            <img src={props.item.cover_photos} alt="poes" />
                            <div className="content">
                                <div className="fs-16"><Link to="/item-details-01">{props.item.title}</Link></div>
                                <p>{props.item.category}</p>
                            </div>   
                        </div>
                    </div>
                </div> 	
            </div>
        </div>
    </div>

)


export default SliderStyle2;
