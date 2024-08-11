import React , { useState , Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import CardModal from '../CardModal';
import Rating from '../../Rating'

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const LiveAuction = ({data}) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="">
                                <h2 className="tf-title">What they say these places: </h2>
                                <div className="heading-line"></div>
                            </div>
                        </div>
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
                                    1300: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                    {
                                        data.slice(0,99).map((item,index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-container show-shadow carousel auctions">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="slider-item">										
                                                                <div className="sc-card-product">
                                                                    <div className="card-media">
                                                                        {/* <img src={item.cover_photo} alt="axies" /> */}
                                                                        
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className="card-title">
                                                                        <h5>{item.name}</h5>
                                                                    </div>
                                                                    <div className="card-title">
                                                                        <h5><Rating value={item.rating} color={'#f8e825'} /></h5>
                                                                    </div>
                                                                    <div className="meta-info">
                                                                        <div className="author">
                                                                            
                                                                            <div className="info">
                                                                                <h6> "{item.comment}"
                                                                                 </h6>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>    	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
        </Fragment>
    );
}

LiveAuction.propTypes = {
    data: PropTypes.array.isRequired,
}


export default LiveAuction;
