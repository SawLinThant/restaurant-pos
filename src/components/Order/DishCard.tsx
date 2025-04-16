import { Product } from "@/lib/hooks/product/useGetProductList";
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
        "flex w-full flex-grow  flex-shrink flex-col bg-[#F6F6F6] rounded-[10px]  pt-[25px] pl-[25px] pr-[15px] pb-[15px]",
        { "border-2 border-[#009258]": quantity > 0 }
      )}
      key={product.id}
    >
      <div className="flex lg:flex-row flex-col overflow-y-auto">
        <div className=" lg:w-1/2 w-full flex-shrink">
          <img
            src={product.image || "/dishes/steak.jpg"}
            width={256}
            height={128}
            className="customLg:w-[12.125rem] md:w-full h-[8.125rem] rounded-[10px] object-cover align-top"
          />
        </div>
        <div className=" lg:w-1/2 w-full">
        <div className="w-full flex flex-col items-start lg:px-4 lg:py-0 py-4">
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
      </div>
      <div className="flex lg:flex-row flex-col gap-3 lg:items-center items-start lg:mt-6 mt-2">
        <div className="lg:w-1/2 w-full flex">
          <span className="font-[500] text-[18px]">{product.price}MMK</span>
        </div>
        <div className="lg:w-1/2 w-full">
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
          <div className="flex w-full lg:px-4 items-center justify-start gap-x-[20px]">
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
              className="rounded-full flex  bg-[#009258] w-[35px] h-[35px] items-center justify-center"
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
              className="rounded-full flex  bg-[#009258] w-[35px] h-[35px] items-center justify-center"
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
