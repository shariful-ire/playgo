"use client";

import { useState } from "react";
import { Button, FormField, StatusBadge, EmptyState } from "@/components/ui";
import { RiSearchLine, RiMapPinLine } from "react-icons/ri";

export default function Home() {
  const [theme, setTheme] = useState("gamezone-dark");
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState({});

  function toggleTheme() {
    const next =
      theme === "gamezone-dark" ? "gamezone-light" : "gamezone-dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  function handleValidate() {
    const errors = {};
    if (!formValues.name) errors.name = "Facility name is required";
    if (!formValues.email) errors.email = "A valid email is required";
    setFormErrors(errors);
  }

  return (
    <main className="flex flex-col flex-1 items-center px-4 py-12 md:py-20 gap-12 max-w-5xl mx-auto w-full">
      {/* Theme Toggle */}
      <div className="flex items-center gap-4 self-end">
        <span className="text-sm text-base-content/60">{theme}</span>
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>

      {/* Typography Scale */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">Typography Scale</h2>
        <div className="space-y-4">
          <h1>H1 — Your Game. Your Time. Your Turf.</h1>
          <h2>H2 — Premium Sports Facility Booking</h2>
          <h3>H3 — Browse, Search, and Book Instantly</h3>
          <h4>H4 — Available Time Slots & Pricing</h4>
          <p className="text-body-lg">
            Body Large — Find the perfect turf, court, or pool near you. Book in
            seconds, play on your schedule.
          </p>
          <p>
            Body — GameZone connects players with top-rated sports facilities
            across the city. Whether you need a turf for a weekend kickabout or a
            badminton court for your league practice, we have you covered.
          </p>
          <p className="text-sm text-base-content/60">
            Small / Secondary — Last booked 3 hours ago
          </p>
          <p className="font-numeric text-4xl font-bold tracking-tight">
            ৳2,450{" "}
            <span className="text-lg font-normal text-base-content/50">
              /hr
            </span>
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">Button Component</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="accent">Book Now</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost / Outline</Button>
          <Button variant="danger">Cancel</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="accent" size="sm">Small</Button>
          <Button variant="accent" size="md">Medium</Button>
          <Button variant="accent" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* FormField */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">FormField Component</h2>
        <div className="max-w-md space-y-4">
          <FormField
            label="Facility Name"
            name="name"
            placeholder="Enter facility name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, name: e.target.value }))
            }
            error={formErrors.name}
          />
          <FormField
            label="Owner Email"
            name="email"
            type="email"
            placeholder="owner@example.com"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, email: e.target.value }))
            }
            error={formErrors.email}
          />
          <FormField
            label="Description"
            name="description"
            textarea
            placeholder="Describe your facility..."
            rows={3}
          />
          <FormField label="Location" name="location">
            <select
              name="location"
              className="w-full select rounded-2xl bg-base-200"
              defaultValue=""
            >
              <option value="" disabled>Select a city</option>
              <option>Dhaka</option>
              <option>Chittagong</option>
              <option>Sylhet</option>
            </select>
          </FormField>
          <Button variant="accent" size="sm" onClick={handleValidate}>
            Test Validation
          </Button>
        </div>
      </section>

      {/* StatusBadge */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">
          StatusBadge Component
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <StatusBadge status="pending" />
          <StatusBadge status="confirmed" />
          <StatusBadge status="cancelled" />
        </div>
      </section>

      {/* EmptyState */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">
          EmptyState Component
        </h2>
        <div className="bg-base-200 rounded-2xl">
          <EmptyState
            title="No bookings yet"
            message="You haven't booked any facility yet. Start exploring and book your first game!"
            actionLabel="Explore Facilities"
            actionHref="/facilities"
          />
        </div>
        <div className="bg-base-200 rounded-2xl">
          <EmptyState
            icon={RiSearchLine}
            title="No results found"
            message="Try adjusting your filters or search for something different."
          />
        </div>
        <div className="bg-base-200 rounded-2xl">
          <EmptyState
            icon={RiMapPinLine}
            title="No facilities listed"
            message="You haven't added any facilities yet. List your first one and start getting bookings!"
            actionLabel="Add Facility"
            actionHref="/add-facility"
          />
        </div>
      </section>

      {/* Color Palette (compact) */}
      <section className="w-full space-y-6">
        <h2 className="border-b border-base-300 pb-2">Theme Colors</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[
            ["Primary", "bg-primary text-primary-content"],
            ["Secondary", "bg-secondary text-secondary-content"],
            ["Accent", "bg-accent text-accent-content"],
            ["Success", "bg-success text-success-content"],
            ["Warning", "bg-warning text-warning-content"],
            ["Error", "bg-error text-error-content"],
            ["Base 100", "bg-base-100 text-base-content"],
            ["Base 200", "bg-base-200 text-base-content"],
            ["Base 300", "bg-base-300 text-base-content"],
            ["Neutral", "bg-neutral text-neutral-content"],
            ["Turf 700", "bg-gz-turf-700 text-white"],
            ["Accent 400", "bg-gz-accent-400 text-black"],
          ].map(([label, cls]) => (
            <div
              key={label}
              className={`${cls} rounded-2xl p-3 text-xs font-medium text-center`}
            >
              {label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
