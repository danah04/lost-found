import React from "react";
import FinderLayout from "../../components/layout/FinderLayout";
import StatCard from "../../components/common/StatCard";
import ActionButton from "../../components/common/ActionButton";
import { Link } from "react-router-dom";

const FinderDashboard = () => {
  return (
    <FinderLayout>
      <h2 className="text-2xl font-bold mb-6">Finder Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
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

      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
        <p className="text-sm text-gray-500 mb-4">
          Listings must be approved by a moderator before appearing in public search results.
        </p>

        <div className="flex gap-3">
          <Link to="/finder/report-found-item">
            <ActionButton label="Report Found Item" />
          </Link>

          <Link to="/finder/my-found-items">
            <ActionButton label="View My Found Items" />
          </Link>

          <Link to="/finder/suggested-matches">
            <ActionButton label="View Suggested Matches" />
          </Link>
        </div>
      </div>
    </FinderLayout>
  );
};

export default FinderDashboard;