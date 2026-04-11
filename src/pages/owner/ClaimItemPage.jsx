import { useState } from "react";
import { useParams } from "react-router-dom";

function ClaimItemPage() {
  const { id } = useParams();
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!details.trim()) {
      setError("Please provide identifying details.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Claim Item #{id}</h1>

      {submitted ? (
        <div>
          <p>Your claim has been submitted successfully.</p>
          <p>Status: Pending Review</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
          <label>
            Additional identifying details
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="6"
              style={{
                width: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.75rem",
                padding: "0.5rem",
              }}
              placeholder="Describe the item in more detail..."
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Submit Claim</button>
        </form>
      )}
    </div>
  );
}

export default ClaimItemPage;