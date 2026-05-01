import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { foundItemsAPI } from "../../services/api";

export default function SuggestedMatchesPage() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSuggestedMatches() {
      try {
        const data = await foundItemsAPI.getMine();
        setFoundItems(data.items || data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSuggestedMatches();
  }, []);

  function getItemId(item) {
    return item._id || item.id;
  }

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Suggested Matches</h1>
            <p>Suggested matches for your reported found items.</p>
          </div>
        </div>

        {loading ? (
          <div className="card">Loading suggested matches...</div>
        ) : foundItems.length === 0 ? (
          <div className="card">
            <h2>No found items yet</h2>
            <p className="muted">
              Report a found item first to see suggested matches.
            </p>
          </div>
        ) : (
          <div className="grid">
            {foundItems.map((found) => {
              const foundId = getItemId(found);
              const matches = found.matches || [];

              return (
                <article className="card" key={foundId}>
                  <h2>{found.title}</h2>

                  <p className="muted">
                    Found at {found.location} - {found.category}
                  </p>

                  {matches.length ? (
                    <div className="responsive-grid" style={{ marginTop: 12 }}>
                      {matches.map((match) => {
                        const matchId = match._id || match.id;

                        return (
                          <div className="card" key={matchId}>
                            <h3>{match.title}</h3>
                            <p>{match.description}</p>

                            <p>
                              <span className="badge info">
                                {match.category}
                              </span>{" "}
                              <span className="badge warning">
                                {match.status}
                              </span>
                            </p>

                            <button className="btn btn-primary btn-sm">
                              Message Owner
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="muted">No strong matches yet.</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
