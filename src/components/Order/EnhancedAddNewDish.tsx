import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Product,
  useGetProductList,
} from "@/lib/hooks/product/useGetProductList";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Loader2, X, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/lib/type/CommonType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import clsx from "clsx";
import OrderItemActions from "./OrderItemActions";

interface InputProps {
  menus: OrderItem[];
  setMenu: Dispatch<SetStateAction<OrderItem[]>>;
}

const EnhancedAddNewDish = ({ menus, setMenu }: InputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const { data: menuList, isLoading } = useGetProductList({
    skip: 0,
    take: 100,
  });

  // Filter products based on search query and category
  useEffect(() => {
    if (!menuList?.data?.products) return;

    let filtered = [...menuList.data.products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, activeCategory, menuList]);

  const handleAddMenu = (product: Product) => {
    // Check if the menu item already exists
    const existingItem = menus.find(
      (currentMenu: OrderItem) => currentMenu.product.id === product.id
    );

    if (existingItem) {
      // Increase the quantity
      setMenu((prev: OrderItem[]) =>
        prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Added another ${product.name} to the order`);
    } else {
      // Add new menu item
      setMenu((prev: OrderItem[]) => [
        ...prev,
        {
          Id: Date.now().toString(),
          orderId: product.id + Date.now(),
          productId: product.id,
          status: "PROCESSING",
          quantity: 1,
          createdDate: new Date().toISOString(),
          product: product,
        },
      ]);
      toast.success(`Added ${product.name} to the order`);
    }
  };

  const handleRemoveMenuItem = (productId: string) => {
    setMenu((prev: OrderItem[]) =>
      prev.filter((item) => item.product.id !== productId)
    );
    toast.success("Item removed from order");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setMenu((prev: OrderItem[]) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailView(true);
  };

  // Get unique categories from the products
  const categories = menuList?.data?.products
    ? [
        "all",
        ...new Set(
          menuList.data.products.map((product) =>
            product.category.toLowerCase()
          )
        ),
      ]
    : ["all"];

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 border-dashed border-green-500 text-green-600 hover:bg-green-50"
          >
            <Plus size={16} />
            Add Dishes
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[80vw] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add Menu Items
            </DialogTitle>
            <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
              <div className="relative w-full sm:w-auto flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dishes by name or description..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="flex flex-wrap mb-4 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category === "all" ? "All Categories" : category}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="h-[50vh] rounded-md">
              {isLoading ? (
                <div className="w-full h-40 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : `No dishes available in this category`}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-1">
                  {filteredProducts.map((product) => {
                    const existingItem = menus.find(
                      (menu) => menu.product.id === product.id
                    );
                    const quantity = existingItem?.quantity || 0;

                    return (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        className={clsx(
                          "flex flex-col rounded-lg overflow-hidden border cursor-pointer transition-all",
                          existingItem
                            ? "border-green-500 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div
                          className="relative h-32 overflow-hidden bg-gray-100"
                          onClick={() => handleViewDetails(product)}
                        >
                          <img
                            src={product.image || "/placeholder-dish.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {existingItem && (
                              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {quantity}
                              </div>
                            )}
                            <div className="bg-gray-800/70 text-white rounded-full w-6 h-6 flex items-center justify-center">
                              <Info size={12} />
                            </div>
                          </div>
                        </div>
                        <div className="p-3 flex flex-col">
                          <h3 className="font-medium text-sm line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-xs line-clamp-1">
                            {product.category}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="font-semibold text-sm">
                              {product.price.toLocaleString()} MMK
                            </p>
                            {existingItem ? (
                              <div className="scale-75 origin-right">
                                <OrderItemActions
                                  quantity={quantity}
                                  size="sm"
                                  onIncrement={() =>
                                    handleUpdateQuantity(
                                      product.id,
                                      quantity + 1
                                    )
                                  }
                                  onDecrement={() =>
                                    handleUpdateQuantity(
                                      product.id,
                                      quantity - 1
                                    )
                                  }
                                  onRemove={() =>
                                    handleRemoveMenuItem(product.id)
                                  }
                                />
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 border-green-500 text-green-600 hover:bg-green-50"
                                onClick={() => handleAddMenu(product)}
                              >
                                <Plus size={14} />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </Tabs>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "dish" : "dishes"} available
            </p>
            <Button variant="default" onClick={() => setDialogOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Detail Dialog */}
      <Dialog open={showDetailView} onOpenChange={setShowDetailView}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Product Details</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowDetailView(false)}
              >
                <X size={18} />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="mt-2">
              <div className="h-56 overflow-hidden rounded-md bg-muted">
                <img
                  src={selectedProduct.image || "/placeholder-dish.jpg"}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedProduct.category}
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    {selectedProduct.price.toLocaleString()} MMK
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.description ||
                      "No description available for this dish."}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  {menus.find(
                    (item) => item.product.id === selectedProduct.id
                  ) ? (
                    <OrderItemActions
                      quantity={
                        menus.find(
                          (item) => item.product.id === selectedProduct.id
                        )?.quantity || 0
                      }
                      onIncrement={() => {
                        const item = menus.find(
                          (item) => item.product.id === selectedProduct.id
                        );
                        if (item) {
                          handleUpdateQuantity(
                            selectedProduct.id,
                            item.quantity + 1
                          );
                        }
                      }}
                      onDecrement={() => {
                        const item = menus.find(
                          (item) => item.product.id === selectedProduct.id
                        );
                        if (item && item.quantity > 1) {
                          handleUpdateQuantity(
                            selectedProduct.id,
                            item.quantity - 1
                          );
                        } else {
                          handleRemoveMenuItem(selectedProduct.id);
                        }
                      }}
                      onRemove={() => handleRemoveMenuItem(selectedProduct.id)}
                    />
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleAddMenu(selectedProduct)}
                    >
                      <Plus size={16} className="mr-2" />
                      Add to Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedAddNewDish;
