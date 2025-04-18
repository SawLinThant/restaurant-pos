import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { OrderDto } from "./dto";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/lib/constants/config";

interface UpdateOrderItemResponse {
  id: string;
  message?: string;
  success: boolean;
}

interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

type UpdateOrderItemOptions = Omit<
  UseMutationOptions<
    UpdateOrderItemResponse,
    AxiosError<ApiErrorResponse>,
    { payload: OrderDto; params: { id: string } }
  >,
  "mutationFn"
>;

export const useUpdateOrderItem = (options?: UpdateOrderItemOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateOrderItemResponse,
    AxiosError<ApiErrorResponse>,
    { payload: OrderDto; params: { id: string } }
  >({
    mutationFn: async (orderData) => {
      try {
        const response = await axios.put<UpdateOrderItemResponse>(
          `${baseUrl}/Order/updateOrderItems`,
          orderData.payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: { id: orderData.params.id },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating order items:", error);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      console.log("Order items updated successfully");

      // Invalidate the query to refresh data
      queryClient.invalidateQueries({
        queryKey: ["order", variables.params.id],
      });

      // Call the original onSuccess if provided
      options?.onSuccess && options.onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to update order items:", error);

      // Extract error message or provide a default
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred while updating order items";

      // Call the error handler from options
      options?.onError && options.onError(error, variables, context);
    },
  });
};
