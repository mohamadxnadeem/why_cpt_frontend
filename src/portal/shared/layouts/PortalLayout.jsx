import React, { useState } from "react";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";

const PortalLayout = ({ children, role = "admin", pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="portal-root">
      <PortalSidebar
        role={role}
        sidebarOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="portal-main">
        <PortalHeader
          role={role}
          pageTitle={pageTitle}
          onToggleSidebar={handleToggleSidebar}
        />

        <div className="portal-content">{children}</div>
      </div>

      <style>{`
        .portal-root {
          display: flex;
          min-height: 100vh;
          background: #f6f8f7;
        }

        .portal-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .portal-content {
          padding: 32px;
        }

        @media (max-width: 900px) {
          .portal-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PortalLayout;