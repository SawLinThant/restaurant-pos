import ComboBox from "@/components/common/custom-dropdown";
import ImageUpload from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Roles } from "@/lib/constants/MenuOptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuForm = () => {
  const [image,setImage] = useState<any>(null);
  const [imageUrl,setImageUrl] = useState<string>("");
  const navigate = useNavigate();
  const [optionValue,setOptionValue] = useState<string>("")
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      console.log(imageUrl)
    }
  }
  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="w-[50vw] min-h-[40vh] p-8 mt-10 border-2 rounded-md">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Menu</h2>
          </div>
          <div className="w-full">
            <form action="" className="flex flex-col gap-8">
              <div className="w-full grid grid-cols-2">
                <div className="w-full flex flex-col pr-6 gap-4 border-r border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Name</label>
                    <Input placeholder="Enter menu name" />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Price</label>
                    <Input placeholder="Enter price" />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Category</label>
                    <ComboBox options={Roles} label="role" setOptionValue={setOptionValue}/>
                  </div>
                </div>
                <div className="w-full flex flex-col pl-6">
                  <div className="w-full">
                    <ImageUpload image={image} imageUrl={imageUrl} handleImageChange={handleImageChange}/>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button onClick={() => navigate("/dashboard/menu")} className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600">
                  Cancel
                </Button>
                <Button className="bg-secondary text-white min-w-[7rem] hover:text-black hover:border-green-600">
                  Create
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
