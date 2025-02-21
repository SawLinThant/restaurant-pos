import { baseUrl } from "@/lib/constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface UpdateDailyBuyingRequestDtoResponseDto
  extends BaseResponseSchema<{
    Id: string;
    particular: string;
    unit: string;
    price: number;
    quantity: number;
    Amount: number;
    createdDate: string;
    updatedDate: string;
  }> {
  Id: string;
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
  createdDate: string;
  updatedDate: string;
}
interface UpdateDailyBuyingRequestDto {
  id: string;
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
}

// Define the options type
type UpdateDailyBuyingOptions = Omit<
  UseMutationOptions<
    UpdateDailyBuyingRequestDto,
    Error,
    UpdateDailyBuyingRequestDtoResponseDto
  >,
  "mutationFn"
>;

export const useUpdateDailyBuying = (options?: UpdateDailyBuyingOptions) => {
  return useMutation<
    UpdateDailyBuyingRequestDto,
    Error,
    UpdateDailyBuyingRequestDtoResponseDto
  >({
    mutationFn: async (orderData) => {
      const { Id, ...rest } = orderData;
      const response = await axios.put<UpdateDailyBuyingRequestDto>(
        `${baseUrl}/DailyBuying/create`,
        rest,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            id: Id,
          },
        }
      );
      return response.data;
    },
    ...options, // Spread the provided options
  });
};
