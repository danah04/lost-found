import "./OwnerDashboard.css";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Owner Dashboard</h1>

      {/* Navigation Buttons */}
      <div className="dashboard-actions">
        <button onClick={() => navigate("/owner/lost-item")}>
          Post Lost Item
        </button>

        <button onClick={() => navigate("/finder/found-item")}>
          Post Found Item
        </button>

        <button>
          Search Items
        </button>

        <button>
          Report Issue
        </button>
      </div>

      {/* Sections */}
      <div className="dashboard-grid">

        <div className="card">
          <h3>Submitted Listings</h3>
          <p>No data yet</p>
        </div>

        <div className="card">
          <h3>Reports</h3>
          <p>No reports yet</p>
        </div>

        <div className="card">
          <h3>Ownership Claims</h3>
          <p>No claims yet</p>
        </div>

        <div className="card">
          <h3>Return Status</h3>
          <p>No returns yet</p>
        </div>

      </div>
    </div>
  );
}

export default OwnerDashboard;