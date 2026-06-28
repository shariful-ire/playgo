"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMenuLine,
  RiCloseLine,
  RiCalendarCheckLine,
  RiAddCircleLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/facilities" },
];

const PRIVATE_LINKS = [
  { label: "My Bookings", href: "/my-bookings", icon: RiCalendarCheckLine },
  { label: "Add Facility", href: "/add-facility", icon: RiAddCircleLine },
  { label: "Manage Facilities", href: "/manage-facilities", icon: RiSettings3Line },
];

const MOCK_USER = null;

function LogoIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="8" width="4" height="20" rx="2" fill="currentColor" />
      <rect x="26" y="8" width="4" height="20" rx="2" fill="currentColor" />
      <rect x="6" y="8" width="20" height="4" rx="1" fill="currentColor" />
      <circle cx="16" cy="22" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-primary/30 transition-all"
        aria-label="Profile menu"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-primary/30"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-base-200 border border-base-content/10 rounded-2xl shadow-xl shadow-black/20 py-2 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-base-content/10">
              <p className="text-sm font-semibold text-base-content truncate">
                {user.name}
              </p>
              <p className="text-xs text-base-content/50 truncate">
                {user.email}
              </p>
            </div>

            {PRIVATE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content/70 hover:text-primary hover:bg-base-300/50 transition-colors"
              >
                <link.icon className="text-base" />
                {link.label}
              </Link>
            ))}

            <div className="border-t border-base-content/10 mt-1 pt-1">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors w-full"
              >
                <RiLogoutBoxRLine className="text-base" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDrawer({ isOpen, onClose, user, onLogout }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-72 bg-base-100 z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-base-content/10">
              <span className="font-heading font-bold text-lg text-base-content">
                Game<span className="text-primary">Zone</span>
              </span>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-square rounded-xl"
                aria-label="Close menu"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* User info (if logged in) */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-4 border-b border-base-content/10">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-base-content truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-base-content/50 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav links */}
            <nav className="flex flex-col py-2 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-5 py-3 text-sm font-medium text-base-content/70 hover:text-primary hover:bg-base-200/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {user && (
                <>
                  <div className="h-px bg-base-content/10 mx-4 my-2" />
                  {PRIVATE_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * (NAV_LINKS.length + i) }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-base-content/70 hover:text-primary hover:bg-base-200/50 transition-colors"
                      >
                        <link.icon className="text-base" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </>
              )}
            </nav>

            {/* Bottom action */}
            <div className="p-4 border-t border-base-content/10">
              {user ? (
                <button
                  onClick={() => {
                    onClose();
                    onLogout?.();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error/10 rounded-xl transition-colors"
                >
                  <RiLogoutBoxRLine className="text-base" />
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={onClose} className="block">
                  <Button variant="accent" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = MOCK_USER;

  function handleLogout() {
    console.log("Logout clicked");
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-base-content/5 ${
          scrolled
            ? "bg-base-100/95 backdrop-blur-md py-2 shadow-lg shadow-black/10"
            : "bg-base-100 py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon
              className={`text-primary transition-all duration-300 ${
                scrolled ? "w-7 h-7" : "w-8 h-8"
              }`}
            />
            <span
              className={`font-heading font-bold text-base-content tracking-tight transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              Game<span className="text-primary">Zone</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            {user &&
              PRIVATE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors rounded-xl"
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop auth area */}
            <div className="hidden md:block">
              {user ? (
                <ProfileDropdown user={user} onLogout={handleLogout} />
              ) : (
                <Link href="/login">
                  <Button variant="accent" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile hamburger / X morph */}
            <button
              className="md:hidden btn btn-ghost btn-sm btn-square rounded-xl"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {drawerOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <RiCloseLine className="text-xl" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <RiMenuLine className="text-xl" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}

export { NAV_LINKS, PRIVATE_LINKS, MOCK_USER };
