import CustomTable from "@/components/common/customtable";
import { ORDER_COLUMN } from "@/components/common/customtable/columns";
import { CiSearch } from "react-icons/ci";

const dummyData = [
  {
    id: "1",
    name: "Order-1",
    created_at: "29/11/2024",
    price: 30000,
  },
  {
    id: "2",
    name: "Order-2",
    created_at: "29/11/2024",
    price: 24000,
  },
  {
    id: "3",
    name: "Order-3",
    created_at: "29/11/2024",
    price: 60000,
  },
  {
    id: "4",
    name: "Order-4",
    created_at: "29/11/2024",
    price: 10000,
  },
  {
    id: "5",
    name: "Order-5",
    created_at: "29/11/2024",
    price: 54000,
  },
];

const Overview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Overview</h2>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="w-full pr-3 py-3">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full min-h-44 rounded-md border-2 shadow-md flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-xl">130000</h2>
                <h2 className="text-lg text-muted-foreground">Profit</h2>
              </div>
            </div>
            <div className="w-full min-h-44 rounded-md border-2 shadow-md flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-xl">100</h2>
                <h2 className="text-lg text-muted-foreground">Order</h2>
              </div>
            </div>
            <div className="w-full min-h-44 rounded-md border-2 shadow-md flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-xl">7000</h2>
                <h2 className="text-lg text-muted-foreground">Sales</h2>
              </div>
            </div>
            <div className="w-full min-h-44 rounded-md border-2 shadow-md flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-xl">8710000</h2>
                <h2 className="text-lg text-muted-foreground">Purchase</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-3">
          <div className="w-full h-full rounded-md border-2 shadow-md"></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-start mt-8">
        <h2 className="font-semibold text-2xl">Daily Order Lists</h2>
      </div>
      <div className="w-full flex flex-row items-center justify-between mt-4">
        <div className="w-1/3 h-[3rem] relative">
          <input
            placeholder="Order ID"
            type="text"
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full">
        <CustomTable column={ORDER_COLUMN()} tableData={dummyData} />
      </div>
    </div>
  );
};
export default Overview;
