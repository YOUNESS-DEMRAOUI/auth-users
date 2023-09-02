import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Main = () => {
  const { token } = useSelector((state) => state.user);
  if (!token) return <Navigate to={"/login"} />;
  return <div></div>;
};

export default Main;
