import React from "react";
import { useNavigate } from "react-router-dom";
import FinderLayout from "../../components/layout/FinderLayout";
import StatCard from "../../components/common/StatCard";
import ActionButton from "../../components/common/ActionButton";

const FinderDashboard = () => {
  const navigate = useNavigate();

  return (
    <FinderLayout>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "24px",
          color: "#111827",
        }}
      >
        Finder Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        <StatCard
          title="Found Items Reported"
          value="0"
          subtitle="Total items reported"
        />
        <StatCard
          title="Pending Approval"
          value="0"
          subtitle="Items awaiting approval"
        />
        <StatCard
          title="Recovered Items"
          value="0"
          subtitle="Items returned to owners"
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Quick Actions
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "16px",
            lineHeight: 1.5,
          }}
        >
          Listings must be approved by a moderator before appearing in public
          search results.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ActionButton
            label="Browse Found Items"
            onClick={() => navigate("/owner/browse-items")}
          />
          <ActionButton
            label="Messages"
            onClick={() => navigate("/owner/messages")}
          />
          <ActionButton
            label="Notifications"
            onClick={() => navigate("/owner/notifications")}
          />
        </div>
      </div>
    </FinderLayout>
  );
};

export default FinderDashboard;