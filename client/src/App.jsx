import { useSelector } from "react-redux";
import "./App.css";
import { Login, Main, Users } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { SideBar } from "./components";
import { useState } from "react";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { token } = useSelector((state) => state.user);

  return (
    <div className="h-screen w-screen">
      {token && (
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      <div
        className={`bg-gray-100 h-full relative w-full ${
          token
            ? isCollapsed
              ? "ml-[70px] p-5 !w-[calc(100vw-70px)]"
              : "ml-52 p-5 !w-[calc(100vw-13rem)]"
            : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
