import type { Metadata } from "next";
import { IngredientListClient } from "@/components/organisms/IngredientListClient";
import { Carrot, Salad, Soup } from "lucide-react";

export const metadata: Metadata = {
  title: "Ingredients | mealapp",
  description: "Browse all cooking ingredients and discover delicious meals.",
};

export default function IngredientsPage() {
  return (
    <div>
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
        <IngredientListClient />
      </section>
    </div>
  );
}
