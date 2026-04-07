import { SkeletonBox } from "@/components/atoms/SkeletonBox";
import { Carrot, Salad, Soup } from "lucide-react";

export default function IngredientsLoading() {
  return (
    <div>
      {/* Hero placeholder */}
      <section className="bg-linear-to-b from-orange-50 dark:from-zinc-900 to-zinc-50 dark:to-zinc-950 py-16 text-center border-b border-orange-100 dark:border-zinc-800">
        <div className="flex justify-center gap-3 text-3xl mb-3">
          <span><Soup className="text-orange-600 w-8 h-8"/></span>
          <span><Carrot className="text-orange-600 w-8 h-8"/></span>
          <span><Salad className="text-orange-600 w-8 h-8"/></span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">mealapp API website</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 px-4">
          See All The Delicious Foods
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Search skeleton */}
        <div className="flex justify-center mb-8">
          <SkeletonBox className="h-12 w-full max-w-md rounded-xl" />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonBox key={i} className="aspect-square" />
          ))}
        </div>
      </section>
    </div>
  );
}
