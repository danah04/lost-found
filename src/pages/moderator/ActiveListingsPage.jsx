import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ActiveListingsPage() {
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("Loading active listings...");

  async function loadListings() {
    try {
      const data = await moderatorAPI.activeListings();
      setListings(data.listings || data.items || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load active listings.");
    }
  }

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Active Listings</h1>
            <p>View, edit, archive, or remove active listings.</p>
          </div>

          <button className="btn btn-secondary" onClick={loadListings}>
            Refresh
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && listings.length === 0 && (
          <div className="card">
            <p className="muted">No active listings found.</p>
          </div>
        )}

        {listings.length > 0 && (
          <div className="card table-card">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {listings.map((listing) => (
                  <tr key={listing._id}>
                    <td>{listing.title}</td>
                    <td>{listing.category}</td>
                    <td>{listing.location}</td>
                    <td>
                      <span className="badge success">{listing.status}</span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link
                          className="btn btn-secondary"
                          to={`/moderator/listings/${listing._id}/edit`}
                        >
                          Edit
                        </Link>

                        <Link
                          className="btn btn-outline"
                          to={`/moderator/listings/${listing._id}/archive-remove`}
                        >
                          Archive/Remove
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppLayout>
  );
}