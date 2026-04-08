import React from "react";
import { useNavigate } from "react-router-dom";
import "./finder.css";

export default function FinderDashboard() {
  const navigate = useNavigate();

  return (
    <div className="finder-layout">
      <aside className="finder-sidebar">
        <div className="finder-sidebar-brand">KFUPM Lost &amp; Found (Finder)</div>

        <button className="finder-side-link active" onClick={() => navigate("/finder/dashboard")}>
          Dashboard
        </button>
        <button className="finder-side-link" onClick={() => navigate("/finder/report-found-item")}>
          Report Found Item
        </button>
        <button className="finder-side-link" onClick={() => navigate("/finder/my-found-items")}>
          My Found Items
        </button>
        <button className="finder-side-link" onClick={() => navigate("/finder/found-item-details/1")}>
          Suggested Matches
        </button>
        <button className="finder-side-link">
          Messages
        </button>
      </aside>

      <div className="finder-main">
        <header className="finder-topbar">
          <div className="finder-topbar-brand">KFUPM Lost &amp; Found (Finder)</div>
          <div className="finder-topbar-links">
            <span>Notifications</span>
            <span>Profile</span>
            <span>Logout</span>
          </div>
        </header>

        <main className="finder-content">
          <h1 className="finder-page-title">Finder Dashboard</h1>

          <div className="finder-stats">
            <div className="finder-stat-card">
              <h3>Found Items Reported</h3>
              <div className="finder-stat-number">0</div>
              <p>Total items reported</p>
            </div>

            <div className="finder-stat-card">
              <h3>Pending Approval</h3>
              <div className="finder-stat-number">0</div>
              <p>Items awaiting approval</p>
            </div>

            <div className="finder-stat-card">
              <h3>Recovered Items</h3>
              <div className="finder-stat-number">0</div>
              <p>Items returned to owners</p>
            </div>
          </div>

          <section className="finder-quick-actions">
            <h2>Quick Actions</h2>
            <p>
              Listings must be approved by a moderator before appearing in public
              search results.
            </p>

            <div className="finder-actions-row">
              <button
                className="finder-btn"
                onClick={() => navigate("/finder/report-found-item")}
              >
                Report Found Item
              </button>

              <button
                className="finder-btn"
                onClick={() => navigate("/finder/my-found-items")}
              >
                View My Found Items
              </button>

              <button
                className="finder-btn"
                onClick={() => navigate("/finder/found-item-details/1")}
              >
                View Suggested Matches
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}