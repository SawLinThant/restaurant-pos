import { AdminRoutes } from "@/lib/constants/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="w-[15vw] h-[97vh] max-h-screen p-4 border-2 rounded-md shadow-md">
      <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
        <div className="w-full h-24 rounded-md bg-secondary">
            <div className="w-full h-full flex items-center justify-center">
                <h2 className="font-bold text-lg text-white">POS</h2>
            </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          {AdminRoutes.map((route) => (
            <div
            onClick={() => navigate(`${route.path}`)}
            className="w-full flex flex-row gap-3 min-h-10 items-center justify-start pl-6 hover:border cursor-pointer border-gray-300 hover:rounded-md">
              <div className="cursor-pointer">{route.icon}</div>
              <label className="cursor-pointer" htmlFor="">{route.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;