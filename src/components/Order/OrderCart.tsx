import OrderCartDetail from "./OrderCartDetail";

const OrderCart = () => {
  return (
    <div className="flex w-[30rem] flex-col shadow-OrderCartShadow px-[25px] h-[calc(100vh-10vh)] pt-[20px] pb-[30px] ">
      <span className="mb-[30px] text-[18px] font-[500] leading-[21px]">
        Customer Information
      </span>
      <input
        className="flex w-full bg-[#F1F1F1] py-[10px] px-[20px] rounded-[100px]"
        placeholder="Table Number"
      />
      <div className="border[#00000080] w-full border-[0.5px] mt-[30px] mb-[30px]" />
      <span className="text-[18px] font-[500] leading-[21px] mb-[30px]">
        Order Details
      </span>
      <div className="flex w-full flex-col hover:overflow-y-auto overflow-y-hidden custom-scrollbar">
        <div className="flex w-full flex-col  ">
          <OrderCartDetail />
          <OrderCartDetail />
          <OrderCartDetail />
        </div>
        <div className="flex w-full flex-col  mt-[30px]">
          <span className="flex-shrink-0">Order Summary</span>
          <div className="flex w-full mt-[30px] bg-[#F1F1F1]  flex-col p-[20px]">
            <div className="grid grid-cols-2 w-full">
              <span className="text-[#00000080]">Subtotal</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                67500 MMk
              </span>
            </div>
            <div className="grid grid-cols-2 w-full mt-[20px]">
              <span className="text-[#00000080]">Tax (10%)</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                6750 MMk
              </span>
            </div>
            <div className="border[#00000080] w-full border-[0.5px] mt-[30px] mb-[20px]" />
            <div className="grid grid-cols-2 w-full">
              <span className="">Total</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                74250 MMk
              </span>
            </div>
          </div>
          <div className="flex w-full mt-[30px]">
            <button className="flex w-full items-center justify-center text-white font-[500] bg-[#009258]">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
