import React from "react";
import { Link, useLocation } from "react-router-dom";

const FinderLayout = ({ children }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/finder/dashboard" },
    { name: "Report Found Item", path: "/finder/report-found-item" },
    { name: "My Found Items", path: "/finder/my-found-items" },
    { name: "Suggested Matches", path: "/finder/suggested-matches" },
    { name: "Messages", path: "/finder/messages" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white border shadow">

        {/* Navbar */}
        <div className="bg-black text-white flex justify-between p-4">
          <h1>KFUPM Lost & Found (Finder)</h1>
          <div className="flex gap-4">
            <span>Notifications</span>
            <span>Profile</span>
            <span>Logout</span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-60 bg-gray-800 text-white p-4">
            {menu.map((item) => (
              <Link key={item.path} to={item.path}>
                <div
                  className={`p-2 mb-2 rounded ${
                    location.pathname === item.path
                      ? "bg-white text-black"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FinderLayout;
