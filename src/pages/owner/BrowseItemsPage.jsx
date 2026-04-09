import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockItems } from "../../data/mockItems";

function BrowseItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category ? item.category === category : true;
      const matchesLocation = location ? item.location === location : true;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Browse Found Items</h1>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", minWidth: "220px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">All Categories</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Personal Items">Personal Items</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">All Locations</option>
          <option value="Library">Library</option>
          <option value="Building 58">Building 58</option>
          <option value="Gym">Gym</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <p>{item.location}</p>
                <p>{item.date}</p>
              </div>

              <Link to={`/owner/items/${item.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseItemsPage;