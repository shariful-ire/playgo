"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine, RiCalendarLine, RiSubtractLine, RiAddLine } from "react-icons/ri";
import Button from "./Button";

function SuccessState({ booking, onViewBookings, onBookAnother }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-6 gap-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.15 }}
        className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-success"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      <h3 className="text-lg! text-base-content">Booking Confirmed!</h3>
      <div className="text-sm text-base-content/50 space-y-1">
        <p>{booking.date} &middot; {booking.slot}</p>
        <p className="font-numeric font-bold text-primary text-lg">
          ৳{booking.total.toLocaleString()}
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <Button variant="accent" size="sm" onClick={onViewBookings}>
          View My Bookings
        </Button>
        <Button variant="ghost" size="sm" onClick={onBookAnother}>
          Book Another Slot
        </Button>
      </div>
    </motion.div>
  );
}

export default function BookingPanel({ facility, onBookingSubmit }) {
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const pricePerHour = facility?.price_per_hour || 0;
  const total = pricePerHour * hours;
  const slots = facility?.available_slots || [];

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit() {
    if (!date || !selectedSlot) return;
    setSubmitting(true);

    const bookingData = {
      facility_id: facility._id,
      booking_date: date,
      time_slot: selectedSlot,
      hours,
      total_price: total,
    };

    try {
      if (onBookingSubmit) {
        await onBookingSubmit(bookingData);
      }
      setSuccess({
        date,
        slot: selectedSlot,
        total,
      });
    } catch {
      // toast handled by parent
    } finally {
      setSubmitting(false);
    }
  }

  function resetBooking() {
    setDate("");
    setSelectedSlot("");
    setHours(1);
    setSuccess(null);
  }

  return (
    <div className="bg-base-200 rounded-2xl border border-base-content/5 p-5 md:p-6">
      <AnimatePresence mode="wait">
        {success ? (
          <SuccessState
            key="success"
            booking={success}
            onViewBookings={() => (window.location.href = "/my-bookings")}
            onBookAnother={resetBooking}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <h3 className="text-lg!">Book This Facility</h3>

            {/* Date picker */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-content/70 flex items-center gap-1.5">
                <RiCalendarLine className="text-primary" />
                Select Date
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full input rounded-2xl bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Slot grid */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-content/70">
                Available Slots
              </label>
              {slots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedSlot === slot
                          ? "bg-primary text-primary-content ring-2 ring-primary/30"
                          : "bg-base-300 text-base-content/60 hover:bg-base-300/80"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-base-content/40">
                  No slots available
                </p>
              )}
            </div>

            {/* Hours stepper */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-content/70">
                Hours
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHours((h) => Math.max(1, h - 1))}
                  className="btn btn-sm btn-square btn-ghost rounded-xl bg-base-300"
                  disabled={hours <= 1}
                >
                  <RiSubtractLine />
                </button>
                <span className="font-numeric text-xl font-bold w-8 text-center">
                  {hours}
                </span>
                <button
                  onClick={() => setHours((h) => Math.min(5, h + 1))}
                  className="btn btn-sm btn-square btn-ghost rounded-xl bg-base-300"
                  disabled={hours >= 5}
                >
                  <RiAddLine />
                </button>
              </div>
            </div>

            {/* Total price */}
            <div className="flex items-center justify-between pt-4 border-t border-base-content/5">
              <span className="text-sm text-base-content/50">Total Price</span>
              <motion.span
                key={total}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-numeric text-2xl font-bold text-primary"
              >
                ৳{total.toLocaleString()}
              </motion.span>
            </div>

            {/* Submit */}
            <Button
              variant="accent"
              className="w-full"
              onClick={handleSubmit}
              disabled={!date || !selectedSlot || submitting}
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
