import { useState } from "react";

export default function ReturnPage() {
  const [returns, setReturns] = useState([
    { id: 1, item: "Blue Bottle", owner: "Maha", status: "Pending" },
    { id: 2, item: "Car Keys", owner: "Faisal", status: "Pending" },
  ]);

  const handleReturn = (id) => {
    setReturns(
      returns.map((r) =>
        r.id === id ? { ...r, status: "Returned" } : r
      )
    );
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Return Management</h1>

      {returns.map((item) => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.item}</h3>
          <p>Owner: {item.owner}</p>
          <p>Status: {item.status}</p>

          <button onClick={() => handleReturn(item.id)} style={greenBtn}>
            Mark Returned
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
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};