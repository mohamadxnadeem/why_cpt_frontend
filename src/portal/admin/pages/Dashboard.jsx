import React, { useEffect, useState } from "react";
import PortalLayout from "../../shared/layouts/PortalLayout";
import StatCard from "../../shared/components/StatCard";
import { getAdminDashboard } from "../../../api/admin";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();
        console.log("Dashboard API success:", data);
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard API full error:", err);
        console.error("Dashboard API response:", err?.response);
        console.error("Dashboard API response data:", err?.response?.data);

        const message =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Could not load dashboard data.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const today = dashboard?.today || {};
  const finance = dashboard?.finance || {};
  const upcoming = dashboard?.upcoming || {};
  const recentBookings = dashboard?.recent_bookings || [];
  const todayBookingDays = dashboard?.today_booking_days || [];

  return (
    <PortalLayout role="admin" pageTitle="Dashboard">

      <div className="dashboard-topbar">
  <div className="dashboard-topbar-left">
    <div className="dashboard-kicker">Operations Overview</div>
    <p className="dashboard-topbar-subtitle">
      Manage trips, drivers, vehicles, and availability from one place.
    </p>
  </div>

  <div className="dashboard-topbar-right">
    <Link to="/portal/admin/bookings/new" className="dashboard-create-btn">
      + Create New Trip
    </Link>
  </div>
</div>
      <div className="admin-dashboard-page">
        {loading ? (
          <div className="portal-state-card">Loading dashboard...</div>
        ) : error ? (
          <div className="portal-state-card portal-error-card">
            <div className="portal-error-title">Dashboard Error</div>
            <div className="portal-error-message">{error}</div>
            <div className="portal-error-help">
              Open browser dev tools and check the console + network tab for the
              exact API response.
            </div>
          </div>
        ) : (
          <>
            <section className="dashboard-stats-grid">
              <StatCard
                title="Trips Today"
                value={today.bookings_count ?? 0}
                subtitle={`${today.booking_days_count ?? 0} booking day rows`}
              />
              <StatCard
                title="Active Drivers"
                value={today.active_drivers ?? 0}
                subtitle="Active in system"
              />
              <StatCard
                title="Active Vehicles"
                value={today.active_vehicles ?? 0}
                subtitle="Active in system"
              />
              <StatCard
                title="Available Vehicles Today"
                value={today.available_vehicles_count ?? 0}
                subtitle={`${today.unavailable_vehicles_count ?? 0} unavailable`}
              />
              <StatCard
                title="Revenue"
                value={`R ${finance.total_client_amount ?? 0}`}
                subtitle={`${finance.start_date || "-"} to ${finance.end_date || "-"}`}
              />
              <StatCard
                title="Profit"
                value={`R ${finance.total_profit ?? 0}`}
                subtitle={`Unpaid drivers: R ${finance.unpaid_driver_amount ?? 0}`}
              />
            </section>

            <section className="dashboard-panels-grid">
              <div className="dashboard-panel">
                <div className="dashboard-panel-header">
                  <h2>Today’s Trips</h2>
                  <span>{todayBookingDays.length} items</span>
                </div>

                {todayBookingDays.length === 0 ? (
                  <div className="dashboard-empty">No trips scheduled for today.</div>
                ) : (
                  <div className="dashboard-table-wrap">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>Vehicle</th>
                          <th>Driver</th>
                          <th>Client</th>
                          <th>Route</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayBookingDays.map((item) => (
                          <tr key={item.id}>
                            <td>{item.booking_reference}</td>
                            <td>{item.vehicle || "-"}</td>
                            <td>{item.driver || "-"}</td>
                            <td>{item.customer_name || "-"}</td>
                            <td>
                              {(item.pickup_location || "-")} → {(item.dropoff_location || "-")}
                            </td>
                            <td>{item.day_type_display || item.day_type || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="dashboard-panel">
                <div className="dashboard-panel-header">
                  <h2>Recent Bookings</h2>
                  <span>{recentBookings.length} items</span>
                </div>

                {recentBookings.length === 0 ? (
                  <div className="dashboard-empty">No recent bookings found.</div>
                ) : (
                  <div className="recent-bookings-list">
                    {recentBookings.map((booking) => (
                      <div className="recent-booking-card" key={booking.id}>
                        <div className="recent-booking-top">
                          <div>
                            <div className="recent-booking-label">Reference</div>
                            <div className="recent-booking-reference">
                              {booking.booking_reference}
                            </div>
                          </div>

                          <div className={`recent-booking-status status-${booking.status || "pending"}`}>
                            {booking.status || "-"}
                          </div>
                        </div>

                        <div className="recent-booking-grid">
                          <div className="recent-booking-item">
                            <span className="recent-booking-item-label">Vehicle</span>
                            <span className="recent-booking-item-value">
                              {booking.car?.title || "-"}
                            </span>
                          </div>

                          <div className="recent-booking-item">
                            <span className="recent-booking-item-label">Driver</span>
                            <span className="recent-booking-item-value">
                              {booking.driver?.full_name || "-"}
                            </span>
                          </div>

                          <div className="recent-booking-item">
                            <span className="recent-booking-item-label">Client</span>
                            <span className="recent-booking-item-value">
                              {booking.customer_name || "-"}
                            </span>
                          </div>

                          <div className="recent-booking-item">
                            <span className="recent-booking-item-label">Days</span>
                            <span className="recent-booking-item-value">
                              {booking.total_days ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
            </section>

            <section className="dashboard-summary-row">
              <div className="dashboard-summary-card">
                <h3>Upcoming (Next 7 Days)</h3>
                <p>
                  <strong>{upcoming.next_7_days_bookings_count ?? 0}</strong> bookings
                </p>
                <p>
                  <strong>{upcoming.next_7_days_booking_days_count ?? 0}</strong> booking days
                </p>
              </div>

              <div className="dashboard-summary-card">
                <h3>Today</h3>
                <p>
                  <strong>{today.blocked_drivers_count ?? 0}</strong> blocked drivers
                </p>
                <p>
                  <strong>{today.unavailable_vehicles_count ?? 0}</strong> unavailable vehicles
                </p>
              </div>
            </section>
          </>
        )}
      </div>

      <style>{`
        .admin-dashboard-page {
          width: 100%;
        }

        .portal-state-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px;
          border: 1px solid rgba(11,91,51,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          color: #234437;
          font-weight: 600;
        }

        .portal-error-card {
          color: #a12626;
          border-color: rgba(161,38,38,0.12);
        }

        .portal-error-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .portal-error-message {
          font-size: 15px;
          margin-bottom: 10px;
        }

        .portal-error-help {
          font-size: 13px;
          color: #7a4b4b;
        }

        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .dashboard-panels-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }

        .dashboard-panel,
        .dashboard-summary-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: 1px solid rgba(11,91,51,0.08);
        }

        .dashboard-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .dashboard-panel-header h2,
        .dashboard-summary-card h3 {
          margin: 0;
          color: #0b5b33;
          font-size: 20px;
          font-weight: 800;
        }

        .dashboard-panel-header span {
          font-size: 13px;
          color: #6c7a74;
          font-weight: 600;
        }

        .dashboard-table-wrap {
          overflow-x: auto;
        }

        .dashboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .dashboard-table th,
        .dashboard-table td {
          text-align: left;
          padding: 12px 10px;
          border-bottom: 1px solid rgba(11,91,51,0.08);
          font-size: 14px;
          vertical-align: top;
        }

        .dashboard-table th {
          color: #4d5e57;
          font-weight: 700;
          font-size: 13px;
          background: rgba(11,91,51,0.03);
        }

        .dashboard-table td {
          color: #22342d;
        }

        .dashboard-empty {
          color: #6f7b76;
          font-size: 14px;
          padding: 10px 0;
        }

        .dashboard-summary-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .dashboard-summary-card p {
          margin: 10px 0 0 0;
          color: #355247;
          font-size: 15px;
        }

        @media (max-width: 1100px) {
          .dashboard-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dashboard-panels-grid,
          .dashboard-summary-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr;
          }
        }


        .recent-bookings-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.recent-booking-card {
  background: #fbfcfb;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(11,91,51,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recent-booking-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.04);
}

.recent-booking-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.recent-booking-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a8882;
  margin-bottom: 6px;
}

.recent-booking-reference {
  font-size: 16px;
  font-weight: 800;
  color: #123d2b;
}

.recent-booking-status {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
}

.recent-booking-status.status-pending {
  background: rgba(245, 158, 11, 0.12);
  color: #b56d00;
}

.recent-booking-status.status-confirmed {
  background: rgba(16, 185, 129, 0.12);
  color: #0d8b63;
}

.recent-booking-status.status-completed {
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.recent-booking-status.status-cancelled {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.recent-booking-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;
}

.recent-booking-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-booking-item-label {
  font-size: 12px;
  font-weight: 600;
  color: #7a8882;
}

.recent-booking-item-value {
  font-size: 14px;
  font-weight: 700;
  color: #22342d;
}

@media (max-width: 640px) {
  .recent-booking-grid {
    grid-template-columns: 1fr;
  }

  .recent-booking-top {
    flex-direction: column;
    align-items: flex-start;
  }
}

.dashboard-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 24px;
}

.dashboard-kicker {
  color: #0b5b33;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.dashboard-topbar-subtitle {
  margin: 0;
  color: #6c7a74;
  font-size: 15px;
  line-height: 1.6;
  max-width: 720px;
}

.dashboard-create-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  color: white;
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 10px 24px rgba(11,91,51,0.18);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.dashboard-create-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .dashboard-topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard-create-btn {
    width: 100%;
  }
}
      `}</style>
    </PortalLayout>
  );
};

export default Dashboard;