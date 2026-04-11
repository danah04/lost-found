import React from "react";
import { useNavigate } from "react-router-dom";
import "./publicPages.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBrowse = () => {
    navigate("/browse-listings");
  };

  return (
    <div className="public-page">
      <header className="topbar">
        <div className="brand">KFUPM Lost &amp; Found</div>

        <nav className="topbar-links">
          <button type="button" className="nav-link-btn">
            Contact
          </button>
          <button type="button" className="nav-link-btn">
            Help
          </button>
        </nav>
      </header>

      <main className="landing-main">
        <section className="landing-card">
          <div className="landing-inner-line" />

          <h1 className="landing-title">Welcome to KFUPM Lost &amp; Found</h1>

          <p className="landing-subtitle">
            Your central hub for reporting and recovering lost and found items
            within the KFUPM campus. Connecting the community to help reunite
            owners with their belongings.
          </p>

          <div className="landing-actions">
            <button className="primary-btn" onClick={handleLogin}>
              Login with KFUPM SSO
            </button>

            <button className="secondary-btn" onClick={handleBrowse}>
              Browse Listings
            </button>
          </div>

          <div className="stats-row">
            <div className="stat-box">
              <p className="stat-label">Items Returned</p>
              <h2 className="stat-number">1,234</h2>
            </div>

            <div className="stat-box">
              <p className="stat-label">Active Listings</p>
              <h2 className="stat-number">567</h2>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Contact Us</span>
        <span>Help Center</span>
        <span>Privacy Policy</span>
        <span>© 2026 KFUPM Lost &amp; Found. All rights reserved.</span>
      </footer>
    </div>
  );
}