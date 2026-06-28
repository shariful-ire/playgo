"use client";

import { motion } from "framer-motion";
import StatCounter from "@/components/ui/StatCounter";

const stats = [
  { end: 50, suffix: "+", label: "Facilities" },
  { end: 1200, suffix: "+", label: "Bookings Made" },
  { end: 10, suffix: "+", label: "Cities Covered" },
  { end: 500, suffix: "+", label: "Active Players" },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Angled background */}
      <div className="absolute inset-0 bg-gz-turf-700 -skew-y-2 origin-top-left scale-105" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="text-gz-line-marker">Why GameZone?</h2>
          <p className="text-gz-line-marker/50 mt-2">
            Trusted by players and facility owners across the country
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
