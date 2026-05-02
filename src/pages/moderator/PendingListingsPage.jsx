import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function PendingListingsPage() {
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("Loading pending listings...");

  async function loadListings() {
    try {
      const data = await moderatorAPI.pendingListings();
      setListings(data.listings || data.items || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load pending listings.");
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
            <h1>Pending Listings</h1>
            <p>Review submitted lost and found listings before publishing.</p>
          </div>

          <button className="btn btn-secondary" onClick={loadListings}>
            Refresh
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && listings.length === 0 && (
          <div className="card">
            <p className="muted">No pending listings.</p>
          </div>
        )}

        {listings.length > 0 && (
          <div className="card table-card">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {listings.map((listing) => (
                  <tr key={listing._id}>
                    <td>{listing.title}</td>
                    <td>{listing.type || listing.itemType || "listing"}</td>
                    <td>{listing.category}</td>
                    <td>{listing.location}</td>
                    <td>
                      <span className="badge warning">{listing.status}</span>
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/moderator/listings/${listing._id}/review`}
                      >
                        Review
                      </Link>
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