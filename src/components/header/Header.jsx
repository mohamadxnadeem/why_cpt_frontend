import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// import logoheader from "../../assets/images/logo/1.svg";
import logodark from "../../assets/images/logo/1.svg";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const location = useLocation();

  // Helper: Highlight current page
  const isActive = (path) => {
    return location.pathname === path ? "active-menu-item" : "";
  };

  // Scroll behaviour
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      if (window.scrollY > 120) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    menuRef.current.classList.toggle("active");
    toggleRef.current.classList.toggle("active");
  };

  return (
    <>
      <header id="main-header" className="header" ref={headerRef}>
        <div className="container">
          <div className="header-inner">

            {/* LOGO */}
            <div className="logo">
              <Link to="/">
                <img src={logodark} alt="logo" className="logo-img" />
              </Link>
            </div>

            {/* WHATSAPP CTA */}
            {/* <a
              href="https://wa.link/r5z0sb"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <i className="fab fa-whatsapp"></i> Chat Now
            </a> */}

            {/* BURGER ICON */}
            <div className="burger" ref={toggleRef} onClick={toggleMenu}>
              <span></span>
            </div>

          </div>
        </div>

        {/* NAV MENU */}
        <nav className="side-menu" ref={menuRef}>
          <ul>
            <li><Link to="/" onClick={toggleMenu} className={isActive("/")}>Home</Link></li>
            {/* <li><Link to="/accomodation" onClick={toggleMenu} className={isActive("/accomodation")}>Accommodation</Link></li> */}
            {/* <li><Link to="/PrivateToursCapeTown" onClick={toggleMenu} className={isActive("/PrivateToursCapeTown")}>Full Day Tours</Link></li> */}
            <li><Link to="/top-10-resturants-in-cape-town" onClick={toggleMenu} className={isActive("/top-10-resturants-in-cape-town")}>Top 10 Restaurants</Link></li>
            <li><Link to="/top-10-winefarms-in-cape-town" onClick={toggleMenu} className={isActive("/top-10-winefarms-in-cape-town")}>Top 3 Winefarms</Link></li>
            <li><Link to="/best-activities-to-do-in-cape-town" onClick={toggleMenu} className={isActive("/best-activities-to-do-in-cape-town")}>Best Activities</Link></li>
          </ul>

          <a
            href="https://wa.link/r5z0sb"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-whatsapp-btn"
          >
            <i className="fab fa-whatsapp"></i> Chat Now
          </a>
        </nav>
      </header>

      <style>{`
        /* HEADER */
        .header {
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 999;
          background: transparent;
          padding: 26px 0;
          transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 1px solid rgba(255,255,255,0.28);
        }

        .header.scrolled {
          background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
          padding: 0px 0;
          border-bottom: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .container {
          width: 92%;
          max-width: 1300px;
          margin: auto;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* LOGO */
        .logo-img {
          height: 100px;
          lenght: auto;

          transition: height 0.3s ease;
        }
        .header.scrolled .logo-img {
          height: 100px;
        }

        /* WHATSAPP BUTTON */
        .whatsapp-btn {
          background: #0b5b33;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 15px;
          margin-right: 20px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* BURGER ICON */
        .burger {
          width: 30px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }

        .burger span,
        .burger span::before,
        .burger span::after {
          content: "";
          position: absolute;
          height: 3px;
          width: 100%;
          background: white;
          transition: 0.3s ease;
        }

        .burger span::before { top: -7px; }
        .burger span::after { top: 7px; }

        .burger.active span {
          background: transparent;
        }
        .burger.active span::before {
          transform: rotate(45deg); top: 0;
        }
        .burger.active span::after {
          transform: rotate(-45deg); top: 0;
        }

        /* SIDE MENU */
        .side-menu {
          position: fixed;
          top: 0;
          left: -280px;
          width: 260px;
          height: 100%;
          background: #0b5b33;
          padding: 40px 22px;
          transition: left 0.35s ease;
          box-shadow: 5px 0 16px rgba(0,0,0,0.25);
          z-index: 998;
        }

        .side-menu.active { left: 0; }

        .side-menu ul {
          list-style: none;
          padding: 0;
        }

        .side-menu ul li {
          margin: 18px 0;
        }

        .side-menu ul li a {
          color: white;
          font-size: 18px;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          display: block;
          border-radius: 8px;
          transition: background 0.25s ease;
        }

        /* ⭐ Active page highlight */
        .active-menu-item {
          background: rgba(0,0,0,0.35);
          font-weight: 600;
        }

        .menu-whatsapp-btn {
          margin-top: 30px;
          display: block;
          background: #111;
          padding: 12px 18px;
          color: white;
          border-radius: 10px;
          text-align: center;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Header;