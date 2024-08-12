import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


import imgblog1 from '../assets/images/blog/carhire.jpg'

const VehicleHire = () => {
   
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
                                <h1 className="heading text-center">Elite Vehicle Hire </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">
                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post">
                                    Luxury and Exclusive Cars for Discerning Travelers
                                </h2>
                                <div className="divider"></div>
                              
                                <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div> 
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">Finding the right vehicle to match your high standards can be challenging.

 
                                    </p>

                                   
                                </div>   
                                <div className="inner-post mg-t-22">
                                    <p className="mg-bt-24">Settling for a subpar vehicle can tarnish your travel experience, making it less comfortable and enjoyable. You need a car that reflects your status and provides unmatched luxury.



                                    </p> 

                                    <p className="mg-bt-24">
                                    Explore our elite vehicle hire options, featuring luxury and exclusive cars tailored for discerning travelers. Our top-tier vehicles ensure a comfortable, stylish, and premium travel experience. Elevate your journey with our exquisite car selection.


                                    </p> 

                                   

                                    <br></br>

                                   
                                   
                                </div>       
                                <div className="inner-post mg-t-24">
                                    <p>
                                    Contact us now to book your exclusive vehicle and travel in the utmost luxury. Book today and drive in style!


                                    </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Rent A Luxury Vehcile With Us</span></Link>
                                    
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
export default VehicleHire;
