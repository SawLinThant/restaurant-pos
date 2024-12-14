import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../constants/config";
import { BaseResponseSchema } from "../../type/BaseresponseShcema";
import { ApiError } from "../../type/ApiErrorResponse";
import { PaginationParams } from "../../type/CommonType";

// Define the product interface
export interface Product {
  id: string;
  name: string;
  category: string;
  createdDate: string;
  description: string;
  image: string;
  price: number;
  updatedDate: string;
  userId: string;
}

// Define the API response type
interface ProductListResponse
  extends BaseResponseSchema<{
    products: Product[];
    totalCount: number;
  }> {
  data: {
    products: Product[];
    totalCount: number;
  };
  // ... other response properties if any
}

// Define options type
type ProductListQueryOptions = Omit<
  UseQueryOptions<ProductListResponse, AxiosError<ApiError>>,
  "queryKey" | "queryFn"
>;

export const useGetProductList = (
  { take, skip }: PaginationParams,
  options?: ProductListQueryOptions
) => {
  return useQuery<ProductListResponse, AxiosError<ApiError>>({
    queryKey: ["products", { take, skip }], // Consistent naming convention
    queryFn: async () => {
      try {
        const response = await axios.get<ProductListResponse>(
          `${baseUrl}/Product/getProductListByName`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              take: take,
              skip: skip,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error;
        }
        throw new Error("An unexpected error occurred");
      }
    },
    // Default options
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
    refetchOnWindowFocus: false, // Refetch when window regains focus
    retry: 2, // Retry failed requests twice
    ...options, // Allow overriding default options
  });
};
