import ComboBox from "@/components/common/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/lib/constants/config";
import { Roles } from "@/lib/constants/MenuOptions";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [registerLoading, setRegsiterLoading] = useState<boolean>(false);
  const { handleSubmit: createSubmit, register: createRegister,reset:resetForm } = useForm(); 

  const reset = () => {
    resetForm();
    setRole("");
  }
 
  const handleRegister = createSubmit(async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error("Password do not match");
      return;
    }
    try {
      setRegsiterLoading(true);
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: role,
      };
      const response = await axios.post(`${baseUrl}/auth/register`,payload)
      if(response.status === 200){
        reset();
        console.log("Account created successfully:", response.data);
        toast.success("Account created successfully")
      }
      
    } catch (error) {
      toast.error("Failed to create account");
      console.log("Error creating account", error);
      throw new Error("Error creating account");
    } finally {
      setRegsiterLoading(false);
    }
  });
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="lg:w-[30vw] md:w-[50vw] w-[95%] min-h-[40vh] flex flex-col lg:gap-8 md:gap-8 gap-4 -translate-y-20 lg:translate-y-0 md:translate-y-0">
        <h2 className="w-full text-center font-semibold text-2xl">Register</h2>
        <div className="w-full h-full flex items-center px-2 lg:py-12 md:py-12 py-6 justify-center rounded-md lg:border md:borde lg:shadow-lg md:shadow-lg">
          <div className="lg:w-3/4 md:h-3/4 w-[90%] h-3/4">
            <form
              onSubmit={handleRegister}
              action=""
              className="w-full h-full flex flex-col gap-2"
            >
              <div className="w-full h-full flex flex-col gap-4">
                <Input
                  {...createRegister("name", {
                    required: "Username is required",
                  })}
                  className="h-[2.75rem]"
                  type="text"
                  placeholder="Enter User Name"
                />
                <Input
                  {...createRegister("phone", {
                    required: "Email is required",
                  })}
                  className="h-[2.75rem]"
                  type="text"
                  placeholder="Enter phone number"
                />
                 <Input
                  {...createRegister("email", {
                    required: "Email is required",
                  })}
                  className="h-[2.75rem]"
                  type="text"
                  placeholder="Enter email"
                />
                <Input
                  {...createRegister("password", {
                    required: "Password is required",
                  })}
                  className="h-[2.75rem]"
                  type="password"
                  placeholder="Enter Password"
                />
                <Input
                  {...createRegister("confirm_password", {
                    required: "ConfirmPassword is required",
                  })}
                  className="h-[2.75rem]"
                  type="password"
                  placeholder="Confirm Password"
                />
                <ComboBox
                  options={Roles}
                  label="role"
                  setOptionValue={setRole}
                />
              </div>
              <div
                onClick={() => navigate("/login")}
                className="w-full text-center text-xs underline hover:cursor-pointer text-muted-foreground"
              >
                Already have an account?
              </div>
              <Button
                disabled={registerLoading}
                className="w-full h-[2.75rem] flex items-center justify-center p-4 mt-4 text-white bg-secondary hover:text-black hover:border-green-600"
              >
                {registerLoading ? <Loader className="animate-spin"/> : "Register"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterForm;
