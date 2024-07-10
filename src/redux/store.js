import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./Slice/authSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
