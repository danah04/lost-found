import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { path: "/finder/dashboard", label: "Dashboard" },
    { path: "/owner/browse-items", label: "Browse Found Items" },
    { path: "/owner/messages", label: "Messages" },
    { path: "/owner/notifications", label: "Notifications" },
  ];

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#374151",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "20px 16px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: "18px" }}>Finder Panel</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 10px",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;