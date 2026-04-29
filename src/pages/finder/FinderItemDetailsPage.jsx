import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItems, lostItems } from "../../data/mockData";

export default function FinderItemDetailsPage() {
  const { id } = useParams();
  const item = foundItems.find((i) => i.id === id) || foundItems[0];
  const matches = lostItems.filter((lost) => lost.category === item.category || lost.location === item.location);

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Found Item Details</h1>
            <p>Review this listing and compare it with suggested lost-item reports.</p>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h2>{item.title}</h2>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date/Time:</strong> {item.date} {item.time}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <div className="actions">
              <Link className="btn btn-primary" to={`/finder/found-items/${item.id}/update-status`}>Update Status</Link>
              <Link className="btn btn-secondary" to="/finder/messages">Contact Owner</Link>
            </div>
          </div>
          <div className="detail-image"><img src={item.imageUrl} alt={item.title} /></div>
        </div>

        <h2 style={{ marginTop: 24 }}>Suggested Lost Item Matches</h2>
        <div className="responsive-grid">
          {matches.map((match) => (
            <div className="card item-card" key={match.id}>
              <div className="item-image"><img src={match.imageUrl} alt={match.title} /></div>
              <div className="item-card-body">
                <h3>{match.title}</h3>
                <p className="item-meta">{match.location} · {match.date}</p>
                <p>{match.description}</p>
                <button className="btn btn-sm btn-outline">Message Owner</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
