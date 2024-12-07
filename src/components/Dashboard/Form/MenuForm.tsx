import ComboBox from "@/components/common/custom-dropdown";
import ImageUpload from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Roles } from "@/lib/constants/MenuOptions";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuForm = () => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const { register: menuRegister, handleSubmit: createMenuSubmit } = useForm();
  const [category, setCategory] = useState<string>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      console.log(imageUrl);
    }
  };
  const handleCreateMenu = createMenuSubmit(async (data) => {
    try {
      setCreateLoading(true);

      const formData = new FormData();
      formData.append("file",image)
      const uploadResponse = await axios.post(`${baseUrl}/product/upload`,formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      const uploadedImageUrl = uploadResponse.data?.url || "";
      if(!uploadedImageUrl){
        throw new Error("Error uploading image")
      }

      const payload = {
        name: data.name,
        price: data.price,
        category: category,
        image_url: uploadedImageUrl,
      };
      const response = await axios.post(`${baseUrl}/Product/create`, payload);
      if (response.status === 200) {
        toast.success("Staff created");
      }
    } catch (error) {
    } finally {
      setCreateLoading(false);
    }
  });
  return (
    <div className="w-full h-full flex items-start justify-center">
      <ToastContainer position="top-center" autoClose={3000}/>
      <div className="w-[50vw] min-h-[40vh] p-8 mt-10 border-2 rounded-[40px]">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Menu</h2>
          </div>
          <div className="w-full">
            <form
              onSubmit={handleCreateMenu}
              action=""
              className="flex flex-col gap-8"
            >
              <div className="w-full grid grid-cols-2">
                <div className="w-full flex flex-col pr-6 gap-4 border-r border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Name</label>
                    <Input
                      type="text"
                      {...menuRegister("name", {
                        required: "Name is required",
                      })}
                      placeholder="Enter menu name"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Price</label>
                    <Input
                      type="number"
                      {...menuRegister("price", {
                        required: "Price is required",
                      })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Category</label>
                    <ComboBox
                      options={Roles}
                      label="role"
                      setOptionValue={setCategory}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col pl-6 gap-4">
                <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Description</label>
                    <Textarea
                      {...menuRegister("description", {
                        required: "Description is required",
                      })}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="w-full">
                    <ImageUpload
                      image={image}
                      imageUrl={imageUrl}
                      handleImageChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button
                  onClick={() => navigate("/dashboard/menu")}
                  className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600"
                >
                  Cancel
                </Button>
                <Button className="bg-secondary text-white min-w-[7rem] flex items-center justify-center hover:text-black hover:border-green-600">
                  {createLoading ? <Loader /> : "Create"}
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
