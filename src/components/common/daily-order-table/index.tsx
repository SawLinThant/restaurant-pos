import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";
import { useGetOrderList } from "@/lib/hooks/product/useGetOrderList";
import { OrderResponse } from "@/lib/type/CommonType";

// interface DailyBuying {
//   Id: string;
//   particular: string;
//   unit: string;
//   price: number;
//   quantity: number;
//   Amount: number;
//   createdDate: string;
//   updatedDate: string;
// }

interface DailyOrderTableProps {
  data?: OrderResponse["data"][];
  itemsPerPage?: number;
}

const DailyOrderTable: React.FC<DailyOrderTableProps> = ({
  data: initialData,
  itemsPerPage = 10,
}) => {
  const [page, setPage] = useState(1);

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useGetOrderList(
    {
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      // particular: particularFilter,
    },
    {
      enabled: !initialData,
    }
  );

  const data = initialData || fetchedData?.data?.orders || [];
  const totalCount = fetchedData?.data?.totalCounts || initialData?.length || 0;
  // const totalAmount = data.reduce((sum, item) => sum + item.Amount, 0);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  console.log(fetchedData);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col ">
      <div className="overflow-y-auto h-[280px] relative scrollbar-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary text-white font-semibold hover:bg-secondary">
              <TableHead className="w-12 border text-white border-[#009258] text-center py-4">
                No
              </TableHead>
              <TableHead className="w-[17rem] border text-white border-[#009258] border-l-0 text-center">
                Order Id
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Status
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Table
              </TableHead>
              <TableHead className="border-y border-r text-white border-[#009258] text-center">
                Created Date
              </TableHead>
              <TableHead className="border text-white border-[#009258] text-center">
                Updated Date
              </TableHead>
            </TableRow>
          </TableHeader>
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
                  <TableCell className="w-[17rem] border">{item.Id}</TableCell>
                  <TableCell className="border">{item.status}</TableCell>
                  <TableCell className="border">{item.table}</TableCell>
                  <TableCell className="border">{item.createdDate}</TableCell>
                  <TableCell className="border">{item.updatedDate}</TableCell>
                </TableRow>
              ))}

            {/* <TableRow className="text-center">
            <TableCell className="w-12 p-2" />
            <TableCell className="w-[17rem]" />
            <TableCell />
            <TableCell />
            <TableCell className="border-b py-4 font-bold">Total</TableCell>
            <TableCell className="border-x border-b font-bold text-[#009258]">
              {totalAmount.toLocaleString()}
            </TableCell>
          </TableRow> */}
          </TableBody>
        </Table>
      </div>

      {isLoading && (
        <div className="flex w-full items-center justify-center">
          {" "}
          <Loader className="animate-spin" />
        </div>
      )}
      {!isLoading && data.length < 1 && (
        <div className="flex w-full items-center justify-center">
          {" "}
          <Loader className="animate-spin" />
        </div>
      )}
      {/* Pagination Controls */}
      {totalCount > 0 && (
        <div className="flex items-center justify-center">
          {/* <div>
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, totalCount)} of {totalCount} entries
          </div> */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="min-w-[80px]"
            >
              Previous
            </Button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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

export default DailyOrderTable;
