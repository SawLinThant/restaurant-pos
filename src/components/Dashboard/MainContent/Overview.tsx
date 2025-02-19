// import CustomTable from "@/components/common/customtable";
// import { ORDER_COLUMN } from "@/components/common/customtable/columns";
// import Pagination from "@/components/common/pagination";
import Chart from "@/components/common/chart";
import { ProductChart } from "@/components/common/product-chart";
// import { baseUrl } from "@/lib/constants/config";
// import axios from "axios";
// import { endOfDay, startOfDay } from "date-fns";
// import { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { useSearchParams } from "react-router-dom";



// interface orderType {
//   id: string;
//   userId: string;
//   status: string;
//   createdDate: string;
//   updatedDate: string;
//   table: string;
// }

const Overview = () => {
  // const [orderList, setorderList] = useState<orderType[]>();
  // const [searchParams] = useSearchParams();
  // const token = localStorage.getItem("token");
  // const [loading, setLoading] = useState<boolean>(false);
  // const [startDate] = useState<Date>(startOfDay(new Date()));
  // const [endDate] = useState<Date>(endOfDay(new Date()));
  // const itemPerpage = 10;
  // const skip = parseInt(searchParams.get("skip") || "0");
  // const [totalItem, setTotalItem] = useState<number>();

  // useEffect(() => {
  //   const fetchorderList = async () => {
  //     try {
  //       setLoading(true);
  //       const formattedStartDate = startDate ? startOfDay(startDate) : undefined;
  //       const formattedEndDate = endDate ? endOfDay(endDate) : undefined;
  //       const respones = await axios.get(`${baseUrl}/Order/getList`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           skip,
  //           take: itemPerpage,
  //           startDate: formattedStartDate?.toISOString(),
  //           endDate: formattedEndDate?.toISOString(),
  //         },
  //       });
  //       if (respones.status === 200) {
  //         if (respones.data) {
  //           setorderList(respones.data?.data?.orders);
  //           setTotalItem(respones.data?.data?.totalCounts);
  //         }
  //       }
  //     } catch (error) {
  //       throw new Error("error fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchorderList();
  // }, [baseUrl, token, skip, startDate, endDate]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Overview</h2>
      </div>
      <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full pr-3 py-3">
          <div className="w-full h-full grid grid-cols-2 gap-4">
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
        <div className="w-full p-3 md:ps-0">
          <div className="w-full h-full rounded-md shadow-md"><ProductChart/></div>
        </div>
      </div>
      <div className="w-full p-3 md:ps-0">
          <div className="w-3/5 h-full rounded-md border-2 shadow-md"><Chart /></div>
        </div>
      {/* <div className="w-full flex items-center justify-start mt-8">
        <h2 className="font-semibold text-2xl">Daily Order Lists</h2>
      </div> */}
      {/* <div className="w-full flex flex-row items-center justify-between mt-4">
        <div className="lg:w-1/3 md:w-2/3 w-full h-[3rem] relative">
          <input
            placeholder="Order ID"
            type="text"
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600 bg-white"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full min-h-36 overflow-auto">
        <CustomTable loading={loading} column={ORDER_COLUMN()} tableData={orderList || []} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          total_items={totalItem}
          itemPerpage={itemPerpage}
          queryParams={{ startDate, endDate }}
        />
      </div> */}
    </div>
  );
};
export default Overview;
