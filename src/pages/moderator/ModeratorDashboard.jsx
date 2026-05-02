import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ModeratorDashboard() {
  const [stats, setStats] = useState({
    pendingListings: 0,
    openReports: 0,
    ownershipClaims: 0,
    returnConfirmations: 0,
  });

  const [status, setStatus] = useState("Loading dashboard...");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await moderatorAPI.dashboard();

        setStats({
          pendingListings:
            data.stats?.pendingListings ??
            data.pendingListings ??
            data.data?.pendingListings ??
            0,
          openReports:
            data.stats?.openReports ??
            data.openReports ??
            data.data?.openReports ??
            0,
          ownershipClaims:
            data.stats?.ownershipClaims ??
            data.ownershipClaims ??
            data.data?.ownershipClaims ??
            0,
          returnConfirmations:
            data.stats?.returnConfirmations ??
            data.returnConfirmations ??
            data.data?.returnConfirmations ??
            0,
        });

        setStatus("");
      } catch (error) {
        setStatus(error.message || "Could not load moderator dashboard.");
      }
    }

    loadDashboard();
  }, []);

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Moderator Dashboard</h1>
            <p>Review listings, reports, claims, and return confirmations.</p>
          </div>
        </div>

        {status && <p className="muted">{status}</p>}

        <div className="responsive-grid">
          <div className="card stat">
            <span className="muted">Pending Listings</span>
            <strong>{stats.pendingListings}</strong>
          </div>

          <div className="card stat">
            <span className="muted">Open Reports</span>
            <strong>{stats.openReports}</strong>
          </div>

          <div className="card stat">
            <span className="muted">Ownership Claims</span>
            <strong>{stats.ownershipClaims}</strong>
          </div>

          <div className="card stat">
            <span className="muted">Return Confirmations</span>
            <strong>{stats.returnConfirmations}</strong>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h2>Quick Actions</h2>

          <div className="actions">
            <Link className="btn btn-primary" to="/moderator/pending-listings">
              Review Pending Listings
            </Link>

            <Link className="btn btn-secondary" to="/moderator/reports">
              Manage Reports
            </Link>

            <Link className="btn btn-secondary" to="/moderator/verification">
              Verify Ownership
            </Link>

            <Link className="btn btn-secondary" to="/moderator/return-confirmation">
              Confirm Returns
            </Link>

            <Link className="btn btn-outline" to="/moderator/active-listings">
              Active Listings
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}