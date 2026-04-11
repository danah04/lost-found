import { Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import AccessDeniedPage from "./pages/public/AccessDeniedPage";
import AuthFailedPage from "./pages/public/AuthFailedPage";
import PostLostItem from "./pages/owner/PostLostItem";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import PostFoundItem from "./pages/finder/PostFoundItem";

// Finder
import FinderDashboard from "./pages/finder/FinderDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/auth-failed" element={<AuthFailedPage />} />
      <Route path="/finder/dashboard" element={<FinderDashboard />} />
      <Route path="/owner/lost-item" element={<PostLostItem />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/finder/found-item" element={<PostFoundItem />} />
    </Routes>
  );
}