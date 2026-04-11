import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = "moderator";

    if (role === "owner") navigate("/owner/dashboard");
    else if (role === "finder") navigate("/finder/dashboard");
    else if (role === "moderator") navigate("/moderator/dashboard");
    else navigate("/auth-failed");
  }, [navigate]);

  return <p>Redirecting...</p>;
}