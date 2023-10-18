import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Rating from '../components/Rating'


import 'react-tabs/style/react-tabs.css';
import ReactHtmlParser from 'react-html-parser';



// ... (import statements)


const ItemDetails01 = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      fetch(`https://web-production-1ab9.up.railway.app/api/experiences/${id}/with-reviews`)
          .then((response) => response.json())
          .then((data) => {
              setItemData(data);
              console.log('reviews data:', data)

              setLoading(false);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });

       
        
  }, [id]);



  if (loading) {
      return <p>Loading...</p>;
  }

   
    return (
        <div className='item-details'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center"> <Rating value={itemData.average_rating} color={'#f8e825'} /> {}</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                   
                                    <li>Based on {itemData.reviews.length} reviews</li>
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
                                  <img src={itemData.experience.cover_photo} alt={itemData.experience.title} /> 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">

                                <div className="sc-item-details">
                                    <h2 className="style2">{itemData.experience.title} </h2>
                                   <div>   {ReactHtmlParser(itemData.experience.body)}</div>

                                    <div className="meta-item-details style2">
                                        <div className="item meta-price">
                                            <span className="heading">Was</span>
                                            <div className="price">
                                                <div className="price-box">
                                                    <s><h5> ${itemData.experience.price}</h5></s>
                                                </div>
                                                
                                            </div>
                                            <span className="heading"> Now</span>

                                            <div className="price">
                                                <div className="price-box">
                                                    <h5> ${itemData.experience.discountedprice}</h5>
                                                </div>
                                                
                                            </div>

                                            <span className="heading"> You Save</span>

                                            <div className="saving">
                                                <div className="price-box">
                                                    <h5> ${itemData.what_you_save}</h5>
                                                    
                                                </div>
                                                
                                            </div>


                                        </div>
                                    </div>

                                   

                                    
                                    <Link target='__blank' to="https://wa.link/1vg32z" className="sc-button loadmore style  fl-button pri-3"><span>Enquire via whatsapp</span></Link>

                                    {/* <h2 className="tf-title-heading style-2 mg-bt-12">
                                        Write a review for this experience                         
                                    </h2>
                                   
                                    <div className="form-inner">
                                        <form id="contactform" noValidate="novalidate" className="form-submit" >
                                            <input id="name" name="name" tabIndex="1" aria-required="true" type="text" placeholder="Your Name" required />
                                            <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Your Email Address" required />
                                            
                                            <textarea id="message" name="message" tabIndex="3" aria-required="true" required placeholder="Message"></textarea>
                                            <button className="submit">What do you have to say about this experience?</button>
                                        </form>
                                    </div>
                                 
                                     */}
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <LiveAuction data={itemData.reviews} />

            {/* <div className="tf-section tf-item-details">
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

            </div> */}
           
            

            {/* <LiveAuction data={liveAuctionData} /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default ItemDetails01; 