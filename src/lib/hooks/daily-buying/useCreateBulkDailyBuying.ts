import { baseUrl } from "@/lib/constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface CreateBulkDailyBuyingResponseDto extends BaseResponseSchema<string> {}

interface CreateBulkDailyBuyingRequestDto {
  DailyBuyings: {
    particular: string;
    unit: string;
    price: number;
    quantity: number;
    Amount: number;
  }[];
}

// Define the options type
type CreateBulkDailyBuyingOptions = Omit<
  UseMutationOptions<
    CreateBulkDailyBuyingResponseDto,
    Error,
    CreateBulkDailyBuyingRequestDto
  >,
  "mutationFn"
>;

export const useCreateBulkDailyBuying = (
  options?: CreateBulkDailyBuyingOptions
) => {
  return useMutation<
    CreateBulkDailyBuyingResponseDto,
    Error,
    CreateBulkDailyBuyingRequestDto
  >({
    mutationFn: async (orderData) => {
      console.log(orderData)
      const response = await axios.post<CreateBulkDailyBuyingResponseDto>(
        `${baseUrl}/DailyBuying/createMany`,
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
