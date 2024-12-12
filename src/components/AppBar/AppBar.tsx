import Profile from "../common/profile-hover";
import HomeIcon from "../icons/home";
import OrderListIcon from "../icons/orderlist";

const AppBar = () => {
  return (
    <div className=" flex w-full items-center justify-between sticky top-0 lg:px-20 md:px-14  h-[10vh] bg-white shadow-AppBarShadow font-[500]">
      <div className=""></div>
      <div className="flex-1 flex flex-row w-full items-center justify-center gap-x-10">
        <div className="flex items-center gap-x-2">
          <HomeIcon />
          <span>Home</span>
        </div>
        <div className="flex items-center gap-x-2">
          <OrderListIcon />
          <span>OrderList</span>
        </div>
      </div>
      <div className="">
        <Profile/>
      </div>
    </div>
  );
};

export default AppBar;
