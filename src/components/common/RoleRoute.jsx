import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRole }) {
  const user = {
    isAuthenticated: true,
    role: "moderator",
  };

  if (!user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;