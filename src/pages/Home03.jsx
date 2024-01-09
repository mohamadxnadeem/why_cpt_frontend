import React from 'react';
import Header from '../components/header/Header';
import heroSliderData from '../assets/fake-data/data-slider-3';
import Slider from '../components/slider/Slider';

import TodayPicks from '../components/layouts/explore-03/TodayPicks';
import Footer from '../components/footer/Footer'


import ReactGA from "react-ga4";



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
                        Explore the best of the Cape in just 3 Days!
                        </h2>
                       

                        <p className="sub-title ct small mg-bt-20 pad-420">
                        If it's your first time in Cape Town and you don't want to miss out on all the hidden gems, then we have some good news for you. 

                        </p>
                        <p className="sub-title ct small mg-bt-20 pad-420">
                        You found the right website,
                        </p>

                        
                    
                        <p className="sub-title ct small mg-bt-20 pad-420">
                        Because...                        
                         </p>

                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        We have over 40 Years experience,

                        </h2>
                       

                        <p className="sub-title ct small mg-bt-20 pad-420">
                        And put together a few Tours to show you all the best spots in Cape Town, conducted by 100% local guides with good energy to make you laugh, take all your pictures and share the secrets of Cape Town with you, 
                        </p>

                        
                        <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        We Guarantee a safe, fun experience that you'll never forget. 

                        </h2>
                       

                       

                        <p className="sub-title ct small mg-bt-20 pad-420">

                        So book some of our tours so we can show you the secrets of our beautiful city and why Cape Town is the best city in the world! 
                        </p>



                  

                    
                    </div>
                    </div>
                                                    
                </div>
            </section>


                <TodayPicks  />
            

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
