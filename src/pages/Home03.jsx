import React from 'react';
import Header from '../components/header/Header';
import heroSliderData from '../assets/fake-data/data-slider-3';
import Slider from '../components/slider/Slider';


import Footer from '../components/footer/Footer'


import ReactGA from "react-ga4";
import LuxuryAccomodation from '../components/LuxuryAccomodation';
import Tours from '../components/Tours';
import Cars4Hire from '../components/Cars4hire';




const Home03 = () => {

   
    
    return (
        <div className='home-3'>
            <Header />
            <Slider data={heroSliderData} />

            <section className="tf-help-left tf-section">
                <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        You just found the best place to discover all Cape Town's secrets!                         </h2>
                       

                        <p className="sub-title ct small mg-bt-20 pad-420">
                        You will find the best luxury accommodations, hidden gems, top restaurants and tours to show you "Why Cape Town" is the best city in the world! 
                        </p>
                       



                  

                    
                    </div>
                    </div>
                                                    
                </div>
            </section>

                <LuxuryAccomodation/>   
                <Tours  />
                <Cars4Hire/>

                         

            {/* Accomodation Component */}
            {/* Experiences Component */}
            {/*Blogs */}
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

           


            
           

            <Footer />


            


     
            
        </div>
    );
}

export default Home03;
