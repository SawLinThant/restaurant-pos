import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants/config";

export interface OrderItem {
  productId: string;
  status: string;
  quantity: number;
}

export interface Order {
  orderItems: OrderItem[];
  table: string;
  status: string;
}



interface CreateOrderResponse {
  // Your response properties
  id: string;
  // ... other properties
}

// Define the options type
type CreateOrderOptions = Omit<
  UseMutationOptions<CreateOrderResponse, Error, Order>,
  "mutationFn"
>;

export const useCreateOrder = (options?: CreateOrderOptions) => {
  return useMutation<CreateOrderResponse, Error, Order>({
    mutationFn: async (orderData) => {
      const response = await axios.post<CreateOrderResponse>(
        `${baseUrl}/Order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    ...options, // Spread the provided options
  });
};
