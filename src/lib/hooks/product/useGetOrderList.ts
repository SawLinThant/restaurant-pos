import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ApiError } from "@/lib/type/ApiErrorResponse";
import { baseUrl } from "@/lib/constants/config";
import { OrderResponse } from "@/lib/type/CommonType";

// Adjust this import path based on where your getOrderList function is defined

interface OrderListResponse
  extends BaseResponseSchema<{
    orders: OrderResponse['data'][];
    totalCounts: number;
  }> {
  data: {
    orders: OrderResponse['data'][];
    totalCounts: number;
  };
}

type OrderListQueryOptions = Omit<
  UseQueryOptions<OrderListResponse, AxiosError<ApiError>>,
  "queryKey" | "queryFn"
>;

interface PaginationParams {
  take: number;
  skip: number;
}

export const useGetOrderList = (
  { take, skip }: PaginationParams,
  options?: OrderListQueryOptions
) => {
  return useQuery<OrderListResponse, AxiosError<ApiError>>({
    queryKey: ["orderList", take, skip],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/Order/getList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          take,
          skip,
        },
      });
      // console.log("response:",response.data)
      return response.data;
    },
    ...options,
  });
};
