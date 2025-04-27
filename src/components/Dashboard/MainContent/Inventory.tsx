//import { ProductChart } from "@/components/common/product-chart";
import UnifiedInventoryTable from "@/components/common/unified-inventory-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBulkDailyBuying } from "@/lib/hooks/daily-buying/useCreateBulkDailyBuying";
import { DailyItem } from "@/lib/type/CommonType";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, Loader } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion } from "framer-motion";

const Inventory: React.FC = () => {
  const [createDailyCostLoading, setCreateDailyCostLoading] =
    useState<boolean>(false);
  const [dailyBuyList, setDailyBuyList] = useState<DailyItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    startOfDay(new Date())
  );

  const {
    register: dailyCostRegister,
    handleSubmit: createMenuSubmit,
    reset: resetForm,
  } = useForm<DailyItem>();
  const queryClient = useQueryClient();

  const { mutateAsync: createDailyBuyingList, isLoading } =
    useCreateBulkDailyBuying({
      onSuccess: async () => {
        toast.success("Items added successfully");
        await queryClient.invalidateQueries(["get-daily-buying-list"]);
        setDailyBuyList([]); // Clear the list after successful submission
      },
      onError: () => {
        toast.error("Fail to add items");
      },
    });

  // Create a function to handle date selection that invalidates both queries
  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      setSelectedDate(date);

      // Invalidate both queries when date changes
      if (queryClient) {
        queryClient.invalidateQueries(["get-daily-buying-list"]);
        queryClient.invalidateQueries(["orderList"]);
      }
    },
    [queryClient]
  );

  // Memoize form submission handler
  const handleAddList = useCallback(
    createMenuSubmit(async (data) => {
      const newItem: DailyItem = {
        id: Date.now().toString(),
        name: data.name,
        amount: data.amount,
        quantity: data.quantity,
        unit: data.unit,
        price: data.price,
        cost: data.cost,
      };

      setDailyBuyList((prevList) => [...prevList, newItem]);
      resetForm();
    }),
    [createMenuSubmit, resetForm]
  );

  // Memoize submit handler
  const handleSubmit = useCallback(() => {
    setCreateDailyCostLoading(false);
  }, []);

  // Memoize removal handler
  const removeDailyList = useCallback((id: string) => {
    setDailyBuyList((prev) => prev.filter((list) => list.id !== id));
  }, []);

  // Memoize create daily buying handler
  const handleCreateDailybuying = useCallback(() => {
    if (dailyBuyList.length === 0) return;

    const mappedData = dailyBuyList.map((db) => ({
      particular: db.name,
      unit: db.unit,
      price: parseFloat(db.price),
      quantity: parseInt(db.quantity),
      Amount: parseFloat(db.cost),
    }));

    createDailyBuyingList({ DailyBuyings: mappedData });
  }, [dailyBuyList, createDailyBuyingList]);

  // Memoize date clear handler - updated to reset to today's date
  const handleClearDate = useCallback(() => {
    // Reset to today instead of undefined
    setSelectedDate(startOfDay(new Date()));

    // Invalidate both queries when resetting date
    if (queryClient) {
      queryClient.invalidateQueries(["get-daily-buying-list"]);
      queryClient.invalidateQueries(["orderList"]);
    }
  }, [queryClient]);

  // Memoize formatted date to prevent recreation on every render
  const formattedDate = useMemo(
    () =>
      selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : format(startOfDay(new Date()), "yyyy-MM-dd"),
    [selectedDate]
  );

  // Memoize the animation variants
  const containerAnimation = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemAnimation = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-2xl">Inventory</h2>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="text-sm font-medium">Filter by Date:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal border border-gray-300 hover:bg-gray-100",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "MMM dd, yyyy")
                ) : (
                  <span>Today</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
                defaultMonth={selectedDate}
              />
            </PopoverContent>
          </Popover>

          {selectedDate &&
            format(selectedDate, "yyyy-MM-dd") !==
              format(startOfDay(new Date()), "yyyy-MM-dd") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearDate}
                className="text-gray-500 hover:text-gray-700"
              >
                Reset to Today
              </Button>
            )}
        </motion.div>
      </div>

      <motion.div
        className="w-full flex flex-row gap-6"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {/* Main Content - UnifiedInventoryTable */}
        <div className="w-full flex flex-col gap-6">
          <motion.div className="w-full" variants={itemAnimation}>
            <UnifiedInventoryTable date={formattedDate} itemsPerPage={5} />
          </motion.div>
        </div>

        {/* Side Panel - Add Items */}
        <motion.div
          className="w-2/6 min-h-40 flex flex-col gap-8"
          variants={itemAnimation}
        >
          <div className="w-full flex border rounded-lg p-6 flex-col gap-6 shadow-sm">
            <h2 className="font-semibold">Add Item</h2>
            <form
              onSubmit={handleAddList}
              action=""
              className="flex flex-col gap-4"
            >
              <div className="w-full grid grid-cols-1 gap-2">
                <div className="w-full flex flex-col gap-4 lg:border-r md:border-r border-none border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Name
                    </label>
                    <Input
                      type="text"
                      {...dailyCostRegister("name", {
                        required: "Name is required",
                      })}
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Unit
                    </label>
                    <Input
                      type="text"
                      {...dailyCostRegister("unit", {
                        required: "Unit is required",
                      })}
                      placeholder="Eg. unit/kg"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Price
                    </label>
                    <Input
                      type="number"
                      {...dailyCostRegister("price", {
                        required: "Price required",
                      })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      {...dailyCostRegister("quantity", {
                        required: "Quantity is required",
                      })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Cost
                    </label>
                    <Input
                      type="number"
                      {...dailyCostRegister("cost", {
                        required: "Cost is required",
                      })}
                      placeholder="Enter Cost"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full justify-start mt-1">
                <Button
                  onClick={handleSubmit}
                  disabled={createDailyCostLoading}
                  className="bg-secondary text-white min-w-[7rem] flex items-center justify-center hover:bg-secondary/90"
                >
                  {createDailyCostLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Set"
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full border rounded-lg p-6 flex flex-col gap-5 shadow-sm">
            <h2 className="font-semibold">Daily Bought Items</h2>
            {dailyBuyList.length === 0 ? (
              <div className="w-full p-6 flex items-center justify-center">
                <p className="text-gray-400">No items added yet</p>
              </div>
            ) : (
              dailyBuyList.map((list) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full min-h-14 p-4 rounded-lg border flex flex-row items-center justify-between bg-slate-100 shadow-sm hover:bg-slate-200 transition-colors"
                >
                  <span className="font-semibold">{list.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {list.amount}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {list.cost.toLocaleString()} MMK
                  </span>
                  <span
                    onClick={() => removeDailyList(list.id)}
                    className="text-red-500 text-sm hover:cursor-pointer hover:text-red-700 transition-colors"
                  >
                    Remove
                  </span>
                </motion.div>
              ))
            )}

            <Button
              disabled={isLoading || dailyBuyList.length === 0}
              className="bg-secondary text-white min-w-[7rem] flex items-center mt-2 justify-center hover:bg-secondary/90 disabled:opacity-50"
              onClick={handleCreateDailybuying}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Memoize the entire component
export default React.memo(Inventory);
