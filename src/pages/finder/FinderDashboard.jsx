import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItemsAPI } from "../../services/api";

export default function FinderDashboard() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await foundItemsAPI.getMine();
        setFoundItems(data.items || data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const pendingCount = foundItems.filter((item) =>
    item.status?.toLowerCase().includes("pending")
  ).length;

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Finder Dashboard</h1>
            <p>
              Report found items, manage your submitted items, and review
              suggested matches.
            </p>
          </div>

          <div className="actions">
            <Link className="btn btn-primary" to="/finder/report-found">
              Report Found Item
            </Link>
            <Link className="btn btn-secondary" to="/finder/my-found-items">
              My Found Items
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="card">Loading dashboard...</div>
        ) : (
          <div className="responsive-grid">
            <div className="card stat">
              <span className="muted">Found Items Reported</span>
              <strong>{foundItems.length}</strong>
            </div>

            <div className="card stat">
              <span className="muted">Pending Approval</span>
              <strong>{pendingCount}</strong>
            </div>

            <div className="card stat">
              <span className="muted">Suggested Matches</span>
              <strong>0</strong>
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop: 16 }}>
          <h2>Quick Actions</h2>

          <div className="actions">
            <Link className="btn btn-primary" to="/finder/report-found">
              Report Found Item
            </Link>

            <Link className="btn btn-outline" to="/finder/suggested-matches">
              View Suggested Matches
            </Link>

            <Link className="btn btn-outline" to="/finder/messages">
              Messages
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
