import CustomTable from "@/components/common/customtable";
import { STAFF_COLUMN } from "@/components/common/customtable/columns";
import Pagination from "@/components/common/pagination";
import { baseUrl, UserType } from "@/lib/constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

const Staff = () => {
  const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const token = localStorage.getItem("token");
    const [userList, setUserList] = useState<UserType[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const name = searchParams.get("name") || null;
    const [searchQuery,setSearchQuery] = useState(searchParams.get("name") || "")
    
    const itemPerpage = 10;
    const skip = parseInt(searchParams.get("skip") || "0");
    const [totalUser, setTotalUser] = useState<number>();

    useEffect(() => {
      const fetchMenuList = async () => {
        try{
          setLoading(true)
          const respones = await axios.get(
            `${baseUrl}/User/getUserList`,
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
              setUserList(respones.data?.data?.products);
              setTotalUser(respones.data?.data?.totalCounts);
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
        <h2 className="font-semibold text-2xl">Staff</h2>
      </div>
      <div className="w-full flex flex-row items-start justify-between mt-4">
        <div className="w-1/3 h-[3rem] relative">
          <input
            placeholder="Staff name"
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
        <div>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => navigate("createstaff")}
              className="bg-secondary text-white rounded-md min-h-12 hover:bg-white hover:text-black hover:border-black"
            >
              New Staff
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <CustomTable loading={loading} column={STAFF_COLUMN()} tableData={userList || []} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          total_items={totalUser}
          itemPerpage={itemPerpage}
          queryParams={{ name }}
        />
      </div>
    </div>
  );
};
export default Staff;
