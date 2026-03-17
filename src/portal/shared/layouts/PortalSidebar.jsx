import React from "react";
import { Link, useLocation } from "react-router-dom";

const navMap = {
  admin: [
    { label: "Dashboard", to: "/portal/admin/dashboard" },
    { label: "Drivers", to: "/portal/admin/drivers" },
    { label: "Bookings", to: "/portal/admin/bookings" },
    { label: "New Booking", to: "/portal/admin/bookings/new" },
    { label: "Availability", to: "/portal/admin/availability" },
    { label: "Vehicles", to: "/portal/admin/vehicles" },
    { label: "Finance", to: "/portal/admin/finance" },
  ],
  driver: [
    { label: "My Schedule", to: "/portal/driver/schedule" },
    { label: "My Trips", to: "/portal/driver/trips" },
    { label: "Blocked Dates", to: "/portal/driver/blocked-dates" },
    { label: "Payments", to: "/portal/driver/payments" },
  ],
};

const PortalSidebar = ({ role = "admin", sidebarOpen = false, onClose }) => {
  const location = useLocation();
  const items = navMap[role] || [];

  const isActive = (path) => {
    if (
      path === "/portal/admin/drivers" &&
      location.pathname.startsWith("/portal/admin/drivers")
    ) {
      return true;
    }

    if (
      path === "/portal/admin/bookings" &&
      location.pathname.startsWith("/portal/admin/bookings")
    ) {
      return true;
    }

    if (
      path === "/portal/driver/trips" &&
      location.pathname.startsWith("/portal/driver/trips")
    ) {
      return true;
    }

    return location.pathname === path;
  };

  return (
    <>
      <aside className={`portal-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="portal-sidebar-inner">
          <div className="portal-sidebar-top">
            <div className="portal-sidebar-title">
              {role === "admin" ? "Admin Menu" : "Driver Menu"}
            </div>

            <button
              type="button"
              className="portal-sidebar-close"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>

          <nav className="portal-sidebar-nav">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`portal-sidebar-link ${isActive(item.to) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {sidebarOpen ? (
        <div className="portal-sidebar-overlay" onClick={onClose}></div>
      ) : null}

      <style>{`
        .portal-sidebar {
          position: fixed;
          top: 0;
          left: -270px;
          width: 270px;
          height: 100vh;
          background: linear-gradient(180deg, #0b5b33 0%, #063e23 100%);
          color: #fff;
          z-index: 1200;
          transition: left 0.28s ease;
          border-right: 1px solid rgba(255,255,255,0.08);
          box-shadow: 8px 0 30px rgba(0,0,0,0.25);
        }

        .portal-sidebar.open {
          left: 0;
        }

        .portal-sidebar-inner {
          padding: 26px 18px;
        }

        .portal-sidebar-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .portal-sidebar-title {
          font-size: 18px;
          font-weight: 800;
          color: white;
        }

        .portal-sidebar-close {
          border: none;
          background: transparent;
          color: white;
          font-size: 30px;
          line-height: 1;
          cursor: pointer;
        }

        .portal-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .portal-sidebar-link {
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 12px 14px;
          border-radius: 12px;
          transition: background 0.22s ease, transform 0.22s ease;
          display: block;
        }

        .portal-sidebar-link:hover {
          background: rgba(255,255,255,0.10);
          transform: translateX(2px);
        }

        .portal-sidebar-link.active {
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.10);
          font-weight: 700;
        }

        .portal-sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.36);
          z-index: 1100;
        }
      `}</style>
    </>
  );
};

export default PortalSidebar;