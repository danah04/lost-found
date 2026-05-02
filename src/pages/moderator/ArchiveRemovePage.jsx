import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ArchiveRemovePage() {
  const { id } = useParams();

  const [action, setAction] = useState("archive");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setIsError(false);

    if (!reason.trim()) {
      setStatus("Reason is required.");
      setIsError(true);
      return;
    }

    try {
      await moderatorAPI.changeVisibility(id, {
        action,
        reason: reason.trim(),
      });

      setStatus(`Listing ${action === "archive" ? "archived" : "removed"} successfully.`);
      setIsError(false);
      setReason("");
    } catch (error) {
      setStatus(error.message || "Could not update listing visibility.");
      setIsError(true);
    }
  }

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Archive / Remove Listing</h1>
            <p>Hide outdated or inappropriate listings from public results.</p>
          </div>
        </div>

        {status && (
          <div className={isError ? "error-banner" : "success-banner"}>
            {status}
          </div>
        )}

        <form className="card form" onSubmit={submit}>
          <div className="field">
            <label>Action</label>
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              <option value="archive">Archive</option>
              <option value="remove">Remove</option>
            </select>
          </div>

          <div className="field">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason is required."
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary">Confirm</button>

            <Link className="btn btn-secondary" to="/moderator/active-listings">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}