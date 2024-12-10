// import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import MainScreen from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/dashboard/*" element={<MainScreen />} />
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
