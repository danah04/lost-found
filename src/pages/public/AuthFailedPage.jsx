import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthFailedPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✖</div>
        <h1 style={styles.title}>Authentication Failed</h1>
        <p style={styles.message}>
          We could not sign you in using KFUPM SSO.
        </p>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            Possible reasons:
          </p>
          <ul style={styles.list}>
            <li>Invalid session or expired token</li>
            <li>Temporary issue with the authentication service</li>
            <li>Unexpected server error</li>
          </ul>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryButton}
            onClick={() => (window.location.href = "/api/auth/kfupm-sso")}
          >
            Retry Login
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/")}
          >
            Back to Home
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
    color: "#dc2626",
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
  infoBox: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "left",
    marginBottom: "24px",
  },
  infoText: {
    fontWeight: "bold",
    color: "#991b1b",
    marginBottom: "8px",
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "#7f1d1d",
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