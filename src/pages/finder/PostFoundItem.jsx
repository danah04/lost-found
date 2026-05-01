import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import FormInput from "../../components/common/FormInput";
import { categories, locations } from "../../data/mockData";
import { foundItemsAPI } from "../../services/api";

const initial = {
  title: "",
  category: "",
  description: "",
  location: "",
  date: "",
  time: "",
  image: null,
};

export default function PostFoundItem() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState(false);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    setOk(false);
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validateImage(file) {
    if (!file) return "";
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return "Image must be JPG or PNG";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "Image must be under 5MB";
    }
    return "";
  }

  async function submit(e) {
    e.preventDefault();

    const err = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!form.category) err.category = "Category is required";
    if (!form.location) err.location = "Location is required";
    if (!form.date) err.date = "Date is required";
    else if (new Date(form.date) > new Date()) {
      err.date = "Date cannot be in the future";
    }
    if (!form.description.trim()) err.description = "Description is required";

    const imageError = validateImage(form.image);
    if (imageError) err.image = imageError;

    setErrors(err);

    if (Object.keys(err).length) return;

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("category", form.category);
      formData.append("description", form.description.trim());
      formData.append("location", form.location);
      formData.append("date", form.date);
      formData.append("time", form.time);

      if (form.image) {
        formData.append("image", form.image);
      }

      await foundItemsAPI.create(formData);

      setOk(true);
      setForm(initial);
      setErrors({});
      setPreview("");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setForm(initial);
    setErrors({});
    setOk(false);
    setPreview("");
  }

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Report Found Item</h1>
            <p>
              Create a found-item listing. It will be marked Pending Review until
              a moderator approves it.
            </p>
          </div>
        </div>

        {ok && (
          <div className="success-banner" style={{ marginBottom: 16 }}>
            Found item submitted. Awaiting moderator approval.
          </div>
        )}

        <form className="card form" onSubmit={submit}>
          <div className="form-grid">
            <FormInput
              label="Title"
              required
              error={errors.title}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g., Silver Watch"
            />

            <FormInput label="Category" required error={errors.category}>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </FormInput>
          </div>

          <div className="form-grid">
            <FormInput label="Found Location" required error={errors.location}>
              <select
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
              >
                <option value="">Select location</option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </FormInput>

            <FormInput
              label="Date Found"
              type="date"
              required
              error={errors.date}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>

          <FormInput
            label="Description"
            as="textarea"
            required
            error={errors.description}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the item without revealing sensitive identifying details."
          />

          <div className="form-grid">
            <FormInput
              label="Approximate Time"
              type="time"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
            />

            <div className="field">
              <label>
                Image Upload <span className="required">*</span>
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => set("image", e.target.files?.[0] || null)}
              />
              {errors.image && (
                <span className="error-text">{errors.image}</span>
              )}
            </div>
          </div>

          <div className="upload-preview">
            {preview ? (
              <img src={preview} alt="Selected item preview" />
            ) : (
              <span>Upload a JPG or PNG image under 5MB</span>
            )}
          </div>

          <div className="actions">
            <button className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
