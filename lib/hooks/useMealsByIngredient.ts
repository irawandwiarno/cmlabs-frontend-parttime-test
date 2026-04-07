import { useState, useEffect } from "react";
import axios from "axios";
import { getMealsByIngredient, type MealSummary } from "@/lib/api/mealdb";

interface UseMealsByIngredientResult {
  data: MealSummary[];
  loading: boolean;
  error: string | null;
}

export function useMealsByIngredient(ingredient: string): UseMealsByIngredientResult {
  const [state, setState] = useState<UseMealsByIngredientResult>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!ingredient) return;

    const controller = new AbortController();

    setState({ data: [], loading: true, error: null });

    getMealsByIngredient(ingredient, controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err?.name === "CanceledError") return;
        const message = axios.isAxiosError(err)
          ? err.message
          : "Failed to load meals";
        setState({ data: [], loading: false, error: message });
      });

    return () => controller.abort();
  }, [ingredient]);

  return state;
}
