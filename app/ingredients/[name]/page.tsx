import type { Metadata } from "next";
import { MealListClient } from "@/components/organisms/MealListClient";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { ROUTES } from "@/lib/constants/routes";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return {
    title: `${decoded} Meals | mealapp`,
    description: `Discover meals made with ${decoded}.`,
  };
}

export default async function IngredientDetailPage({ params }: Props) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: ROUTES.home },
          { label: "Ingredients", href: ROUTES.ingredients },
          { label: decoded },
        ]}
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
        {decoded} Meals
      </h1>
      <MealListClient ingredientName={decoded} />
    </div>
  );
}

