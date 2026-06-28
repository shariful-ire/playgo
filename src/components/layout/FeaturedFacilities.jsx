"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import { FacilityCard } from "@/components/ui";
import { MOCK_FACILITIES } from "@/lib/mockData";

export default function FeaturedFacilities() {
  const featured = MOCK_FACILITIES.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Featured Facilities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-base-content/50 mt-2 text-sm md:text-base"
            >
              Top-rated venues handpicked for the best playing experience
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/facilities"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <RiArrowRightLine />
            </Link>
          </motion.div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/facilities"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Facilities
            <RiArrowRightLine />
          </Link>
        </div>
      </div>
    </section>
  );
}
