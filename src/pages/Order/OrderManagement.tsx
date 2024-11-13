import DishList from "@/components/Order/DishList";
import MenuOptionBar from "@/components/Order/MenuOptionBar";
import OrderListPreview from "@/components/Order/OrderListPreview";

const OrderManagement = () => {
  console.log("order management");
  return (
    <div className="flex w-full flex-col gap-y-10 pl-[30px] bg-primary h-[calc(100vh-10vh)] overflow-y-auto overflow-x-hidden pt-[40px]">
      <div className="flex w-full">
        <OrderListPreview />
      </div>
      <div className="flex w-full flex-col ">
        <MenuOptionBar/>
      </div>
      <div className="flex w-full">
          <DishList/>
      </div>
    </div>
  );
};

export default OrderManagement;
