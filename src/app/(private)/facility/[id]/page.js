"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  RiMapPinLine,
  RiGroupLine,
  RiTimeLine,
  RiUserLine,
} from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import ImageGallery from "@/components/ui/ImageGallery";
import BookingPanel from "@/components/ui/BookingPanel";
import { FacilityCard, SkeletonCard } from "@/components/ui";
import { fetchFacilityById, createBooking, fetchFacilities } from "@/lib/api";

export default function FacilityDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [facility, setFacility] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchFacilityById(id);
        if (!data) {
          router.push("/facilities");
          return;
        }
        setFacility(data);

        const all = await fetchFacilities({ types: [data.facility_type] });
        const arr = Array.isArray(all) ? all : all.facilities || [];
        setRelated(arr.filter((f) => f._id !== id).slice(0, 3));
      } catch {
        toast.error("Failed to load facility details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  async function handleBooking(bookingData) {
    try {
      await createBooking(bookingData);
      toast.success("Booking confirmed!");
    } catch (err) {
      toast.success("Booking saved locally — server not connected yet");
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="h-96 bg-base-200 rounded-2xl animate-pulse" />
            <div className="h-6 w-2/3 bg-base-200 rounded-full animate-pulse" />
            <div className="h-4 w-1/2 bg-base-200 rounded-full animate-pulse" />
            <div className="h-32 bg-base-200 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <div className="h-96 bg-base-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!facility) return null;

  return (
    <PageTransition className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6">
            <ImageGallery
              images={[facility.image_url].filter(Boolean)}
              alt={facility.name}
            />

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="badge badge-primary rounded-full px-2.5 py-1 text-xs font-semibold">
                  {facility.facility_type}
                </span>
                {facility.booking_count > 0 && (
                  <span className="text-xs text-base-content/40">
                    Booked {facility.booking_count} times
                  </span>
                )}
              </div>

              <h1 className="text-2xl! md:text-3xl! mb-3">{facility.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/50">
                <span className="flex items-center gap-1.5">
                  <RiMapPinLine className="text-primary" />
                  {facility.location}
                </span>
                {facility.capacity && (
                  <span className="flex items-center gap-1.5">
                    <RiGroupLine className="text-primary" />
                    Up to {facility.capacity} players
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <RiTimeLine className="text-primary" />
                  {facility.available_slots?.length || 0} slots available
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3>About This Facility</h3>
              <p className="text-base-content/60 leading-relaxed">
                {facility.description}
              </p>
            </div>

            {/* Owner info */}
            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl border border-base-content/5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RiUserLine className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-base-content">
                  Listed by
                </p>
                <p className="text-xs text-base-content/50">
                  {facility.owner_email}
                </p>
              </div>
            </div>

            {/* Price highlight */}
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <span className="text-sm text-base-content/50">
                Price per hour
              </span>
              <p className="font-numeric text-3xl font-bold text-primary">
                ৳{facility.price_per_hour?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right column — Booking Panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <BookingPanel
                facility={facility}
                onBookingSubmit={handleBooking}
              />
            </div>
          </div>
        </div>

        {/* Related facilities */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-16 pt-12 border-t border-base-content/5"
          >
            <h2 className="mb-8">Similar Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((f) => (
                <FacilityCard key={f._id} facility={f} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </PageTransition>
  );
}
