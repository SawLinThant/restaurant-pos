import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/lib/constants/config";

interface UpdateOrderPayload {
  status: string;
}

interface UpdateOrderParams {
  id: string;
}

interface UpdateOrderResponse {
  result: string;
}

interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

type UpdateOrderOptions = Omit<
  UseMutationOptions<
    UpdateOrderResponse,
    AxiosError<ApiErrorResponse>,
    { payload: UpdateOrderPayload; params: UpdateOrderParams }
  >,
  "mutationFn"
>;

export const useUpdateOrder = (options?: UpdateOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateOrderResponse,
    AxiosError<ApiErrorResponse>,
    { payload: UpdateOrderPayload; params: UpdateOrderParams }
  >({
    mutationFn: async ({ payload, params }) => {
      try {
        const response = await axios.put<UpdateOrderResponse>(
          `${baseUrl}/Order/update`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: { id: params.id },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      console.log("Order status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["order", variables.params.id],
      });

      options?.onSuccess && options.onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to update order status:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred while updating order status";

      options?.onError && options.onError(error, variables, context);
    },
  });
};
