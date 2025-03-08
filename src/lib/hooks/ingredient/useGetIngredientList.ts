import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../constants/config";
import { BaseResponseSchema } from "../../type/BaseresponseShcema";
import { ApiError } from "../../type/ApiErrorResponse";
import { PaginationParams } from "../../type/CommonType";

// Define the ingredient interface
export interface Ingredient {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string;
}

// Define the API response type
interface IngredientListResponse
  extends BaseResponseSchema<{
    ingredients: Ingredient[];
    totalCount: number;
  }> {
  data: {
    ingredients: Ingredient[];
    totalCount: number;
  };
}

// Define options type
type IngredientListQueryOptions = Omit<
  UseQueryOptions<IngredientListResponse, AxiosError<ApiError>>,
  "queryKey" | "queryFn"
>;

export const useGetIngredientList = (
  { take, skip }: PaginationParams,
  options?: IngredientListQueryOptions
) => {
  return useQuery<IngredientListResponse, AxiosError<ApiError>>({
    queryKey: ["ingredients", { take, skip }],
    queryFn: async () => {
      try {
        const response = await axios.get<IngredientListResponse>(
          `${baseUrl}/Ingredient/getList`,
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
