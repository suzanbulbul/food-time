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
  favoriteList: [],
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
    addFavorite: (state, action) => {
      state.favoriteList.push(action.payload);
      saveState(state);
    },
    removeFavorite: (state, action) => {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== action.payload
      );
      saveState(state);
    },
    removeAllFavorite: (state) => {
      state.favoriteList = [];
      saveState(state);
    },
  },
});

export const {
  setRecipeDetail,
  clearRecipeDetail,
  addFavorite,
  removeFavorite,
  removeAllFavorite,
} = recipeSlice.actions;

export const selectRecipe = (state) => state.recipe.recipe;
export const favoriteList = (state) => state.recipe.favoriteList;

export default recipeSlice.reducer;
