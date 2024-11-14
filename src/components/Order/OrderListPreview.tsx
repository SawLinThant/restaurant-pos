import OrderCard from "./OrderCard";

const OrderListPreview = () => {
  return (
    <div className="flex  flex-col overflow-x-auto gap-x-5">
      <span className=" flex-shrink-0 w-full text-[25px] font-[500] mb-[30px]">Order List</span>
      <div className="flex gap-x-10 overflow-x-auto px-[10px] sm:px-[0px]">
        <div className="sm:w-[230px] w-full flex-shrink-0">
          <OrderCard />
        </div>
        <div className="sm:w-[230px] w-full flex-shrink-0">
          <OrderCard />
        </div>
        <div className="sm:w-[230px] w-full flex-shrink-0">
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default OrderListPreview;
