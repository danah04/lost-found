import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { authAPI, getStoredUser } from "../../services/api";

export default function ProfilePage({ role = "owner" }) {
  const [user, setUser] = useState(getStoredUser());
  const [status, setStatus] = useState("Loading profile...");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await authAPI.me();
        const currentUser = data.user || data.data?.user || data.data || null;

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem("lfUser", JSON.stringify(currentUser));
        }

        setStatus("");
      } catch (error) {
        setStatus(error.message || "Could not load profile.");
      }
    }

    loadProfile();
  }, []);

  return (
    <AppLayout role={role}>
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Profile</h1>
            <p>Account details from the authenticated backend user.</p>
          </div>
        </div>

        <div className="card">
          {status && <p className="muted">{status}</p>}

          {!status && (
            <>
              <p>
                <strong>Name:</strong> {user?.name || "Unknown"}
              </p>

              <p>
                <strong>Role:</strong> {user?.role || role}
              </p>

              <p>
                <strong>Email:</strong> {user?.email || "Not available"}
              </p>
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
}