import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import AccessDeniedPage from "../pages/public/AccessDeniedPage";
import AuthFailedPage from "../pages/public/AuthFailedPage";
import LoginRedirect from "../pages/public/LoginRedirect";

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
import PostLostItem from "../pages/owner/PostLostItem";

import FinderDashboard from "../pages/finder/FinderDashboard";
import PostFoundItem from "../pages/finder/PostFoundItem";
import MyFoundItemsPage from "../pages/finder/MyFoundItemsPage";
import MatchesPage from "../pages/finder/MatchesPage";

import ModeratorDashboard from "../pages/moderator/ModeratorDashboard";
import ReviewPage from "../pages/moderator/ReviewPage";
import VerificationPage from "../pages/moderator/VerificationPage";
import ReportsPage from "../pages/moderator/ReportsPage";
import ReturnPage from "../pages/moderator/ReturnPage";

import NotFoundPage from "../pages/shared/NotFoundPage";

import RoleRoute from "./RoleRoute";

function AppRouter() {
  const userRole = "moderator";

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/auth-failed" element={<AuthFailedPage />} />

      <Route
        path="/owner/dashboard"
        element={
          <RoleRoute allowedRole="owner" userRole={userRole}>
            <OwnerDashboard />
          </RoleRoute>
        }
      />
      <Route path="/owner/browse-items" element={<BrowseItemsPage />} />
      <Route path="/owner/items/:id" element={<ItemDetailsPage />} />
      <Route path="/owner/claim/:id" element={<ClaimItemPage />} />
      <Route path="/owner/messages" element={<MessagesPage />} />
      <Route path="/owner/notifications" element={<NotificationsPage />} />
      <Route path="/owner/report-lost" element={<PostLostItem />} />

      <Route
        path="/finder/dashboard"
        element={
          <RoleRoute allowedRole="finder" userRole={userRole}>
            <FinderDashboard />
          </RoleRoute>
        }
      />
      <Route path="/finder/report" element={<PostFoundItem />} />
      <Route path="/finder/my-found-items" element={<MyFoundItemsPage />} />
      <Route path="/finder/matches" element={<MatchesPage />} />

      <Route
        path="/moderator/dashboard"
        element={
          <RoleRoute allowedRole="moderator" userRole={userRole}>
            <ModeratorDashboard />
          </RoleRoute>
        }
      />
      <Route path="/moderator/review" element={<ReviewPage />} />
      <Route path="/moderator/verification" element={<VerificationPage />} />
      <Route path="/moderator/reports" element={<ReportsPage />} />
      <Route path="/moderator/return" element={<ReturnPage />} />
      <Route path="/sso-login" element={<LoginRedirect />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;