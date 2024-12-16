import { useDispatch, useSelector } from "react-redux";
import OrderCartDetail from "./OrderCartDetail";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/slices/orderCartSlice";

const OrderCart = ({ tableId }: { tableId: string }) => {
  const tableNo = tableId;
  const orderCart = useSelector((state: RootState) => state.orderCart);
  const currentTable = orderCart.find((item) => item.tableId === tableNo);
  const dispatch = useDispatch();
  // function calcilateSubTotoal(){
  //   return currentTable?.orderItems.reduce((prevValue,currentValue)=>{
  //     return prevValue + currentValue.price * currentValue.quantity
  //   },0).toString()
  // }
  return (
    <div className="flex w-full flex-col shadow-OrderCartShadow px-[25px] h-[calc(100dvh)] pt-[20px] pb-[30px] ">
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
      <span
        onClick={() => dispatch(clearCart({ tableId: tableNo }))}
        className="text-[14px] font-[500] leading-[21px] mb-[30px] cursor-pointer text-red-600"
      >
        Clear cart
      </span>
      <div className="flex w-full flex-col hover:overflow-y-auto overflow-y-hidden custom-scrollbar">
        {currentTable?.orderItems?.map((item) => (
          <div className="flex w-full flex-col" key={item.id}>
            <OrderCartDetail item={item} tableId={tableNo} />
          </div>
        ))}
        {(currentTable?.orderItems ?? []).length <= 0 && (
          <>
            <div className="flex w-full items-center justify-center h-[200px] text-gray-400 italic">
              No items in cart
            </div>
          </>
        )}
        <div className="flex w-full flex-col  mt-[30px]">
          <span className="flex-shrink-0">Order Summary</span>
          <div className="flex w-full mt-[30px] bg-[#F1F1F1]  flex-col p-[20px]">
            <div className="grid grid-cols-2 w-full">
              <span className="text-[#00000080]">Subtotal</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                {100000} MMk
              </span>
            </div>
            <div className="grid grid-cols-2 w-full mt-[20px]">
              <span className="text-[#00000080]">Tax (0%)</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                0 MMk
              </span>
            </div>
            <div className="border[#00000080] w-full border-[0.5px] mt-[30px] mb-[20px]" />
            <div className="grid grid-cols-2 w-full">
              <span className="">Total</span>
              <span className="flex w-full items-end justify-end text-right text-black">
                {1000} MMk
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
