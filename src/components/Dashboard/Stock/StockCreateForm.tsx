import { useCreateStock } from "@/lib/hooks/stock/useCreateStock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import ComboBox from "@/components/common/custom-dropdown";

interface StockFormData {
  ingredientName: string;
  quantity: string;
  unit: string;
  threshold: string;
}

function StockCreateForm() {
  const navigate = useNavigate();
  // const [productId, setProductId] = useState<string>("");
  // const [ingredientId, setIngredientId] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Common units for stock
  const unitOptions = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "g", label: "Gram (g)" },
    { value: "l", label: "Liter (l)" },
    { value: "ml", label: "Milliliter (ml)" },
    { value: "pcs", label: "Pieces (pcs)" },
    { value: "box", label: "Box" },
    { value: "pack", label: "Pack" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockFormData>();
  const { mutate: createStock } = useCreateStock({
    onSuccess: () => {
      toast.success("Stock created successfully");
      reset();
      // setProductId("");
      // setIngredientId("");
      setIsSubmitting(false);
      // Navigate back to stock list after successful creation
      setTimeout(() => {
        navigate("/dashboard/stock");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create stock");
      setIsSubmitting(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // if (!productId) {
    //   toast.error("Please select a product");
    //   return;
    // }

    // if (!ingredientId) {
    //   toast.error("Please select an ingredient");
    //   return;
    // }

    if (!unit) {
      toast.error("Please select a unit");
      return;
    }

    setIsSubmitting(true);

    const stockData = {
      ingredientName: data.ingredientName,
      quantity: parseFloat(data.quantity),
      unit: unit,
      threshold: parseFloat(data.threshold),
    };

    createStock(stockData);
  });

  return (
    <div className="w-full h-full flex items-start justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="lg:w-[50vw] md:w-[50vw] w-full min-h-[40vh] p-8 mt-10 border-2 rounded-[40px]">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Stock</h2>
          </div>
          <div className="w-full">
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="w-full flex flex-col lg:pr-6 md:pr-6 pr-0 gap-4 lg:border-r md:border-r border-none border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="ingredientName">Ingredient Name</label>
                    <Input
                      type="text"
                      {...register("ingredientName", {
                        required: "Ingredient Name is required",
                      })}
                      placeholder="Enter ingredient name"
                    />
                    {errors.ingredientName && (
                      <p className="text-red-500 text-sm">
                        {errors.ingredientName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col lg:pl-6 md:pl-6 pl-0 gap-4">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="quantity">Quantity</label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                          value: 0.01,
                          message: "Quantity must be greater than 0",
                        },
                      })}
                      placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="unit">Unit</label>
                    <ComboBox
                      options={unitOptions}
                      label="unit"
                      setOptionValue={setUnit}
                    />
                    {!unit && (
                      <p className="text-red-500 text-sm">Unit is required</p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="threshold">Threshold</label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("threshold", {
                        required: "Threshold is required",
                        min: {
                          value: 0,
                          message: "Threshold must be 0 or greater",
                        },
                      })}
                      placeholder="Enter threshold"
                    />
                    {errors.threshold && (
                      <p className="text-red-500 text-sm">
                        {errors.threshold.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button
                  type="button"
                  onClick={() => navigate("/dashboard/stock")}
                  className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-white min-w-[7rem] flex items-center justify-center hover:text-black hover:border-green-600"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCreateForm;
