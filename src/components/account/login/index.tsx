import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm : React.FC = () => {
    const navigate = useNavigate();
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="lg:w-[30vw] md:w-[50vw] w-[95%] min-h-[40vh] flex flex-col gap-8">
        <h2 className="w-full text-center font-semibold text-2xl">Login</h2>
        <div className="w-full h-full flex items-center px-2 py-12 justify-center rounded-md border shadow-lg">
          <div className="w-3/4 h-3/4">
            <form action="" className="w-full h-full flex flex-col gap-2">
              <div className="w-full h-full flex flex-col gap-4">
                <Input className="h-[2.75rem]" type="text" placeholder="Enter User Name"/>
                <Input className="h-[2.75rem]" type="password" placeholder="Enter Password" />
              </div>
              <div
              onClick={() => navigate('/register')}
              className="w-full text-center text-xs underline hover:cursor-pointer text-muted-foreground">Does not have an account?</div>
              <Button className="w-full h-[2.75rem] p-4 mt-4 text-white hover:text-black bg-secondary hover:border-green-600">Login</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
