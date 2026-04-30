import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import FormInput from "../../components/common/FormInput";
import { categories, locations } from "../../data/mockData";

const initial = { title: "", category: "", description: "", location: "", date: "", time: "", image: null };

export default function PostLostItem() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!form.image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(form.image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.image]);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validateImage(file) {
    if (!file) return "";
    if (!["image/jpeg", "image/png"].includes(file.type)) return "Image must be JPG or PNG";
    if (file.size > 5 * 1024 * 1024) return "Image must be under 5MB";
    return "";
  }

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.category) err.category = "Choose a category";
    if (!form.description.trim()) err.description = "Description is required";
    if (!form.location) err.location = "Choose a location";
    if (!form.date) err.date = "Date is required";
    else if (new Date(form.date) > new Date()) err.date = "Date cannot be in the future";
    const imageError = validateImage(form.image);
    if (imageError) err.image = imageError;
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      setForm(initial);
    }
  }

  return (
    <AppLayout role="owner">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Report Lost Item</h1>
            <p>Submit a detailed report so finders and moderators can help recover the item.</p>
          </div>
        </div>

        {submitted && <div className="success-banner" style={{ marginBottom: 16 }}>Lost item report submitted successfully.</div>}

        <form className="card form" onSubmit={submit}>
          <div className="form-grid">
            <FormInput label="Title" required error={errors.title} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g., KFUPM ID Card, Blue Backpack" />
            <FormInput label="Category" required error={errors.category}>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FormInput>
          </div>

          <FormInput label="Description" required as="textarea" error={errors.description} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Include unique features, contents, serial numbers, marks, or stickers." />

          <div className="form-grid">
            <FormInput label="Last Seen Location" required error={errors.location}>
              <select value={form.location} onChange={(e) => set("location", e.target.value)}>
                <option value="">Select campus location</option>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </FormInput>
            <FormInput label="Date" type="date" required error={errors.date} value={form.date} onChange={(e) => set("date", e.target.value)} />
          </div>

          <div className="form-grid">
            <FormInput label="Approximate Time" type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
            <div className="field">
              <label>Image Upload <span className="muted">optional</span></label>
              <input type="file" accept="image/png,image/jpeg" onChange={(e) => set("image", e.target.files?.[0] || null)} />
              {errors.image && <span className="error-text">{errors.image}</span>}
            </div>
          </div>

          <div className="upload-preview">
            {preview ? <img src={preview} alt="Selected item preview" /> : <span>Selected image preview will appear here</span>}
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">Submit Report</button>
            <button className="btn btn-secondary" type="button" onClick={() => { setForm(initial); setErrors({}); }}>Clear</button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
