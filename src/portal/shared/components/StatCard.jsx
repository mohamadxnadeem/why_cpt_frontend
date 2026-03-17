import React from "react";

const StatCard = ({ title, value, subtitle }) => {
  return (
    <>
      <div className="portal-stat-card">
        <div className="portal-stat-title">{title}</div>
        <div className="portal-stat-value">{value}</div>
        {subtitle ? <div className="portal-stat-subtitle">{subtitle}</div> : null}
      </div>

      <style>{`
        .portal-stat-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: 1px solid rgba(11,91,51,0.08);
          min-height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .portal-stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #5f6b66;
          margin-bottom: 10px;
          letter-spacing: 0.01em;
        }

        .portal-stat-value {
          font-size: 34px;
          line-height: 1;
          font-weight: 800;
          color: #0b5b33;
          margin-bottom: 10px;
        }

        .portal-stat-subtitle {
          font-size: 13px;
          color: #7c8782;
        }
      `}</style>
    </>
  );
};

export default StatCard;