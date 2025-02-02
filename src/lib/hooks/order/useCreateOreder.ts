import { baseUrl } from "@/lib/constants/config";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { OrderDto } from "./dto";

interface CreateOrderResponse {
  // Your response properties
  id: string;
  // ... other properties
}

// Define the options type
type CreateOrderOptions = Omit<
  UseMutationOptions<CreateOrderResponse, Error, OrderDto>,
  "mutationFn"
>;

export const useCreateOrder = (options?: CreateOrderOptions) => {
  return useMutation<CreateOrderResponse, Error, OrderDto>({
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
