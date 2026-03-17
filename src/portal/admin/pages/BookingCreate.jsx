import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import PortalLayout from "../../shared/layouts/PortalLayout";
import {
  getBookingFormOptions,
  getAvailableVehicles,
  getVehicleUnavailableDates,
  createBooking,
} from "../../../api/admin";

const emptyDay = (date = "") => ({
  date,
  day_type: "full_day",
  start_time: "",
  end_time: "",
  notes: "",
  client_rate: "",
  driver_rate: "",
  driver_payment_status: "unpaid",
});

const formatDateToYMD = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BookingCreate = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formOptions, setFormOptions] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const [vehicleUnavailable, setVehicleUnavailable] = useState(null);
  const [vehicleUnavailableLoading, setVehicleUnavailableLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    pickup_location: "",
    dropoff_location: "",
    trip_description: "",
    status: "pending",
    car: "",
    driver: "",
    days: [],
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBookingFormOptions();
        setFormOptions(data);
      } catch (err) {
        console.error("Booking form options error:", err);
        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "Could not load booking form options."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  const selectedDates = useMemo(() => {
    return formData.days
      .map((day) => day.date)
      .filter(Boolean)
      .sort();
  }, [formData.days]);

  const selectedDateObjects = useMemo(() => {
    return selectedDates.map((dateStr) => new Date(`${dateStr}T00:00:00`));
  }, [selectedDates]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDates.length) {
        setAvailability(null);
        return;
      }

      try {
        setAvailabilityLoading(true);

        const start_date = selectedDates[0];
        const end_date = selectedDates[selectedDates.length - 1];

        const data = await getAvailableVehicles({ start_date, end_date });
        setAvailability(data);
      } catch (err) {
        console.error("Availability error:", err);
      } finally {
        setAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDates]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      if (!formData.car) {
        setVehicleUnavailable(null);
        return;
      }

      try {
        setVehicleUnavailableLoading(true);
        const data = await getVehicleUnavailableDates(formData.car);
        setVehicleUnavailable(data);

        const unavailableSet = new Set(data?.unavailable_dates || []);

        setFormData((prev) => ({
          ...prev,
          days: prev.days.filter((day) => !unavailableSet.has(day.date)),
        }));
      } catch (err) {
        console.error("Vehicle unavailable dates error:", err);
      } finally {
        setVehicleUnavailableLoading(false);
      }
    };

    fetchUnavailableDates();
  }, [formData.car]);

  const bookedDates = vehicleUnavailable?.booked_dates || [];
  const blockedDates = vehicleUnavailable?.blocked_dates || [];
  const unavailableDates = vehicleUnavailable?.unavailable_dates || [];

  const bookedDateObjects = useMemo(
    () => bookedDates.map((d) => new Date(`${d}T00:00:00`)),
    [bookedDates]
  );

  const blockedDateObjects = useMemo(
    () => blockedDates.map((d) => new Date(`${d}T00:00:00`)),
    [blockedDates]
  );

  const disabledDateObjects = useMemo(
    () => unavailableDates.map((d) => new Date(`${d}T00:00:00`)),
    [unavailableDates]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedDays = [...prev.days];
      updatedDays[index] = {
        ...updatedDays[index],
        [field]: value,
      };

      return {
        ...prev,
        days: updatedDays,
      };
    });
  };

  const handleVehicleSelect = (event) => {
    const value = event.target.value;

    setFormData((prev) => {
      let nextDriver = prev.driver;

      const selectedVehicle = formOptions?.vehicles?.find(
        (vehicle) => String(vehicle.id) === String(value)
      );

      if (selectedVehicle?.driver?.id) {
        nextDriver = String(selectedVehicle.driver.id);
      }

      return {
        ...prev,
        car: value,
        driver: nextDriver,
      };
    });
  };

  const handleCalendarDayClick = (date, modifiers) => {
    if (!formData.car) return;
    if (modifiers.disabled) return;

    const dateStr = formatDateToYMD(date);

    setFormData((prev) => {
      const exists = prev.days.some((day) => day.date === dateStr);

      if (exists) {
        return {
          ...prev,
          days: prev.days.filter((day) => day.date !== dateStr),
        };
      }

      return {
        ...prev,
        days: [...prev.days, emptyDay(dateStr)].sort((a, b) =>
          a.date.localeCompare(b.date)
        ),
      };
    });
  };

  const removeDayRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.filter((_, i) => i !== index),
    }));
  };

  const cleanedPayload = () => {
    return {
      title: formData.title || "",
      customer_name: formData.customer_name || "",
      customer_email: formData.customer_email || "",
      customer_phone: formData.customer_phone || "",
      pickup_location: formData.pickup_location || "",
      dropoff_location: formData.dropoff_location || "",
      trip_description: formData.trip_description || "",
      status: formData.status || "pending",
      car: formData.car ? Number(formData.car) : null,
      driver: formData.driver ? Number(formData.driver) : null,
      days: formData.days
        .filter((day) => day.date)
        .map((day) => ({
          date: day.date,
          day_type: day.day_type,
          start_time: day.start_time || null,
          end_time: day.end_time || null,
          notes: day.notes || "",
          client_rate: day.client_rate === "" ? null : day.client_rate,
          driver_rate: day.driver_rate === "" ? null : day.driver_rate,
          driver_payment_status: day.driver_payment_status || "unpaid",
        })),
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload = cleanedPayload();
      const response = await createBooking(payload);

      navigate(`/portal/admin/bookings/${response.id}`);
    } catch (err) {
      console.error("Create booking error:", err);

      const responseData = err?.response?.data;

      if (typeof responseData === "string") {
        setError(responseData);
      } else if (responseData?.days) {
        setError(Array.isArray(responseData.days) ? responseData.days.join(", ") : String(responseData.days));
      } else if (responseData?.driver) {
        setError(Array.isArray(responseData.driver) ? responseData.driver.join(", ") : String(responseData.driver));
      } else if (responseData?.car) {
        setError(Array.isArray(responseData.car) ? responseData.car.join(", ") : String(responseData.car));
      } else if (responseData?.detail) {
        setError(String(responseData.detail));
      } else {
        setError(err?.message || "Could not create booking.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const statusChoices = formOptions?.status_choices || [];
  const dayTypeChoices = formOptions?.day_type_choices || [];
  const driverPaymentStatusChoices =
    formOptions?.driver_payment_status_choices || [];
  const vehicles = formOptions?.vehicles || [];
  const drivers = formOptions?.drivers || [];

  const availableVehicleIds = new Set(
    (availability?.available_vehicles || []).map((item) => item?.vehicle?.id)
  );

  return (
    <PortalLayout role="admin" pageTitle="Create New Trip">
      <div className="booking-create-page">
        <div className="booking-create-topbar">
          <div>
            <div className="booking-create-kicker">Trip Creation</div>
            <p className="booking-create-subtitle">
              Select a vehicle, click available dates on the calendar, and complete the trip details.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="booking-create-card">Loading form...</div>
        ) : (
          <form className="booking-create-grid" onSubmit={handleSubmit}>
            <div className="booking-create-main">
              <div className="booking-create-card">
                <h2>Assignment</h2>

                <div className="booking-form-grid">
                  <div className="field">
                    <label>Vehicle</label>
                    <select value={formData.car} onChange={handleVehicleSelect}>
                      <option value="">Select vehicle</option>
                      {vehicles.map((vehicle) => {
                        const isAvailable =
                          !selectedDates.length || availableVehicleIds.has(vehicle.id);

                        return (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.title}
                            {selectedDates.length && !isAvailable ? " — unavailable" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="field">
                    <label>Driver</label>
                    <select
                      value={formData.driver}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          driver: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select driver</option>
                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.full_name || driver.user?.name || driver.user?.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="calendar-section">
                  <div className="calendar-section-head">
                    <h3>Select Booking Dates</h3>
                    <p>
                      {formData.car
                        ? "Unavailable dates are blocked. Click available dates to add or remove them."
                        : "Select a vehicle first to load its unavailable dates."}
                    </p>
                  </div>

                  <div className="calendar-wrap">
                    <DayPicker
                      mode="multiple"
                      fixedWeeks
                      showOutsideDays
                      navLayout="around"
                      selected={selectedDateObjects}
                      disabled={!formData.car ? () => true : disabledDateObjects}
                      onDayClick={handleCalendarDayClick}
                      modifiers={{
                        booked: bookedDateObjects,
                        blocked: blockedDateObjects,
                      }}
                      modifiersClassNames={{
                        selected: "calendar-selected",
                        booked: "calendar-booked",
                        blocked: "calendar-blocked",
                      }}
                    />
                  </div>

                  <div className="calendar-legend">
                    <div className="legend-item">
                      <span className="legend-dot legend-selected"></span>
                      Selected booking dates
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot legend-booked"></span>
                      Already booked
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot legend-blocked"></span>
                      Driver unavailable
                    </div>
                  </div>

                  {vehicleUnavailableLoading ? (
                    <div className="availability-muted">Loading vehicle calendar...</div>
                  ) : null}
                </div>
              </div>

              <div className="booking-create-card">
                <h2>Client & Trip Details</h2>

                <div className="booking-form-grid">
                  <div className="field">
                    <label>Trip Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Airport Transfer / Full Day Tour / etc"
                    />
                  </div>

                  <div className="field">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statusChoices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Customer Email</label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Customer Phone</label>
                    <input
                      type="text"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field field-full">
                    <label>Pickup Location</label>
                    <input
                      type="text"
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field field-full">
                    <label>Dropoff Location</label>
                    <input
                      type="text"
                      name="dropoff_location"
                      value={formData.dropoff_location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field field-full">
                    <label>Trip Description</label>
                    <textarea
                      name="trip_description"
                      rows="4"
                      value={formData.trip_description}
                      onChange={handleChange}
                      placeholder="Add any extra trip notes or client requirements"
                    />
                  </div>
                </div>
              </div>

              <div className="booking-create-card">
                <div className="section-head">
                  <h2>Selected Booking Days</h2>
                </div>

                {!formData.days.length ? (
                  <div className="empty-days-message">
                    No dates selected yet. Choose available dates on the calendar above.
                  </div>
                ) : (
                  <div className="days-list">
                    {formData.days.map((day, index) => (
                      <div className="day-card" key={day.date || index}>
                        <div className="day-card-top">
                          <h3>{day.date}</h3>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeDayRow(index)}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="booking-form-grid">
                          <div className="field">
                            <label>Day Type</label>
                            <select
                              value={day.day_type}
                              onChange={(e) =>
                                handleDayChange(index, "day_type", e.target.value)
                              }
                            >
                              {dayTypeChoices.map((choice) => (
                                <option key={choice.value} value={choice.value}>
                                  {choice.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="field">
                            <label>Driver Payment Status</label>
                            <select
                              value={day.driver_payment_status}
                              onChange={(e) =>
                                handleDayChange(
                                  index,
                                  "driver_payment_status",
                                  e.target.value
                                )
                              }
                            >
                              {driverPaymentStatusChoices.map((choice) => (
                                <option key={choice.value} value={choice.value}>
                                  {choice.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="field">
                            <label>Start Time</label>
                            <input
                              type="time"
                              value={day.start_time}
                              onChange={(e) =>
                                handleDayChange(index, "start_time", e.target.value)
                              }
                            />
                          </div>

                          <div className="field">
                            <label>End Time</label>
                            <input
                              type="time"
                              value={day.end_time}
                              onChange={(e) =>
                                handleDayChange(index, "end_time", e.target.value)
                              }
                            />
                          </div>

                          <div className="field">
                            <label>Client Rate</label>
                            <input
                              type="number"
                              value={day.client_rate}
                              onChange={(e) =>
                                handleDayChange(index, "client_rate", e.target.value)
                              }
                              placeholder="0.00"
                            />
                          </div>

                          <div className="field">
                            <label>Driver Rate</label>
                            <input
                              type="number"
                              value={day.driver_rate}
                              onChange={(e) =>
                                handleDayChange(index, "driver_rate", e.target.value)
                              }
                              placeholder="Leave blank for default"
                            />
                          </div>

                          <div className="field field-full">
                            <label>Notes</label>
                            <input
                              type="text"
                              value={day.notes}
                              onChange={(e) =>
                                handleDayChange(index, "notes", e.target.value)
                              }
                              placeholder="Optional day note"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="booking-create-sidebar">
              <div className="booking-create-card sticky-card">
                <h2>Availability</h2>

                <div className="availability-box">
                  {availabilityLoading ? (
                    <div className="availability-muted">Checking availability...</div>
                  ) : !selectedDates.length ? (
                    <div className="availability-muted">
                      Select trip dates to check overall availability.
                    </div>
                  ) : (
                    <>
                      <div className="availability-meta">
                        Available vehicles: {availability?.available_count ?? 0}
                      </div>
                      <div className="availability-meta">
                        Unavailable vehicles: {availability?.unavailable_count ?? 0}
                      </div>
                    </>
                  )}
                </div>

                {error ? <div className="form-error">{String(error)}</div> : null}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting || !formData.days.length || !formData.car}
                >
                  {submitting ? "Creating Trip..." : "Create Trip"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .booking-create-page {
          width: 100%;
        }

        .booking-create-topbar {
          margin-bottom: 22px;
        }

        .booking-create-kicker {
          color: #0b5b33;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .booking-create-subtitle {
          margin: 0;
          color: #6c7a74;
          font-size: 15px;
          line-height: 1.6;
        }

        .booking-create-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
          gap: 22px;
        }

        .booking-create-main,
        .booking-create-sidebar {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .booking-create-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: none;
        }

        .booking-create-card h2 {
          margin: 0 0 18px 0;
          color: #0b5b33;
          font-size: 20px;
          font-weight: 800;
        }

        .booking-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-full {
          grid-column: 1 / -1;
        }

        .field label {
          font-size: 14px;
          font-weight: 700;
          color: #294639;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(11,91,51,0.14);
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #0b5b33;
          box-shadow: 0 0 0 4px rgba(11,91,51,0.08);
        }

        .calendar-section {
          margin-top: 22px;
          background: #fbfcfb;
          border:none;
          border-radius: 16px;
          padding: 18px;
        }

        .calendar-section-head {
          margin-bottom: 16px;
        }

        .calendar-section-head h3 {
          margin: 0 0 6px 0;
          color: #123d2b;
          font-size: 18px;
          font-weight: 800;
        }

        .calendar-section-head p {
          margin: 0;
          color: #6c7a74;
          font-size: 14px;
          line-height: 1.6;
        }

        .calendar-wrap {
          overflow-x: auto;
        }

        .calendar-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 14px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #566560;
          font-size: 13px;
          font-weight: 600;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          display: inline-block;
        }

        .legend-selected {
          background: #0b5b33;
        }

        .legend-booked {
          background: #cfd6d9;
        }

        .legend-blocked {
          background: #ffd6d6;
        }

        /* =========================
           DAYPICKER FIXED STYLING
           ========================= */

        .rdp-root {
          --rdp-accent-color: #0b5b33;
          --rdp-accent-background-color: transparent;
          margin: 0;
          width: 100%;
        }

        .rdp-months {
          justify-content: center;
          width: 100%;
        }

        .rdp-month {
          width: 100%;
          max-width: 100%;
        }

        .rdp-month_grid {
          width: 100%;
          border-collapse: separate !important;
          border-spacing: 0 !important;
          table-layout: fixed !important;
        }

        .rdp-caption {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 18px;
          position: relative;
        }

        .rdp-caption_label {
          font-size: 18px;
          font-weight: 800;
          color: #123d2b;
        }

        .rdp-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rdp-button_previous,
        .rdp-button_next {
          width: 36px;
          height: 36px;
          border: none;
          background: #f3f7f5;
          border-radius: 10px;
          color: #123d2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .rdp-button_previous:hover,
        .rdp-button_next:hover {
          background: #e8f1ec;
          transform: translateY(-1px);
        }

        .rdp-weekdays {
          border: none !important;
        }

        .rdp-weekday {
          font-size: 11px;
          font-weight: 800;
          color: #7b8782;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0 0 10px 0;
          text-align: center;
          border: none !important;
        }

        .rdp-weeks,
        .rdp-week {
          border: none !important;
        }

        .rdp-day {
          padding: 4px !important;
          text-align: center;
          vertical-align: middle;
          border: none !important;
          background: transparent !important;
        }

        .rdp-day_button {
          width: 100%;
          min-width: 0;
          height: 52px;
          border: none;
          margin: 0;
          padding: 0;
          border-radius: 14px;
          background: #f8fbf9;
          color: #243630;
          font-size: 14px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-sizing: border-box;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .rdp-day_button:hover:not([disabled]) {
          background: #edf5f0;
          color: #0b5b33;
          transform: translateY(-1px);
        }

        /* selected */
        .calendar-selected .rdp-day_button,
        .rdp-selected .rdp-day_button {
          background: #0b5b33 !important;
          color: #ffffff !important;
        }

        /* booked */
        .calendar-booked .rdp-day_button {
          background: #d6dde0 !important;
          color: #5b666b !important;
          cursor: not-allowed !important;
        }

        /* blocked */
        .calendar-blocked .rdp-day_button {
          background: #ffdede !important;
          color: #8e3434 !important;
          cursor: not-allowed !important;
        }

        /* disabled visible */
        .rdp-day_button:disabled {
          opacity: 1 !important;
          cursor: not-allowed !important;
        }

        /* today */
        .rdp-today .rdp-day_button {
          outline: 2px solid rgba(11, 91, 51, 0.2);
          outline-offset: -2px;
        }

        /* outside month */
        .rdp-outside .rdp-day_button {
          color: #c2cbc7 !important;
          background: transparent !important;
        }

        @media (max-width: 640px) {
          .rdp-day {
            padding: 3px !important;
          }

          .rdp-day_button {
            height: 46px;
            border-radius: 12px;
            font-size: 13px;
          }

          .rdp-caption_label {
            font-size: 16px;
          }

          .rdp-button_previous,
          .rdp-button_next {
            width: 34px;
            height: 34px;
          }
        }

        .section-head,
        .day-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .day-card {
          background: #fbfcfb;
          border-radius: 16px;
          padding: 18px;
          border: 1px solid rgba(11,91,51,0.06);
        }

        .day-card h3 {
          margin: 0;
          color: #123d2b;
          font-size: 17px;
          font-weight: 800;
        }

        .days-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-days-message {
          color: #6f7b76;
          font-size: 14px;
        }

        .remove-btn,
        .submit-btn {
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
        }

        .remove-btn {
          background: rgba(161,38,38,0.08);
          color: #a12626;
          padding: 8px 12px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
          color: white;
          padding: 14px 18px;
          font-size: 15px;
          margin-top: 16px;
          width: 100%;
        }

        .submit-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .sticky-card {
          position: sticky;
          top: 110px;
        }

        .availability-box {
          background: #fbfcfb;
          border: 1px solid rgba(11,91,51,0.06);
          border-radius: 16px;
          padding: 16px;
        }

        .availability-meta,
        .availability-muted {
          color: #66756f;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .form-error {
          margin-top: 16px;
          background: rgba(161,38,38,0.08);
          color: #a12626;
          border: 1px solid rgba(161,38,38,0.12);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 1100px) {
          .booking-create-grid {
            grid-template-columns: 1fr;
          }

          .sticky-card {
            position: static;
          }
        }

        @media (max-width: 700px) {
          .booking-form-grid {
            grid-template-columns: 1fr;
          }

          .field-full {
            grid-column: auto;
          }

          .section-head,
          .day-card-top {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </PortalLayout>
  );
};

export default BookingCreate;