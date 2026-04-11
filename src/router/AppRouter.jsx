import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import ModeratorDashboard from "../pages/moderator/ModeratorDashboard";
import ReviewPage from "../pages/moderator/ReviewPage";
import VerificationPage from "../pages/moderator/VerificationPage";
import ReportsPage from "../pages/moderator/ReportsPage";
import ReturnPage from "../pages/moderator/ReturnPage";
import MyFoundItemsPage from "../pages/moderator/MyFoundItemsPage";
import MatchesPage from "../pages/moderator/MatchesPage";
import NotFoundPage from "../pages/shared/NotFoundPage";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";

function AccessDeniedPage() {
  return <h1>Access Denied</h1>;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route element={<RoleRoute allowedRole="owner" />}>
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          </Route>

          <Route element={<RoleRoute allowedRole="moderator" />}>
            <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
            <Route path="/moderator/review" element={<ReviewPage />} />
            <Route path="/moderator/verification" element={<VerificationPage />} />
            <Route path="/moderator/reports" element={<ReportsPage />} />
            <Route path="/moderator/return" element={<ReturnPage />} />
            <Route path="/moderator/my-found-items" element={<MyFoundItemsPage />} />
            <Route path="/moderator/matches" element={<MatchesPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;