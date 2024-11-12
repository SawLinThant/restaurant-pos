import HomeIcon from "../icons/home";
import OrderListIcon from "../icons/orderlist";

const AppBar = () => {
  return (
    <div className=" flex w-full items-center justify-center sticky top-0 px-[20px] h-[10vh] bg-white shadow-AppBarShadow font-[500]">
      <div className="">menu</div>
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
      <div className="pr-[90px]">
        <div className="h-[46px] w-[46px] rounded-full bg-blue-400"></div>
      </div>
    </div>
  );
};

export default AppBar;
