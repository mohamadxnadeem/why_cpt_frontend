import React from 'react';
import Header from '../components/header/Header';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import heroSliderData from '../assets/fake-data/data-slider-3';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Slider from '../components/slider/Slider';

import TodayPicks from '../components/layouts/explore-03/TodayPicks';
import Footer from '../components/footer/Footer';


import ReactGA from "react-ga4";



const Home03 = () => {

   
    
    return (
        <div className='home-3'>
            <Header />
            <Slider data={heroSliderData} />

            <section className="tf-help-center tf-section">
                <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            If it's your first time in Cape Town, 
                        </h2>
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            and you want to find the best experiences and accommodation,                       
                        </h2>
                      
                      
                      
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            Then we have good news for you,
                        </h2>
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            Because, 
                        </h2>
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            We have curated the best experiences with the top guides and accommodations in Cape Town to show you why Cape Town is the best city in the world! 
                        </h2>
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                            So explore Cape Town with us and save up to 25% on the best experiences and accommodation today! 
                        </h2>
                    
                      
                      
                       
                        

                    </div>
                    </div>
                                                    
                </div>
            </section>

            <TodayPicks  />
            

            {/* Accomodation Component */}
            {/* Experiences Component */}
            {/*Blogs */}

           


            
           
            <LiveAuction data={liveAuctionData} />

            <Footer />


            


     
            
        </div>
    );
}

export default Home03;
