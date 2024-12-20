import { OrderItemProps, removeFromCart } from "@/store/slices/orderCartSlice";
import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "@/store/slices/orderCartSlice";

const OrderCartDetail = ({ item,tableId,orderId }: { item: OrderItemProps,tableId:string,orderId:string }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-2 w-full">
        <div className="">
          <img
            src={item.image || "/dishes/steak.jpg"}
            width={256}
            height={128}
            className="w-[130px] h-[130px] rounded-[10px] object-cover align-top"
          />
        </div>
        <div className="flex flex-col w-full gap-y-[23px]">
          <span>{item.name}</span>
          <div className="flex w-full items-center justify-start gap-x-[20px]">
            <div
              onClick={() => {
                if(item.quantity>1){
                  dispatch(
                    updateCartItemQuantity({
                      tableId: tableId,
                      cartItemId: item.id,
                      orderId:orderId,
                      quantity: item.quantity - 1,
                    })
                  );
                }
                else{
                  dispatch(
                    removeFromCart({
                      tableId: tableId,
                      cartItemId: item.id,
                      orderId:orderId,
                    })
                  );
                }
              }}
              className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center"
            >
              <MinusIcon />
            </div>
            <span>{item.quantity}</span>
            <div
              onClick={() => {
                dispatch(
                  updateCartItemQuantity({
                    tableId: tableId,
                    orderId:orderId,
                    cartItemId: item.id,
                    quantity: item.quantity + 1,
                  })
                );
              }}
              className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center"
            >
              <PlusIcon />
            </div>
          </div>
          <span>{item.price * item.quantity} MMK</span>
        </div>
      </div>
      <div className="border[#00000080] w-full border-[0.5px] mt-[30px] mb-[30px]" />
    </div>
  );
};

export default OrderCartDetail;
