const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

function getToken() {
  return localStorage.getItem("token");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("lfUser") || "null");
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("lfUser");
}

async function request(endpoint, options = {}) {
  const token = getToken();
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

function toQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const text = query.toString();
  return text ? `?${text}` : "";
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

  me: () => request("/auth/me"),

  roleCheck: () => request("/auth/role-check"),
};

export const itemsAPI = {
  createLost: (itemData) =>
    request("/items/lost", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),

  getMyLost: () => request("/items/lost/my"),

  getLostMatches: (id) => request(`/items/lost/${id}/matches`),

  browseFound: (params = {}) => request(`/items/found${toQuery(params)}`),

  getFoundDetails: (id) => request(`/items/found/${id}`),

  submitClaim: (foundItemId, claimData) =>
    request(`/items/found/${foundItemId}/claims`, {
      method: "POST",
      body: JSON.stringify(claimData),
    }),

  getMyClaims: () => request("/items/claims/my"),
};

export const finderAPI = {
  dashboard: () => request("/finder/dashboard"),

  createFoundItem: (itemData) =>
    request("/finder/found-items", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),

  getMine: () => request("/finder/my-found-items"),

  getById: (id) => request(`/finder/found-items/${id}`),

  updateStatus: (id, statusData) =>
    request(`/finder/found-items/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    }),

  delete: (id) =>
    request(`/finder/found-items/${id}`, {
      method: "DELETE",
    }),

  suggestedMatches: () => request("/finder/suggested-matches"),
};

export const messagesAPI = {
  createOrGetConversation: (payload) =>
    request("/messages/conversations", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getConversations: () => request("/messages/conversations"),

  getMessages: (conversationId) =>
    request(`/messages/conversations/${conversationId}`),

  sendMessage: (conversationId, body) =>
    request(`/messages/conversations/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),
};

export const notificationsAPI = {
  getAll: () => request("/notifications"),

  markOneRead: (notificationId) =>
    request(`/notifications/${notificationId}/read`, {
      method: "PATCH",
    }),

  markAllRead: () =>
    request("/notifications/read-all", {
      method: "PATCH",
    }),
};

export const reportsAPI = {
  create: (payload) =>
    request("/reports", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMine: () => request("/reports/my"),
};

export const moderatorAPI = {
  dashboard: () => request("/moderator/dashboard"),

  pendingListings: () => request("/moderator/listings/pending"),

  activeListings: () => request("/moderator/listings/active"),

  reviewListing: (id, payload) =>
    request(`/moderator/listings/${id}/review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  editListing: (id, payload) =>
    request(`/moderator/listings/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  changeVisibility: (id, payload) =>
    request(`/moderator/listings/${id}/visibility`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  getReports: () => request("/moderator/reports"),

  resolveReport: (id, payload) =>
    request(`/moderator/reports/${id}/resolve`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  getClaims: () => request("/moderator/claims"),

  verifyClaim: (id, payload) =>
    request(`/moderator/claims/${id}/verify`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  confirmReturn: (id, payload) =>
    request(`/moderator/claims/${id}/return`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};

export const foundItemsAPI = {
  create: finderAPI.createFoundItem,
  getAll: itemsAPI.browseFound,
  getMine: finderAPI.getMine,
  getById: finderAPI.getById,
  updateStatus: finderAPI.updateStatus,
  delete: finderAPI.delete,
  suggestedMatches: finderAPI.suggestedMatches,
};