import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ReturnConfirmationPage() {
  const [claims, setClaims] = useState([]);
  const [status, setStatus] = useState("Loading return confirmations...");
  const [returnMethod, setReturnMethod] = useState("meetup");

  async function loadClaims() {
    try {
      const data = await moderatorAPI.getClaims();

      const approved = (data.claims || []).filter(
        (claim) => claim.status === "approved" || claim.status === "verified"
      );

      setClaims(approved);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load return confirmations.");
    }
  }

  async function confirmReturn(id) {
    try {
      await moderatorAPI.confirmReturn(id, {
        returnMethod,
        returnedAt: new Date().toISOString(),
      });

      await loadClaims();
    } catch (error) {
      setStatus(error.message || "Could not confirm return.");
    }
  }

  useEffect(() => {
    loadClaims();
  }, []);

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Return Confirmation</h1>
            <p>Confirm item handover and close the case.</p>
          </div>

          <button className="btn btn-secondary" onClick={loadClaims}>
            Refresh
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        <div className="card form" style={{ marginBottom: 16 }}>
          <div className="field">
            <label>Default Return Method</label>
            <select
              value={returnMethod}
              onChange={(e) => setReturnMethod(e.target.value)}
            >
              <option value="meetup">Meetup</option>
              <option value="university-office">University Office</option>
            </select>
          </div>
        </div>

        {!status && claims.length === 0 && (
          <div className="card">
            <p className="muted">No approved claims waiting for return confirmation.</p>
          </div>
        )}

        <div className="grid">
          {claims.map((claim) => (
            <article className="card" key={claim._id}>
              <h2>{claim.foundItem?.title || "Return Request"}</h2>

              <p>
                <strong>Claimant:</strong>{" "}
                {claim.claimant?.name || claim.owner?.name || "Unknown"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge success">{claim.status}</span>
              </p>

              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => confirmReturn(claim._id)}
                >
                  Confirm Return
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}