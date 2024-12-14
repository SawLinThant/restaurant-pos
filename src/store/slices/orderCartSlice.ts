import { createSlice } from "@reduxjs/toolkit";

export interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface OrderCartProps {
  cartItems: OrderItemProps[];
}

const initialState: OrderCartProps = {
  cartItems: [],
};

export const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {},
});
