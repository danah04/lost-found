import { useState } from "react";

export default function VerificationPage() {
  const [claims, setClaims] = useState([
    { id: 1, claimant: "Ahmed", item: "AirPods Pro", status: "Pending" },
    { id: 2, claimant: "Sara", item: "Student ID Card", status: "Pending" },
  ]);

  const handleVerify = (id) => {
    const updatedClaims = claims.map((claim) =>
      claim.id === id ? { ...claim, status: "Verified" } : claim
    );
    setClaims(updatedClaims);
  };

  const handleDecline = (id) => {
    const updatedClaims = claims.map((claim) =>
      claim.id === id ? { ...claim, status: "Declined" } : claim
    );
    setClaims(updatedClaims);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Verification Requests</h1>

      {claims.map((claim) => (
        <div key={claim.id} style={cardStyle}>
          <h3>{claim.item}</h3>
          <p>Claimant: {claim.claimant}</p>
          <p>Status: {claim.status}</p>

          <button style={verifyBtn} onClick={() => handleVerify(claim.id)}>
            Verify
          </button>

          <button style={declineBtn} onClick={() => handleDecline(claim.id)}>
            Decline
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

const verifyBtn = {
  marginRight: "10px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const declineBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};