import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useGetDailyBuyingList } from "@/lib/hooks/daily-buying/useGetDailyBuyingList";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyBuying {
  Id: string;
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
  createdDate: string;
  updatedDate: string;
}

interface SupplyTableProps {
  data?: DailyBuying[];
  itemsPerPage?: number;
  particularFilter?: string;
  date?: string;
}

const SupplyTable: React.FC<SupplyTableProps> = ({
  data: initialData,
  itemsPerPage = 10,
  particularFilter,
  date,
}) => {
  const [page, setPage] = useState(1);

  // Create stable query parameters object
  const queryParams = useMemo(
    () => ({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      particular: particularFilter,
      date: date,
    }),
    [page, itemsPerPage, particularFilter, date]
  );

  // Configure query with proper caching strategy
  const {
    data: fetchedData,
    isLoading,
    error,
  } = useGetDailyBuyingList(queryParams, {
    enabled: !initialData,
    keepPreviousData: true, // Keep showing previous data while fetching new data
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Memoize derived data to prevent recalculations
  const data = useMemo(
    () => initialData || fetchedData?.data?.DailyBuyings || [],
    [initialData, fetchedData?.data?.DailyBuyings]
  );

  const totalCount = useMemo(
    () => fetchedData?.data?.totalCounts || initialData?.length || 0,
    [fetchedData?.data?.totalCounts, initialData?.length]
  );

  const totalPrice = useMemo(
    () => fetchedData?.data?.totalPrice || 0,
    [fetchedData?.data?.totalPrice]
  );

  const totalPages = useMemo(
    () => Math.ceil(totalCount / itemsPerPage),
    [totalCount, itemsPerPage]
  );

  // Create stable event handlers
  const handlePrevPage = useCallback(
    () => setPage((prev) => Math.max(prev - 1, 1)),
    []
  );

  const handleNextPage = useCallback(
    () => setPage((prev) => Math.min(prev + 1, totalPages)),
    [totalPages]
  );

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-x-2">
        <span className="text-[1.2rem] text-black font-semibold">{`Total:`}</span>
        <span className="text-[1rem] text-black font-[500]">{totalPrice}</span>
      </div>
      <div className="rounded-t-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary text-white font-semibold hover:bg-secondary">
              <TableHead className="w-12 border text-white border-[#009258] text-center py-4">
                No
              </TableHead>
              <TableHead className="w-[17rem] border text-white border-[#009258] border-l-0 text-center">
                Particular
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Unit
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Qty
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Price
              </TableHead>
              <TableHead className="border text-white border-[#009258] text-center">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div className="overflow-y-auto h-[200px] relative scrollbar-none">
        <Table>
          <TableBody>
            {!isLoading &&
              data.map((item, index) => (
                <TableRow
                  key={item.Id}
                  className="text-center [&:nth-child(1)]:border-t-0"
                >
                  <TableCell className="w-12 p-2 border">
                    {(page - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="w-[17rem] border">
                    {item.particular}
                  </TableCell>
                  <TableCell className="border">{item.unit}</TableCell>
                  <TableCell className="border">{item.quantity}</TableCell>
                  <TableCell className="border">
                    {item.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="border">
                    {item.Amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {isLoading && (
            <TableBody>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <TableRow
                    key={index}
                    className="text-center [&:nth-child(1)]:border-t-0"
                  >
                    <TableCell className="w-12 p-2 border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                    <TableCell className="w-[17rem] border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                    <TableCell className="border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                    <TableCell className="border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                    <TableCell className="border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                    <TableCell className="border">
                      <Skeleton className="w-full h-[20px] rounded-none bg-gray-100" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </div>
      {!isLoading && data.length < 1 && (
        <div className="flex w-full items-center justify-center py-4 border-x border-b">
          <span className="text-gray-500">No supply data available</span>
        </div>
      )}

      {totalCount > 0 && (
        <div className="flex items-center justify-center mt-4">
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={page === 1}
              className="min-w-[80px]"
            >
              Previous
            </Button>
            <span className="flex items-center text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
              className="min-w-[80px]"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(SupplyTable);
