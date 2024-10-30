import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import DropDownMenu from "~/modules/common/components/dropdown-menu";
import Input from "~/modules/common/components/input";
import { api } from "~/utils/api";
import { staffRole } from "~/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import LoadingIcon from "~/modules/common/icons/loading-button";

interface RegisterCredentials extends FieldValues {
  name: string;
  phone: string;
  password: string;
  role: string;
}

const Register = () => {
  const [role, setRole] = useState<string>("");
  console.log(role);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>();

  const registerMutation = api.auth.register.useMutation({
    onMutate: async (data: any) => {
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Registration Successful",{
        position:"top-center"
      });
      reset();
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });

  const onSubmit = handleSubmit(async (credentials) => {
    if (role === "") {
      toast.warning("Please choose role",{
        position:"top-center"
      });
    }else if(credentials.password !== credentials.confirm_password) {
        toast.warning("Please confirm password",{
            position:"top-center"
          });
    }  
    else {
      try {
        registerMutation.mutate({
          name: credentials.name,
          phone: credentials.phone,
          email: credentials.email,
          password: credentials.password,
          userType: role,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to register");
      }
    }
  });

  return (
    <>
      <ToastContainer />
      <div className="h-2/4 w-[90vw] rounded border-2 border-gray-500 p-7 md:min-h-[50vh] md:w-[70vw] lg:min-h-[50vh] lg:w-[30vw]">
        <div className="flex h-full w-full flex-col items-center gap-10">
          <div>
            <h2 className="text-xl font-bold">Register</h2>
          </div>
          <div className="h-full w-full">
            <form
              onSubmit={onSubmit}
              className="flex h-full w-full flex-col gap-6"
              action=""
            >
              <Input
                label="Staff Name"
                {...register("name", { required: "Name is required" })}
                type="text"
                errors={errors}
              />
              <Input
                label="Phone Number"
                {...register("phone", { required: "Phone is required" })}
                type="text"
                errors={errors}
              />
              <Input
                label="Email"
                {...register("email", { required: "Emailis required" })}
                type="email"
                errors={errors}
              />
              <Input
                label="Password"
                {...register("password", { required: "Password is required" })}
                type="password"
                errors={errors}
              />
              <Input
                label="Confirm Password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                })}
                type="password"
                errors={errors}
              />
              <DropDownMenu
                options={staffRole}
                setOption={setRole}
                defaultLabel="Select Role"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded border-2 border-gray-500 bg-primary py-3 text-white flex flex-row items-center justify-center"
              >
              {registerMutation.isPending?<LoadingIcon size={20}/>:"Register"}  
              </button>
              <div className="flex w-full flex-row items-center justify-center">
                <Link href="/login">
                  Already have an account?{" "}
                  <span className="text-blue-700 underline">Login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
