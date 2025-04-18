import MenuDetail from "@/components/Dashboard/Detail/menu/[menuId]";
import OrderDetail from "@/components/Dashboard/Detail/order/[orderId]";
import StaffDetail from "@/components/Dashboard/Detail/staff/[staffId]";
import { MenuForm, StaffForm } from "@/components/Dashboard/Form";
import {
  Inventory,
  Menu,
  OrderList,
  Overview,
  Staff,
} from "@/components/Dashboard/MainContent";
import Sidebar from "@/components/Dashboard/Sidebar";
import StockCrateForm from "@/components/Dashboard/Stock/StockCreateForm";
import StockList from "@/components/Dashboard/Stock/StockList";
import MobileNav from "@/components/MobileNav";
import { Route, Routes } from "react-router-dom";

const MainScreen = () => {
  return (
    <div className="w-screen flex flex-row gap-4 items-center">
      <Sidebar />
      <div className="w-full p-4 h-[100dvh] flex flex-col gap-4 ">
        <MobileNav />
        <div className="w-full h-[80dvh] flex-shrink-0 flex flex-grow items-center overflow-y-auto justify-center p-4">
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
            <Route path="inventory" element={<Inventory />} />
            <Route path="stock" element={<StockCrateForm />} />
            <Route path="stock/list" element={<StockList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
