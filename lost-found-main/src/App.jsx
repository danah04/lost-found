import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import LoginRedirect from "./pages/public/LoginRedirect";
import AccessDeniedPage from "./pages/public/AccessDeniedPage";
import AuthFailedPage from "./pages/public/AuthFailedPage";
import NotFoundPage from "./pages/shared/NotFoundPage";
import ProfilePage from "./pages/shared/ProfilePage";
import RoleRoute from "./components/common/RoleRoute";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import PostLostItem from "./pages/owner/PostLostItem";
import BrowseItemsPage from "./pages/owner/BrowseItemsPage";
import ItemDetailsPage from "./pages/owner/ItemDetailsPage";
import ClaimItemPage from "./pages/owner/ClaimItemPage";
import MessagesPage from "./pages/owner/MessagesPage";
import NotificationsPage from "./pages/owner/NotificationsPage";

import FinderDashboard from "./pages/finder/FinderDashboard";
import PostFoundItem from "./pages/finder/PostFoundItem";
import MyFoundItemsPage from "./pages/finder/MyFoundItemsPage";
import SuggestedMatchesPage from "./pages/finder/SuggestedMatchesPage";
import FinderItemDetailsPage from "./pages/finder/FinderItemDetailsPage";
import UpdateFoundItemStatusPage from "./pages/finder/UpdateFoundItemStatusPage";
import FinderMessagesPage from "./pages/finder/FinderMessagesPage";
import FinderNotificationsPage from "./pages/finder/FinderNotificationsPage";

import ModeratorDashboard from "./pages/moderator/ModeratorDashboard";
import PendingListingsPage from "./pages/moderator/PendingListingsPage";
import ListingReviewPage from "./pages/moderator/ListingReviewPage";
import EditListingPage from "./pages/moderator/EditListingPage";
import ArchiveRemovePage from "./pages/moderator/ArchiveRemovePage";
import ReportsPage from "./pages/moderator/ReportsPage";
import VerificationPage from "./pages/moderator/VerificationPage";
import ReturnConfirmationPage from "./pages/moderator/ReturnConfirmationPage";
import ActiveListingsPage from "./pages/moderator/ActiveListingsPage";

function Guard({ roles, children }) {
  return <RoleRoute allowedRoles={roles}>{children}</RoleRoute>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sso-login" element={<LoginRedirect />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/auth-failed" element={<AuthFailedPage />} />

      <Route path="/owner/dashboard" element={<Guard roles={["owner"]}><OwnerDashboard /></Guard>} />
      <Route path="/owner/report-lost" element={<Guard roles={["owner"]}><PostLostItem /></Guard>} />
      <Route path="/owner/browse-items" element={<BrowseItemsPage />} />
      <Route path="/owner/items/:id" element={<ItemDetailsPage />} />
      <Route path="/owner/claim/:id" element={<Guard roles={["owner"]}><ClaimItemPage /></Guard>} />
      <Route path="/owner/messages" element={<Guard roles={["owner"]}><MessagesPage /></Guard>} />
      <Route path="/owner/notifications" element={<Guard roles={["owner"]}><NotificationsPage /></Guard>} />
      <Route path="/owner/profile" element={<Guard roles={["owner"]}><ProfilePage role="owner" /></Guard>} />

      <Route path="/finder/dashboard" element={<Guard roles={["finder"]}><FinderDashboard /></Guard>} />
      <Route path="/finder/report-found" element={<Guard roles={["finder"]}><PostFoundItem /></Guard>} />
      <Route path="/finder/my-found-items" element={<Guard roles={["finder"]}><MyFoundItemsPage /></Guard>} />
      <Route path="/finder/suggested-matches" element={<Guard roles={["finder"]}><SuggestedMatchesPage /></Guard>} />
      <Route path="/finder/found-items/:id" element={<Guard roles={["finder"]}><FinderItemDetailsPage /></Guard>} />
      <Route path="/finder/found-items/:id/update-status" element={<Guard roles={["finder"]}><UpdateFoundItemStatusPage /></Guard>} />
      <Route path="/finder/messages" element={<Guard roles={["finder"]}><FinderMessagesPage /></Guard>} />
      <Route path="/finder/notifications" element={<Guard roles={["finder"]}><FinderNotificationsPage /></Guard>} />
      <Route path="/finder/profile" element={<Guard roles={["finder"]}><ProfilePage role="finder" /></Guard>} />

      <Route path="/moderator/dashboard" element={<Guard roles={["moderator"]}><ModeratorDashboard /></Guard>} />
      <Route path="/moderator/pending-listings" element={<Guard roles={["moderator"]}><PendingListingsPage /></Guard>} />
      <Route path="/moderator/review/:id" element={<Guard roles={["moderator"]}><ListingReviewPage /></Guard>} />
      <Route path="/moderator/edit-listing/:id" element={<Guard roles={["moderator"]}><EditListingPage /></Guard>} />
      <Route path="/moderator/archive-remove" element={<Guard roles={["moderator"]}><ArchiveRemovePage /></Guard>} />
      <Route path="/moderator/reports" element={<Guard roles={["moderator"]}><ReportsPage /></Guard>} />
      <Route path="/moderator/verification" element={<Guard roles={["moderator"]}><VerificationPage /></Guard>} />
      <Route path="/moderator/return-confirmation" element={<Guard roles={["moderator"]}><ReturnConfirmationPage /></Guard>} />
      <Route path="/moderator/active-listings" element={<Guard roles={["moderator"]}><ActiveListingsPage /></Guard>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
