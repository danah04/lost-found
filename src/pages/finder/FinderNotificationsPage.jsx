import { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";

const seedNotifications = [
  {
    id: "n1",
    title: "No backend notifications yet",
    message:
      "Notifications will appear here when the backend endpoint is available.",
    read: false,
  },
];

export default function FinderNotificationsPage() {
  const [items, setItems] = useState(seedNotifications);

  function markAllRead() {
    setItems((currentItems) =>
      currentItems.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Notifications</h1>
            <p>Approval updates, match alerts, status reminders, and messages.</p>
          </div>

          <button className="btn btn-secondary" onClick={markAllRead}>
            Mark All Read
          </button>
        </div>

        <div className="grid">
          {items.map((notification) => (
            <article className="card" key={notification.id}>
              <h2>
                {notification.title}{" "}
                {!notification.read && <span className="badge info">New</span>}
              </h2>

              <p className="muted">{notification.message}</p>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
