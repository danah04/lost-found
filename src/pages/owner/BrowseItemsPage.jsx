import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { categories, locations } from "../../data/mockData";
import { itemsAPI } from "../../services/api";

function statusClass(status) {
  if (status === "returned" || status === "Recovered") return "badge success";
  if (status === "rejected" || status === "removed") return "badge danger";
  return "badge warning";
}

export default function BrowseItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("Loading found items...");

  async function loadItems(filters = {}) {
    try {
      setStatus("Loading found items...");

      const data = await itemsAPI.browseFound({
        keyword: filters.search ?? search,
        category: filters.category ?? category,
        location: filters.location ?? location,
      });

      setItems(data.items || data.foundItems || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load found items.");
    }
  }

  function submit(e) {
    e.preventDefault();
    loadItems({ search, category, location });
  }

  useEffect(() => {
    loadItems({ search: "", category: "", location: "" });
  }, []);

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Browse Found Items</h1>
            <p>Search approved found-item listings and submit a claim when something looks like yours.</p>
          </div>
        </div>

        <form className="card form" style={{ marginBottom: 20 }} onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label>Search</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by item name or description"
              />
            </div>

            <div className="field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All locations</option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">
              Apply Filters
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("");
                setLocation("");
                loadItems({ search: "", category: "", location: "" });
              }}
            >
              Clear
            </button>
          </div>
        </form>

        {status && <p className="muted">{status}</p>}

        {!status && items.length === 0 && (
          <div className="card">
            <p className="muted">No found items match your search.</p>
          </div>
        )}

        <div className="grid grid-3">
          {items.map((item) => (
            <article className="card item-card" key={item._id}>
              {item.image && (
                <img
                  src={item.image.startsWith("/") ? item.image : `/images/${item.image}`}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <h2>{item.title}</h2>
              <p className="muted">{item.description}</p>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={statusClass(item.status)}>{item.status}</span>
              </p>

              <Link className="btn btn-primary" to={`/owner/items/${item._id}`}>
                View Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}