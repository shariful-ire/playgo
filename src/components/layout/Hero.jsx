"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gz-charcoal-950 via-gz-charcoal-950/80 to-gz-charcoal-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-gz-charcoal-950/60 to-transparent" />
      </div>

      {/* Angled bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0 80V30L720 0L1440 30V80H0Z"
            className="fill-base-100"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-medium mb-6 border border-primary/20">
              Premium Sports Facilities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-gz-line-marker mb-6 text-4xl! md:text-6xl! leading-[1.1]!"
          >
            Your Game.{" "}
            <span className="text-primary">Your Time.</span>{" "}
            <br className="hidden sm:block" />
            Your Turf.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gz-line-marker/60 text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
          >
            Discover and book top-rated turfs, courts, and pools near you.
            Find your slot in seconds — and get back to what matters: playing.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link href="/facilities">
              <Button variant="accent" size="lg">
                Explore Facilities
              </Button>
            </Link>
            <Link href="/add-facility">
              <Button variant="ghost" size="lg" className="border-gz-line-marker/20! text-gz-line-marker! hover:bg-gz-line-marker/10!">
                List Your Facility
              </Button>
            </Link>
          </motion.div>

          {/* Trust stats mini-strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-gz-line-marker/10"
          >
            {[
              { value: "50+", label: "Facilities" },
              { value: "1,200+", label: "Bookings" },
              { value: "10+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-numeric text-2xl font-bold text-gz-line-marker">
                  {stat.value}
                </p>
                <p className="text-xs text-gz-line-marker/40 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
