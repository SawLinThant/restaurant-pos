import OrderListPreview from "@/components/Order/OrderListPreview"


const OrderManagement = () => {
    console.log("order management")
  return (
    <div className="flex w-full bg-primary h-[calc(100vh-10vh)] overflow-y-auto overflow-x-hidden">
      <OrderListPreview/>
    </div>
  )
}

export default OrderManagement
