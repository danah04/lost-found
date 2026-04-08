function StatCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        minWidth: "180px",
      }}
    >
      <h4 style={{ margin: 0, fontSize: "16px", color: "#374151" }}>{title}</h4>
      <p style={{ fontSize: "28px", fontWeight: "700", margin: "10px 0", color: "#111827" }}>
        {value}
      </p>
      {subtitle && (
        <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{subtitle}</p>
      )}
    </div>
  );
}

export default StatCard;
