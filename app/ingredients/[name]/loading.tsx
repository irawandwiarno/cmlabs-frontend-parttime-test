import { SkeletonBox } from "@/components/atoms/SkeletonBox";

export default function IngredientDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <SkeletonBox className="h-4 w-12 rounded" />
        <SkeletonBox className="h-4 w-4 rounded" />
        <SkeletonBox className="h-4 w-20 rounded" />
        <SkeletonBox className="h-4 w-4 rounded" />
        <SkeletonBox className="h-4 w-24 rounded" />
      </div>
      {/* Title skeleton */}
      <SkeletonBox className="h-10 w-64 mb-8 rounded-xl" />
      {/* Search skeleton */}
      <div className="flex justify-center mb-8">
        <SkeletonBox className="h-12 w-full max-w-md rounded-xl" />
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonBox key={i} className="aspect-square" />
        ))}
      </div>
    </div>
  );
}
