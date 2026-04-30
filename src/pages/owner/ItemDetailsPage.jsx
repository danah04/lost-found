import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItems } from "../../data/mockData";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const item = foundItems.find((i) => i.id === id) || foundItems[0];

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Found Item Details</h1>
            <p>Review the details carefully before submitting a claim or contacting the finder.</p>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="detail-image"><img src={item.imageUrl} alt={item.title} /></div>
          <div className="card">
            <h2>{item.title}</h2>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date found:</strong> {item.date} {item.time}</p>
            <p><strong>Status:</strong> <span className="badge warning">{item.status}</span></p>
            <div className="actions">
              <Link className="btn btn-primary" to={`/owner/claim/${item.id}`}>Claim Item</Link>
              <Link className="btn btn-secondary" to="/owner/messages">Contact Finder</Link>
              <Link className="btn btn-outline" to="/owner/browse-items">Back to Browse</Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
