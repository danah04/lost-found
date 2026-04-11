import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRole, userRole, children }) => {
  if (!userRole) return <Navigate to="/auth-failed" />;
  if (userRole !== allowedRole) return <Navigate to="/access-denied" />;
  
  return children;
};

export default RoleRoute;