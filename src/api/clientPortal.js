import apiClient from "./client";

export const lookupBooking = async (payload) => {
  const { data } = await apiClient.post("/api/client/booking-lookup/", payload);
  return data;
};

export const getClientBookingDetail = async (bookingReference) => {
  const { data } = await apiClient.get(`/api/client/bookings/${bookingReference}/`);
  return data;
};