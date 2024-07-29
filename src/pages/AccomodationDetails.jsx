import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import SliderStyle3 from '../components/slider/SliderStyle3';



import 'react-tabs/style/react-tabs.css';
import parse from 'html-react-parser';



// ... (import statements)


const LuxAccomodation = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      fetch(`https://web-production-1ab9.up.railway.app/api/accomodation-for-hire/${id}/details/`)
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

  const heroSliderData = itemData && itemData.cover_photos
  ? itemData.cover_photos.map((coverPhoto) => coverPhoto)
  : [];

  if (loading) {
      return <Loader/>;
  }

   
    return (
        <div className='item-details'>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center"> <Rating value={itemData.average_rating} color={'#f8e825'} /> {}</h1>
                            </div> */}
                            <div className="breadcrumbs style2">
                                <ul>
                                   
                                    <h4>  {itemData.accomodation.title}</h4>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <SliderStyle3 data={heroSliderData} />

            <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                       
                        <div className="col-xl-12 col-md-12">
                            <div className="content-center">

                                <div className="sc-item-details">
                                   <div>   {parse(itemData.accomodation.body)}</div>

                                    {/* <div className="meta-item-details style2">
                                        <div className="item meta-price">
                                            <span className="heading">Prices Starting from</span>
                                            <div className="price">
                                                <div className="price-box">
                                                    <h5> ${itemData.accomodation.min_price}</h5>
                                                </div>
                                                
                                            </div>
                                            


                                        </div>
                                    </div> */}

                                   

                                    
                                    <Link target='__blank' to="https://wa.link/1vg32z" className="sc-button loadmore style  fl-button pri-3"><span>Enquire via whatsapp</span></Link>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                    {/* <h2 className="tf-title-heading style-2 mg-bt-12">
                                        Write a review for this accomodation                         
                                    </h2>
                                   
                                    <div className="form-inner">
                                        <form id="contactform" noValidate="novalidate" className="form-submit" >
                                            <input id="name" name="name" tabIndex="1" aria-required="true" type="text" placeholder="Your Name" required />
                                            <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Your Email Address" required />
                                            
                                            <textarea id="message" name="message" tabIndex="3" aria-required="true" required placeholder="Message"></textarea>
                                            <button className="submit">What do you have to say about this accomodation?</button>
                                        </form>
                                    </div>
                                 
                                     */}
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* <LiveAuction data={itemData.reviews} /> */}

           

            {/* <div>
            <div id="TA_cdswritereviewlgvi411" class="TA_cdswritereviewlgvi">
<ul id="WlSvbY" class="TA_links bZtkLN7HO">
<li id="hKG4U4" class="4MbirZbbc3R">
<a target="_blank" href="https://www.tripadvisor.com/"><img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor"/></a>
</li>
</ul>
</div>
<script async src="https://www.jscache.com/wejs?wtype=cdswritereviewlgvi&amp;uniq=411&amp;locationId=26810402&amp;lang=en_US&amp;lang=en_US&amp;display_version=2" data-loadtrk onload="this.loadtrk=true"></script>

            </div> */}



            {/* <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                     
                        <div className="col-xl-12 col-md-12">
                            
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <h2 className="tf-title-heading style-2 mg-bt-12">
                                        Ready to book your accomodation?                            
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
            <Footer />
        </div>
    );
}

export default LuxAccomodation; 