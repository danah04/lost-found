import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import BrowseItemsPage from "../pages/owner/BrowseItemsPage";
import ItemDetailsPage from "../pages/owner/ItemDetailsPage";
import ClaimItemPage from "../pages/owner/ClaimItemPage";
import MessagesPage from "../pages/owner/MessagesPage";
import NotificationsPage from "../pages/owner/NotificationsPage";
import ModeratorDashboard from "../pages/moderator/ModeratorDashboard";
import ReviewPage from "../pages/moderator/ReviewPage";
import VerificationPage from "../pages/moderator/VerificationPage";
import ReportsPage from "../pages/moderator/ReportsPage";
import ReturnPage from "../pages/moderator/ReturnPage";
import MyFoundItemsPage from "../pages/moderator/MyFoundItemsPage";
import MatchesPage from "../pages/moderator/MatchesPage";
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

      <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
      <Route path="/moderator/review" element={<ReviewPage />} />
      <Route path="/moderator/verification" element={<VerificationPage />} />
      <Route path="/moderator/reports" element={<ReportsPage />} />
      <Route path="/moderator/return" element={<ReturnPage />} />
      <Route path="/moderator/my-found-items" element={<MyFoundItemsPage />} />
      <Route path="/moderator/matches" element={<MatchesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;