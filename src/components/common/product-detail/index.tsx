import { OrderItem, OrderResponse } from "@/lib/type/CommonType";
import { Loader, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CustomSelect } from "../select";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/lib/constants/MenuOptions";
import { useUpdateOrder } from "@/lib/hooks/order/useUpdateProduct";
import { useEffect, useState } from "react";
import MinusIcon from "@/components/icons/minus";
import PlusIcon from "@/components/icons/plus";
import clsx from "clsx";
import { useUpdateOrderItem } from "@/lib/hooks/order/useUpdateOrderItem";
import { OrderDto } from "@/lib/hooks/order/dto";
import PrintPopup from "../print-popup";

const OrderDetail = ({ data }: { data: OrderResponse | null }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { mutate: updateOrder, isLoading: updateLoading } = useUpdateOrder({
    onSuccess: () => {
      console.log("updated status successfully");
    },
    onError: (err) => {
      console.log("Failed to update order:", err);
    },
  });
  const { mutate: updateOrderItem, isLoading: updateOrderItemLoading } =
    useUpdateOrderItem({
      onSuccess: () => {
        console.log("updated order item successfully");
      },
      onError: (err) => {
        console.log("Failed to update order item:", err);
      },
    });
  const handleUpdateOrder = () => {
    updateOrder({
      payload: { status: orderStatus },
      params: { id: orderId as string },
    });
  };

  const handleUpdateOrderItem = () => {
    const orderDto: OrderDto = {
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        // status: item.status,
        Id: item.Id,
        quantity: item.quantity,
      })),
      table: data?.data.table || "",
      // status: data?.data.status || "",
    };
    updateOrderItem({
      payload: orderDto,
      params: { id: orderId as string },
    });
  };

  useEffect(() => {
    setOrderItems(data?.data.orderItems || []);
  }, [data]);

  function handleOrderItemQuantity(
    orderItemId: string,
    type: "increment" | "decrement"
  ) {
    if (orderItems.length > 0) {
      const updatedOrderItems = orderItems.map((item) => {
        if (item.Id === orderItemId) {
          return {
            ...item,
            quantity:
              type === "increment" ? item.quantity + 1 : item.quantity - 1,
          };
        }
        return item;
      });
      setOrderItems(updatedOrderItems);
    }
  }

  const date = new Date(data?.data.createdDate || Date.now());
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;
  const subTotalPrice =
    data?.data.orderItems?.reduce((total, orderItem) => {
      return total + orderItem.quantity * orderItem.product.price;
    }, 0) || 0;
  const tax = subTotalPrice * 0;
  const totalPrice = subTotalPrice + tax;
  console.log(orderStatus);
  return (
    <div className="w-full h-[90dvh] py-4 overflow-y-auto overflow-x-hidden flex items-start justify-center">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="w-full flex flex-col gap-4 border border-gray-300  rounded-md lg:p-8 md:p-6 p-2 lg:w-[60vw] max-w-[900px] md:w-[90vw] mt-2">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between">
            <h2 className="font-semibold text-xl">Order Detail</h2>
            <div onClick={() => navigate(-1)} className="hover:cursor-pointer">
              <X size={30} color="black" />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between mt-4">
            <h4 className="font-semibold text-sm">#{data?.data.Id}</h4>
            <div className="text-sm">{formattedDate}</div>
          </div>
          <div className="w-full flex flex-row justify-between mt-4">
            <h3 className="font-semibold text-normal">
              Table No {data?.data.table}
            </h3>
            <div className="text-sm">
              <span className="p-2 rounded bg-secondary text-white">
                {data?.data.status}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-end mt-4">
            <PrintPopup data={data}/>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          {data &&
            data.data.orderItems &&
            data?.data.orderItems.map((orderItem) => (
              <div className="w-full border-b border-gray-400 py-4">
                <div className="w-full h-full flex lg:flex-row md:flex-row flex-col justify-between">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="max-h-32 max-w-32">
                      <img
                        src={orderItem.product.image}
                        alt="menu image"
                        className="w-full h-full object-cover border bg-slate-200 rounded-md"
                      />
                    </div>
                    <span>Menu name</span>
                  </div>
                  <div className="flex w-full items-center justify-center gap-x-[20px]">
                    <div
                      onClick={() => {
                        if (
                          orderItems.find((item) => item.Id === orderItem.Id)
                            ?.quantity ||
                          0 >= 1
                        ) {
                          handleOrderItemQuantity(orderItem.Id, "decrement");
                        }
                      }}
                      className={clsx(
                        "rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center",
                        {
                          "bg-[#00000080]":
                            (orderItems.find((item) => item.Id === orderItem.Id)
                              ?.quantity || 0) < 1,
                        }
                      )}
                    >
                      <MinusIcon />
                    </div>
                    <span>
                      {
                        orderItems.find((item) => item.Id === orderItem.Id)
                          ?.quantity
                      }
                    </span>
                    <div
                      onClick={() => {
                        handleOrderItemQuantity(orderItem.Id, "increment");
                      }}
                      className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center"
                    >
                      <PlusIcon />
                    </div>
                  </div>
                  <div className="min-h-32 min-w-32 flex flex-row items-center justify-center">
                    <span>{orderItem.quantity}</span>
                    <span>x</span>
                    <span>{orderItem.product.price}</span>
                  </div>
                  <div className="min-h-32 min-w-32 flex flex-row gap-2 items-center justify-center">
                    <span>{orderItem.quantity * orderItem.product.price}</span>
                    <span className="text-green-700">MMK</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="w-full flex flex-row justify-between">
          {/* <div className="w-[150px] flex flex-col gap-3">
            <CustomSelect
              setOptions={setOrderStatus}
              label="Select Status"
              options={OrderStatus}
            />
            <Button
              disabled={updateLoading}
              onClick={handleUpdateOrder}
              className="border bg-secondary rounded-md h-11 w-full hover:border-gray-600 hover:text-black flex items-center justify-center"
            >
              {updateLoading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div> */}
      <div className="flex flex-row justify-end">
          <div className="flex flex-col gap-4">
          <div className="w-[150px] flex flex-col gap-3">
            <Button
              disabled={updateOrderItemLoading}
              onClick={handleUpdateOrderItem}
              className="border bg-secondary rounded-md h-11 w-full hover:border-gray-600 hover:text-black flex items-center justify-center"
            >
              {updateOrderItemLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Update Order Items"
              )}
            </Button>
          </div>
          </div>
        </div>
          <div className="lg:max-w-[22rem] md:min-w-[22rem] w-full min-h-[10rem] p-6 bg-[#F1F1F1] rounded-md lg:order-none md:order-none order-1">
            <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex flex-col gap-3">
            <CustomSelect
              setOptions={setOrderStatus}
              label="Select Status"
              options={OrderStatus}
            />
            <Button
              disabled={updateLoading}
              onClick={handleUpdateOrder}
              className="border bg-gray-500 rounded-md h-11 w-full hover:border-gray-600 hover:text-black flex items-center justify-center"
            >
              {updateLoading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
              <div className="w-full flex flex-row justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">{subTotalPrice}</span>
              </div>
              <div className="w-full flex flex-row justify-between pb-5 border-b border-gray-300">
                <span className="font-semibold">Tax(0%)</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="w-full flex flex-row justify-between mt-2">
                <span className="text-lg text-[#009258] font-bold">Total</span>
                <span className="text-lg text-[#009258] font-bold">
                  {totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default OrderDetail;
