import React from "react";
import { useNavigate } from "react-router-dom";
import "./publicPages.css";

export default function AuthFailedPage() {
  const navigate = useNavigate();

  const retryLogin = () => {
    window.location.href = "/sso-login";
  };

  return (
    <div className="state-page-wrapper">
      <div className="state-card">
        <h1 className="state-title">Authentication Failed</h1>

        <div className="state-message-box error-box">
          <p>
            Error: Your login attempt was unsuccessful. Please check your
            credentials and try again.
          </p>

          <p>
            It seems there was an issue verifying your identity with KFUPM SSO.
            This could be a temporary system error.
          </p>
        </div>

        <div className="state-actions">
          <button className="primary-btn small-btn" onClick={retryLogin}>
            Retry Login
          </button>

          <button
            className="secondary-btn small-btn"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}