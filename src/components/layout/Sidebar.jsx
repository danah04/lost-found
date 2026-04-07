import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        padding: "1rem",
        borderRight: "1px solid #ddd",
      }}
    >
      <p><strong>Navigation</strong></p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/owner/dashboard">Owner Dashboard</Link></li>
        <li><Link to="/finder/dashboard">Finder Dashboard</Link></li>
        <li><Link to="/moderator/dashboard">Moderator Dashboard</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;