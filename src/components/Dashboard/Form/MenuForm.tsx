import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Loader } from "lucide-react";
import * as z from "zod";

import ComboBox from "@/components/common/custom-dropdown";
import ImageUpload from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/lib/constants/MenuOptions";
import { useCallback } from "react";

// Form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value: string) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be a positive number",
    }),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

// Check if ImageUpload component accepts a string or File for the image prop
// If it needs updating, check the implementation of ImageUpload component
interface ImageUploadProps {
  image: string | File | null;
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuForm = () => {
  // Keep track of the File object separately for upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  // This is what the ImageUpload component expects
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
        setImage("image-selected"); // Just a flag to indicate image is selected
        setImageUrl(URL.createObjectURL(file));
      }
    },
    []
  );

  // Function to upload image
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${baseUrl}/product/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedImageUrl = response.data?.data?.url;
      if (!uploadedImageUrl)
        throw new Error("Failed to get image URL from server");

      return uploadedImageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    }
  };

  // Function to create a new menu item
  const createMenuItem = async (
    data: FormData,
    imageUrl: string
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token not found");

    const payload = {
      name: data.name,
      price: parseInt(data.price),
      category: category,
      image: imageUrl,
      description: data.description,
    };

    await axios.post(`${baseUrl}/Product/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload the image
      const uploadedImageUrl = await uploadImage(imageFile);

      // Step 2: Create the menu item
      await createMenuItem(data, uploadedImageUrl);

      // Success handling
      toast.success("Menu item created successfully!");

      // Reset form after successful submission
      reset();
      setImageFile(null);
      setImage(null);
      setImageUrl("");
      setCategory("");

      // Navigate after a short delay to allow the user to see the success message
      setTimeout(() => navigate("/dashboard/menu"), 2000);
    } catch (error) {
      // Error handling
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`Failed to create menu item: ${errorMessage}`);
      console.error("Error creating menu item:", error);
    } finally {
      setLoading(false);
    }
  });

  const handleCancel = () => {
    if (loading) return; // Prevent navigation during form submission
    navigate("/dashboard/menu");
  };

  return (
    <div className="w-full h-full flex items-start justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="lg:w-[50vw] md:w-[50vw] w-full min-h-[40vh] p-8 mt-10 border-2 rounded-[40px]">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Menu</h2>
          </div>
          <div className="w-full">
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="w-full flex flex-col lg:pr-6 md:pr-6 pr0 gap-4 lg:border-r md:border-r border-none border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="name">Name</label>
                    <Input
                      id="name"
                      type="text"
                      {...register("name")}
                      placeholder="Enter menu name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="price">Price</label>
                    <Input
                      id="price"
                      type="number"
                      {...register("price")}
                      placeholder="Enter price"
                      aria-invalid={!!errors.price}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="category">Category</label>
                    <ComboBox
                      options={Category}
                      label="category"
                      setOptionValue={setCategory}
                    />
                    {!category && (
                      <p className="text-amber-500 text-sm">
                        Please select a category
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col lg:pl-6 md:pl-6 pl-0 gap-4">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="description">Description</label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Enter description"
                      aria-invalid={!!errors.description}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <ImageUpload
                      image={image}
                      imageUrl={imageUrl}
                      handleImageChange={handleImageChange}
                    />
                    {!imageFile && (
                      <p className="text-amber-500 text-sm mt-2">
                        Please upload an image
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-secondary text-white min-w-[7rem] flex items-center justify-center hover:text-black hover:border-green-600"
                >
                  {loading ? (
                    <Loader className="animate-spin mr-2" size={16} />
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
};

export default MenuForm;
