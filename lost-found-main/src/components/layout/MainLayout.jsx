import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout() {
  const location = useLocation();

  const sidebarRoutes = [
    "/finder/dashboard",
    "/owner/browse-items",
    "/owner/messages",
    "/owner/notifications",
  ];

  const showSidebar = sidebarRoutes.includes(location.pathname);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <Navbar />

      <div style={{ display: "flex" }}>
        {showSidebar && <Sidebar />}

        <main
          style={{
            flex: 1,
            padding: "24px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
