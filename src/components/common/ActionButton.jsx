import React from "react";

const ActionButton = ({ label }) => {
  return (
    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
      {label}
    </button>
  );
};

export default ActionButton;