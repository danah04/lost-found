function Select({
  label,
  value,
  onChange,
  options = [],
  name,
  required = false,
}) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
      {label && (
        <label style={{ marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <select
        value={value}
        name={name}
        onChange={onChange}
        style={{
          padding: "10px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
        }}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;