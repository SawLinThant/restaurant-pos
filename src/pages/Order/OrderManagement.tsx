import OrderMenu from "@/components/icons/orderMenu";
import DishList from "@/components/Order/DishList";
import MenuOptionBar from "@/components/Order/MenuOptionBar";

//import OrderCart from "@/components/Order/OrderCart";
//import OrderListPreview from "@/components/Order/OrderListPreview";

const OrderManagement = () => {
  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col gap-y-10 pl-[30px] bg-primary h-[calc(100vh-10vh)] overflow-y-auto overflow-x-hidden pt-[40px] pr-[20px] custom-scrollbar">
        <div className="flex w-full justify-end">
          <OrderMenu />
        </div>
        <div className="flex w-full flex-col px-[10rem]">
          <MenuOptionBar />
        </div>
        <div className="flex w-full">
          <DishList />
        </div>
      </div>
      {/* <>
        <OrderCart />
      </> */}
    </div>
  );
};

export default OrderManagement;
