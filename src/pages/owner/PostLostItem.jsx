import { useState } from "react";
import "./PostLostItem.css";

function PostLostItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.location || !form.date) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/lost-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.ok) {
        alert("Listing submitted ✅");

        // reset form
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
      <h2 className="form-title">Post Lost Item</h2>

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Item Name *</label>
          <input
            placeholder="Enter item name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            placeholder="Enter location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
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
            placeholder="Enter description (optional)"
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

export default PostLostItem;