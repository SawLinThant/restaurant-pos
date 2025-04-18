// import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainScreen from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" closeButton expand={false} />
        <Router>
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/dashboard/*" element={<MainScreen />} />
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="*" element={<Navigate to={"/"} replace />} /> */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
