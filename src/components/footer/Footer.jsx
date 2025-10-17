import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom'
import logodark from '../../assets/images/logo/2.svg'
import logofooter from '../../assets/images/logo/2.svg'
const Footer = () => {
  
   
    const socialList = [
     
        {
            icon: "fab fa-instagram",
            link: "https://www.instagram.com/whycapetown"
        },
     
        
     
        

    ]

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
  
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

      
    return (
        <div>
            <footer id="footer" className="footer-light-style clearfix bg-style">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="widget widget-logo">
                                <div className="logo-footer" id="logo-footer">
                                    <Link to="/">
                                        <img className='logo-dark' id="logo_footer" src={logodark} alt="nft-gaming" />
                                        <img className='logo-light' id="logo_footer" src={logofooter} alt="nft-gaming" />
                                        
                                    </Link>
                                </div>
                                <p className="sub-widget-logo"> © Copyright 2024, www.whycapetown.com </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                            
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-7 col-7">
                            
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                            
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-7 col-12">
                            <div className="widget widget-subcribe">
                               
                                <div className="widget-social style-1 mg-t32">
                                    <ul>
                                        {
                                            socialList.map((item,index) =>(
                                                <li key={index}><Link target='__blank' to={item.link}><i className={item.icon}></i></Link></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {
                isVisible && 
                <Link onClick={scrollToTop}  to='#' id="scroll-top"></Link>
            }
            
          
        </div>

    );
}

export default Footer;
