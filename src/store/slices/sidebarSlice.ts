import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SidebarMenuProps {
  id: string;
  label: string;
  href: string;
  isSelected: boolean;
}

export interface SidebarProps {
  isCollpase: boolean;
  options: SidebarMenuProps[];
}

const initialState: SidebarProps = {
  isCollpase: false,
  options: [
    {
      id: "1",
      label: "menu1",
      href: "",
      isSelected: true,
    },
  ],
};

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsSelected: (state, action: PayloadAction<string>) => {
      state.options = state.options.map((currentState) => {
        if (currentState.id == action.payload) {
          return {
            ...currentState,
            isSelected: true,
          };
        } else {
          return {
            ...currentState,
            isSelected: false,
          };
        }
      });
    },
    toggle: (state) => {
      state.isCollpase = !state.isCollpase;
    },
  },
});

export const { setIsSelected, toggle } = sideBarSlice.actions;
export const selectSideBarIsCollpase = (state: RootState) =>
  state.sidebar.isCollpase;
export const selectSideBarMenu = (state: RootState) => state.sidebar.options;

export default sideBarSlice.reducer;
