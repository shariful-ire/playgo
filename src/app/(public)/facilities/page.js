"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import FilterBar from "@/components/ui/FilterBar";
import { FacilityCard, EmptyState } from "@/components/ui";
import { MOCK_FACILITIES } from "@/lib/mockData";
import { RiSearchLine } from "react-icons/ri";

const PAGE_SIZE = 6;

export default function FacilitiesPage() {
  const [filters, setFilters] = useState({
    search: "",
    types: [],
    priceRange: [0, 10000],
    location: "",
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return MOCK_FACILITIES.filter((f) => {
      if (
        filters.search &&
        !f.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.types.length > 0 && !filters.types.includes(f.facility_type))
        return false;
      if (f.price_per_hour > filters.priceRange[1]) return false;
      if (filters.location && !f.location.includes(filters.location))
        return false;
      return true;
    });
  }, [filters]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <PageTransition className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Page header */}
        <div className="mb-8">
          <h1>All Facilities</h1>
          <p className="text-base-content/50 mt-2">
            Find and book the best sports venues near you
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-8 sticky top-16 z-30">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results count */}
        <p className="text-sm text-base-content/40 mb-6">
          Showing {visible.length} of {filtered.length} facilities
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((facility) => (
                  <FacilityCard key={facility._id} facility={facility} />
                ))}
              </AnimatePresence>
            </motion.div>

            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="btn btn-outline btn-primary rounded-2xl"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={RiSearchLine}
            title="No facilities found"
            message="Try adjusting your filters or search for something different."
            actionLabel="Clear Filters"
            onAction={() =>
              setFilters({
                search: "",
                types: [],
                priceRange: [0, 10000],
                location: "",
              })
            }
          />
        )}
      </div>
    </PageTransition>
  );
}
