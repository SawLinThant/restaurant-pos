import { Product } from "@/lib/hooks/useGetProductList";
import DotIcon from "../icons/dot";
import { useDispatch, useSelector } from "react-redux";
import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/slices/orderCartSlice";

import { RootState } from "@/store/store";
import clsx from "clsx";

interface DishCardProps {
  product: Product;
}

const DishCard = ({ product }: DishCardProps) => {
  const cart = useSelector((state: RootState) => state.orderCart);

  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
  const dispatch = useDispatch();
  return (
    <div
      className={clsx(
        "flex w-full  min-w-[330px] flex-shrink flex-col bg-[#F6F6F6] rounded-[10px]  pt-[25px] pl-[25px] pr-[15px] pb-[15px]",
        { "border-2 border-[#009258]": quantity > 0 }
      )}
      key={product.id}
    >
      <div className="flex overflow-y-auto">
        <div className=" w-1/2 flex-shrink">
          <img
            src={product.image || "/dishes/steak.jpg"}
            width={256}
            height={128}
            className="w-[130px] h-[130px] rounded-[10px] object-cover align-top"
          />
        </div>
        <div className=" w-1/2 flex-col ">
          <span className="text-[18px] font-[500]">{product.name}</span>
          <div className="text-[11px] font-[500] text-[#00000080] h-[45%] hover:overflow-y-auto overflow-y-hidden custom-scrollbar leading-[15px]">
            {product.description}
          </div>
          <div className=" text-[11px] mt-[10px] gap-x-4 flex items-center leading-[15px] text-[#00000080] font-[500]">
            <span>15 available</span>
            <div className="flex items-center gap-x-1">
              <DotIcon />
              <span>32 Sold</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/2 flex">
          <span className="font-[500] text-[18px]">{product.price}MMK</span>
        </div>
        <div className="w-1/2">
          {/* <button 
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              )
            }
            className="bg-[#009258] py-[7px] px-[44px] text-[16p] font-[500] text-white rounded-[10px]"
          >
            Add
          </button> */}
          <div className="flex w-full items-center justify-start gap-x-[20px]">
            <div
              onClick={() => {
                if (quantity > 1) {
                  dispatch(
                    updateCartItemQuantity({
                      cartItemId: product.id,
                      quantity: quantity - 1,
                    })
                  );
                } else {
                  dispatch(
                    removeFromCart({
                      cartItemId: product.id,
                    })
                  );
                }
              }}
              className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center"
            >
              <MinusIcon />
            </div>
            <span>{quantity || 0}</span>
            <div
              onClick={() => {
                if (quantity > 0) {
                  dispatch(
                    updateCartItemQuantity({
                      cartItemId: product.id,
                      quantity: quantity + 1,
                    })
                  );
                } else {
                  dispatch(
                    addToCart({
                      // tableId: tableNo,
                      // orderId: orderId,

                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  );
                }
              }}
              className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center"
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
