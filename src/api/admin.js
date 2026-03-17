import apiClient from "./client";

export const getAdminDashboard = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/dashboard/", { params });
  return data;
};

export const getBookingFormOptions = async () => {
  const { data } = await apiClient.get("/api/admin/booking-form-options/");
  return data;
};

export const getBookings = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/bookings/", { params });
  return data;
};

export const getBookingDetail = async (id) => {
  const { data } = await apiClient.get(`/api/admin/bookings/${id}/`);
  return data;
};

export const createBooking = async (payload) => {
  const { data } = await apiClient.post("/api/admin/bookings/create/", payload);
  return data;
};

export const updateBooking = async (id, payload) => {
  const { data } = await apiClient.put(`/api/admin/bookings/${id}/update/`, payload);
  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await apiClient.delete(`/api/admin/bookings/${id}/delete/`);
  return data;
};

export const getAvailableVehicles = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/vehicles-available/", { params });
  return data;
};

export const getDrivers = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/drivers/", { params });
  return data;
};

export const getVehicles = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/vehicles/", { params });
  return data;
};

export const getBlockedDates = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/blocked-dates/", { params });
  return data;
};

export const createBlockedDate = async (payload) => {
  const { data } = await apiClient.post("/api/admin/blocked-dates/create/", payload);
  return data;
};

export const getFinanceSummary = async (params = {}) => {
  const { data } = await apiClient.get("/api/admin/finance-summary/", { params });
  return data;
};


export const getVehicleUnavailableDates = async (vehicleId) => {
  const { data } = await apiClient.get(
    `/api/admin/vehicles/${vehicleId}/unavailable-dates/`
  );
  return data;
};