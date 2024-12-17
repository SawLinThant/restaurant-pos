import { baseUrl } from "@/lib/constants/config";
import { ApiError } from "@/lib/type/ApiErrorResponse";
import { UserResponse } from "@/lib/type/CommonType";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const useStaffDetail = (id: string) => {
  return useQuery<UserResponse, AxiosError<ApiError>>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosInstance.get<UserResponse>("/User/get", {
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
