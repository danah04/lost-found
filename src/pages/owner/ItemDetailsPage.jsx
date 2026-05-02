import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { itemsAPI, messagesAPI } from "../../services/api";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("Loading item...");
  const [message, setMessage] = useState("");

  async function loadItem() {
    try {
      const data = await itemsAPI.getFoundDetails(id);
      setItem(data.item || data.foundItem || null);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load found item.");
    }
  }

  async function contactFinder() {
    if (!item?.finder && !item?.createdBy) {
      setMessage("Finder information is not available for this item.");
      return;
    }

    try {
      const recipientId =
        typeof item.finder === "object"
          ? item.finder._id
          : item.finder || item.createdBy;

      await messagesAPI.createOrGetConversation({
        recipientId,
        relatedFoundItem: item._id,
      });

      setMessage("Conversation created. Open Messages to continue.");
    } catch (error) {
      setMessage(error.message || "Could not create conversation.");
    }
  }

  useEffect(() => {
    loadItem();
  }, [id]);

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Found Item Details</h1>
            <p>Review the details carefully before submitting a claim or contacting the finder.</p>
          </div>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && !item && (
          <div className="card">
            <p className="muted">Item not found.</p>
          </div>
        )}

        {item && (
          <div className="grid grid-2">
            <div className="detail-image">
              {item.image ? (
                <img
                  src={item.image.startsWith("/") ? item.image : `/images/${item.image}`}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="card">
                  <p className="muted">No image uploaded.</p>
                </div>
              )}
            </div>

            <div className="card">
              <h2>{item.title}</h2>

              <p>
                <strong>Description:</strong> {item.description}
              </p>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Date found:</strong>{" "}
                {item.dateFound
                  ? new Date(item.dateFound).toLocaleDateString()
                  : "Not provided"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge warning">{item.status}</span>
              </p>

              {message && <div className="success-banner">{message}</div>}

              <div className="actions">
                <Link className="btn btn-primary" to={`/owner/claim/${item._id}`}>
                  Claim Item
                </Link>

                <button className="btn btn-secondary" onClick={contactFinder}>
                  Contact Finder
                </button>

                <Link className="btn btn-outline" to="/owner/browse-items">
                  Back to Browse
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}