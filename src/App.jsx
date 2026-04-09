import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import AccessDeniedPage from "./pages/public/AccessDeniedPage";
import AuthFailedPage from "./pages/public/AuthFailedPage";

// Finder
import FinderDashboard from "./pages/finder/FinderDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/auth-failed" element={<AuthFailedPage />} />

        {/* Finder */}
        <Route path="/finder/dashboard" element={<FinderDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;