import { createSlice } from "@reduxjs/toolkit";

export interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface OrderCartProps {
  tableId: string;
  orderItems: OrderItemProps[];
}

const initialState: OrderCartProps[] = JSON.parse(localStorage.getItem('orderCart') || '[]');

export const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Find if table exists
      const existingTable = state.find(
        (item) => item.tableId === action.payload.tableId
      );

      if (existingTable) {
        // Table exists, check if product exists in orderItems
        const existingProduct =
          existingTable.orderItems?.find(
            (item) => item.id === action.payload.cartItem.id
          ) || null;

        if (existingProduct) {
          // Product exists, increment quantity
          existingProduct.quantity += 1;
          localStorage.setItem('orderCart', JSON.stringify(state));
        } else {
          // Product doesn't exist, add new product to orderItems
          //existingTable.orderItems = [];
          existingTable.orderItems.push(action.payload.cartItem);
          localStorage.setItem('orderCart', JSON.stringify(state));
        }
      } else {
        // Table doesn't exist, add new table with orderItems
        state.push({
          tableId: action.payload.tableId,
          orderItems: [
            {
              id: action.payload.cartItem.id,
              name: action.payload.cartItem.name,
              price: action.payload.cartItem.price,
              quantity: action.payload.cartItem.quantity,
              image: action.payload.cartItem.image,
            },
          ],
        });
        localStorage.setItem('orderCart', JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      // Find if table exists
      const existingTable = state.find(
        (item) => item.tableId === action.payload.tableId
      );

      if (existingTable) {
        // Table exists, filter out the target orderItem
        existingTable.orderItems = existingTable.orderItems.filter(
          (item) => item.id !== action.payload.cartItemId
        );
        localStorage.setItem('orderCart', JSON.stringify(state));
      }
    },
    clearCart: (state, action) => {
      const existingTable = state.find(
        (item) => item.tableId === action.payload.tableId
      );
      if (existingTable) {
        existingTable.orderItems = [];
      }
      localStorage.setItem('orderCart', JSON.stringify(state));
    },
    updateCartItemQuantity: (state, action) => {
      // Find if table exists
      const existingTable = state.find(
        (item) => item.tableId === action.payload.tableId
      );

      if (existingTable) {
        // Table exists, find target orderItem
        const existingProduct = existingTable.orderItems.find(
          (item) => item.id === action.payload.cartItemId
        );

        if (existingProduct) {
          // Product exists, update quantity
          existingProduct.quantity = action.payload.quantity;
        }
      }
      localStorage.setItem('orderCart', JSON.stringify(state));
    },
  }, 
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  orderCartSlice.actions;

export default orderCartSlice.reducer;
