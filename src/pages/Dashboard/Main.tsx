import MenuForm from "@/components/Dashboard/Form/MenuForm";
import { Menu, OrderList, Overview, Staff } from "@/components/Dashboard/MainContent";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";

const MainScreen = () => {
  return (
    <div className="w-screen h-screen overflow-hidden p-4 flex flex-row gap-4 items-center">
      <Sidebar />
      <div className="w-full h-[97vh] flex items-center justify-center p-4">
        <div className="w-full h-full overflow-y-auto">
            <Routes>
                <Route path="*" element={<Overview/>}/>
                <Route path="staff" element={<Staff/>}/>
                <Route path="menu" element={<Menu/>}/>
                <Route path="menu/createmenu" element={<MenuForm/>}/>
                <Route path="orderlist" element={<OrderList/>}/>
            </Routes>
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
