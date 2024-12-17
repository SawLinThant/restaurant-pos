// import { baseUrl } from "@/lib/constants/config";
// import axios from "axios";
// import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";

// interface staffDetail {
//    name: string
//    price: number
//    category: string
//    description: string
// }

const StaffDetail = () => {
    const {staffId} = useParams();
    //const token = localStorage.getItem("token");
    
    return(
        <div className="flex flex-col gap-4">
            <div>{staffId}</div>
        </div>
    )
}
export default StaffDetail;