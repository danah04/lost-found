import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { categories, locations, foundItems } from "../../data/mockData";

function statusClass(status) {
  if (status === "Recovered") return "badge success";
  if (status === "Rejected" || status === "Removed") return "badge danger";
  return "badge warning";
}

export default function BrowseItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(
    () =>
      foundItems.filter(
        (item) =>
          (!search || `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase())) &&
          (!category || item.category === category) &&
          (!location || item.location === location)
      ),
    [search, category, location]
  );

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Browse Found Items</h1>
            <p>Search approved found-item listings and submit a claim when something looks like yours.</p>
          </div>
        </div>

        <div className="card form" style={{ marginBottom: 20 }}>
          <FormRow label="Search">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by item name or description" />
          </FormRow>
          <div className="form-grid">
            <FormRow label="Category">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FormRow>
            <FormRow label="Location">
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All locations</option>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </FormRow>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="warning-banner">No results found. Try changing the filters.</div>
        ) : (
          <div className="responsive-grid">
            {filtered.map((item) => (
              <article className="card item-card" key={item.id}>
                <div className="item-image"><img src={item.imageUrl} alt={item.title} /></div>
                <div className="item-card-body">
                  <h2>{item.title}</h2>
                  <p className="item-meta">{item.location} · {item.date}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="actions"><span className="badge info">{item.category}</span><span className={statusClass(item.status)}>{item.status}</span></p>
                  <div className="actions" style={{ marginTop: "auto" }}>
                    <Link className="btn btn-primary" to={`/owner/items/${item.id}`}>View Details</Link>
                    <Link className="btn btn-outline" to={`/owner/claim/${item.id}`}>Claim Item</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}

function FormRow({ label, children }) {
  return <div className="field"><label>{label}</label>{children}</div>;
}
