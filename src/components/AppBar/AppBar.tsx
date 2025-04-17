import { Link } from "react-router-dom";
import Profile from "../common/profile-hover";
import HomeIcon from "../icons/home";
import OrderListIcon from "../icons/orderlist";

const AppBar = () => {
  return (
    <div className=" flex w-full items-center justify-between sticky top-0 lg:px-20 md:px-14 px-6  h-[10dvh] bg-white shadow-AppBarShadow font-[500]">
      <div className="lg:block hidden"></div>
      <div className="flex-1 flex flex-row w-full items-center lg:justify-center md:justify-center justify-start gap-x-10">
        <div className="flex items-center gap-x-2">
          <Link to="/home/order" className="flex items-center gap-x-2 text-black">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            to="/home/order/list"
            className="flex items-center gap-x-2 text-black"
          >
            {" "}
            <OrderListIcon />
            <span>OrderList</span>{" "}
          </Link>
        </div>
      </div>
      <div className="">
        <Profile />
      </div>
    </div>
  );
};

export default AppBar;
