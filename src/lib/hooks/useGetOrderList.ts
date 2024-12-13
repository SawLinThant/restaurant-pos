import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants/config";
// Adjust this import path based on where your getOrderList function is defined

export const useGetOrderList = (options: any) => {
  return useQuery({
    queryKey: ["orderList"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/Product/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    ...options,
  });
};
