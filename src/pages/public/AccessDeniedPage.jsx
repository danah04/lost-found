import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🔒</div>
        <h1 style={styles.title}>Access Denied</h1>
        <p style={styles.message}>
          You do not have permission to view this page.
        </p>

        <div style={styles.alertBox}>
          This page may be restricted to moderators or authorized users only.
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={() => navigate("/")}>
            Return to Homepage
          </button>
          <button style={styles.secondaryButton} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  icon: {
    fontSize: "42px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    color: "#0f172a",
    marginBottom: "12px",
  },
  message: {
    color: "#475569",
    marginBottom: "20px",
  },
  alertBox: {
    backgroundColor: "#fff7ed",
    border: "1px solid #fdba74",
    color: "#9a3412",
    borderRadius: "8px",
    padding: "14px",
    marginBottom: "24px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#e2e8f0",
    color: "#0f172a",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
