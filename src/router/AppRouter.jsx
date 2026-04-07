import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
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
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;