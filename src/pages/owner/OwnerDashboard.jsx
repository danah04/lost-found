import { Link } from "react-router-dom";

function OwnerDashboard() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Owner Dashboard</h1>

      <ul>
        <li><Link to="/owner/browse-items">Browse Found Items</Link></li>
        <li><Link to="/owner/messages">Messages</Link></li>
        <li><Link to="/owner/notifications">Notifications</Link></li>
      </ul>
    </div>
  );
}

export default OwnerDashboard;