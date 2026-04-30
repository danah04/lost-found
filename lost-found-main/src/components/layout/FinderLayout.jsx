import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function FinderLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <main style={{ padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}