import SelectTable, { TableProps } from "@/components/Order/SelectTable";
import OrderCard from "@/components/Order/TableCard";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/lib/constants/config";
import { OrderResponse } from "@/lib/type/CommonType";
import { BaseResponseSchema } from "@/lib/type/BaseresponseShcema";

const tableList: TableProps[] = [
  { id: "1", isSelected: false },
  { id: "2", isSelected: false },
  { id: "3", isSelected: false },
  { id: "4", isSelected: false },
];

const PAGE_SIZE = 10;

// Define the response type for type safety
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

function TableList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedTable, setSelectedTable] = useState<TableProps | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // Using useInfiniteQuery instead of useQuery for pagination
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<OrderListResponse>({
      queryKey: ["orderList-infinite"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await axios.get(`${baseUrl}/Order/getList`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            take: PAGE_SIZE,
            skip: pageParam * PAGE_SIZE,
          },
        });
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = Math.ceil(lastPage.data.totalCounts / PAGE_SIZE);
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
      },
    });

  // Use useEffect for the infinite scroll logic
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages data into a single array of orders
  const orders = data?.pages.flatMap((page) => page.data.orders) || [];

  return (
    <div className="flex w-full flex-col gap-[20px] px-[30px] py-[20px] h-[90dvh] overflow-y-auto overflow-x-hidden">
      {isLoading && !orders.length && (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader2 className="animate-spin" size={30} /> Loading
        </div>
      )}

      {orders.map((order, index) => (
        <OrderCard
          table={order.table || ""}
          orderId={order.Id || ""}
          key={`${order.Id}-${index}`}
          status={order.status || ""}
          totalItems={order.orderItems ? order.orderItems.length : 0}
        />
      ))}

      {/* Loading indicator at the bottom when fetching more data */}
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={ref} className="w-full py-4 flex items-center justify-center">
          {isFetchingNextPage && (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Loading more...
            </>
          )}
        </div>
      )}

      {/* No more orders indicator */}
      {!hasNextPage && orders.length > 0 && (
        <div className="w-full py-4 text-center text-gray-500">
          No more orders to load
        </div>
      )}

      <div className="fixed right-[30px] bottom-[40%] w-[60px] h-[60px]">
        <SelectTable
          setSelectedTable={setSelectedTable}
          tableList={tableList}
        />
      </div>
    </div>
  );
}

export default TableList;
