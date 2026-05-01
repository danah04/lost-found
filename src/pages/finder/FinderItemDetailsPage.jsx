import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItemsAPI } from "../../services/api";

export default function FinderItemDetailsPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItemDetails() {
      try {
        const data = await foundItemsAPI.getById(id);

        const foundItem = data.item || data;
        setItem(foundItem);

       
        setMatches(data.matches || []);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadItemDetails();
  }, [id]);

  function getItemId(item) {
    return item._id || item.id;
  }

  function getImageUrl(item) {
    if (!item.imageUrl && !item.image) return "";

    if (item.imageUrl) return item.imageUrl;

    if (item.image?.startsWith("http")) return item.image;

    return `http://localhost:5050/${item.image}`;
  }

  if (loading) {
    return (
      <AppLayout role="finder">
        <section className="page">
          <div className="card">Loading item details...</div>
        </section>
      </AppLayout>
    );
  }

  if (!item) {
    return (
      <AppLayout role="finder">
        <section className="page">
          <div className="danger-banner">Found item not found.</div>
        </section>
      </AppLayout>
    );
  }

  const itemId = getItemId(item);
  const imageUrl = getImageUrl(item);

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Found Item Details</h1>
            <p>
              Review this listing and compare it with suggested lost-item
              reports.
            </p>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h2>{item.title}</h2>

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Date/Time:</strong> {item.date} {item.time}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <div className="actions">
              <Link
                className="btn btn-primary"
                to={`/finder/found-items/${itemId}/update-status`}
              >
                Update Status
              </Link>

              <Link className="btn btn-secondary" to="/finder/messages">
                Contact Owner
              </Link>
            </div>
          </div>

          <div className="detail-image">
            {imageUrl ? (
              <img src={imageUrl} alt={item.title} />
            ) : (
              <div className="upload-preview">
                <span>No image available</span>
              </div>
            )}
          </div>
        </div>

        <h2 style={{ marginTop: 24 }}>Suggested Lost Item Matches</h2>

        {matches.length === 0 ? (
          <div className="card">
            <p className="muted">No suggested matches available yet.</p>
          </div>
        ) : (
          <div className="responsive-grid">
            {matches.map((match) => {
              const matchId = match._id || match.id;
              const matchImage =
                match.imageUrl ||
                (match.image?.startsWith("http")
                  ? match.image
                  : match.image
                    ? `http://localhost:5050/${match.image}`
                    : "");

              return (
                <div className="card item-card" key={matchId}>
                  <div className="item-image">
                    {matchImage ? (
                      <img src={matchImage} alt={match.title} />
                    ) : (
                      <span>No image</span>
                    )}
                  </div>

                  <div className="item-card-body">
                    <h3>{match.title}</h3>
                    <p className="item-meta">
                      {match.location} · {match.date}
                    </p>
                    <p>{match.description}</p>
                    <button className="btn btn-sm btn-outline">
                      Message Owner
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AppLayout>
  );
}