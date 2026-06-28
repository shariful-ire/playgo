"use client";

import { useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { SPORT_TYPES } from "@/lib/constants";

export default function FilterBar({ filters, onFilterChange }) {
  const { search = "", types = [], priceRange = [0, 10000], location = "" } = filters;

  function updateFilter(key, value) {
    onFilterChange({ ...filters, [key]: value });
  }

  function toggleType(type) {
    const current = types || [];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateFilter("types", next);
  }

  function clearAll() {
    onFilterChange({ search: "", types: [], priceRange: [0, 10000], location: "" });
  }

  const hasActiveFilters = search || types.length > 0 || location || priceRange[1] < 10000;

  return (
    <div className="bg-base-200 rounded-2xl p-4 md:p-6 space-y-4 border border-base-content/5">
      {/* Search */}
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
        <input
          type="text"
          placeholder="Search facilities..."
          value={search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full input rounded-2xl bg-base-300 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Sport type pills */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
          Sport Type
        </p>
        <div className="flex flex-wrap gap-2">
          {SPORT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                types.includes(type)
                  ? "bg-primary text-primary-content"
                  : "bg-base-300 text-base-content/60 hover:bg-base-300/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price range + Location row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
            Max Price (৳/hr)
          </p>
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={(e) =>
              updateFilter("priceRange", [0, Number(e.target.value)])
            }
            className="range range-primary range-sm w-full"
          />
          <div className="flex justify-between text-xs text-base-content/40">
            <span>৳0</span>
            <span className="font-numeric font-medium text-base-content/70">
              ৳{priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
            Location
          </p>
          <select
            value={location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full select select-sm rounded-2xl bg-base-300"
          >
            <option value="">All Locations</option>
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Sylhet</option>
          </select>
        </div>
      </div>

      {/* Active filters + Clear */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-base-content/5">
          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              &quot;{search}&quot;
              <button onClick={() => updateFilter("search", "")}>
                <RiCloseLine className="text-sm" />
              </button>
            </span>
          )}
          {types.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {t}
              <button onClick={() => toggleType(t)}>
                <RiCloseLine className="text-sm" />
              </button>
            </span>
          ))}
          {location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {location}
              <button onClick={() => updateFilter("location", "")}>
                <RiCloseLine className="text-sm" />
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-xs text-error hover:text-error/80 font-medium ml-auto transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
