import MenuDetail from "@/components/Dashboard/Detail/menu/[menuId]";
import OrderDetail from "@/components/Dashboard/Detail/order/[orderId]";
import StaffDetail from "@/components/Dashboard/Detail/staff/[staffId]";
import { MenuForm, StaffForm } from "@/components/Dashboard/Form";
import {
  Menu,
  OrderList,
  Overview,
  Staff,
} from "@/components/Dashboard/MainContent";
import Sidebar from "@/components/Dashboard/Sidebar";
import MobileNav from "@/components/MobileNav";
import { Route, Routes } from "react-router-dom";

const MainScreen = () => {
  return (
    <div className="w-screen h-screen overflow-hidden p-4 flex flex-row gap-4 items-center">
      <Sidebar />
      <div className="w-full h-full flex flex-col">
        <MobileNav />
        <div className="w-full h-[97vh] overflow-y-auto flex items-center justify-center p-4">
          <div className="w-full h-full ">
            <Routes>
              <Route path="*" element={<Overview />} />
              <Route path="staff" element={<Staff />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:menuId" element={<MenuDetail />} />
              <Route path="staff/:staffId" element={<StaffDetail />} />
              <Route path="order/:orderId" element={<OrderDetail />} />
              <Route path="menu/createmenu" element={<MenuForm />} />
              <Route path="staff/createstaff" element={<StaffForm />} />
              <Route path="order" element={<OrderList />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
