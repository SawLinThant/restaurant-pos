import OrderDetail from "@/components/common/product-detail";
import { useGetOrderDetail } from "@/lib/hooks/order/useGetOrderDetail";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";



const OrderDetailPage = () => {
    const {orderId} = useParams();
    const {data:orderDetail, isLoading} = useGetOrderDetail(orderId || "")
    console.log(orderDetail)
    if(isLoading)return <div className="w-full h-[70vh] flex items-center justify-center"><Loader2 className="animate-spin" size={30}/> Loading</div>
    return(
       <OrderDetail data={orderDetail || null}/>
    )
}
export default OrderDetailPage;