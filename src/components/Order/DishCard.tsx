import { Product } from "@/lib/hooks/product/useGetProductList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/slices/orderCartSlice";
import { formatCurrency } from "@/lib/utils";
import { Button, AnimatedButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DishCardProps {
  product: Product;
}

const DishCard = ({ product }: DishCardProps) => {
  const { items } = useSelector((state: RootState) => state.orderCart);
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  const handleIncrement = () => {
    if (quantity > 0) {
      dispatch(
        updateCartItemQuantity({
          cartItemId: product.id,
          quantity: quantity + 1,
        })
      );
    } else {
      handleAddToCart();
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(
        updateCartItemQuantity({
          cartItemId: product.id,
          quantity: quantity - 1,
        })
      );
    } else if (quantity === 1) {
      dispatch(
        removeFromCart({
          cartItemId: product.id,
        })
      );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "w-full h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition-all duration-200",
        quantity > 0 && "ring-2 ring-green-500 shadow-lg"
      )}
    >
      <div className="relative w-full pt-[56%] overflow-hidden bg-gray-100">
        <img
          src={product.image || "/dishes/steak.jpg"}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {quantity > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
            {quantity}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
          <span className="font-bold text-green-600">
            {formatCurrency(product.price)}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {product.description ||
            "Delicious dish prepared with fresh ingredients."}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs text-gray-500 flex items-center">
            <span className="mr-2">15 available</span>
            <span className="w-1 h-1 rounded-full bg-gray-400 inline-block"></span>
            <span className="ml-2">32 sold</span>
          </div>

          <div className="flex items-center">
            {quantity > 0 ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-gray-100 rounded-full p-2"
                  onClick={handleDecrement}
                >
                  {quantity === 1 ? (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-green-600" />
                  )}
                </button>

                <span className="w-8 text-center font-medium">{quantity}</span>

                <button
                  type="button"
                  className="bg-gray-100 rounded-full p-2"
                  onClick={handleIncrement}
                >
                  <Plus className="h-4 w-4 text-green-600" />
                </button>
              </div>
            ) : (
              <AnimatedButton
                onClick={handleAddToCart}
                variant="gradient"
                size="sm"
              >
                Add to Cart
              </AnimatedButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
