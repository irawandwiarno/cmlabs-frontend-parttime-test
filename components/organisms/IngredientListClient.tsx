"use client";

import { useMemo, useDeferredValue } from "react";
import { motion, type Variants } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIngredientQuery } from "@/lib/features/searchSlice";
import { useIngredients } from "@/lib/hooks/useIngredients";
import { useInfiniteVisibleCount } from "@/lib/hooks/useInfiniteVisibleCount";
import { fuzzyIncludes } from "@/lib/utils/fuzzySearch";
import { SearchInput } from "@/components/atoms/SearchInput";
import { SkeletonBox } from "@/components/atoms/SkeletonBox";
import { IngredientCard } from "@/components/molecules/IngredientCard";

const PAGE_SIZE = 50;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};

export function IngredientListClient() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((s) => s.search.ingredientQuery);
  const deferredQuery = useDeferredValue(query);

  const { data: ingredients, loading, error } = useIngredients();

  const filtered = useMemo(
    () =>
      deferredQuery.trim()
        ? ingredients.filter((ing) => fuzzyIncludes(ing.strIngredient, deferredQuery))
        : ingredients,
    [ingredients, deferredQuery]
  );

  const { visibleCount, hasMore, sentinelRef } = useInfiniteVisibleCount(
    filtered.length,
    PAGE_SIZE
  );

  const visibleIngredients = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  return (
    <div>
      <div className="flex justify-center mb-8">
        <SearchInput
          value={query}
          onChange={(v) => dispatch(setIngredientQuery(v))}
          placeholder="Search ingredients by name..."
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonBox key={i} className="aspect-square" />
          ))}
        </div>
      ) : error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 py-16 text-lg"
        >
          {error}
        </motion.p>
      ) : filtered.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-zinc-500 dark:text-zinc-400 py-16 text-lg"
        >
          No ingredients found for &quot;{query}&quot;.
        </motion.p>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>
              Showing <strong>{visibleIngredients.length}</strong> of <strong>{filtered.length}</strong> ingredients
            </span>
            {hasMore && <span>Scroll for more</span>}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {visibleIngredients.map((ingredient) => (
              <motion.div
                key={ingredient.strIngredient}
                variants={itemVariants}
              >
                <IngredientCard name={ingredient.strIngredient} />
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <div ref={sentinelRef} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 opacity-80">
                {Array.from({
                  length: Math.min(5, filtered.length - visibleIngredients.length),
                }).map((_, i) => (
                  <SkeletonBox key={i} className="aspect-square" />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
