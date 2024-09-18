import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from './DarkMode';
import logoheader from '../../assets/images/logo/logo.svg'
import logoheader2x from '../../assets/images/logo/logo.svg'
import logodark from '../../assets/images/logo/logo.svg'
import logodark2x from '../../assets/images/logo/logo.svg'

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []); // Added empty dependency array

    useEffect(() => {
        initializeGoogleTranslate();
    }, [pathname]);

    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        console.log('Scroll Position:', scrollTop); // Check the scroll position
        
        if (scrollTop >= 300) {
            header.classList.add('is-fixed');
            console.log('is-fixed class added'); // Log when the class is added
        } else {
            header.classList.remove('is-fixed');
            console.log('is-fixed class removed'); // Log when the class is removed
        }
        
        if (scrollTop >= 400) {
            header.classList.add('is-small');
            console.log('is-small class added'); // Log when the is-small class is added
        } else {
            header.classList.remove('is-small');
            console.log('is-small class removed'); // Log when the is-small class is removed
        }
    };
    

    const menuLeft = useRef(null);
    const btnToggle = useRef(null);

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
        const googleTranslateElement = document.getElementById("google_translate_element");
        if (googleTranslateElement) {
            googleTranslateElement.style.display = googleTranslateElement.style.display === "none" ? "block" : "none";
        }
    };

    const initializeGoogleTranslate = () => {
        if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,es,pt,de,ar',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }
    };

    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index); 
    };

    return (
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">                              
                        <div id="site-header-inner"> 
                            <div className="wrap-box flex">
                                <div id="site-logo" className="clearfix">
                                    <div id="site-logo-inner">
                                        <Link to="/" rel="home" className="main-logo">
                                            <img className='logo-dark'  id="logo_header" src={logodark} srcSet={`${logodark2x}`} alt="nft-gaming" />
                                            <img className='logo-light'  id="logo_header" src={logoheader} srcSet={`${logoheader2x}`} alt="nft-gaming" />
                                        </Link>
                                    </div>
                                    <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>

                                    <nav id="main-nav" className="main-nav" ref={menuLeft}>
                                        <ul id="menu-primary-menu" className="menu">
                                            <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/">Home</Link>
                                            </li>

                                            {/* <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/full-packages-to-cape-town">Full Packages</Link>
                                            </li>  */}

                                            <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/best-tours-and-experience-in-cape-town">Exclusive Experiences</Link>
                                            </li> 

                                            {/* <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/safari">Safari</Link>
                                            </li> */}

                                            {/* <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/garden-route">Garden Route</Link>
                                            </li> */}
                                            
                                            {/* <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/luxury-villas">Luxury Accommodation</Link>
                                            </li>  */}
                                            
                                            <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/luxury-chauffeured-drives-and-airport-transfers">Luxury Vehicle Hire</Link>
                                            </li>
                                            {/* <li onClick={() => handleOnClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
                                                <Link to="/where-to-get-cannabis">Cannabis Tours</Link>
                                            </li> */}
                                        </ul>
                                    </nav>

                                    {/* <DarkMode /> */}
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
