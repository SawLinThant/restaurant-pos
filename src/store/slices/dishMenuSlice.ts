import { MenuOptions } from "@/lib/constants/MenuOptions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DishMenuProps {
  id: number;
  name: string;
  isSelected: boolean;
}

const initialState: DishMenuProps[] = MenuOptions.map((option, index) => {
  if (index === 0) {
    return {
      id: index,
      name: option,
      isSelected: true,
    };
  } else
    return {
      id: index,
      name: option,
      isSelected: false,
    };
});

export const dishMenuSlice = createSlice({
  name: "dishMenu",
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<number>) => {
      return state.map((currentState) => {
        if (currentState.id === action.payload) {
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
  },
});

export const { setSelectedMenu } = dishMenuSlice.actions;
export const selectDishMenu = (state: RootState) => state.dishMenu;

export default dishMenuSlice.reducer;
