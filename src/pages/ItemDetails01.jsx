import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/home-3/LiveAuction';


import 'react-tabs/style/react-tabs.css';

import TodayPicks from '../components/layouts/explore-03/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';




const ItemDetails01 = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/experiences/${id}`)
          .then((response) => response.json())
          .then((data) => {
              setItemData(data);
              setLoading(false);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  }, [id]);

  if (loading) {
      return <p>Loading...</p>;
  }

  console.log('this is the data:', itemData)
   
    return (
        <div className='item-details'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Item Details 1</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Item Details 1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>

            <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                  <img src={itemData.cover_photo} alt={itemData.title} /> 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <h2 className="style2">{itemData.title} </h2>
                                   <div> {itemData.body}</div>
                                    <div className="meta-item-details style2">
                                        <div className="item meta-price">
                                            <span className="heading">Price</span>
                                            <div className="price">
                                                <div className="price-box">
                                                    <h5> {itemData.price}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <Link to="/wallet-connect" className="sc-button loadmore style bag fl-button pri-3"><span>Book Via Whatsapp Now</span></Link>
                                    <div className="flat-tabs themesflat-tabs">
                                    
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <LiveAuction data={liveAuctionData} />

            <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                     
                        <div className="col-xl-12 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                <h2 className="tf-title-heading style-2 mg-bt-12">
                    Ready to book your experience?                            
                </h2>
                <h5 className="sub-title style-1">
                    Then fill out that form below and we will get back to you asap! 
                </h5>
                <div className="form-inner">
                    <form id="contactform" noValidate="novalidate" className="form-submit" >
                        <input id="name" name="name" tabIndex="1" aria-required="true" type="text" placeholder="Your Full Name" required />
                        <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Your Email Address" required />
                        <input id="number" name="number" tabIndex="2"  aria-required="true" type="text" placeholder="Your Contact Number" required />

                        
                        <textarea id="message" name="message" tabIndex="3" aria-required="true" required placeholder="Message"></textarea>
                        <button className="submit">Send message</button>
                    </form>
                </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <br></br>
            <br></br>
            <br></br>
            <br></br>

            </div>
           
            

            {/* <LiveAuction data={liveAuctionData} /> */}
            <Footer />
        </div>
    );
}

export default ItemDetails01; 