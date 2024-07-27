import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


import imgblog1 from '../assets/images/blog/student.jpg'


const StudentAccomodation = () => {
    
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
                                <h1 className="heading text-center">Affordable Student Accommodation: </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <div className="tf-section post-details">
                <div className="themesflat-container">
                        <div className="post">
                            <div className="inner-content">
                                <h2 className="title-post">Stay with Host Families for Under $500/Month</h2>

                                <div className="divider"></div>
                              
                                <div className="image">
                                    <img src={imgblog1} alt="Axies" />
                                </div> 
                                <div className="inner-post mg-t-40">
                                    <p className="mg-bt-24">
                                    Struggling to find affordable and comfortable accommodation while studying in Cape Town?
                                </p>

                                   
                                </div>   
                                <div className="inner-post mg-t-22">
                                    <p className="mg-bt-24">
                                    High rents and unsafe neighborhoods can make finding the right place a nightmare. You deserve a safe, welcoming home where you can focus on your studies without breaking the bank.


                                    </p> 

                                    <p className="mg-bt-24">
                                    Discover our budget-friendly student accommodation with host families. For under $500/month, enjoy a safe, comfortable environment that feels like home. Benefit from local insights and support, making your stay in Cape Town both enjoyable and enriching. Don’t compromise on your living situation.
                                    </p> 

                                   

                                    <br></br>

                                   
                                   
                                </div>       
                                <div className="inner-post mg-t-24">
                                    <p>
                                    Contact us today to secure your spot and make the most of your student life in Cape Town. Spaces are limited!


                                    </p> 
                                    
                                    <br></br>
                                    <center>
                                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style  fl-button pri-3"><span>Book your accomodation with us</span></Link>
                                    
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
export default StudentAccomodation;
