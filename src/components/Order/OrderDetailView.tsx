import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, X, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Components
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/common/select";
import MinusIcon from "@/components/icons/minus";
import PlusIcon from "@/components/icons/plus";

import OrderItemActions from "./OrderItemActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Types & Constants
import { OrderStatus } from "@/lib/constants/MenuOptions";
import { OrderItem } from "@/lib/type/CommonType";
import { OrderDto } from "@/lib/hooks/order/dto";

// Hooks
import { useUpdateOrder } from "@/lib/hooks/order/useUpdateProduct";
import { useUpdateOrderItem } from "@/lib/hooks/order/useUpdateOrderItem";
import EnhancedAddNewDish from "./EnhancedAddNewDish";

interface OrderDetailViewProps {
  data: {
    Id?: string;
    userId?: string;
    table?: string;
    status?: string;
    orderItems: OrderItem[] | undefined;
    createdDate?: string;
    updatedDate?: string;
  } | null;
}

const OrderDetailView = ({ data }: OrderDetailViewProps) => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  // Update Order Status
  const { mutate: updateOrder, isLoading: updateLoading } = useUpdateOrder({
    onSuccess: () => {
      setSuccessMessage("Order status updated successfully");
      setShowSuccessDialog(true);
      toast.success("Order status updated successfully");
    },
    onError: (err) => {
      toast.error(
        "Failed to update order status: " + (err.message || "Unknown error")
      );
    },
  });

  // Update Order Items
  const { mutate: updateOrderItem, isLoading: updateOrderItemLoading } =
    useUpdateOrderItem({
      onSuccess: () => {
        setSuccessMessage("Order items updated successfully");
        setShowSuccessDialog(true);
        toast.success("Order items updated successfully");
        setIsEdited(false);
      },
      onError: (err) => {
        toast.error(
          "Failed to update order items: " + (err.message || "Unknown error")
        );
      },
    });

  // Initialize state from data
  useEffect(() => {
    if (data) {
      setOrderItems(data.orderItems || []);
      setOrderStatus(data.status || "");
    }
  }, [data]);

  // Track changes to order items
  useEffect(() => {
    if (data && data.orderItems) {
      // Check if the items have changed from original data
      const hasChanged =
        JSON.stringify(data.orderItems) !== JSON.stringify(orderItems);
      setIsEdited(hasChanged);
    }
  }, [orderItems, data]);

  // Update Order Status
  const handleUpdateOrder = () => {
    if (!orderStatus) {
      toast.warning("Please select a status to update");
      return;
    }

    updateOrder({
      payload: { status: orderStatus },
      params: { id: orderId as string },
    });
  };

  // Update Order Items
  const handleUpdateOrderItem = () => {
    if (orderItems.length === 0) {
      toast.warning("No items to update");
      return;
    }

    const orderDto: OrderDto = {
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        Id: item.Id,
        quantity: item.quantity,
      })),
      table: data?.table || "",
    };

    updateOrderItem({
      payload: orderDto,
      params: { id: orderId as string },
    });
  };

  // Handle quantity changes
  const handleOrderItemQuantity = (
    orderItemId: string,
    type: "increment" | "decrement"
  ) => {
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
  };

  // Handle removing an order item
  const handleRemoveOrderItem = (orderItemId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.Id !== orderItemId));
  };

  // Calculate prices
  const subTotalPrice =
    orderItems?.reduce((total, orderItem) => {
      return total + orderItem.quantity * orderItem.product.price;
    }, 0) || 0;

  const tax = subTotalPrice * 0.05; // 5% tax
  const totalPrice = subTotalPrice + tax;

  // Format date
  const date = new Date(data?.createdDate || Date.now());
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[90dvh] py-4 overflow-y-auto overflow-x-hidden flex items-start justify-center scrollbar-none"
    >
      <div className="w-full flex flex-col gap-6 lg:w-[85vw] max-w-[1100px] px-4 md:px-6">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6">
          <div className="w-full flex flex-row justify-between items-center">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="flex items-center gap-3"
            >
              <h2 className="font-semibold text-xl md:text-2xl text-gray-800">
                Order Detail
              </h2>
              <span
                className={clsx("px-3 py-1 rounded-full text-xs font-medium", {
                  "bg-amber-100 text-amber-700": data?.status === "PROCESSING",
                  "bg-blue-100 text-blue-700": data?.status === "DELIVERING",
                  "bg-green-100 text-green-700": data?.status === "COMPLETE",
                  "bg-gray-100 text-gray-700": !data?.status,
                })}
              >
                {data?.status}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(-1)}
              className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} strokeWidth={1.5} className="text-gray-700" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-sm">
            <div className="flex flex-col p-3 bg-gray-50 rounded-md">
              <span className="text-gray-500 mb-1">Order ID</span>
              <span className="font-medium text-gray-900">#{data?.Id}</span>
            </div>

            <div className="flex flex-col p-3 bg-gray-50 rounded-md">
              <span className="text-gray-500 mb-1">Table</span>
              <span className="font-medium text-gray-900">
                Table {data?.table}
              </span>
            </div>

            <div className="flex flex-col p-3 bg-gray-50 rounded-md">
              <span className="text-gray-500 mb-1">Date & Time</span>
              <span className="font-medium text-gray-900">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Add New Dish Button */}
        <div className="flex w-full justify-between mb-2">
          <div className="flex items-center">
            {orderItems.length === 0 ? (
              <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                <AlertTriangle size={12} className="mr-1" />
                No items in order
              </div>
            ) : (
              <span className="text-sm text-gray-500">
                {orderItems.length} {orderItems.length === 1 ? "item" : "items"}{" "}
                in order
              </span>
            )}
          </div>
          <EnhancedAddNewDish menus={orderItems} setMenu={setOrderItems} />
        </div>

        {/* Order Items List */}
        <AnimatePresence>
          <div className="w-full flex flex-col gap-3 relative">
            {orderItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items in this order. Add dishes to get started.
              </div>
            )}

            {/* Table Header - Hidden on small screens */}
            {orderItems.length > 0 && (
              <div className="w-full hidden md:grid grid-cols-12 gap-2 px-3 py-2 bg-gray-50 rounded-t-md text-sm font-medium text-gray-600">
                <div className="col-span-5">Item</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
            )}

            {orderItems.map((orderItem, index) => (
              <motion.div
                key={orderItem.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 bg-white p-3 md:p-4"
              >
                {/* Mobile View */}
                <div className="md:hidden w-full flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <div className="h-16 w-16 flex-shrink-0 relative overflow-hidden rounded-lg">
                      <img
                        src={orderItem.product.image || "/placeholder-dish.jpg"}
                        alt={orderItem.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium truncate">
                        {orderItem.product.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {orderItem.product.category}
                      </span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">
                          {orderItem.product.price.toLocaleString()} MMK
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          {(
                            orderItem.quantity * orderItem.product.price
                          ).toLocaleString()}{" "}
                          MMK
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <OrderItemActions
                      quantity={orderItem.quantity}
                      onIncrement={() =>
                        handleOrderItemQuantity(orderItem.Id, "increment")
                      }
                      onDecrement={() =>
                        handleOrderItemQuantity(orderItem.Id, "decrement")
                      }
                      onRemove={() => handleRemoveOrderItem(orderItem.Id)}
                      size="md"
                    />
                  </div>
                </div>

                {/* Desktop View */}
                <div className="w-full hidden md:grid grid-cols-12 gap-2 items-center">
                  {/* Item Image and Name */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="h-16 w-16 flex-shrink-0 relative overflow-hidden rounded-lg">
                      <img
                        src={orderItem.product.image || "/placeholder-dish.jpg"}
                        alt={orderItem.product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm md:text-base truncate">
                        {orderItem.product.name}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 truncate">
                        {orderItem.product.category}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-3 flex justify-center">
                    <OrderItemActions
                      quantity={orderItem.quantity}
                      onIncrement={() =>
                        handleOrderItemQuantity(orderItem.Id, "increment")
                      }
                      onDecrement={() =>
                        handleOrderItemQuantity(orderItem.Id, "decrement")
                      }
                      onRemove={() => handleRemoveOrderItem(orderItem.Id)}
                      size="md"
                    />
                  </div>

                  {/* Item Price */}
                  <div className="col-span-2 flex flex-col items-center justify-center">
                    <span className="font-medium">
                      {orderItem.product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">MMK</span>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-2 flex flex-col items-end justify-center">
                    <span className="font-semibold">
                      {(
                        orderItem.quantity * orderItem.product.price
                      ).toLocaleString()}
                    </span>
                    <span className="text-xs text-green-700">MMK</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Action Buttons and Summary */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-6 mt-6">
          {/* Order Actions */}
          <div className="w-full md:w-[350px] flex flex-col gap-5 order-2 md:order-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h3 className="font-medium text-gray-700 mb-3">Order Status</h3>
              <div className="grid grid-cols-2 gap-3">
                <CustomSelect
                  setOptions={setOrderStatus}
                  label="Order Status"
                  options={OrderStatus}
                  initialValue={data?.status}
                />
                <Button
                  disabled={updateLoading || orderStatus === data?.status}
                  onClick={handleUpdateOrder}
                  className={clsx(
                    "h-11 w-full flex items-center justify-center transition-colors",
                    updateLoading || orderStatus === data?.status
                      ? "bg-gray-100 text-gray-400"
                      : "bg-secondary hover:bg-secondary/90 text-white hover:text-white"
                  )}
                >
                  {updateLoading ? (
                    <Loader className="animate-spin mr-2" size={16} />
                  ) : (
                    <CheckCircle2 size={16} className="mr-2" />
                  )}
                  Update Status
                </Button>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <Button
                  disabled={updateOrderItemLoading || !isEdited}
                  onClick={handleUpdateOrderItem}
                  className={clsx(
                    "w-full h-11 flex items-center justify-center transition-colors",
                    isEdited
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {updateOrderItemLoading ? (
                    <Loader className="animate-spin mr-2" size={16} />
                  ) : (
                    <CheckCircle2 size={16} className="mr-2" />
                  )}
                  Save Order Changes
                </Button>
                {isEdited && (
                  <p className="text-xs text-blue-600 mt-1 text-center">
                    You have unsaved changes
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="w-full md:max-w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 p-5 order-1 md:order-2">
            <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
            <div className="w-full h-full flex flex-col gap-3">
              <div className="w-full flex flex-row justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {subTotalPrice.toLocaleString()} MMK
                </span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">{tax.toLocaleString()} MMK</span>
              </div>
              <div className="w-full flex flex-row justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">0 MMK</span>
              </div>
              <div className="w-full flex flex-row justify-between mt-2">
                <span className="text-lg text-[#009258] font-bold">Total</span>
                <span className="text-lg text-[#009258] font-bold">
                  {totalPrice.toLocaleString()} MMK
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 text-sm text-gray-500">
                <div className="flex justify-between mb-1">
                  <span>Order ID:</span>
                  <span className="font-medium">#{data?.Id}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Created:</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{orderItems.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Success
            </DialogTitle>
            <DialogDescription>{successMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <button onClick={() => setShowSuccessDialog(false)}>Close</button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default OrderDetailView;
