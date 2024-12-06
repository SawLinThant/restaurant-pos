import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { decodeToken } from "@/lib/utils";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm : React.FC = () => {
  const navigate = useNavigate();
  const {handleSubmit:loginSubmit, register:loginRegister} = useForm();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleLogin = loginSubmit(async(data) => {
      try{
        setLoginLoading(true);
        const payload = {
          email: data.email,
          password: data.password
        }
        const response = await axios.post(`${baseUrl}/auth/register`, payload)
        if(response.status === 200){
          const token = response.data.token;
          const decodedToken = decodeToken(token);
          const role = decodedToken?.role 
          if(role === "WAITER"){
            navigate('/home')
          }else{
            navigate('/dashboard')
          } 
        }
      }catch(error){
        toast.error("Failed to login")
        throw new Error("Errow loging in");
      }finally{
        setLoginLoading(false)
      }
  })

  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000}/>
      <div className="lg:w-[30vw] md:w-[50vw] w-[95%] min-h-[40vh] flex flex-col gap-8">
        <h2 className="w-full text-center font-semibold text-2xl">Login</h2>
        <div className="w-full h-full flex items-center px-2 py-12 justify-center rounded-md border shadow-lg">
          <div className="w-3/4 h-3/4">
            <form onSubmit={handleLogin} action="" className="w-full h-full flex flex-col gap-2">
              <div className="w-full h-full flex flex-col gap-4">
                <Input
                typeof="email"
                {...loginRegister("email",{
                  required:"Email is required"
                })}
                className="h-[2.75rem]" type="text" placeholder="Enter Email"/>
                <Input
                typeof="text"
                {...loginRegister("password",{
                  required:"Password is required"
                })}
                className="h-[2.75rem]" type="password" placeholder="Enter Password" />
              </div>
              <div
              onClick={() => navigate('/register')}
              className="w-full text-center text-xs underline hover:cursor-pointer text-muted-foreground">Does not have an account?</div>
              <Button disabled={loginLoading} className="w-full h-[2.75rem] flex items-center justify-center p-4 mt-4 text-white hover:text-black bg-secondary hover:border-green-600">{loginLoading?<Loader/>:"Login"}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
