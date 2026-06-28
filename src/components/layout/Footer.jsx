"use client";

import Link from "next/link";
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

function XIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/facilities" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Facility", href: "/add-facility" },
];

const SPORT_TYPES = [
  { label: "Turf Grounds", href: "/facilities?type=Turf" },
  { label: "Football Fields", href: "/facilities?type=Football" },
  { label: "Badminton Courts", href: "/facilities?type=Badminton" },
  { label: "Swimming Pools", href: "/facilities?type=Swimming" },
  { label: "Tennis Courts", href: "/facilities?type=Tennis" },
];

const SOCIALS = [
  { label: "GitHub", icon: RiGithubFill, href: "https://github.com/shariful-ire" },
  { label: "LinkedIn", icon: RiLinkedinBoxFill, href: "https://www.linkedin.com/in/shariful-ire" },
  { label: "X", icon: XIcon, href: "https://x.com/shariful_ire" },
];

function FooterColumn({ title, children }) {
  return (
    <div className="collapse collapse-arrow md:collapse-open bg-transparent border-b border-gz-line-marker/10 md:border-0 rounded-none">
      <input type="checkbox" className="md:hidden min-h-0 peer" />
      <div className="collapse-title text-sm font-heading font-semibold text-gz-line-marker tracking-wide uppercase min-h-0 px-0 py-3 md:py-0 md:mb-4 md:cursor-default">
        {title}
      </div>
      <div className="collapse-content px-0 md:pb-0!">
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gz-charcoal-950 border-t border-gz-line-marker/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-10">
          {/* Brand Column */}
          <div className="pb-6 md:pb-0 border-b border-gz-line-marker/10 md:border-0 mb-0 md:mb-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <LogoIcon className="w-7 h-7 text-primary" />
              <span className="font-heading font-bold text-lg text-gz-line-marker tracking-tight">
                Game<span className="text-primary">Zone</span>
              </span>
            </Link>
            <p className="text-sm text-gz-line-marker/50 leading-relaxed max-w-xs">
              Book premium sports facilities near you. From turf grounds to
              tennis courts — find your game, pick your time, and play.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gz-line-marker/60 hover:text-gz-accent-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gz-line-marker/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Sport Types */}
          <FooterColumn title="Sports">
            <ul className="space-y-2.5">
              {SPORT_TYPES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gz-line-marker/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <ul className="space-y-2.5 text-sm text-gz-line-marker/50">
              <li>
                <span className="text-gz-line-marker/30">Email:</span>{" "}
                <a
                  href="mailto:shariful.ire@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  shariful.ire@gmail.com
                </a>
              </li>
              <li>
                <span className="text-gz-line-marker/30">GitHub:</span>{" "}
                <a
                  href="https://github.com/shariful-ire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  shariful-ire
                </a>
              </li>
              <li>
                <span className="text-gz-line-marker/30">Location:</span>{" "}
                Dhaka, Bangladesh
              </li>
            </ul>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gz-line-marker/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gz-line-marker/30">
            &copy; {new Date().getFullYear()} GameZone. All rights reserved.
          </p>
          <p className="text-xs text-gz-line-marker/30">
            Built for the love of the game.
          </p>
        </div>
      </div>
    </footer>
  );
}
