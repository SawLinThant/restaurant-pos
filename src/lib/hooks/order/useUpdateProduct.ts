import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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

type UpdateOrderOptions = Omit<
  UseMutationOptions<
    UpdateOrderResponse,
    Error,
    { payload: UpdateOrderPayload; params: UpdateOrderParams }
  >,
  "mutationFn"
>;

export const useUpdateOrder = (options?: UpdateOrderOptions) => {
  const queryClient = useQueryClient(); 

  return useMutation<
    UpdateOrderResponse,
    Error,
    { payload: UpdateOrderPayload; params: UpdateOrderParams }
  >({
    mutationFn: async ({ payload, params }) => {
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
    },
    onSuccess: (data, variables, context) => {
      console.log("Order status updated successfully");
    
      queryClient.invalidateQueries({
        queryKey: ["order", variables.params.id],
      });
    
      options?.onSuccess && options.onSuccess(data, variables, context);
    },
    onError: options?.onError,
  });
};
