import { DatePicker } from "@/components/common/custom-datepicker";
import CustomTable from "@/components/common/customtable";
import { ORDER_COLUMN } from "@/components/common/customtable/columns";
import Pagination from "@/components/common/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

interface orderType {
  Id: string;
  userId: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  table: string;
}

const OrderList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [orderList, setorderList] = useState<orderType[]>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("name") || ""
  );

  const itemPerpage = 10;
  //const name = searchParams.get("name") || null;
  const skip = parseInt(searchParams.get("skip") || "0");
  const [totalItem, setTotalItem] = useState<number>();

  useEffect(() => {
    const fetchorderList = async () => {
      try {
        setLoading(true);
        const respones = await axios.get(`${baseUrl}/Order/getList`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            skip,
            take: itemPerpage,
            startDate,
            endDate
          },
        });
        if (respones.status === 200) {
          if (respones.data) {
            setorderList(respones.data?.data?.orders);
            setTotalItem(respones.data?.data?.totalCounts);
          }
        }
      } catch (error) {
        throw new Error("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchorderList();
  }, [baseUrl, token, skip, startDate, endDate]);

  const handleSearch = (name: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (name) {
      newParams.set("name", name);
    } else {
      newParams.delete("name");
    }
    newParams.set("skip", "0");
    setSearchParams(newParams);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">order</h2>
      </div>
      <div className="w-full flex flex-row items-start justify-between mt-4">
        <div className="w-1/3 h-[3rem] relative">
          <input
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              handleSearch(value);
            }}
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-4">
            <div className="w-[12rem]">
              <DatePicker label="Start Date" setSelectedDate={setStartDate}/>
            </div>
            <div className="w-[12rem]">
              <DatePicker label="End Date" setSelectedDate={setEndDate}/>
            </div>

            {/* <button
              onClick={() => navigate("createorder")}
              className="bg-secondary text-white rounded-md min-h-12 hover:bg-white hover:text-black hover:border-black"
            >
              Add New +
            </button> */}
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <CustomTable
          loading={loading}
          column={ORDER_COLUMN()}
          tableData={orderList || []}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          total_items={totalItem}
          itemPerpage={itemPerpage}
          queryParams={{ startDate,endDate }}
        />
      </div>
    </div>
  );
};
export default OrderList;
