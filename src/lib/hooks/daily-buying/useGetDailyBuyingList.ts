import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ApiError } from "../../type/ApiErrorResponse";
import { baseUrl } from "../../constants/config";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { PaginationParams } from "@/lib/type/CommonType";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export interface DailyBuying {
  Id: string;
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
  createdDate: string;
  updatedDate: string;
}

interface GetDailyBuyingListResponseDto
  extends BaseResponseSchema<{
    DailyBuyings: DailyBuying[];
    totalCounts: number;
    totalPrice: number;
  }> {}

type GetDailyBuyingListOptions = Omit<
  UseQueryOptions<GetDailyBuyingListResponseDto, AxiosError<ApiError>>,
  "queryFn"
>;

export const useGetDailyBuyingList = (
  params: {
    particular?: string;
    date?: string; // YYYY-MM-DD
  } & PaginationParams,
  options?: Partial<GetDailyBuyingListOptions>
) => {
  return useQuery<GetDailyBuyingListResponseDto, AxiosError<ApiError>>({
    queryKey: ["get-daily-buying-list", params],
    queryFn: async () => {
      const response = await axiosInstance.get<GetDailyBuyingListResponseDto>(
        "/DailyBuying/getDailyBuyingListByName",
        {
          params: { ...params },
        }
      );
      return response.data;
    },
    ...options,
  });
};
