import React from "react";
import "./publicPages.css";

export default function LoginPage() {
  return (
    <div className="public-page">
      <div className="landing-card">
        <h1 className="landing-title">Login</h1>
        <p className="landing-subtitle">Sign in to your account</p>

        <form className="landing-actions">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
