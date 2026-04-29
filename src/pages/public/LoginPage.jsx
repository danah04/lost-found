import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const roles = [
  { role: "owner", title: "Item Owner", description: "Report lost items, browse found items, submit claims, and message finders." },
  { role: "finder", title: "Item Finder", description: "Report found items, manage your listings, update item status, and review matches." },
  { role: "moderator", title: "Moderator", description: "Review listings, handle reports, verify claims, and confirm returned items." },
];

export default function LoginPage() {
  const navigate = useNavigate();

  function loginAs(role) {
    localStorage.setItem("lfUser", JSON.stringify({ id: `${role}-demo`, name: "Demo User", role }));
    navigate(`/${role}/dashboard`);
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="content">
        <section className="page card login-card">
          <div className="page-header">
            <div>
              <h1>KFUPM Lost & Found Login</h1>
              <p>Choose a role to preview the correct dashboard and user flow.</p>
            </div>
          </div>

          <div className="grid grid-3">
            {roles.map((item) => (
              <button className="role-choice" key={item.role} onClick={() => loginAs(item.role)}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="btn btn-primary">Continue</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
