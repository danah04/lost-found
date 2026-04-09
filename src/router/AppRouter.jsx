import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import BrowseItemsPage from "../pages/owner/BrowseItemsPage";
import ItemDetailsPage from "../pages/owner/ItemDetailsPage";
import ClaimItemPage from "../pages/owner/ClaimItemPage";
import MessagesPage from "../pages/owner/MessagesPage";
import NotificationsPage from "../pages/owner/NotificationsPage";
import NotFoundPage from "../pages/shared/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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

export default AppRouter;