import { MOCK_FACILITIES, MOCK_BOOKINGS } from "./mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}

export async function fetchFacilities(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.types?.length) query.set("type", params.types.join(","));
  if (params.maxPrice && params.maxPrice < 10000) query.set("maxPrice", params.maxPrice);
  if (params.location) query.set("location", params.location);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  if (params.featured) query.set("featured", "true");

  try {
    return await apiFetch(`/facilities?${query.toString()}`);
  } catch {
    let results = [...MOCK_FACILITIES];
    if (params.search) {
      const s = params.search.toLowerCase();
      results = results.filter((f) => f.name.toLowerCase().includes(s));
    }
    if (params.types?.length) {
      results = results.filter((f) => params.types.includes(f.facility_type));
    }
    if (params.maxPrice && params.maxPrice < 10000) {
      results = results.filter((f) => f.price_per_hour <= params.maxPrice);
    }
    if (params.location) {
      results = results.filter((f) => f.location.includes(params.location));
    }
    return results;
  }
}

export async function fetchFacilityById(id) {
  try {
    return await apiFetch(`/facilities/${id}`);
  } catch {
    return MOCK_FACILITIES.find((f) => f._id === id) || null;
  }
}

export async function createBooking(data) {
  return apiFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMyBookings() {
  try {
    return await apiFetch("/bookings");
  } catch {
    return [...MOCK_BOOKINGS];
  }
}

export async function cancelBooking(id) {
  return apiFetch(`/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "cancelled" }),
  });
}

export async function createFacility(data) {
  return apiFetch("/facilities", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateFacility(id, data) {
  return apiFetch(`/facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteFacility(id) {
  return apiFetch(`/facilities/${id}`, {
    method: "DELETE",
  });
}
