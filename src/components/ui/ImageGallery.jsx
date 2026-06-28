"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function ImageGallery({ images = [], alt = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imgs = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=900&q=80",
  ];

  function navigate(dir) {
    setActiveIndex((i) => (i + dir + imgs.length) % imgs.length);
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={imgs[activeIndex]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle text-white"
              onClick={() => setLightboxOpen(false)}
            >
              <RiCloseLine className="text-2xl" />
            </button>

            {imgs.length > 1 && (
              <>
                <button
                  className="absolute left-4 btn btn-ghost btn-sm btn-circle text-white"
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                >
                  <RiArrowLeftSLine className="text-2xl" />
                </button>
                <button
                  className="absolute right-4 btn btn-ghost btn-sm btn-circle text-white"
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                >
                  <RiArrowRightSLine className="text-2xl" />
                </button>
              </>
            )}

            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={imgs[activeIndex]}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
