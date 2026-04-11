import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import AccessDeniedPage from "./pages/public/AccessDeniedPage";
import AuthFailedPage from "./pages/public/AuthFailedPage";
import FinderDashboard from "./pages/finder/FinderDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import BrowseItemsPage from "./pages/owner/BrowseItemsPage";
import ItemDetailsPage from "./pages/owner/ItemDetailsPage";
import ClaimItemPage from "./pages/owner/ClaimItemPage";
import MessagesPage from "./pages/owner/MessagesPage";
import NotificationsPage from "./pages/owner/NotificationsPage";
import NotFoundPage from "./pages/shared/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/auth-failed" element={<AuthFailedPage />} />

      <Route path="/finder/dashboard" element={<FinderDashboard />} />

      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/owner/browse-items" element={<BrowseItemsPage />} />
      <Route path="/owner/items/:id" element={<ItemDetailsPage />} />
      <Route path="/owner/claim/:id" element={<ClaimItemPage />} />
      <Route path="/owner/messages" element={<MessagesPage />} />
      <Route path="/owner/notifications" element={<NotificationsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
