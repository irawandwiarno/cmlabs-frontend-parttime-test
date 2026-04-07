export const ROUTES = {
  home: "/",
  ingredients: "/ingredients",
  ingredientDetail: (name: string) => `/ingredients/${encodeURIComponent(name)}`,
  mealDetail: (id: string) => `/meals/${id}`,
  mealDetailFromIngredient: (id: string, ingredientName: string) =>
    `/meals/${id}?from=${encodeURIComponent(ingredientName)}`,
} as const;
