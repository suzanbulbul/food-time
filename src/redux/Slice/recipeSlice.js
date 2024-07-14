import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("recipeState");
      if (serializedState === null) {
        console.log("localStorage is empty");
        return undefined;
      }
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("recipeState", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const initialState = loadState() || {
  recipe: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeDetail: (state, action) => {
      state.recipe = JSON.parse(action.payload);
      saveState(state);
    },
    clearRecipeDetail: (state) => {
      state.recipe = null;
      localStorage.removeItem("recipeState");
    },
  },
});

export const { setRecipeDetail, clearRecipeDetail } = recipeSlice.actions;

export const selectRecipe = (state) => state.recipe.recipe;

export default recipeSlice.reducer;
