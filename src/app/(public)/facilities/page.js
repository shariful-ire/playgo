"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import FilterBar from "@/components/ui/FilterBar";
import { FacilityCard, SkeletonCard, EmptyState } from "@/components/ui";
import { fetchFacilities } from "@/lib/api";
import { RiSearchLine } from "react-icons/ri";

const PAGE_SIZE = 6;

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function FacilitiesPage() {
  const [filters, setFilters] = useState({
    search: "",
    types: [],
    priceRange: [0, 10000],
    location: "",
  });
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(filters.search);

  const loadFacilities = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFacilities({
        search: debouncedSearch,
        types: filters.types,
        maxPrice: filters.priceRange[1],
        location: filters.location,
      });
      setFacilities(Array.isArray(data) ? data : data.facilities || []);
      setVisibleCount(PAGE_SIZE);
    } catch {
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.types, filters.priceRange, filters.location]);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const visible = facilities.slice(0, visibleCount);
  const hasMore = visibleCount < facilities.length;

  return (
    <PageTransition className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="mb-8">
          <h1>All Facilities</h1>
          <p className="text-base-content/50 mt-2">
            Find and book the best sports venues near you
          </p>
        </div>

        <div className="mb-8 sticky top-16 z-30">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {!loading && (
          <p className="text-sm text-base-content/40 mb-6">
            Showing {visible.length} of {facilities.length} facilities
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : facilities.length > 0 ? (
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
