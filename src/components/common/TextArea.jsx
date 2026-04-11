function TextArea({
  label,
  placeholder,
  value,
  onChange,
  name,
  rows = 4,
  required = false,
}) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
      {label && (
        <label style={{ marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        value={value}
        name={name}
        rows={rows}
        onChange={onChange}
        style={{
          padding: "10px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          resize: "vertical",
        }}
      />
    </div>
  );
}

export default TextArea;
