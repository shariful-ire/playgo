"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiMapPinLine, RiGroupLine } from "react-icons/ri";
import Button from "./Button";

const sportColors = {
  Turf: "badge-primary",
  Football: "badge-primary",
  Badminton: "badge-info",
  Swimming: "badge-info",
  Tennis: "badge-warning",
};

export default function FacilityCard({ facility, showManage = false }) {
  const {
    _id,
    name,
    facility_type,
    location,
    price_per_hour,
    image_url,
    booking_count = 0,
    capacity,
  } = facility;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="group bg-base-200 rounded-2xl overflow-hidden border border-base-content/5 hover:shadow-xl hover:shadow-black/15 transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image_url || "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Type badge */}
        <span
          className={`badge ${sportColors[facility_type] || "badge-neutral"} absolute top-3 left-3 text-xs font-semibold rounded-full px-2.5 py-1`}
        >
          {facility_type}
        </span>

        {/* Booking count */}
        {booking_count > 0 && (
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {booking_count} booked
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-base! font-semibold text-base-content line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-base-content/50">
          <span className="flex items-center gap-1">
            <RiMapPinLine className="text-xs" />
            {location}
          </span>
          {capacity && (
            <span className="flex items-center gap-1">
              <RiGroupLine className="text-xs" />
              {capacity}
            </span>
          )}
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-base-content/5">
          <p className="font-numeric text-lg font-bold text-primary">
            ৳{price_per_hour}
            <span className="text-xs font-normal text-base-content/40 ml-1">
              /hr
            </span>
          </p>

          {showManage ? (
            <Link href={`/manage-facilities/${_id}/edit`}>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </Link>
          ) : (
            <Link href={`/facility/${_id}`}>
              <Button variant="accent" size="sm">
                Book Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
