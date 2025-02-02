
import WaiterOrderDetail from "@/components/Order/WaiterOrderDetail";
import { useGetOrderDetail } from "@/lib/hooks/order/useGetOrderDetail";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

function OrderDetailPage() {
  const { orderId } = useParams();
  const { data: orderDetail, isLoading } = useGetOrderDetail(orderId || "");
  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin" size={30} /> Loading
      </div>
    );
  return <WaiterOrderDetail data={orderDetail || null} />;
}

export default OrderDetailPage;
