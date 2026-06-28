"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiAddCircleLine,
  RiEditLine,
  RiDeleteBinLine,
  RiMapPinLine,
  RiCalendarCheckLine,
} from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import { Button, EmptyState, SkeletonCard } from "@/components/ui";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useAuth } from "@/lib/AuthProvider";
import { fetchFacilities, deleteFacility } from "@/lib/api";

export default function ManageFacilitiesPage() {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchFacilities({});
        const arr = Array.isArray(data) ? data : data.facilities || [];
        setFacilities(
          arr.filter((f) => f.owner_email === user?.email)
        );
      } catch {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteFacility(deleteTarget._id);
    } catch {
      // mock fallback
    }
    setFacilities((prev) => prev.filter((f) => f._id !== deleteTarget._id));
    toast.success("Facility deleted");
    setDeleting(false);
    setDeleteTarget(null);
  }

  return (
    <PageTransition className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>Manage Facilities</h1>
            <p className="text-base-content/50 mt-2">
              Edit, delete, or add new facilities you own
            </p>
          </div>
          <Link href="/add-facility">
            <Button variant="accent" size="sm" className="gap-1.5">
              <RiAddCircleLine />
              Add New
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : facilities.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {facilities.map((facility) => (
                <motion.div
                  key={facility._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-base-200 rounded-2xl overflow-hidden border border-base-content/5 flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={
                        facility.image_url ||
                        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="badge badge-primary absolute top-3 left-3 text-xs font-semibold rounded-full px-2.5 py-1">
                      {facility.facility_type}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <h3 className="text-base! font-semibold text-base-content line-clamp-1">
                      {facility.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-base-content/50">
                      <span className="flex items-center gap-1">
                        <RiMapPinLine className="text-xs" />
                        {facility.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-base-content/40 mt-1">
                      <span className="flex items-center gap-1">
                        <RiCalendarCheckLine className="text-xs" />
                        Booked {facility.booking_count || 0} times
                      </span>
                      <span className="font-numeric font-bold text-primary">
                        ৳{facility.price_per_hour}/hr
                      </span>
                    </div>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-base-content/5">
                      <Link
                        href={`/manage-facilities/${facility._id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="ghost" size="sm" className="w-full gap-1">
                          <RiEditLine />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        className="gap-1"
                        onClick={() => setDeleteTarget(facility)}
                      >
                        <RiDeleteBinLine />
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            icon={RiAddCircleLine}
            title="No facilities listed"
            message="You haven't added any facilities yet. List your first one and start getting bookings!"
            actionLabel="Add Facility"
            actionHref="/add-facility"
          />
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Facility"
        body={`Are you sure you want to delete "${deleteTarget?.name}"? All associated data will be removed permanently.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
      />
    </PageTransition>
  );
}
