import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./Slice/authSlice";
import recipeReducer from "./Slice/recipeSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      recipe: recipeReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
