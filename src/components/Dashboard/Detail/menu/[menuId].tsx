import { baseUrl } from "@/lib/constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface menuDetail {
   name: string
   price: number
   category: string
   description: string
}

const MenuDetail = () => {
    const {menuId} = useParams();
    const token = localStorage.getItem("token");
    const [menuDetail,setMenuDetail] = useState<menuDetail>();
    console.log(menuId)
    useEffect(() => {
        const fetchData = async() => {
        const responses = await axios.get(`${baseUrl}/Product/get`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
               id: menuId
              },
        })
        if (responses.status === 200) {
            console.log(responses.data);
            setMenuDetail({
                name: responses.data?.data.name,
                price: responses.data?.data.price,
                category: responses.data?.data.category,
                description: responses.data?.data.description
            });
          }
        }
        fetchData();
    },[menuId])
    return(
        <div className="flex flex-col gap-4">
            <div>{menuDetail?.name}</div>
            <div>{menuDetail?.price}</div>
            <div>{menuDetail?.category}</div>
            <div>{menuDetail?.description}</div>
        </div>
    )
}
export default MenuDetail;