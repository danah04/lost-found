import React from "react";

const ActionButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#374151",
        color: "#ffffff",
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      {label}
    </button>
  );
};

export default ActionButton;