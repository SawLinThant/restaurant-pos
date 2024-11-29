import CustomTable from "@/components/common/customtable";
import { ORDER_COLUMN } from "@/components/common/customtable/columns";

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
    return(
        <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-start">
                <h2 className="font-semibold text-2xl">Staff</h2>
            </div>
            <div className="w-full">
                <CustomTable column={ORDER_COLUMN()} tableData={dummyData}/>
            </div>
        </div>
    )
}
export default Staff;