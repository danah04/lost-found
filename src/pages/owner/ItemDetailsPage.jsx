import { Link, useParams } from "react-router-dom";
import { mockItems } from "../../data/mockItems";

function ItemDetailsPage() {
  const { id } = useParams();
  const item = mockItems.find((entry) => String(entry.id) === id);

  if (!item) {
    return <h1>Item not found</h1>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{item.title}</h1>

      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      />

      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date Found:</strong> {item.date}</p>
      <p><strong>Status:</strong> {item.status}</p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to={`/owner/claim/${item.id}`}>Claim Item</Link>
        <Link to="/owner/messages">Contact Finder</Link>
      </div>
    </div>
  );
}

export default ItemDetailsPage;