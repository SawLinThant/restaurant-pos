import { Route, Routes } from "react-router-dom";
import OrderManagement from "./OrderManagement";
import TableList from "./TableList";


const Order = () => {
  return (
    <div className="flex flex-1 w-full items-center flex-col">
      <Routes>
        <Route path="/table" element={<OrderManagement/>}/>
        <Route path="*" element={<TableList/>}/>
        {/* <Route path="*" element={<Navigate to={"management"} replace />} /> */}
      </Routes>
    </div>
  );
};

export default Order;
