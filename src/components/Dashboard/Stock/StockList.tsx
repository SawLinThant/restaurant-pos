import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
// import { Loader2 } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { useGetStockList } from "@/lib/hooks/stock/useGetStockList";
import CustomTable from "@/components/common/customtable";
import Pagination from "@/components/common/pagination";
import { DatePicker } from "@/components/common/custom-datepicker";

// Define the stock column helper
const columnHelper = createColumnHelper();

// Define the stock columns
export const STOCK_COLUMN = () => [
  columnHelper.accessor("ingredientName", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Ingredient Name</span>,
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Quantity</span>,
  }),
  columnHelper.accessor("unit", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Unit</span>,
  }),
  columnHelper.accessor("threshold", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Threshold</span>,
  }),
  columnHelper.accessor("createdDate", {
    cell: (info) => {
      const date = new Date(info.getValue());
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      return <span>{formattedDate}</span>;
    },
    header: () => <span className="">Created At</span>,
  }),
  columnHelper.accessor("updatedDate", {
    cell: (info) => {
      const date = new Date(info.getValue());
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      return <span>{formattedDate}</span>;
    },
    header: () => <span className="">Updated At</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      const navigate = useNavigate();
      return (
        <button
          className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
          onClick={() => {
            navigate(`/dashboard/stock/${info.getValue()}`);
          }}
        >
          <p>Detail</p>
          <FaRegEdit />
        </button>
      );
    },
    header: () => <span className="column-head"></span>,
  }),
];

function StockList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State management
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("name") || ""
  );

  // Pagination parameters
  const itemsPerPage = 10;
  const skip = parseInt(searchParams.get("skip") || "0");
  const [totalItems, setTotalItems] = useState<number>(0);

  // Fetch stock data using the hook
  const { data, isLoading, error, refetch } = useGetStockList(
    { take: itemsPerPage, skip, ingredientName: searchQuery },
    {
      onSuccess: (data) => {
        if (data?.data?.total) {
          setTotalItems(data.data.total);
        }
      },
    }
  );
  console.log(data);

  // Effect to refetch data when search params change
  useEffect(() => {
    refetch();
  }, [skip, startDate, endDate, searchQuery, refetch]);

  // Handle search functionality
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

  // Handle error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 flex flex-col items-center">
          <p className="text-xl font-semibold">Error loading stock data</p>
          <p>{error.message || "An unknown error occurred"}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Stock Inventory</h2>
      </div>

      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-3 items-start justify-between mt-4">
        {/* Search input */}
        <div className="lg:w-1/3 md:w-2/3 w-full h-[3rem] relative">
          <input
            placeholder="Search ingredients"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              handleSearch(value);
            }}
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600 dark:bg-white bg-white"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>

        {/* Date filters and action buttons */}
        <div className="w-full">
          <div className="flex w-full lg:flex-row lg:justify-end md:flex-row md:justify-end flex-col gap-4">
            <div className="lg:w-[12rem] md:w-[10rem] w-full">
              <DatePicker label="Start Date" setSelectedDate={setStartDate} />
            </div>
            <div className="lg:w-[12rem] md:w-[10rem] w-full">
              <DatePicker label="End Date" setSelectedDate={setEndDate} />
            </div>

            <button
              onClick={() => navigate("/dashboard/stock")}
              className="bg-secondary text-white rounded-md min-h-12 px-4 hover:bg-white hover:text-black hover:border-black transition-colors"
            >
              Add New +
            </button>
          </div>
        </div>
      </div>

      {/* Stock table */}
      <div className="w-full overflow-auto mt-4">
        <CustomTable
          loading={isLoading}
          column={STOCK_COLUMN()}
          tableData={data?.data?.items || []}
        />
      </div>

      {/* Pagination */}
      <div className="w-full flex items-center justify-center">
        <Pagination
          total_items={totalItems}
          itemPerpage={itemsPerPage}
          queryParams={{ startDate, endDate }}
        />
      </div>
    </div>
  );
}

export default StockList;
