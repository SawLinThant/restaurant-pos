import { createSlice } from "@reduxjs/toolkit";

export interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialState: OrderItemProps[] = []

export const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("addtoCart",action.payload)
      // Find if item exists for this order
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // Item exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // Add new item
        state.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: action.payload.quantity,
          image: action.payload.image,
        });
      }
      //localStorage.setItem("orderCart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      // Filter out the target item
      const newState = state.filter(
        (item) => !(item.id === action.payload.cartItemId)
      );
      //localStorage.setItem('orderCart', JSON.stringify(newState));
      return newState;
    },
    clearCart: () => {
      // Remove all items for this order
      return []
      //localStorage.setItem('orderCart', JSON.stringify(newState));
    },
    updateCartItemQuantity: (state, action) => {
      // Find and update target item
      const existingItem = state.find(
        (item) => item.id === action.payload.cartItemId
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        //localStorage.setItem('orderCart', JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  orderCartSlice.actions;

export default orderCartSlice.reducer;
