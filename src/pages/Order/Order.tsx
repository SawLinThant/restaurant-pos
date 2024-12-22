import { Route, Routes } from "react-router-dom";
import OrderManagement from "./OrderManagement";
import TableList from "./TableList";
import OrderDetailPage from "./OrderDetailPage";


const Order = () => {
  return (
    <div className="flex flex-1 w-full items-center flex-col">
      <Routes>
        <Route path="*" element={<OrderManagement/>}/>
        <Route path="/list" element={<TableList/>}/>
        <Route path="/detail/:orderId" element={<OrderDetailPage/>}/>
        {/* <Route path="*" element={<Navigate to={"management"} replace />} /> */}
      </Routes>
    </div>
  );
};

export default Order;
