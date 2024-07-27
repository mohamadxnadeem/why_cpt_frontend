import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/box-item/icon1-recont-post.jpg'
import img2 from '../assets/images/box-item/icon2-recont-post.jpg'
import img3 from '../assets/images/box-item/icon3-recont-post.jpg'
import img4 from '../assets/images/box-item/icon4-recont-post.jpg'
import imgblog1 from '../assets/images/blog/gardenroute.jpg'
import imgblog2 from '../assets/images/blog/airport2.jpeg'
import imgblogdetail1 from '../assets/images/blog/4.png'
import imgblogdetail2 from '../assets/images/blog/airport4.jpeg'

const GardenRoute = () => {
   
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
                                <h1 className="heading text-center">Ultimate Garden Route Package</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">
                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post">Luxurious Stays and Seamless Transport for Adventure Enthusiasts</h2>
                                <div className="divider"></div>
                              
                                <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div> 
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">
                                    Planning a trip along the Garden Route can be stressful and time-consuming, with countless details to consider.
                                    </p>

                                   
                                </div>   
                                <div className="inner-post mg-t-22">
                                    <p className="mg-bt-24">
                                    Missing out on the best spots and enduring tedious travel arrangements can ruin your adventure. You deserve a seamless, luxurious experience that allows you to fully enjoy the breathtaking beauty of the Garden Route.


                                    </p> 

                                    <p className="mg-bt-24">
                                    Book our Ultimate Garden Route Package, which includes luxurious accommodations and seamless transport. Enjoy handpicked stays at the best spots and stress-free travel, ensuring an unforgettable adventure for nature enthusiasts like you. Don't miss out on this once-in-a-lifetime experience.


                                    </p> 

                                   

                                    <br></br>

                                   
                                   
                                </div>       
                                <div className="inner-post mg-t-24">
                                    <p>
                                    Contact us today to book your dream adventure and experience the Garden Route in style. Availability is limited!


                                    </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Book Your Garden Route Adventure With Us</span></Link>
                                    
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
export default GardenRoute;
