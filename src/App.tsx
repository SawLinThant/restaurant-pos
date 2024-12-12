// import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import MainScreen from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/dashboard/*" element={<MainScreen />} />
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<Navigate to={"/"} replace />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
