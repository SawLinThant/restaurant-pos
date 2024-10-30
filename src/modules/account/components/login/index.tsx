import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "~/modules/common/components/input";
import LoadingIcon from "~/modules/common/icons/loading-button";

interface SignInCredentials extends FieldValues {
  phone: string;
  password: string;
}

const Login = () => {
    const [authError, setAuthError] = useState<string | undefined>(undefined);
    const router = useRouter();
    const handleError = (_e:Error) => {
        setAuthError("Invalid phone or password")
    }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>();
  const onSubmit = handleSubmit(async(credentials) => {
    const res = await signIn("credentials",{
        phone: credentials.phone,
        password:credentials.password,
        redirect:false,
    });
    console.log(res)
    if (res?.status === 401) {
        handleError(new Error("Invalid phone no or password"));
        toast.error(authError,{
            position:"top-center"
        })
      } else {
        router.push("/app/items/view-items");
      }
  });
  return (
    <>
    <ToastContainer/>
      <div className="h-2/4 w-[90vw] rounded border-2 border-gray-500 p-7 md:min-h-[50vh] md:w-[25rem] lg:min-h-[50vh] lg:w-[30rem]">
        <div className="flex h-full w-full flex-col items-center gap-10">
          <div>
            <h2 className="text-xl font-bold">Login</h2>
          </div>
          <div className="h-full w-full">
            <form onSubmit={onSubmit} className="flex h-full w-full flex-col gap-6" action="">
              <Input
                label="Phone Number"
                {...register("phone", { required: "Phone is required" })}
                type="text"
                errors={errors}
              />
              <Input
                label="Password"
                {...register("password", { required: "Password is required" })}
                type="password"
                errors={errors}
              />
               <button
                type="submit"
                disabled={isSubmitting}
                className="rounded border-2 border-gray-500 bg-primary py-3 text-white flex flex-row items-center justify-center"
              >
              {isSubmitting?<LoadingIcon size={20}/>:"Login"}  
              </button>
              <div className="flex w-full flex-row items-center justify-center">
                <Link href="/register">
                  Do not have an account yet?{" "}
                  <span className="text-blue-700 underline">Register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
