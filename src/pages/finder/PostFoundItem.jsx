import { useState } from "react";
import "../owner/PostLostItem.css";

function PostFoundItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.date) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/found-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.ok) {
        alert("Listing submitted ✅");
        setForm({
          name: "",
          description: "",
          location: "",
          date: ""
        });
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Post Found Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name *</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Date Found *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostFoundItem;