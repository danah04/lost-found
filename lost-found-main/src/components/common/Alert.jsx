function Alert({ type = "info", message }) {
  const styles = {
    success: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      border: "1px solid #86efac",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #fca5a5",
    },
    warning: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      border: "1px solid #fcd34d",
    },
    info: {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
      border: "1px solid #93c5fd",
    },
  };

  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "14px",
        ...styles[type],
      }}
    >
      {message}
    </div>
  );
}

export default Alert;
