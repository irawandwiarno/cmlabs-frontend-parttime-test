import { useState, useEffect } from "react";
import axios from "axios";
import { getMealById, type MealDetail } from "@/lib/api/mealdb";

interface UseMealByIdResult {
  data: MealDetail | null;
  loading: boolean;
  error: string | null;
}

export function useMealById(id: string): UseMealByIdResult {
  const [state, setState] = useState<UseMealByIdResult>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    setState({ data: null, loading: true, error: null });

    getMealById(id, controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: data ? null : "Meal not found" });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err?.name === "CanceledError") return;
        const message = axios.isAxiosError(err)
          ? err.message
          : "Failed to load meal";
        setState({ data: null, loading: false, error: message });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}
