"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function StatCounter({ end, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const steps = 40;
    const increment = end / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * end);
      setCount(current);
      if (step >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-numeric text-4xl md:text-5xl font-bold text-gz-line-marker tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-gz-line-marker/40 uppercase tracking-wider mt-2">
        {label}
      </p>
    </div>
  );
}
