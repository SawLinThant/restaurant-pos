import { baseUrl } from "@/lib/constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface staffDetail {
   name: string
   price: number
   category: string
   description: string
}

const StaffDetail = () => {
    const {staffId} = useParams();
    const token = localStorage.getItem("token");
    const [staffDetail,setStaffDetail] = useState<staffDetail>();
    console.log(staffId)
    useEffect(() => {
        const fetchData = async() => {
        const responses = await axios.get(`${baseUrl}/Product/get`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
               id: staffId
              },
        })
        if (responses.status === 200) {
            console.log(responses.data);
            setStaffDetail({
                name: responses.data?.data.name,
                price: responses.data?.data.price,
                category: responses.data?.data.category,
                description: responses.data?.data.description
            });
          }
        }
        fetchData();
    },[staffId])
    return(
        <div className="flex flex-col gap-4">
            <div>{staffDetail?.name}</div>
            <div>{staffDetail?.price}</div>
            <div>{staffDetail?.category}</div>
            <div>{staffDetail?.description}</div>
        </div>
    )
}
export default StaffDetail;