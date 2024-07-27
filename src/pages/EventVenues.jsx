import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


import imgblog1 from '../assets/images/blog/venue.jpg'


const EventVenues = () => {
  
    const [dataTags] = useState(
        [
            {
                name: 'Bitcoin'
            },
            {
                name: 'NFT'
            },
            {
                name: 'Bids'
            },
            {
                name: 'Digital'
            },
            {
                name: 'Arts'
            },
            {
                name: 'Marketplace'
            },
            {
                name: 'Token'
            },
            {
                name: 'Wallet'
            },
            {
                name: 'Crypto'
            },
        ]
    )
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Top 5 Event Venues in Cape Town: </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">
                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post"> Perfect for Weddings, Parties, and Corporate Events</h2>
                                <div className="divider"></div>
                              
                                <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div> 
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">
                                    Struggling to find the perfect venue for your special event in Cape Town?

 
                                    </p>

                                   
                                </div>   
                                <div className="inner-post mg-t-22">
                                    <p className="mg-bt-24">
                                    The wrong venue can turn your dream event into a logistical nightmare. You need a place that not only meets but exceeds your expectations, ensuring your event is memorable for all the right reasons.


                                    </p> 

                                    <p className="mg-bt-24">
                                    Discover the top 5 event venues in Cape Town, ideal for weddings, parties, and corporate events. Our curated selection guarantees stunning locations, exceptional service, and a flawless experience. Make your event unforgettable.


                                    </p> 

                                   

                                    <br></br>

                                   
                                   
                                </div>       
                                <div className="inner-post mg-t-24">
                                    <p>
                                    Reach out to us now to book the perfect venue and make your event truly unforgettable. Dates are filling up fast!


                                    </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Book Your Venue With Us</span></Link>
                                    
                                    </center>
                                                <br></br>        
                                </div>
                                
                               
                                <div className="divider d2"></div>
                                       
                            </div>
                      
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default EventVenues;
