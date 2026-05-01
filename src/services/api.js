const API_BASE_URL = "http://localhost:5050/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authAPI = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  me: () =>
    request("/auth/me", {
      method: "GET",
    }),
};

export const foundItemsAPI = {
  create: (formData) =>
    request("/found-items", {
      method: "POST",
      body: formData,
    }),

  getAll: () =>
    request("/found-items", {
      method: "GET",
    }),

  getMine: () =>
    request("/found-items/mine", {
      method: "GET",
    }),

  getById: (id) =>
    request(`/found-items/${id}`, {
      method: "GET",
    }),

  updateStatus: (id, statusData) =>
    request(`/found-items/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    }),

  delete: (id) =>
    request(`/found-items/${id}`, {
      method: "DELETE",
    }),
};
