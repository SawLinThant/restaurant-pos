import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/slices/orderCartSlice";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "@/lib/hooks/order/useCreateOreder";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import OrderCartItem from "./OrderCartItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, AnimatedButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

const OrderCart = () => {
  const { items, subtotal, total } = useSelector(
    (state: RootState) => state.orderCart
  );
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const { mutateAsync: createOrder, isLoading } = useCreateOrder({
    onSuccess: () => {
      // Show success message
      toast.success("Order placed successfully!");

      // Clear the cart
      dispatch(clearCart());

      // Show the success dialog
      if (typeof window !== "undefined" && (window as any).showOrderSuccess) {
        (window as any).showOrderSuccess();
      }
    },
    onError: (error) => {
      toast.error(`Failed to place order: ${error.message}`);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ table: string }>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (items.length === 0) {
        toast.error(
          "Your cart is empty. Please add items before placing an order."
        );
        return;
      }

      await createOrder({
        orderItems: items.map((item) => ({
          Id: item.id,
          productId: item.id,
          status: "PROCESSING",
          quantity: item.quantity,
        })),
        table: data.table,
      });
    } catch (error) {
      console.error("Order creation error:", error);
    }
  });

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={onSubmit}
      className="flex w-full flex-col h-full bg-white px-6 py-4 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Your Order
        </h2>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="table" className="block text-sm font-medium mb-2">
          Table Number <span className="text-red-500">*</span>
        </label>
        <input
          id="table"
          {...register("table", {
            required: "Table number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a valid table number",
            },
          })}
          className="w-full bg-gray-100 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter table number"
        />
        {errors.table && (
          <p className="mt-1 text-sm text-red-500">{errors.table.message}</p>
        )}
      </div>

      <div className="border-t border-gray-200 py-4 mb-4">
        <h3 className="font-medium mb-3">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("cash")}
            className={`py-3 px-4 rounded-lg border transition-all ${
              paymentMethod === "cash"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200"
            }`}
          >
            Cash
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`py-3 px-4 rounded-lg border transition-all ${
              paymentMethod === "card"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200"
            }`}
          >
            Card
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-medium mb-3">Order Items</h3>
        <div className="flex-1 overflow-auto custom-scrollbar">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 text-gray-400"
              >
                <ShoppingCart className="h-12 w-12 mb-3 opacity-20" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm">Add some delicious items to your cart</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <OrderCartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax (0%)</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {items.length === 0 && (
          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              Your cart is empty. Please add items before placing an order.
            </AlertDescription>
          </Alert>
        )}

        <AnimatedButton
          type="submit"
          className="w-full py-4"
          size="lg"
          variant="gradient"
          isLoading={isLoading}
          loadingText="Processing Order..."
          disabled={isLoading || items.length === 0}
        >
          Place Order
        </AnimatedButton>
      </div>
    </motion.form>
  );
};

export default OrderCart;
