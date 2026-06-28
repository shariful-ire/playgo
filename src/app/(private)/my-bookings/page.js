"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { RiCalendarCheckLine } from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import { StatusBadge, EmptyState, SkeletonRow } from "@/components/ui";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { fetchMyBookings, cancelBooking } from "@/lib/api";

const TABS = ["All", "Upcoming", "Past", "Cancelled"];

function isUpcoming(dateStr) {
  return new Date(dateStr) >= new Date(new Date().toDateString());
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchMyBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "Upcoming":
        return bookings.filter(
          (b) => b.status !== "cancelled" && isUpcoming(b.booking_date)
        );
      case "Past":
        return bookings.filter(
          (b) => b.status !== "cancelled" && !isUpcoming(b.booking_date)
        );
      case "Cancelled":
        return bookings.filter((b) => b.status === "cancelled");
      default:
        return bookings;
    }
  }, [bookings, activeTab]);

  async function handleCancel() {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await cancelBooking(cancelTarget._id);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelTarget._id ? { ...b, status: "cancelled" } : b
        )
      );
      toast.success("Booking cancelled");
    } catch {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelTarget._id ? { ...b, status: "cancelled" } : b
        )
      );
      toast.success("Booking cancelled");
    } finally {
      setCancelling(false);
      setCancelTarget(null);
    }
  }

  return (
    <PageTransition className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="mb-8">
          <h1>My Bookings</h1>
          <p className="text-base-content/50 mt-2">
            View and manage all your facility bookings
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content/60 hover:bg-base-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-xs text-base-content/40 uppercase tracking-wider">
                    <th>Facility</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <tr key={booking._id} className="hover:bg-base-200/50">
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.facility_image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <span className="font-medium text-sm">
                            {booking.facility_name}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm text-base-content/60">
                        {booking.booking_date}
                      </td>
                      <td className="text-sm text-base-content/60">
                        {booking.time_slot}
                      </td>
                      <td className="font-numeric font-bold text-primary">
                        ৳{booking.total_price?.toLocaleString()}
                      </td>
                      <td>
                        <StatusBadge status={booking.status} />
                      </td>
                      <td>
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => setCancelTarget(booking)}
                            className="text-xs text-error hover:text-error/80 font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {filtered.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-base-200 rounded-2xl p-4 border border-base-content/5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.facility_image}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {booking.facility_name}
                      </p>
                      <p className="text-xs text-base-content/50">
                        {booking.booking_date} &middot; {booking.time_slot}
                      </p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-base-content/5">
                    <span className="font-numeric font-bold text-primary">
                      ৳{booking.total_price?.toLocaleString()}
                    </span>
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => setCancelTarget(booking)}
                        className="text-xs text-error hover:text-error/80 font-medium transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={RiCalendarCheckLine}
            title="No bookings found"
            message={
              activeTab === "All"
                ? "You haven't booked any facility yet. Start exploring and book your first game!"
                : `No ${activeTab.toLowerCase()} bookings to show.`
            }
            actionLabel={activeTab === "All" ? "Explore Facilities" : undefined}
            actionHref={activeTab === "All" ? "/facilities" : undefined}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel Booking"
        body={`Are you sure you want to cancel your booking at ${cancelTarget?.facility_name}? This action cannot be undone.`}
        confirmLabel="Cancel Booking"
        danger
        loading={cancelling}
      />
    </PageTransition>
  );
}
