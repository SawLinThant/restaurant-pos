import { Route, Routes } from "react-router-dom"
import Order from "./Order/Order"
import AppBar from "@/components/AppBar/AppBar"


const Home = () => {
  return (
    <div className="flex w-[100vw] flex-col ">
      <AppBar/>
      <Routes>
            <Route path="order/*" element={<Order/>}/>
<<<<<<< HEAD
            {/* <Route path="*" element={<Navigate to={"order/*"} replace/>}/> */}
=======
>>>>>>> feature/dashboard
      </Routes>
    </div>
  )
}

export default Home
