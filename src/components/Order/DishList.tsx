import {
  Product,
  useGetProductList,
} from "@/lib/hooks/product/useGetProductList";
import DishCard from "./DishCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

const DishList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const selectedMenu = useSelector((state: RootState) =>
    state.dishMenu.find((menu) => menu.isSelected)
  );

  const {
    data: menuList,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductList(
    {
      take: 50,
      skip: 0,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Filter products based on selected menu category
  useEffect(() => {
    if (!menuList?.data?.products || !selectedMenu) return;

    // In a real app, this would filter based on category from the API
    // For demo purposes, we're just simulating filtering
    const filtered =
      selectedMenu.name === "All"
        ? menuList.data.products
        : menuList.data.products.filter(
            (product) =>
              // Simple simulation - in reality, we'd match to actual categories
              product.name.length % (selectedMenu.id + 1) === 0 ||
              product.category
                .toLowerCase()
                .includes(selectedMenu.name.toLowerCase())
          );

    setFilteredProducts(filtered);
  }, [menuList, selectedMenu]);

  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Menu Items</h2>
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <span className="text-sm text-gray-500">
            {filteredProducts.length} items
          </span>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-green-600 mb-4" />
          <p className="text-gray-500">Loading menu items...</p>
        </div>
      )}

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error loading menu</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "There was a problem loading the menu. Please try again."}
            <button
              onClick={() => refetch()}
              className="ml-2 underline font-medium"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">No items available</p>
          <p className="text-gray-400 text-sm">
            {selectedMenu
              ? `No items found in the "${selectedMenu.name}" category`
              : "No menu items available"}
          </p>
        </div>
      )}

      <AnimatePresence>
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layoutId={`product-${product.id}`}
                className="h-full"
              >
                <DishCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DishList;
