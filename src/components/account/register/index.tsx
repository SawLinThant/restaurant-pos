import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm:React.FC = () => {
    const navigate = useNavigate();
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="lg:w-[30vw] md:w-[50vw] w-[95%] min-h-[40vh] flex flex-col gap-8">
        <h2 className="w-full text-center font-semibold text-2xl">Login</h2>
        <div className="w-full h-full flex items-center px-2 py-12 justify-center rounded-md border shadow-lg">
          <div className="w-3/4 h-3/4">
            <form action="" className="w-full h-full flex flex-col gap-2">
              <div className="w-full h-full flex flex-col gap-4">
                <Input type="text" placeholder="Enter User Name"/>
                <Input type="password" placeholder="Enter Password" />
                <Input type="password" placeholder="Confirm Password" />
              </div>
              <div
              onClick={() => navigate('/login')}
              className="w-full text-center text-sm underline hover:cursor-pointer text-muted-foreground">Already have an account?</div>
              <Button className="w-full p-4 mt-4 text-white bg-secondary hover:text-black">Register</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterForm;
