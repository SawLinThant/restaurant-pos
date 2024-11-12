import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sidebarSlice";

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore= typeof store
export default store;
