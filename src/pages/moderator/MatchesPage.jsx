import { useState } from "react";

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    {
      id: 1,
      foundItem: "Silver Watch",
      possibleOwnerItem: "Silver Wrist Watch",
      location: "Building 58",
      date: "2026-04-05",
      status: "High Match",
    },
    {
      id: 2,
      foundItem: "USB Drive",
      possibleOwnerItem: "Black USB Flash Drive",
      location: "Library",
      date: "2026-04-06",
      status: "Medium Match",
    },
  ];

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Item Matches</h1>

      {matches.map((match) => (
        <div key={match.id} style={cardStyle}>
          <h3>Found Item: {match.foundItem}</h3>
          <p>Possible Lost Item: {match.possibleOwnerItem}</p>
          <p>Location: {match.location}</p>
          <p>Date: {match.date}</p>
          <p>Status: {match.status}</p>

          <button
            style={detailsBtn}
            onClick={() => setSelectedMatch(match)}
          >
            View Details
          </button>
        </div>
      ))}

      {selectedMatch && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <h2>Match Details</h2>
            <p><strong>Found Item:</strong> {selectedMatch.foundItem}</p>
            <p><strong>Possible Lost Item:</strong> {selectedMatch.possibleOwnerItem}</p>
            <p><strong>Location:</strong> {selectedMatch.location}</p>
            <p><strong>Date:</strong> {selectedMatch.date}</p>
            <p><strong>Status:</strong> {selectedMatch.status}</p>

            <button
              style={closeBtn}
              onClick={() => setSelectedMatch(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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

const detailsBtn = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  color: "black",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
};

const closeBtn = {
  marginTop: "10px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};