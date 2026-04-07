"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteVisibleCount(totalItems: number, pageSize = 50) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(pageSize, totalItems)
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(pageSize, totalItems));
  }, [totalItems, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || visibleCount >= totalItems) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, totalItems));
        }
      },
      {
        rootMargin: "450px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [visibleCount, totalItems, pageSize]);

  return {
    visibleCount,
    hasMore: visibleCount < totalItems,
    sentinelRef,
  };
}
