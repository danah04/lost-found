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
        <Link
          to="/finder/dashboard"
          style={{ color: "#ffffff", textDecoration: "none" }}
        >
          Finder Dashboard
        </Link>
        <Link
          to="/owner/browse-items"
          style={{ color: "#ffffff", textDecoration: "none" }}
        >
          Browse Items
        </Link>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {/* Existing links */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/finder-dashboard" style={linkStyle}>Finder Dashboard</Link>
        <Link to="/shared-test" style={linkStyle}>Shared Test</Link>

        {/* Moderator links */}
        <Link to="/moderator/review" style={linkStyle}>Review</Link>
        <Link to="/moderator/verification" style={linkStyle}>Verification</Link>
        <Link to="/moderator/matches" style={linkStyle}>Matches</Link>
        <Link to="/moderator/reports" style={linkStyle}>Reports</Link>
        <Link to="/moderator/return" style={linkStyle}>Return</Link>
        <Link to="/moderator/my-found-items" style={linkStyle}>My Items</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
};

export default Navbar;
