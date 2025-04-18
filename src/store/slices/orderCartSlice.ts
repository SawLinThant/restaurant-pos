import { calculateSubtotal } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCartState {
  items: OrderItemProps[];
  subtotal: number;
  tax: number;
  total: number;
}

// Load from localStorage if exists
const loadCartFromStorage = (): OrderItemProps[] => {
  try {
    const storedCart = localStorage.getItem("orderCart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
    return [];
  }
};

// Calculate initial cart state
const calculateCartState = (items: OrderItemProps[]): OrderCartState => {
  const subtotal = calculateSubtotal(items);
  const tax = 0; // Can be updated with tax calculation logic
  const total = subtotal + tax;

  return {
    items,
    subtotal,
    tax,
    total,
  };
};

const initialState: OrderCartState = calculateCartState(loadCartFromStorage());

const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderItemProps>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`Added another ${existingItem.name} to cart`);
      } else {
        state.items.push({ ...action.payload });
        toast.success(`Added ${action.payload.name} to cart`);
      }

      // Update cart totals
      const { subtotal, tax, total } = calculateCartState(state.items);
      state.subtotal = subtotal;
      state.tax = tax;
      state.total = total;

      // Save to localStorage
      localStorage.setItem("orderCart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<{ cartItemId: string }>) => {
      const { cartItemId } = action.payload;
      const itemToRemove = state.items.find((item) => item.id === cartItemId);

      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== cartItemId);
        toast.info(`Removed ${itemToRemove.name} from cart`);

        // Update cart totals
        const { subtotal, tax, total } = calculateCartState(state.items);
        state.subtotal = subtotal;
        state.tax = tax;
        state.total = total;

        // Save to localStorage
        localStorage.setItem("orderCart", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;

      // Clear localStorage
      localStorage.removeItem("orderCart");
      toast.info("Cart cleared");
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ cartItemId: string; quantity: number }>
    ) => {
      const { cartItemId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === cartItemId);

      if (existingItem) {
        existingItem.quantity = quantity;

        // Update cart totals
        const { subtotal, tax, total } = calculateCartState(state.items);
        state.subtotal = subtotal;
        state.tax = tax;
        state.total = total;

        // Save to localStorage
        localStorage.setItem("orderCart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  orderCartSlice.actions;

export default orderCartSlice.reducer;
