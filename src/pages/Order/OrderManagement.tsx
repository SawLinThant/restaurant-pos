import OrderMenu from "@/components/icons/orderMenu";
import DishList from "@/components/Order/DishList";
import MenuOptionBar from "@/components/Order/MenuOptionBar";

//import OrderCart from "@/components/Order/OrderCart";
//import OrderListPreview from "@/components/Order/OrderListPreview";

const OrderManagement = () => {
  return (
    <div className="flex w-full lg:mt-0 md:mt-0 mt-[4rem]">
      <div className="flex w-full flex-col gap-y-10 p-6  bg-primary h-[calc(100vh-15vh)] overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="flex w-full justify-end">
          <OrderMenu />
        </div>
        <div className="flex w-full flex-col items-center justify-center lg:px-[10rem]">
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
