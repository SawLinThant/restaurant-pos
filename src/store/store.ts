import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sidebarSlice";
import dishMenuReducer from "../store/slices/dishMenuSlice";
import orderCartReducer from "../store/slices/orderCartSlice";
const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    dishMenu: dishMenuReducer,
    orderCart: orderCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export default store;
