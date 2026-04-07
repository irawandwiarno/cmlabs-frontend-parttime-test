import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEALDB_BASE_URL,
});

export interface Ingredient {
  strIngredient: string;
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Record<string, string | undefined> {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export async function getIngredients(signal?: AbortSignal): Promise<Ingredient[]> {
  const { data } = await api.get("/list.php", { params: { i: "list" }, signal });
  return data.meals ?? [];
}

export async function getMealsByIngredient(
  ingredient: string,
  signal?: AbortSignal
): Promise<MealSummary[]> {
  const { data } = await api.get("/filter.php", {
    params: { i: ingredient },
    signal,
  });
  return data.meals ?? [];
}

export async function getMealById(
  id: string,
  signal?: AbortSignal
): Promise<MealDetail | null> {
  const { data } = await api.get("/lookup.php", { params: { i: id }, signal });
  return data.meals?.[0] ?? null;
}

export function getIngredientImageUrl(name: string, size: "small" | "full" = "small"): string {
  const encoded = encodeURIComponent(name);
  return size === "small"
    ? `https://www.themealdb.com/images/ingredients/${encoded}-Small.png`
    : `https://www.themealdb.com/images/ingredients/${encoded}.png`;
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

export function getMealIngredients(
  meal: MealDetail
): { name: string; measure: string }[] {
  const result: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      result.push({ name: name.trim(), measure: measure?.trim() ?? "" });
    }
  }
  return result;
}
