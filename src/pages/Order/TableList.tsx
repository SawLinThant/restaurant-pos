import SelectTable, { TableProps } from "@/components/Order/SelectTable";
import OrderCard from "@/components/Order/TableCard";
import { useGetOrderList } from "@/lib/hooks/product/useGetOrderList";

import { useState } from "react";

const tableList: TableProps[] = [
  { id: "1", isSelected: false },
  { id: "2", isSelected: false },
  { id: "3", isSelected: false },
  { id: "4", isSelected: false },
];

function TableList() {
  const { data: orderList, isLoading } = useGetOrderList({ take: 10, skip: 0 });
  console.log("orderList:", orderList?.data?.orders);
//   console.log("order sample id:", orderList?.data.orders[0].Id);
  const [selectedTable, setSelectedTable] = useState<TableProps | null>(null);
  console.log(selectedTable)
  return (
    <div className="flex w-full flex-col gap-[20px] px-[30px] py-[20px] h-[90dvh] overflow-y-auto overflow-x-hidden">
      {!isLoading && orderList?.data.orders.map((order) => (
        <OrderCard table={order.table} orderId={order.Id} key={order.Id+Date.now().toString()} status={order.status}/>
      ))}
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
