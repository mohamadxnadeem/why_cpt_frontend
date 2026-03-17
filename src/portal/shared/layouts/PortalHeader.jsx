import React from "react";
import { useNavigate } from "react-router-dom";
import logodark from "../../../assets/images/logo/1.svg";
import { isPortalAuthenticated } from "../../../utils/portalAuth";
import { logoutPortalUser } from "../../../api/auth";

const roleLabels = {
  admin: "Admin Operations",
  driver: "Driver Portal",
};

const PortalHeader = ({ pageTitle = "", role = "admin", onToggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = isPortalAuthenticated();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logoutPortalUser();
      navigate("/portal/login");
      return;
    }

    navigate("/portal/login");
  };

  return (
    <>
      <header className="portal-header">
        <div className="portal-header-container">
          <div className="portal-header-left">
            <img src={logodark} alt="WhyCapeTown" className="portal-logo-img" />
          </div>

          <div className="portal-header-center">
            <div className="portal-header-text-wrap">
              <div className="portal-role-label">
                {roleLabels[role] || "Portal"}
              </div>
              {pageTitle ? <h1 className="portal-page-title">{pageTitle}</h1> : null}
            </div>
          </div>

          <div className="portal-header-right">
            <button
              type="button"
              className="portal-auth-btn"
              onClick={handleAuthClick}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>

            <button
              type="button"
              className="portal-burger"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .portal-header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 14px rgba(0,0,0,0.16);
        }

        .portal-header-container {
          width: 94%;
          max-width: 1400px;
          margin: auto;
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .portal-logo-img {
          height: 70px;
        }

        .portal-header-center {
          flex: 1;
          text-align: center;
        }

        .portal-role-label {
          color: rgba(255,255,255,0.8);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .portal-page-title {
          color: white;
          font-size: 22px;
          font-weight: 800;
          margin: 2px 0 0 0;
        }

        .portal-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .portal-auth-btn {
          height: 40px;
          padding: 0 14px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .portal-auth-btn:hover {
          background: rgba(255,255,255,0.25);
        }

        .portal-burger {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .portal-burger span,
        .portal-burger span::before,
        .portal-burger span::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 2px;
          background: white;
          border-radius: 2px;
        }

        .portal-burger span::before {
          transform: translateY(-6px);
        }

        .portal-burger span::after {
          transform: translateY(6px);
        }

        .portal-burger:hover {
          background: rgba(255,255,255,0.25);
        }

        @media (max-width: 768px) {
          .portal-header-container {
            min-height: 78px;
          }

          .portal-logo-img {
            height: 56px;
          }

          .portal-page-title {
            font-size: 18px;
          }

          .portal-auth-btn {
            padding: 0 12px;
            font-size: 13px;
          }

          .portal-header-right {
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default PortalHeader;