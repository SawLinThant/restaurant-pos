//import { ProductChart } from "@/components/common/product-chart";
import VoucherTable from "@/components/common/voucher-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBulkDailyBuying } from "@/lib/hooks/daily-buying/useCreateBulkDailyBuying";
import { DailyItem } from "@/lib/type/CommonType";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
//import { useNavigate } from "react-router-dom";

const Inventory: React.FC = () => {
  const [createDailyCostLoading, setCreateDailyCostLoading] =
    useState<boolean>(false);
  //const navigate = useNavigate();
  const [dailyBuyList, setDailyBuyList] = useState<DailyItem[]>([]);
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
      },
      onError: () => {
        toast.error("Fail to add items");
      },
    });

  const handleAddList = createMenuSubmit(async (data) => {
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
  });
  const handleSubmit = () => {
    setCreateDailyCostLoading(false);
  };
  const removeDailyList = (id: string) => {
    setDailyBuyList((prev) => prev.filter((list) => list.id !== id));
  };

  const handleCreateDailybuying = () => {
    console.log(dailyBuyList);
    createDailyBuyingList({
      DailyBuyings: dailyBuyList.map((db) => {
        return {
          particular: db.name,
          unit: db.unit,
          price: parseFloat(db.price),
          quantity: parseInt(db.quantity),
          Amount: parseFloat(db.cost),
        };
      }),
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Inventory</h2>
      </div>

      <div className="w-full flex flex-row gap-6">
        {/* <div className="w-4/6 min-h-40 flex flex-col">
           <div className="w-full flex flex-row gap-4">
           <div className="w-full min-h-44">
              <ProductChart/>
            </div>
            <div className="w-full max-w-[250px] min-h-44 p-8 rounded- border flex flex-col gap-10 bg-slate-100 shadow-md">
              <div className="w-full min-h-24 rounded-lg border relative flex items-center justify-center bg-white shadow-lg">
                <div className="w-28 h-7 border rounded-md absolute top-0 left-2 -translate-y-4 bg-secondary text-white text-center font-semibold">
                  Daily Cost
                </div>
                <div className="flex flex-row items-center">
                  <span><strong>1000</strong> MMK</span>
                </div>
              </div>
              <div className="w-full min-h-24 rounded-lg border relative flex items-center justify-center bg-white shadow-lg">
                <div className="w-28 h-7 border rounded-md absolute top-0 left-2 -translate-y-4 bg-secondary text-white text-center font-semibold">
                  Daily Sell
                </div>
                <div className="flex flex-row items-center">
                  <span><strong>1500</strong> MMK</span>
                </div>
              </div>
              <div className="w-full min-h-24 rounded-lg border relative flex items-center justify-center bg-white shadow-lg">
                <div className="w-28 h-7 border rounded-md absolute top-0 left-2 -translate-y-4 bg-secondary text-white text-center font-semibold">
                  Daily Profit
                </div>
                <div className="flex flex-row items-center">
                  <span><strong>500</strong> MMK</span>
                </div>
              </div>
            </div>
            
           </div>
        </div> */}
        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-row items-center justify-between">
              <h2 className="font-semibold text-lg">Daily Buy List</h2>
              <div className="flex flex-row items-center gap-4">
                <Button className="rounded-md bg-secondary text-white border">
                  Export CSV
                </Button>
                <Button className="rounded-md bg-secondary text-white border">
                  Export PDF
                </Button>
              </div>
            </div>
            <VoucherTable itemsPerPage={5} particularFilter="" />
          </div>
          {/* <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-row items-center justify-between">
              <h2 className="font-semibold text-lg">Daily Order</h2>
              <div className="flex flex-row items-center gap-4">
                <Button className="rounded-md bg-secondary text-white border">
                  Export CSV
                </Button>
                <Button className="rounded-md bg-secondary text-white border">
                  Export PDF
                </Button>
              </div>
            </div>
            <VoucherTable data={[]} />
          </div> */}
        </div>

        <div className="w-2/6 min-h-40 flex flex-col gap-8">
          <div className="w-full flex border rounded-lg p-6 flex-col gap-6">
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
                        required: "Amountis required",
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
                        required: "price required",
                      })}
                      placeholder="price"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="" className="text-sm">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      {...dailyCostRegister("quantity", {
                        required: "Cost is required",
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
                {/* <Button
                  onClick={() => navigate("/dashboard/menu")}
                  className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600"
                >
                  Cancel
                </Button> */}
                <Button
                  onClick={handleSubmit}
                  disabled={createDailyCostLoading}
                  className="bg-secondary text-white min-w-[7rem] flex items-center justify-center hover:text-black hover:border-green-600"
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
          <div className="w-full border rounded-lg p-6 flex flex-col gap-5">
            <h2 className="font-semibold">Daily Bought Items</h2>
            {dailyBuyList.map((list) => (
              <div className="w-full min-h-14 p-4 rounded-lg border flex flex-row items-center justify-between bg-slate-100 shadow-sm">
                <span className="font-semibold">{list.name}</span>
                <span className="text-muted-foreground text-sm">
                  {list.amount}
                </span>
                <span className="text-muted-foreground text-sm">
                  {list.cost.toLocaleString()} MMK
                </span>
                <span
                  onClick={() => removeDailyList(list.id)}
                  className="text-red-700 text-sm hover:cursor-pointer"
                >
                  Remove
                </span>
              </div>
            ))}

            <Button
              disabled={createDailyCostLoading}
              className="bg-secondary text-white min-w-[7rem] flex items-center mt-2 justify-center hover:text-black hover:border-green-600"
              onClick={handleCreateDailybuying}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inventory;
