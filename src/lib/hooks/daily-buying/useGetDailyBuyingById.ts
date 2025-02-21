import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ApiError } from "../../type/ApiErrorResponse";
import { baseUrl } from "../../constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

interface GetDailyBuyingByIdResponseDto
  extends BaseResponseSchema<{
    Id: string;
    particular: string;
    unit: string;
    price: number;
    quantity: number;
    Amount: number;
    createdDate: string;
    updatedDate: string;
  }> {}

type GetDailyBuyingByIdOptions = Omit<
  UseQueryOptions<GetDailyBuyingByIdResponseDto, AxiosError<ApiError>>,
  "queryFn"
>;

export const useGetDailyBuyingById = (
  id: string,
  options?: Partial<GetDailyBuyingByIdOptions>
) => {
  return useQuery<GetDailyBuyingByIdResponseDto, AxiosError<ApiError>>({
    queryKey: ["get-daily-buying-by-id", id],
    queryFn: async () => {
      const response = await axiosInstance.get<GetDailyBuyingByIdResponseDto>(
        "/DailyBuying/get",
        {
          params: { id },
        }
      );
      return response.data;
    },
    ...options,
  });
};
