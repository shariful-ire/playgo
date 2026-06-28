"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RiSearchLine, RiCalendarCheckLine, RiFootballLine } from "react-icons/ri";

const steps = [
  {
    icon: RiSearchLine,
    title: "Search",
    description: "Browse sports facilities near you. Filter by sport, price, or location to find the perfect match.",
  },
  {
    icon: RiCalendarCheckLine,
    title: "Book",
    description: "Pick a date, choose an available slot, and confirm your booking in seconds. No phone calls needed.",
  },
  {
    icon: RiFootballLine,
    title: "Play",
    description: "Show up and enjoy your game. Your booking is confirmed and the facility is ready for you.",
  },
];

function ConnectorLine({ inView }) {
  return (
    <div className="hidden md:flex items-center flex-1 mx-2">
      <svg className="w-full h-8" viewBox="0 0 200 32" preserveAspectRatio="none">
        <motion.path
          d="M0 16 H200"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 6"
          className="text-primary/30"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2>How It Works</h2>
          <p className="text-base-content/50 mt-2">
            Three simple steps to get on the pitch
          </p>
        </motion.div>

        <div ref={ref} className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex flex-col items-center text-center flex-1 max-w-xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="text-2xl text-primary" />
                </div>
                <span className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-1">
                  Step {i + 1}
                </span>
                <h3 className="text-lg! mb-2">{step.title}</h3>
                <p className="text-sm text-base-content/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
              {i < steps.length - 1 && <ConnectorLine inView={inView} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
