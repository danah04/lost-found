import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { notificationsAPI } from "../../services/api";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [status, setStatus] = useState("Loading notifications...");

  async function loadNotifications() {
    try {
      const data = await notificationsAPI.getAll();
      setItems(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load notifications.");
    }
  }

  async function markAllRead() {
    try {
      await notificationsAPI.markAllRead();
      await loadNotifications();
    } catch (error) {
      setStatus(error.message || "Could not mark notifications as read.");
    }
  }

  async function markOneRead(id) {
    try {
      await notificationsAPI.markOneRead(id);
      await loadNotifications();
    } catch (error) {
      setStatus(error.message || "Could not update notification.");
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Notifications</h1>
            <p>Status changes, messages, approvals, and claim updates.</p>
            <p className="muted">Unread: {unreadCount}</p>
          </div>

          <button className="btn btn-secondary" onClick={markAllRead}>
            Mark All Read
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && items.length === 0 && (
          <div className="card">
            <p className="muted">No notifications yet.</p>
          </div>
        )}

        <div className="grid">
          {items.map((notification) => (
            <article className="card" key={notification._id}>
              <h2>
                {notification.title}{" "}
                {!notification.isRead && <span className="badge info">New</span>}
              </h2>

              <p className="muted">{notification.message}</p>

              <small>
                {notification.createdAt
                  ? new Date(notification.createdAt).toLocaleString()
                  : ""}
              </small>

              {!notification.isRead && (
                <div className="actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => markOneRead(notification._id)}
                  >
                    Mark Read
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}