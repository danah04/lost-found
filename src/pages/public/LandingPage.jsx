import Button from "../../components/common/Button";
import StatCard from "../../components/common/StatCard";

function LandingPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 24px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "32px", color: "#1f2a44", marginBottom: "12px" }}>
          KFUPM Lost & Found
        </h1>

        <p
          style={{
            color: "#4b5563",
            maxWidth: "600px",
            margin: "0 auto 24px",
            fontSize: "16px",
          }}
        >
          Report lost items, find what you’ve lost, and help others recover their belongings across KFUPM campus.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary">Login with KFUPM SSO</Button>
          <Button variant="outline">Browse Listings</Button>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Items Returned"
          value="1,245"
          subtitle="Recovered successfully"
        />
        <StatCard
          title="Active Listings"
          value="532"
          subtitle="Currently available"
        />
        <StatCard
          title="Users Helped"
          value="980"
          subtitle="Happy students"
        />
      </div>

      {/* How it works */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#1f2a44" }}>
          How it works
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <h3 style={{ color: "#111827" }}>1. Report</h3>
            <p style={{ color: "#6b7280" }}>
              Submit details about lost or found items easily.
            </p>
          </div>

          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <h3 style={{ color: "#111827" }}>2. Match</h3>
            <p style={{ color: "#6b7280" }}>
              System suggests possible matches automatically.
            </p>
          </div>

          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <h3 style={{ color: "#111827" }}>3. Recover</h3>
            <p style={{ color: "#6b7280" }}>
              Connect and return items to their owners safely.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
