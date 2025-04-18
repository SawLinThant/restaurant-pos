import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import OrderCart from "./OrderCart";
import { formatCurrency } from "@/lib/utils";

const OrderCartOverlay = () => {
  const { items, total } = useSelector((state: RootState) => state.orderCart);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Only show on mobile devices
  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
    return null;
  }

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <Sheet>
            <SheetTrigger asChild>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-green-600 text-white p-4 flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <span>View Cart</span>
                </div>
                <span className="font-bold">{formatCurrency(total)}</span>
              </motion.button>
            </SheetTrigger>
            <SheetContent side="bottom" size="xl" className="p-0">
              <OrderCart />
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderCartOverlay;
