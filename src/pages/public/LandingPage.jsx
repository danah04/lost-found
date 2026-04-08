import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSSOLogin = () => {
    
    window.location.href = "/api/auth/kfupm-sso";
  };

  const handleBrowseListings = () => {
    navigate("/browse");
  };

  return (
    <div style={styles.page}>
      <header style={styles.navbar}>
        <div style={styles.logo}>KFUPM Lost & Found</div>
        <div style={styles.navLinks}>
          <button style={styles.linkButton}>Contact</button>
          <button style={styles.linkButton}>Help</button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.heroCard}>
          <h1 style={styles.title}>Welcome to KFUPM Lost & Found</h1>
          <p style={styles.subtitle}>
            Your central hub for reporting and recovering lost and found items
            within the KFUPM campus.
          </p>

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton} onClick={handleSSOLogin}>
              Login with KFUPM SSO
            </button>
            <button style={styles.secondaryButton} onClick={handleBrowseListings}>
              Browse Listings
            </button>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>1,234</span>
              <span style={styles.statLabel}>Items Returned</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>567</span>
              <span style={styles.statLabel}>Active Listings</span>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div>Contact Us</div>
        <div>Help Center</div>
        <div>Privacy Policy</div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "10px",
  },
  linkButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  heroCard: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    fontSize: "34px",
    marginBottom: "12px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: "28px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },
  primaryButton: {
    backgroundColor: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#e2e8f0",
    color: "#0f172a",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  statCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "20px 30px",
    minWidth: "180px",
  },
  statNumber: {
    display: "block",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: "6px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#64748b",
  },
  footer: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    fontSize: "14px",
  },
};