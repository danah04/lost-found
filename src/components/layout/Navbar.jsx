import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1f2a44",
        color: "#ffffff",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "20px" }}>KFUPM Lost & Found</h2>

      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/finder-dashboard" style={{ color: "#ffffff", textDecoration: "none" }}>
          Finder Dashboard
        </Link>
        <Link to="/shared-test" style={{ color: "#ffffff", textDecoration: "none" }}>
          Shared Test
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
