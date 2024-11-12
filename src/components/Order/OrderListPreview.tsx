import OrderCard from "./OrderCard";

const OrderListPreview = () => {
  return (
    <div className="flex w-full flex-col overflow-x-auto gap-x-5">
      <span className=" flex-shrink-0 w-full">Order List</span>
      <div className="flex w-full gap-x-10">
        <div className="sm:w-[230px] h-[120px] w-full">
          <OrderCard />
        </div>
        <div className="sm:w-[230px] w-full">
          <OrderCard />
        </div>
        <div className="sm:w-[230px] w-full">
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default OrderListPreview;
