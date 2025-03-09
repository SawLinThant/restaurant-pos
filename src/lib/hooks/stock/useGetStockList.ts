import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ApiError } from "@/lib/type/ApiErrorResponse";
import { baseUrl } from "@/lib/constants/config";

// Adjust this import path based on where your getStockList function is defined

interface StockResponse {
  id: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  threshold: number;
  createdDate: string;
  updatedDate: string;
}

interface StockListResponse
  extends BaseResponseSchema<{
    items: StockResponse[];
    total: number;
  }> {
  //   data: {
  //     stocks: StockResponse[];
  //     totalCounts: number;
  //   };
}

type StockListQueryOptions = Omit<
  UseQueryOptions<StockListResponse, AxiosError<ApiError>>,
  "queryKey" | "queryFn"
>;

interface PaginationParams {
  take: number;
  skip: number;
  ingredientName: string;
}

export const useGetStockList = (
  { take, skip, ingredientName }: PaginationParams,
  options?: StockListQueryOptions
) => {
  return useQuery<StockListResponse, AxiosError<ApiError>>({
    queryKey: ["StockList", take, skip, ingredientName],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/stock/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          take,
          skip,
          ingredientName,
        },
      });
      // console.log("response:",response.data)
      return response.data;
    },
    ...options,
  });
};
