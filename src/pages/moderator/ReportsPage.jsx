import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { moderatorAPI } from "../../services/api";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("Loading reports...");

  async function loadReports() {
    try {
      const data = await moderatorAPI.getReports();
      setReports(data.reports || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load reports.");
    }
  }

  async function resolveReport(id, action) {
    try {
      await moderatorAPI.resolveReport(id, {
        action,
        resolutionNote: `${action} by moderator`,
      });

      await loadReports();
    } catch (error) {
      setStatus(error.message || "Could not resolve report.");
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <AppLayout role="moderator">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Reports Center</h1>
            <p>Review reports for spam, fraud, or misuse.</p>
          </div>

          <button className="btn btn-secondary" onClick={loadReports}>
            Refresh
          </button>
        </div>

        {status && <p className="muted">{status}</p>}

        {!status && reports.length === 0 && (
          <div className="card">
            <p className="muted">No reports found.</p>
          </div>
        )}

        <div className="grid">
          {reports.map((report) => (
            <article className="card" key={report._id}>
              <h2>{report.reason}</h2>

              <p>
                <strong>Target:</strong> {report.targetType}
              </p>

              <p className="muted">{report.details}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge warning">{report.status}</span>
              </p>

              <div className="actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => resolveReport(report._id, "dismiss")}
                >
                  Dismiss
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => resolveReport(report._id, "warning")}
                >
                  Issue Warning
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => resolveReport(report._id, "remove")}
                >
                  Remove Listing
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}