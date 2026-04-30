function Card({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {title && (
        <h3 style={{ marginTop: 0, marginBottom: "12px", color: "#1f2a44" }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
