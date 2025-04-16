import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminRoutes } from "@/lib/constants/Routes";
import clsx from "clsx";
import { AlignJustify, ChevronRight } from "lucide-react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function MobileSidebar() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:w-[70vw] w-full h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
            <div className="h-10"></div>
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-32 rounded-md bg-secondary">
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="font-bold text-lg text-white">POS</h2>
          </div>
        </div>
        <div className="w-full h-[75vh] md:h-[80vh] flex flex-col">
          <div className="w-full flex flex-col gap-2 mt-6">
            {AdminRoutes.map((route, index) => (
              <SheetClose className="p-0">
                <div
                  key={index}
                  onClick={() => {
                    navigate(`${route.path}`);
                  }}
                  className={clsx(
                    "w-full flex flex-row gap-3 min-h-12 items-center bg-gray-200 justify-start pl-6 hover:border cursor-pointer border-gray-300 rounded-md",
                    {
                      "bg-secondary text-white rounded-md":
                        location.pathname.includes(route.path),
                    }
                  )}
                >
                  <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <div className="cursor-pointer">{route.icon}</div>
                      <label className="cursor-pointer" htmlFor="">
                        {route.label}
                      </label>
                    </div>
                    <div>
                      <ChevronRight />
                    </div>
                  </div>
                </div>
              </SheetClose>
            ))}
          </div>
          <div className="w-full border-t-2 pt-3 border-gray-300 mt-8">
            <div
              onClick={Logout}
              className="w-full flex flex-row gap-3 mt-4 min-h-12 items-center justify-center pl-6 border hover:border cursor-pointer border-gray-500 rounded-md"
            >
              <div className="cursor-pointer">
                <RiLogoutBoxLine size={20} />
              </div>
              <label className="cursor-pointer" htmlFor="">
                Logout
              </label>
            </div>
          </div>
        </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
