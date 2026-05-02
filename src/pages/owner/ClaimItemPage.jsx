import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { itemsAPI } from "../../services/api";

export default function ClaimItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function loadItem() {
    try {
      const data = await itemsAPI.getFoundDetails(id);
      setItem(data.item || data.foundItem || null);
    } catch (error) {
      setError(error.message || "Could not load item.");
    }
  }

  useEffect(() => {
    loadItem();
  }, [id]);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function submit(e) {
    e.preventDefault();

    if (details.trim().length < 20) {
      setError("Please provide at least 20 characters of identifying details.");
      return;
    }

    if (file) {
      const allowed = ["image/jpeg", "image/png"];

      if (!allowed.includes(file.type)) {
        setError("Evidence image must be JPG or PNG.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Evidence image must be under 5MB.");
        return;
      }
    }

    try {
      await itemsAPI.submitClaim(id, {
        verificationDetails: details.trim(),
        evidence: file ? file.name : "",
      });

      setError("");
      setSubmitted(true);
      setDetails("");
      setFile(null);
    } catch (error) {
      setError(error.message || "Could not submit claim.");
    }
  }

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Claim Item Verification</h1>
            <p>Provide proof so a moderator can verify ownership.</p>
          </div>
        </div>

        {submitted && (
          <div className="success-banner" style={{ marginBottom: 16 }}>
            Claim submitted. Your claim is awaiting moderator review.
          </div>
        )}

        <form className="card form" onSubmit={submit}>
          <h2>{item?.title || "Found Item"}</h2>

          {item && (
            <p className="muted">
              {item.category} - {item.location}
            </p>
          )}

          <div className="field">
            <label>
              Ownership Details <span className="required">*</span>
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe unique contents, marks, serial numbers, or other proof that only the owner would know."
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="field">
            <label>Supporting Evidence Optional</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {preview && (
            <div className="upload-preview">
              <img src={preview} alt="Evidence preview" />
            </div>
          )}

          <div className="actions">
            <button className="btn btn-primary">Submit Claim</button>

            <Link className="btn btn-secondary" to={`/owner/items/${id}`}>
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}