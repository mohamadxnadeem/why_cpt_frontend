import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPortalUser } from "../../../api/auth";
import { getPortalRole, isPortalAuthenticated } from "../../../utils/portalAuth";
import logodark from "../../../assets/images/logo/1.svg";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Check if user already logged in
  // ==========================================
  useEffect(() => {

    console.log("=== LOGIN PAGE LOAD ===");

    console.log("Stored access token:", localStorage.getItem("portal_access_token"));
    console.log("Stored refresh token:", localStorage.getItem("portal_refresh_token"));
    console.log("Stored user:", localStorage.getItem("portal_user"));
    console.log("Stored role:", localStorage.getItem("portal_role"));

    console.log("isPortalAuthenticated():", isPortalAuthenticated());

    if (isPortalAuthenticated()) {

      const role = getPortalRole();

      console.log("Detected role:", role);

      if (role === "admin") {
        console.log("Redirecting to admin dashboard...");
        navigate("/portal/admin/dashboard");
      }

      else if (role === "driver") {
        console.log("Redirecting to driver schedule...");
        navigate("/portal/driver/schedule");
      }
    }

  }, [navigate]);

  // ==========================================
  // Handle input changes
  // ==========================================
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ==========================================
  // Login submit
  // ==========================================
  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Payload:", formData);

    try {

      setLoading(true);
      setError("");

      const result = await loginPortalUser(formData);

      console.log("Login API result:", result);

      console.log("Saved access token:", localStorage.getItem("portal_access_token"));
      console.log("Saved refresh token:", localStorage.getItem("portal_refresh_token"));
      console.log("Saved user:", localStorage.getItem("portal_user"));
      console.log("Saved role:", localStorage.getItem("portal_role"));

      if (result.role === "admin") {

        console.log("Admin login successful — redirecting...");

        navigate("/portal/admin/dashboard");
        return;
      }

      if (result.role === "driver") {

        console.log("Driver login successful — redirecting...");

        navigate("/portal/driver/schedule");
        return;
      }

      console.log("No valid role found in result");

      setError("No valid portal role found for this account.");

    }

    catch (err) {

      console.error("Portal login error:", err);

      console.log("Error response:", err?.response?.data);

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed.";

      setError(message);
    }

    finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className="portal-login-page">
        <div className="portal-login-card">
          <div className="portal-login-logo-wrap">
            <img src={logodark} alt="WhyCapeTown" className="portal-login-logo" />
          </div>

          <div className="portal-login-heading-wrap">
            <div className="portal-login-kicker">WhyCapeTown Portal</div>
            <h1 className="portal-login-title">Sign In</h1>
            <p className="portal-login-subtitle">
              Admin and driver access only.
            </p>
          </div>

          <form className="portal-login-form" onSubmit={handleSubmit}>
            <div className="portal-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            <div className="portal-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? <div className="portal-login-error">{error}</div> : null}

            <button
              type="submit"
              className="portal-login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* STYLES UNCHANGED */}
    </>
  );
};

export default Login;