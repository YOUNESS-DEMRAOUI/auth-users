import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { userApi } from "../redux/services/userApi";
import { AiOutlineProfile } from "react-icons/ai";

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(userApi.util.resetApiState());
  };
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div
      id="sidebar"
      className={
        "flex flex-col justify-between py-4 min-h-screen h-full bg-[#0F172A] overflow-auto fixed top-0 left-0" +
        (isCollapsed ? " w-[70px]" : " w-52")
      }
    >
      <div>
        {!isCollapsed ? (
          <div className="flex flex-col justify-center items-center gap-2 mb-3">
            <img
              src="/images/219983.png"
              className="h-24 w-24"
              alt=""
            />
            <p className="text-white font-medium">{userInfo.login}</p>
          </div>
        ) : (
          <button
            className={
              "flex items-center gap-3 px-6 py-3 text-[#CBC9CD] hover:border-l-[3px] hover:bg-[#111a30] hover:border-l-[#FEC95C] hover:pl-[21px] hover:text-[rgb(254,201,92)] cursor-pointer"
            }
            onClick={() => setIsCollapsed(false)}
          >
            <AiOutlineProfile />
          </button>
        )}
        {links.map((link) =>
          userInfo?.role != "User" ? (
            <NavLink
              key={link.name}
              className={
                "flex items-center gap-3 px-6 py-3 text-[#CBC9CD] hover:border-l-[3px] hover:bg-[#111a30] hover:border-l-[#FEC95C] hover:pl-[21px] hover:text-[rgb(254,201,92)] cursor-pointer"
              }
              to={link.to}
            >
              <link.icon />
              {!isCollapsed && <p>Users</p>}
            </NavLink>
          ) : (
            ""
          )
        )}
        <button
          className={
            "flex items-center w-full gap-3 px-6 py-3 text-[#CBC9CD] hover:border-l-[3px] hover:bg-[#111a30] hover:border-l-[#FEC95C] hover:pl-[21px] hover:text-[rgb(254,201,92)] cursor-pointer"
          }
          onClick={handleLogout}
        >
          <BiLogOut size={17} />
          {!isCollapsed && <p>Logout</p>}
        </button>
      </div>
      <button
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
        className="px-6 flex border-0 items-center gap-3 text-[#CBC9CD]"
      >
        {isCollapsed ? (
          <RxDoubleArrowRight size={18} strokeWidth={1.5} />
        ) : (
          <>
            <RxDoubleArrowLeft size={18} strokeWidth={1.5} />
            <p className="text-sm">Collapse menu</p>
          </>
        )}
      </button>
    </div>
  );
};

export default SideBar;
