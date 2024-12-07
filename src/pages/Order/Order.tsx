import { Navigate, Route, Routes } from "react-router-dom";
import OrderManagement from "./OrderManagement";

const Order = () => {
  return (
    <div className="flex flex-1 w-full items-center flex-col">
      <Routes>
        <Route path="*" element={<OrderManagement/>}/>
        {/* <Route path="*" element={<Navigate to={"management"} replace />} /> */}
      </Routes>
    </div>
  );
};

export default Order;
