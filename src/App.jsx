import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./public/LandingPage";
import AuthFailedPage from "./public/AuthFailedPage";
import AccessDeniedPage from "./public/AccessDeniedPage";

function BrowseListingsPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Browse Listings Page</h1>
      <p>This page will contain public lost/found listings.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-failed" element={<AuthFailedPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/browse-listings" element={<BrowseListingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}