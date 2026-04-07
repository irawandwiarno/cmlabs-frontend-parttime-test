import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  ingredientQuery: string;
  mealQuery: string;
}

const initialState: SearchState = {
  ingredientQuery: "",
  mealQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIngredientQuery(state, action: PayloadAction<string>) {
      state.ingredientQuery = action.payload;
    },
    setMealQuery(state, action: PayloadAction<string>) {
      state.mealQuery = action.payload;
    },
    clearMealQuery(state) {
      state.mealQuery = "";
    },
  },
});

export const { setIngredientQuery, setMealQuery, clearMealQuery } =
  searchSlice.actions;
export default searchSlice.reducer;
