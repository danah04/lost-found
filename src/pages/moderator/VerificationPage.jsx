import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function VerificationPage() {
  const [claims, setClaims] = useState([]);
  const [status, setStatus] = useState("Loading claims...");

  async function loadClaims() {
    try {
      const data = await moderatorAPI.getClaims();
      setClaims(data.claims || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load claims.");
    }
  }

  async function verifyClaim(id, action) {
    try {
      await moderatorAPI.verifyClaim(id, {
        action,
        note: `${action} by moderator`,
      });

      await loadClaims();
    } catch (error) {
      setStatus(error.message || "Could not update claim.");
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
            <h1>Ownership Verification</h1>
            <p>Review claim details and verify ownership.</p>
          </div>

          <button className="btn btn-secondary" onClick={loadClaims}>
            Refresh
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && claims.length === 0 && (
          <div className="card">
            <p className="muted">No ownership claims waiting for review.</p>
          </div>
        )}

        <div className="grid">
          {claims.map((claim) => (
            <article className="card" key={claim._id}>
              <h2>{claim.foundItem?.title || "Claim"}</h2>

              <p>
                <strong>Claimant:</strong>{" "}
                {claim.claimant?.name || claim.owner?.name || "Unknown"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge warning">{claim.status}</span>
              </p>

              <p>
                <strong>Verification Details:</strong>
              </p>

              <p className="muted">{claim.verificationDetails}</p>

              {claim.evidence && (
                <p>
                  <strong>Evidence:</strong> {claim.evidence}
                </p>
              )}

              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => verifyClaim(claim._id, "approve")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => verifyClaim(claim._id, "reject")}
                >
                  Reject
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => verifyClaim(claim._id, "request-proof")}
                >
                  Request More Proof
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}