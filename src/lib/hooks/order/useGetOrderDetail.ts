import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { OrderResponse } from "../../type/CommonType";
import { ApiError } from "../../type/ApiErrorResponse";
import { baseUrl } from "../../constants/config";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

export const useGetOrderDetail = (id: string) => {
  return useQuery<OrderResponse, AxiosError<ApiError>>({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axiosInstance.get<OrderResponse>("/Order/get", {
        params: { id },
      });
      return response.data;
    },
    staleTime: 0, 
    cacheTime: 15 * 60 * 1000, 
    retry: 1, 
    refetchOnWindowFocus: true,
  });
};
