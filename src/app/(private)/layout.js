"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import { toast } from "sonner";

export default function PrivateLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const encoded = encodeURIComponent(pathname);
      toast.error("Please log in to access this page");
      router.replace(`/login?redirect=${encoded}`);
    } else {
      setChecked(true);
    }
  }, [user, loading, router, pathname]);

  if (loading || !checked) {
    return (
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-base-200 rounded-full" />
          <div className="h-4 w-72 bg-base-200 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-base-200 rounded-2xl h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return children;
}
