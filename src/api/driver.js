import apiClient from "./client";

export const getDriverMe = async () => {
  const { data } = await apiClient.get("/api/driver/me/");
  return data;
};

export const getDriverSchedule = async () => {
  const { data } = await apiClient.get("/api/driver/schedule/");
  return data;
};

export const getDriverTripDetail = async (bookingReference) => {
  const { data } = await apiClient.get(`/api/driver/trips/${bookingReference}/`);
  return data;
};

export const getDriverBlockedDates = async () => {
  const { data } = await apiClient.get("/api/driver/blocked-dates/");
  return data;
};

export const createDriverBlockedDate = async (payload) => {
  const { data } = await apiClient.post("/api/driver/blocked-dates/", payload);
  return data;
};

export const deleteDriverBlockedDate = async (id) => {
  const { data } = await apiClient.delete(`/api/driver/blocked-dates/${id}/delete/`);
  return data;
};

export const getDriverPaymentSummary = async (params = {}) => {
  const { data } = await apiClient.get("/api/driver/payment-summary/", { params });
  return data;
};