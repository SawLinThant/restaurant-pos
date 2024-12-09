import { AdminRoutes } from "@/lib/constants/Routes";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <div className="w-[15vw] h-[97vh] max-h-screen p-4 border-2 rounded-md shadow-md flex flex-col justify-between">
      <div className="w-full overflow-y-auto flex flex-col gap-3">
        <div className="w-full h-24 rounded-md bg-secondary">
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="font-bold text-lg text-white">POS</h2>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          {AdminRoutes.map((route) => (
            <div
              onClick={() => {
                navigate(`${route.path}`);
              }}
              className={clsx(
                "w-full flex flex-row gap-3 min-h-12 items-center justify-start pl-6 hover:border cursor-pointer border-gray-300 hover:rounded-md",
                {
                  "bg-secondary text-white rounded-md":
                    location.pathname.includes(route.path),
                }
              )}
            >
              <div className="cursor-pointer">{route.icon}</div>
              <label className="cursor-pointer" htmlFor="">
                {route.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t-2 pt-3 border-gray-300">
        <div onClick={Logout} className="w-full flex flex-row gap-3 min-h-12 items-center justify-start pl-6 hover:border cursor-pointer border-gray-300 hover:rounded-md">
          <div className="cursor-pointer">
            <RiLogoutBoxLine size={20} />
          </div>
          <label className="cursor-pointer" htmlFor="">
            Logout
          </label>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
