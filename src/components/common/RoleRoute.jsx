import { Navigate, Outlet } from "react-router-dom";

function RoleRoute({ allowedRole }) {
  const user = {
    isAuthenticated: true,
    role: "owner",
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