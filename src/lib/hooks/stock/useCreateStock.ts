import { baseUrl } from "@/lib/constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface CreateStockResponseDto extends BaseResponseSchema<string> {}
interface CreateStockRequestDto {
  ingredientName: string;
  quantity: number;
  unit: string;
  threshold: number;
}

// Define the options type
type CreateStockOptions = Omit<
  UseMutationOptions<CreateStockResponseDto, Error, CreateStockRequestDto>,
  "mutationFn"
>;

export const useCreateStock = (options?: CreateStockOptions) => {
  return useMutation<CreateStockResponseDto, Error, CreateStockRequestDto>({
    mutationFn: async (stockData) => {
      const response = await axios.post<CreateStockResponseDto>(
        `${baseUrl}/stock/create`,
        stockData,
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
