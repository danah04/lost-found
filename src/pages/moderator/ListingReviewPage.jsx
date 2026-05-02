import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ListingReviewPage() {
  const { id } = useParams();

  const [action, setAction] = useState("approve");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setIsError(false);

    if ((action === "reject" || action === "clarification") && !note.trim()) {
      setStatus("A note is required for rejection or clarification.");
      setIsError(true);
      return;
    }

    try {
      await moderatorAPI.reviewListing(id, {
        action,
        note: note.trim(),
      });

      setStatus("Listing review action saved successfully.");
      setIsError(false);
      setNote("");
    } catch (error) {
      setStatus(error.message || "Could not review listing.");
      setIsError(true);
    }
  }

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Listing Review</h1>
            <p>Approve, reject, or request clarification for this listing.</p>
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
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
              <option value="clarification">Request Clarification</option>
            </select>
          </div>

          <div className="field">
            <label>Moderator Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Required for rejection or clarification."
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary">Submit Review</button>

            <Link className="btn btn-secondary" to="/moderator/pending-listings">
              Back
            </Link>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}