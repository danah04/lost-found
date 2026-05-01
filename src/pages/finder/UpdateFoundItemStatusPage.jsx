import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItemsAPI } from "../../services/api";

export default function UpdateFoundItemStatusPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await foundItemsAPI.getById(id);
        const foundItem = data.item || data;

        setItem(foundItem);
        setStatus(foundItem.status || "Pending Review");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      await foundItemsAPI.updateStatus(id, {
        status,
        notes,
      });

      setItem((currentItem) => ({
        ...currentItem,
        status,
      }));

      setOk(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <AppLayout role="finder">
        <section className="page">
          <div className="card">Loading item status...</div>
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

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Update Item Status</h1>
            <p>Mark whether the item was returned or handed to administration.</p>
          </div>
        </div>

        {ok && (
          <div className="success-banner" style={{ marginBottom: 16 }}>
            Item status updated to {status}.
          </div>
        )}

        <form className="card form" onSubmit={handleSubmit}>
          <h2>{item.title}</h2>

          <p>
            Current status: <span className="badge warning">{item.status}</span>
          </p>

          <div className="field">
            <label>
              Update Status <span className="required">*</span>
            </label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Returned</option>
              <option>Handed to Administration</option>
              <option>Recovered</option>
              <option>Needs Moderator Review</option>
            </select>
          </div>

          <div className="field">
            <label>Notes Optional</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add handover notes or location details."
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" disabled={submitting}>
              {submitting ? "Updating..." : "Confirm Update"}
            </button>

            <Link className="btn btn-secondary" to="/finder/my-found-items">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
