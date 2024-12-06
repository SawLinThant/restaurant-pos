import ComboBox from "@/components/common/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Roles } from "@/lib/constants/MenuOptions";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffForm = () => {
 const navigate = useNavigate();
 const [role,setRole] = useState<string>("");
 const baseUrl = import.meta.env.VITE_BASE_URL;
 const [createLoading, setCreateLoading] = useState<boolean>(false);
 const {register:staffRegister,handleSubmit:createStaffSubmit} = useForm();
 const handleCreateStaff = createStaffSubmit(async(data) => {
   if(data.password !== data.confirm_password){
       toast.warning("Password do not match");
       return
   }
   try{
     setCreateLoading(true);
     const payload = {
      username: data.name,
      phone: data.phone,
      role: role,
      password: data.password
     }
     const response = await axios.post(`${baseUrl}/`,payload);
     if(response.status === 200){
      toast.success("Staff created")
     }
   }catch(error){
    toast.error("Failed to create staff");
    throw new Error("Error creating staff")
   }finally{
     setCreateLoading(false);
   }
   
 })

  return (
    <div className="w-full h-full flex items-start justify-center">
      <ToastContainer position="top-center" autoClose={3000}/>
      <div className="w-[50vw] min-h-[40vh] p-8 mt-10 border-2 rounded-md">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Staff</h2>
          </div>
          <div className="w-full">
            <form  onSubmit = {handleCreateStaff} action="" className="flex flex-col gap-8">
              <div className="w-full grid grid-cols-2">
                <div className="w-full flex flex-col pr-6 gap-4 border-r border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Staff Name</label>
                    <Input 
                    placeholder="Enter staff name"
                    type="text"  
                    {...staffRegister("name",{
                      required:"Name is required"
                    })}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Phone Number</label>
                    <Input
                      type="text"  
                      {...staffRegister("phone",{
                        required:"Phone is required"
                      })}
                    placeholder="Enter phone number" />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Role</label>
                    <ComboBox options={Roles} label="role" setOptionValue={setRole}/>
                  </div>
                </div>
                <div className="w-full flex flex-col pl-6 gap-4">
                <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Password</label>
                    <Input 
                    placeholder="Enter password"
                    type="password"  
                    {...staffRegister("password",{
                      required:"Password is required"
                    })}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Confirm Password</label>
                    <Input 
                    placeholder="Enter password"
                    type="password"  
                    {...staffRegister("confirm_password",{
                      required:"Confirm password is required"
                    })}
                    />
                  </div>
                  
                </div>
              </div>
              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button onClick={() => navigate("/dashboard/staff")} className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600">
                  Cancel
                </Button>
                <Button className="bg-secondary text-white min-w-[7rem] hover:text-black hover:border-green-600">
                 {createLoading?<Loader/>:"Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffForm;
