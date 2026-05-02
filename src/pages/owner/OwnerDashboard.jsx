import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { itemsAPI, notificationsAPI } from "../../services/api";

export default function OwnerDashboard() {
  const [lostItems, setLostItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("Loading dashboard...");

  async function loadDashboard() {
    try {
      const [lostData, claimsData, notificationData] = await Promise.all([
        itemsAPI.getMyLost(),
        itemsAPI.getMyClaims(),
        notificationsAPI.getAll(),
      ]);

      setLostItems(lostData.items || lostData.lostItems || []);
      setClaims(claimsData.claims || []);
      setNotifications(notificationData.notifications || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load dashboard.");
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Owner Dashboard</h1>
            <p>Report lost items, track claims, read messages, and check notifications.</p>
          </div>

          <div className="actions">
            <Link className="btn btn-primary" to="/owner/report-lost">
              Report Lost Item
            </Link>
            <Link className="btn btn-secondary" to="/owner/browse-items">
              Browse Found Items
            </Link>
          </div>
        </div>

        {status && <p className="muted">{status}</p>}

        <div className="responsive-grid">
          <div className="card stat">
            <span className="muted">My Lost Listings</span>
            <strong>{lostItems.length}</strong>
          </div>

          <div className="card stat">
            <span className="muted">My Claims</span>
            <strong>{claims.length}</strong>
          </div>

          <div className="card stat">
            <span className="muted">Notifications</span>
            <strong>{notifications.length}</strong>
          </div>

          <div className="card stat">
            <span className="muted">Unread Notifications</span>
            <strong>{notifications.filter((n) => !n.isRead).length}</strong>
          </div>
        </div>

        <div className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card">
            <h2>My Lost Items</h2>

            {lostItems.length === 0 && (
              <p className="muted">No lost items submitted yet.</p>
            )}

            {lostItems.slice(0, 4).map((item) => (
              <p key={item._id}>
                <strong>{item.title}</strong>{" "}
                <span className="badge warning">{item.status}</span>
                <br />
                <span className="muted">
                  {item.location} -{" "}
                  {item.dateLost
                    ? new Date(item.dateLost).toLocaleDateString()
                    : "No date"}
                </span>
              </p>
            ))}

            <Link className="btn btn-outline" to="/owner/report-lost">
              Add Lost Item
            </Link>
          </div>

          <div className="card">
            <h2>My Claims</h2>

            {claims.length === 0 && <p className="muted">No claims submitted yet.</p>}

            {claims.slice(0, 4).map((claim) => (
              <p key={claim._id}>
                <strong>
                  {claim.foundItem?.title || claim.item?.title || "Claim"}
                </strong>{" "}
                <span className="badge warning">{claim.status}</span>
                <br />
                <span className="muted">
                  Submitted{" "}
                  {claim.createdAt
                    ? new Date(claim.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </p>
            ))}

            <Link className="btn btn-outline" to="/owner/browse-items">
              Browse Found Items
            </Link>
          </div>

          <div className="card">
            <h2>Messages</h2>
            <p className="muted">Open your message center to continue conversations.</p>
            <Link className="btn btn-outline" to="/owner/messages">
              View Messages
            </Link>
          </div>

          <div className="card">
            <h2>Notifications</h2>

            {notifications.length === 0 && (
              <p className="muted">No notifications yet.</p>
            )}

            {notifications.slice(0, 2).map((notification) => (
              <p key={notification._id}>
                <strong>{notification.title}</strong>
                <br />
                <span className="muted">{notification.message}</span>
              </p>
            ))}

            <Link className="btn btn-outline" to="/owner/notifications">
              View Notifications
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}