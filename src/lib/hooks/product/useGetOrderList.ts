import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ApiError } from "@/lib/type/ApiErrorResponse";
import { baseUrl } from "@/lib/constants/config";
import { OrderResponse } from "@/lib/type/CommonType";

// Adjust this import path based on where your getOrderList function is defined

interface OrderListResponse
  extends BaseResponseSchema<{
    orders: OrderResponse["data"][];
    totalCounts: number;
  }> {
  data: {
    orders: OrderResponse["data"][];
    totalCounts: number;
    totalPrice: number;
  };
}

type OrderListQueryOptions = Omit<
  UseQueryOptions<OrderListResponse, AxiosError<ApiError>>,
  "queryKey" | "queryFn"
>;

interface PaginationParams {
  take: number;
  skip: number;
  startDate?: string;
  endDate?: string;
}

export const useGetOrderList = (
  { take, skip, startDate, endDate }: PaginationParams,
  options?: OrderListQueryOptions
) => {
  return useQuery<OrderListResponse, AxiosError<ApiError>>({
    queryKey: ["orderList", take, skip, startDate, endDate],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/Order/getList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          take,
          skip,
          startDate,
          endDate,
        },
      });
      // console.log("response:",response.data)
      return response.data;
    },
    ...options,
  });
};
