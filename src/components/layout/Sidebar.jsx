import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { path: "/finder-dashboard", label: "Dashboard" },
    { path: "/report-found-item", label: "Report Found Item" },
    { path: "/my-found-items", label: "My Found Items" },
    { path: "/suggested-matches", label: "Suggested Matches" },
    { path: "/messages", label: "Messages" },
  ];

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#374151",
        color: "#ffffff",
        minHeight: "calc(100vh - 64px)",
        padding: "20px 16px",
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
