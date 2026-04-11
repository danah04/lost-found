import { useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, issue: "Fake claim on wallet", status: "Open" },
    { id: 2, issue: "Wrong item category", status: "Open" },
  ]);

  const handleResolve = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
  };

  const handleDismiss = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Dismissed" } : r
      )
    );
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Reports</h1>

      {reports.map((report) => (
        <div key={report.id} style={cardStyle}>
          <h3>{report.issue}</h3>
          <p>Status: {report.status}</p>

          <button onClick={() => handleResolve(report.id)} style={greenBtn}>
            Resolve
          </button>

          <button onClick={() => handleDismiss(report.id)} style={redBtn}>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1f1f1f",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  color: "white",
};

const greenBtn = {
  marginRight: "10px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const redBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};