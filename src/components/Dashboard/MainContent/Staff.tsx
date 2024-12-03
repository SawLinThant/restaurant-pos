import CustomTable from "@/components/common/customtable";
import { ORDER_COLUMN } from "@/components/common/customtable/columns";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const dummyData = [
    {
        id: "1",
        name: "Order-1",
        created_at: "29/11/2024",
        price: 30000
    },
    {
        id: "2",
        name: "Order-2",
        created_at: "29/11/2024",
        price: 24000
    },
    {
        id: "3",
        name: "Order-3",
        created_at: "29/11/2024",
        price: 60000
    },
    {
        id: "4",
        name: "Order-4",
        created_at: "29/11/2024",
        price: 10000
    },
    {
        id: "5",
        name: "Order-5",
        created_at: "29/11/2024",
        price: 54000
    },
]

const Staff = () => {
    const navigate = useNavigate()
    return(
        <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-start">
                <h2 className="font-semibold text-2xl">Staff</h2>
            </div>
            <div className="w-full flex flex-row items-start justify-between mt-4">
        <div className="w-1/3 h-[3rem] relative">
          <input
            placeholder="Staff name"
            type="text"
            className="w-full h-full px-4 pl-10 rounded-md border border-gray-600"
          />
          <div className="absolute left-2 top-3 z-10">
            <CiSearch size={25} />
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-4">
            <button onClick={() => navigate("createstaff")} className="bg-secondary text-white rounded-md min-h-12 hover:bg-white hover:text-black hover:border-black">New Staff</button>
          </div>
        </div>
      </div>
            <div className="w-full">
                <CustomTable column={ORDER_COLUMN()} tableData={dummyData}/>
            </div>
        </div>
    )
}
export default Staff;