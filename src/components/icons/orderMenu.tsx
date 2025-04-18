import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import OrderCart from "../Order/OrderCart";

function OrderMenu() {
  const { items } = useSelector((state: RootState) => state.orderCart);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger className="p-0 border-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="relative bg-green-600 text-white p-2 rounded-lg shadow-md flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-medium">Cart</span>

            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {itemCount}
              </motion.div>
            )}
          </div>
        </motion.div>
      </SheetTrigger>

      <SheetContent
        side="right"
        size="xl"
        className="p-0 border-l-0 rounded-l-2xl shadow-2xl overflow-hidden"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="sr-only">Order Cart</SheetTitle>
        </SheetHeader>
        <OrderCart />
      </SheetContent>
    </Sheet>
  );
}

export default OrderMenu;
