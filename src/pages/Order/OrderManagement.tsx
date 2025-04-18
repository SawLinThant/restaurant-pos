import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import MenuOptionBar from "@/components/Order/MenuOptionBar";
import DishList from "@/components/Order/DishList";
import OrderMenu from "@/components/icons/orderMenu";
import { Toaster } from "sonner";
import OrderCartOverlay from "@/components/Order/OrderCartOverlay";

// Lazy load components that might not be immediately visible
const OrderSuccessDialog = lazy(
  () => import("@/components/Order/OrderSuccessDialog")
);

const OrderManagement = () => {
  return (
    <>
      <Toaster position="top-right" closeButton />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex w-full lg:mt-0 md:mt-0 mt-[4rem]"
      >
        <div className="flex w-full flex-col gap-y-6 p-6 bg-primary h-[calc(100vh-15vh)] overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="flex w-full justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl font-bold text-gray-800"
            >
              Food Menu
            </motion.h1>

            <OrderMenu />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex w-full flex-col items-center justify-center lg:px-[10rem]"
          >
            <MenuOptionBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex w-full"
          >
            <DishList />
          </motion.div>
        </div>

        {/* Cart overlay for mobile */}
        <OrderCartOverlay />
      </motion.div>

      {/* Success dialog will be shown when an order is successfully placed */}
      <Suspense fallback={null}>
        <OrderSuccessDialog />
      </Suspense>
    </>
  );
};

export default OrderManagement;
