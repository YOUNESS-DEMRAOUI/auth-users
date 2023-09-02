import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { userApi } from "../redux/services/userApi";

const Error = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(userApi.util.resetApiState());
  };
  return <div>Error</div>;
};

export default Error;
