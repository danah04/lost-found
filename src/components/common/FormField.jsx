function FormField({ label, required = false, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "6px", display: "block" }}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {children}
    </div>
  );
}

export default FormField;
