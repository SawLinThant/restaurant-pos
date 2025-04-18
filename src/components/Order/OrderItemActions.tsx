import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import MinusIcon from "@/components/icons/minus";
import PlusIcon from "@/components/icons/plus";

interface OrderItemActionsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  showRemoveOnZero?: boolean;
  size?: "sm" | "md" | "lg";
}

const OrderItemActions = ({
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  showRemoveOnZero = true,
  size = "md",
}: OrderItemActionsProps) => {
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    if (quantity === 0 && showRemoveOnZero) {
      setShouldRemove(true);
    } else {
      setShouldRemove(false);
    }
  }, [quantity, showRemoveOnZero]);

  const sizeClasses = {
    sm: "w-[30px] h-[30px]",
    md: "w-[40px] h-[40px]",
    lg: "w-[50px] h-[50px]",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onDecrement();
    } else {
      onRemove();
    }
  };

  return (
    <div className="flex items-center gap-x-[20px]">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        className={clsx(
          "rounded-full flex bg-[#009258] items-center justify-center cursor-pointer",
          {
            "opacity-50": quantity < 1,
          },
          sizeClasses[size]
        )}
      >
        {quantity <= 1 && showRemoveOnZero ? (
          <Trash2 size={iconSizes[size]} className="text-white" />
        ) : (
          <MinusIcon
            className={
              size === "sm" ? "scale-75" : size === "lg" ? "scale-125" : ""
            }
            width={size === "sm" ? 12 : size === "lg" ? 18 : 14}
          />
        )}
      </motion.div>

      <span
        className={clsx("font-semibold w-6 text-center", textSizeClasses[size])}
      >
        {quantity}
      </span>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onIncrement}
        className={clsx(
          "rounded-full flex bg-[#009258] items-center justify-center cursor-pointer",
          sizeClasses[size]
        )}
      >
        <PlusIcon
          className={
            size === "sm" ? "scale-75" : size === "lg" ? "scale-125" : ""
          }
          width={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          height={size === "sm" ? 14 : size === "lg" ? 20 : 16}
        />
      </motion.div>
    </div>
  );
};

export default OrderItemActions;
