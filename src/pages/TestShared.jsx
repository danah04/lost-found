import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import StatCard from "../components/common/StatCard";

function TestShared() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>Shared Components Test</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>

      <div style={{ maxWidth: "400px" }}>
        <Input label="Item Title" placeholder="Enter item title" />
      </div>

      <Card title="Found Item">
        <p>Blue backpack found near library.</p>
      </Card>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <StatCard title="Found Items" value="10" subtitle="Total items reported" />
        <StatCard title="Pending Approval" value="3" subtitle="Waiting for review" />
      </div>
    </div>
  );
}

export default TestShared; 