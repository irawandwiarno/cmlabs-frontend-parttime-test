import type { Metadata } from "next";
import { MealDetailView } from "@/components/organisms/MealDetailView";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Meal #${id} | mealapp`,
    description: "View detailed meal instructions, recipes, and tutorial.",
  };
}

export default async function MealDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  return (
    <MealDetailView
      id={id}
      fromIngredient={from ? decodeURIComponent(from) : undefined}
    />
  );
}

