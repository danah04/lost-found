import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { categories, locations } from "../../data/mockData";
import { moderatorAPI } from "../../services/api";

export default function EditListingPage() {
  const { id } = useParams();

  const [form, setForm] = useState({
    category: "",
    location: "",
    description: "",
    time: "",
  });

  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setIsError(false);

    try {
      const payload = {};

      Object.entries(form).forEach(([key, value]) => {
        if (value && value.trim()) {
          payload[key] = value.trim();
        }
      });

      if (Object.keys(payload).length === 0) {
        setStatus("Enter at least one field to update.");
        setIsError(true);
        return;
      }

      await moderatorAPI.editListing(id, payload);

      setStatus("Listing updated successfully.");
      setIsError(false);
      setForm({
        category: "",
        location: "",
        description: "",
        time: "",
      });
    } catch (error) {
      setStatus(error.message || "Could not update listing.");
      setIsError(true);
    }
  }

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Edit Listing</h1>
            <p>Correct listing details for better search accuracy.</p>
          </div>
        </div>

        {status && (
          <div className={isError ? "error-banner" : "success-banner"}>
            {status}
          </div>
        )}

        <form className="card form" onSubmit={submit}>
          <div className="field">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option value="">Keep current category</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Location</label>
            <select
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            >
              <option value="">Keep current location</option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Updated description"
            />
          </div>

          <div className="field">
            <label>Time</label>
            <input
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
              placeholder="Example: 13:30"
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary">Save Changes</button>

            <Link className="btn btn-secondary" to="/moderator/active-listings">
              Back
            </Link>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}