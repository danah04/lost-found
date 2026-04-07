import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h2>Navbar Placeholder</h2>
      <hr />
      <Outlet />
    </div>
  );
}

export default MainLayout;