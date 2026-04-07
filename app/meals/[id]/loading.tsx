import { SkeletonBox } from "@/components/atoms/SkeletonBox";

export default function MealDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-6">
        <SkeletonBox className="h-4 w-12 rounded" />
        <SkeletonBox className="h-4 w-4 rounded" />
        <SkeletonBox className="h-4 w-20 rounded" />
        <SkeletonBox className="h-4 w-4 rounded" />
        <SkeletonBox className="h-4 w-32 rounded" />
      </div>
      {/* Title */}
      <SkeletonBox className="h-10 w-72 mb-4 rounded-xl" />
      {/* Badges */}
      <div className="flex gap-2 mb-8">
        <SkeletonBox className="h-6 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-28 rounded-full" />
      </div>
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <SkeletonBox className="aspect-square rounded-2xl" />
        <div className="space-y-3">
          <SkeletonBox className="h-7 w-36 rounded-xl" />
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox key={i} className="h-4 w-full rounded" />
          ))}
          <SkeletonBox className="h-4 w-3/4 rounded" />
        </div>
      </div>
      {/* Recipes */}
      <SkeletonBox className="h-8 w-24 rounded-xl mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonBox key={i} className="h-10 rounded-xl" />
        ))}
      </div>
      {/* YouTube */}
      <SkeletonBox className="h-8 w-28 rounded-xl mb-4 mx-auto" />
      <SkeletonBox className="w-full aspect-video rounded-2xl" />
    </div>
  );
}
