"use client";

import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  body = "This action cannot be undone.",
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="bg-base-100 rounded-2xl border border-base-content/5 shadow-2xl shadow-black/30 w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg! mb-2">{title}</h3>
              <p className="text-sm text-base-content/50 mb-6">{body}</p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  variant={danger ? "danger" : "accent"}
                  size="sm"
                  onClick={onConfirm}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    confirmLabel
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
