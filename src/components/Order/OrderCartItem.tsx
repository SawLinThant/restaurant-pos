import {
  OrderItemProps,
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/slices/orderCartSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderCartItemProps {
  item: OrderItemProps;
}

const OrderCartItem = ({ item }: OrderCartItemProps) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      updateCartItemQuantity({
        cartItemId: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItemQuantity({
          cartItemId: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        cartItemId: item.id,
      })
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="flex items-center p-3 bg-gray-50 rounded-lg"
    >
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image || "/dishes/steak.jpg"}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.name}</h4>
          <span className="font-semibold">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500">
            {formatCurrency(item.price)} each
          </div>

          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleDecrement}
            >
              {item.quantity === 1 ? (
                <Trash2 className="h-4 w-4 text-red-500" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
            </Button>

            <span className="w-8 text-center font-medium">{item.quantity}</span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCartItem;
