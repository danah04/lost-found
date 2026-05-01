import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { foundItemsAPI } from "../../services/api";

export default function MyFoundItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    async function loadMyFoundItems() {
      try {
        const data = await foundItemsAPI.getMine();
        setItems(data.items || data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMyFoundItems();
  }, []);

  async function updateStatus(id, value) {
    try {
      setUpdatingId(id);

      await foundItemsAPI.updateStatus(id, {
        status: value,
      });

      setItems((currentItems) =>
        currentItems.map((item) =>
          getItemId(item) === id ? { ...item, status: value } : item
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdatingId("");
    }
  }

  function getItemId(item) {
    return item._id || item.id;
  }

  function getStatusClass(status) {
    if (status === "Returned" || status === "Recovered") return "success";
    if (status === "Rejected" || status === "Removed") return "danger";
    if (status === "Approved") return "info";
    return "warning";
  }

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>My Found Items</h1>
            <p>View details and update the status of items you reported.</p>
          </div>
        </div>

        {loading ? (
          <div className="card">Loading your found items...</div>
        ) : items.length === 0 ? (
          <div className="card">
            <h2>No found items yet</h2>
            <p className="muted">
              Once you report a found item, it will appear here.
            </p>
            <Link className="btn btn-primary" to="/finder/report-found">
              Report Found Item
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date Found</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const id = getItemId(item);

                  return (
                    <tr key={id}>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={`badge ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="actions">
                        <Link
                          className="btn btn-sm btn-outline"
                          to={`/finder/found-items/${id}`}
                        >
                          View Details
                        </Link>

                        <select
                          value={item.status || "Pending Review"}
                          disabled={updatingId === id}
                          onChange={(e) => updateStatus(id, e.target.value)}
                        >
                          <option>Pending Review</option>
                          <option>Approved</option>
                          <option>Returned</option>
                          <option>Handed to Administration</option>
                          <option>Recovered</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
