import CustomTable from "@/components/common/customtable";
import { MENU_COLUMN } from "@/components/common/customtable/columns";
import Pagination from "@/components/common/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

interface menuType {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  createdDate: string;
  updateddDate: string;
}

const Menu = () => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [menuList, setmenuList] = useState<menuType[]>();
  const [loading,setLoading] = useState<boolean>(false);
  const [searchQuery,setSearchQuery] = useState(searchParams.get("name") || "")

  const itemPerpage = 10;
  const name = searchParams.get("name") || null;
  const skip = parseInt(searchParams.get("skip") || "0");
  const [totalItem, setTotalItem] = useState<number>();

  useEffect(() => {
    const fetchMenuList = async () => {
      try{
        setLoading(true)
        const respones = await axios.get(
          `${baseUrl}/Product/getproductListByName`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              skip,
              take: itemPerpage,
              name,
            },
          }
        );
        if (respones.status === 200) {
          if (respones.data) {
            setmenuList(respones.data?.data?.products);
            setTotalItem(respones.data?.data?.totalCounts);
          }
        }
      }catch(error){
        throw new Error("error fetching data")
      }finally{
        setLoading(false)
      }
   
    };
    fetchMenuList();
  }, [baseUrl, token, skip, name]);

  const handleSearch = (name: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (name) {
      newParams.set("name", name); // Use `name` parameter
    } else {
      newParams.delete("name");
    }
    newParams.set("skip", "0"); // Reset to the first page
    setSearchParams(newParams);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Menu</h2>
      </div>
      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-4 items-start justify-between mt-4">
        <div className="lg:w-1/3 md:w-2/3 w-full h-[3rem] relative lg:order-none md:order-none order-2">
          <input
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value); 
              handleSearch(value)}}
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>
        <div className="lg:min-w-[10rem] md:min-w-[10rem] w-full">
          <div className="flex flex-row justify-end gap-4 lg:order-none md:order-none order-1">
            <button
              onClick={() => navigate("createmenu")}
              className="bg-secondary text-white rounded-md min-h-12 hover:bg-white hover:text-black hover:border-black"
            >
              Add New
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto mt-4">
        <CustomTable loading={loading} column={MENU_COLUMN()} tableData={menuList || []} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          total_items={totalItem}
          itemPerpage={itemPerpage}
          queryParams={{ name }}
        />
      </div>
    </div>
  );
};
export default Menu;
