import { useState } from "react";

export default function ReviewPage() {
  const [items, setItems] = useState([
    { id: 1, name: "iPhone 13", status: "Pending" },
    { id: 2, name: "Black Wallet", status: "Pending" },
  ]);

  const handleApprove = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: "Approved" } : item
    );
    setItems(updatedItems);
  };

  const handleReject = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: "Rejected" } : item
    );
    setItems(updatedItems);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Review Items</h1>

      {items.map((item) => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.name}</h3>
          <p>Status: {item.status}</p>

          <button
            style={approveBtn}
            onClick={() => handleApprove(item.id)}
          >
            Approve
          </button>

          <button
            style={rejectBtn}
            onClick={() => handleReject(item.id)}
          >
            Reject
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

const approveBtn = {
  marginRight: "10px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const rejectBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};