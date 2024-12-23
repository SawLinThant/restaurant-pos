import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { OrderDto } from "./dto";
import axios from "axios";
import { baseUrl } from "@/lib/constants/config";

interface UpdateOrderItemResponse {
  //TODO: implement order Item update response here
  id: string;
}

type UpdateOrderItemOptions = Omit<
  UseMutationOptions<UpdateOrderItemResponse, Error, 
  { payload: OrderDto; params: { id: string } }
  >,
  "mutationFn"
>;

export const useUpdateOrderItem = (options?: UpdateOrderItemOptions) => {
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await axios.post<UpdateOrderItemResponse>(
        `${baseUrl}/Order/updateOrderItem`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    ...options,
  });
};
