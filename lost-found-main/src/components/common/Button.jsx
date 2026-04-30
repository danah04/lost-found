function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
}) {
  const variantClass = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    outline: "btn btn-outline",
    danger: "btn btn-danger",
    success: "btn btn-success",
  };

  const sizeClass = size === "sm" ? "btn-sm" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass[variant] || variantClass.primary} ${sizeClass} ${className}`}
      style={{
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default Button;