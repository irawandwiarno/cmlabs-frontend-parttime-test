import { useState, useEffect } from "react";
import axios from "axios";
import { getIngredients, type Ingredient } from "@/lib/api/mealdb";

interface UseIngredientsResult {
  data: Ingredient[];
  loading: boolean;
  error: string | null;
}

export function useIngredients(): UseIngredientsResult {
  const [state, setState] = useState<UseIngredientsResult>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({ data: [], loading: true, error: null });

    getIngredients(controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err?.name === "CanceledError") return;
        const message = axios.isAxiosError(err)
          ? err.message
          : "Failed to load ingredients";
        setState({ data: [], loading: false, error: message });
      });

    return () => controller.abort();
  }, []);

  return state;
}
