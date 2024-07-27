import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import LuxuryAccomodation from '../components/LuxuryAccomodation';



import imgblog1 from '../assets/images/blog/lux.jpg'
import imgblog2 from '../assets/images/blog/airport2.jpeg'
import imgblogdetail1 from '../assets/images/blog/4.png'
import imgblogdetail2 from '../assets/images/blog/airport4.jpeg'

const LuxuryVillas = () => {
    
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
                                <h1 className="heading text-center">Top 10 Luxury Accommodations in Cape Town </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">
                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post">Perfect for Honeymooners, families and boys trips</h2>
                                <div className="divider"></div>
                              
                                {/* <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div>  */}
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">
                                    Experience the ultimate in luxury and comfort with Cape Town's top 3 accommodations, tailored to suit every occasion. Whether you're celebrating a honeymoon, enjoying a family vacation, or planning a boys' trip, these exclusive retreats offer everything you need for a memorable stay.



</p>
                                    {/* <h3 className="heading mg-bt-16">then you're at the right place! </h3>     */}

                                   
                                </div>   
                                   
                                {/* <div className="inner-post mg-t-24">
                                    <p>
                                    Contact us now to book your dream villa and experience the pinnacle of luxury living. Your perfect getaway awaits!

                                    </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Book Your Luxury Villa with us</span></Link>
                                    
                                    </center>
                                                <br></br>        
                                </div> */}
                                
                               
                                {/* <div className="divider d2"></div> */}
                                       
                            </div>
                            <LuxuryAccomodation />

                      
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default LuxuryVillas;
