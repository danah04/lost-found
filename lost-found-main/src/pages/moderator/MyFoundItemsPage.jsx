import { useState } from "react";

export default function MyFoundItemsPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Silver Watch", status: "Available", matches: 2 },
    { id: 2, name: "USB Drive", status: "Matched", matches: 1 },
  ]);

  const handleChange = (id, status) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>My Found Items</h1>

      {items.map((item) => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.name}</h3>
          <p>Status: {item.status}</p>
          <p>Matches: {item.matches}</p>

          <select
            value={item.status}
            onChange={(e) => handleChange(item.id, e.target.value)}
            style={selectStyle}
          >
            <option>Available</option>
            <option>Matched</option>
            <option>Returned</option>
            <option>Closed</option>
          </select>
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

const selectStyle = {
  marginTop: "10px",
  padding: "8px",
  borderRadius: "5px",
};