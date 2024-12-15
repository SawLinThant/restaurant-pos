import { createSlice } from "@reduxjs/toolkit";

export interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface OrderCartProps {
  cartItems: OrderItemProps[];
}

const initialState: OrderCartProps = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [],
};

export const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  orderCartSlice.actions;

export default orderCartSlice.reducer;
