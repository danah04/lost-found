function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) {
  const styles = {
    primary: {
      backgroundColor: "#1f2a44",
      color: "#ffffff",
      border: "none",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
      border: "none",
    },
    outline: {
      backgroundColor: "#ffffff",
      color: "#1f2a44",
      border: "1px solid #1f2a44",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "#ffffff",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "14px",
        fontWeight: "600",
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.6 : 1,
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

export default Button;
