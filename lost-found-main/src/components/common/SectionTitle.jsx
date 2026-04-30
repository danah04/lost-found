function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ margin: 0, color: "#1f2a44" }}>{title}</h2>
      {subtitle && (
        <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{subtitle}</p>
      )}
    </div>
  );
}

export default SectionTitle;