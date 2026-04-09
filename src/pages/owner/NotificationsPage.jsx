import { mockNotifications } from "../../data/mockNotifications";

function NotificationsPage() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Notifications</h1>

      <div style={{ display: "grid", gap: "1rem" }}>
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "1rem",
              backgroundColor: notification.read ? "#f8f8f8" : "#eef6ff",
            }}
          >
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <small>{notification.read ? "Read" : "Unread"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;