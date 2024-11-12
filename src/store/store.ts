import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sidebarSlice";

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
  },
});

export default store;
