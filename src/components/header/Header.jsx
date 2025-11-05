import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from './DarkMode';

import logoheader from '../../assets/images/logo/1.svg'
import logoheader2x from '../../assets/images/logo/1.svg'

import logodark from '../../assets/images/logo/2.svg'
import logodark2x from '../../assets/images/logo/2.svg'

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    useEffect(() => {
        initializeGoogleTranslate();
    }, [pathname]);

    const isSticky = () => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        
        if (scrollTop >= 300) header.classList.add('is-fixed');
        else header.classList.remove('is-fixed');

        if (scrollTop >= 400) header.classList.add('is-small');
        else header.classList.remove('is-small');
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
    const handleOnClick = index => setActiveIndex(index);

    return (
        <>
           

            <header id="header_main" className="header_1 js-header" ref={headerRef}>
    <div className="themesflat-container">
      <div className="row">
        <div className="col-md-12">                              
          <div id="site-header-inner"> 
            <div className="wrap-box flex space-between center-v">

              {/* Logo */}
              <div id="site-logo" className="clearfix">
                <div id="site-logo-inner">
                  <Link to="/" className="main-logo">
                    <img className="logo-dark" src={logodark} alt="logo" />
                    <img className="logo-light" src={logoheader} alt="logo" />
                  </Link>
                </div>
              </div>

              {/* Desktop Menu */}
              <nav id="main-nav" className="main-nav desktop-only">
                <ul className="menu">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/accomodation">Accommodation</Link></li>
                  <li><Link to="/chauffeur-hire-cape-town">Chauffeur Hire</Link></li>
                </ul>
              </nav>

              {/* ✅ Desktop WhatsApp Button */}
              <a 
                href="https://wa.link/r5z0sb"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-header-btn desktop-only"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp Us
              </a>

              {/* Mobile Menu Button */}
              <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>

              {/* Mobile Menu */}
              <nav id="main-nav" className="main-nav mobile-nav" ref={menuLeft}>
                <ul className="menu">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/accomodation">Accommodation</Link></li>
                  <li><Link to="/chauffeur-hire-cape-town">Chauffeur Hire</Link></li>
                </ul>

                {/* ✅ Mobile WhatsApp Button */}
                <a
                  href="https://wa.link/r5z0sb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-mobile-btn"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Us
                </a>
              </nav>

            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
        </>
    );
    
}



export default Header;