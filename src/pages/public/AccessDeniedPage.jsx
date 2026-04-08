import React from "react";
import { useNavigate } from "react-router-dom";
import "./publicPages.css";

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="state-page-wrapper">
      <div className="state-card">
        <h1 className="state-title">Access Denied</h1>

        <div className="state-message-box warning-box">
          <p>
            You do not have permission to access this section of the
            application.
          </p>

          <p>
            If you believe this is an error, please contact the administrator.
          </p>
        </div>

        <div className="state-actions">
          <button
            className="primary-btn small-btn"
            onClick={() => navigate("/")}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
