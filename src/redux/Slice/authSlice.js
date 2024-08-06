import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("authState");
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
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const initialState = loadState() || {
  user: null,
  recipe: null,
  settings: false,
  favoriteList: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = JSON.parse(action.payload);
      saveState(state);
    },
    logoutHandle: (state) => {
      state.user = null;
      state.recipe = null;
      state.favoriteList = null;
      localStorage.removeItem("authState");
      localStorage.removeItem("recipeState");
    },
    settingClickHandle: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const { loginHandle, logoutHandle, settingClickHandle } =
  authSlice.actions;

export const userInfo = (state) => (state.auth.user ? state.auth.user : null);
export const settingsState = (state) => state.auth.settings;

export default authSlice.reducer;
