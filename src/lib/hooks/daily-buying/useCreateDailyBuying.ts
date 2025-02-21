import { baseUrl } from "@/lib/constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface CreateDailyBuyingResponseDto extends BaseResponseSchema<string> {}
interface CreateDailyBuyingRequestDto {
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
}

// Define the options type
type CreateDailyBuyingOptions = Omit<
  UseMutationOptions<
    CreateDailyBuyingRequestDto,
    Error,
    CreateDailyBuyingResponseDto
  >,
  "mutationFn"
>;

export const useCreateDailyBuying = (options?: CreateDailyBuyingOptions) => {
  return useMutation<
    CreateDailyBuyingRequestDto,
    Error,
    CreateDailyBuyingResponseDto
  >({
    mutationFn: async (orderData) => {
      const response = await axios.post<CreateDailyBuyingRequestDto>(
        `${baseUrl}/DailyBuying/create`,
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
