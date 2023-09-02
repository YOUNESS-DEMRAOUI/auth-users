import { useState } from "react";
import { useAuthMutation } from "../redux/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserInfo, logout } from "../redux/reducers/userSlice";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { BiLockAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

const Login = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [login] = useAuthMutation();
  const [errMsg, setErrMsg] = useState("");
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        login: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        login(values)
          .unwrap()
          .then((response) => {
            actions.resetForm();
            dispatch(setUserInfo(response?.user));
            dispatch(setToken(response?.token));
          })
          .catch((err) => {
            setErrMsg(err?.data?.error);
          });
      },
    });

  if (token) return <Navigate to={"/"} />;
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full md:w-1/3 flex flex-col bg-white p-20 rounded-lg m-10"
      >
        {errMsg && (
          <div className="flex justify-center items-center text-red-900 font-medium mb-4 px-4 py-2 rounded-md bg-red-300">
            <p>{errMsg}</p>
          </div>
        )}
        <div className="w-full flex justify-center items-center mb-6">
          <p className="text-2xl font-bold">Sign In</p>
        </div>

        <div className="w-full mb-5">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <BsFillPersonFill />
            </div>
            <input
              type="text"
              name="login"
              id="login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                "outline-none w-full pr-7 pl-9 py-2 bg-[#e6e6e6] text-[#666] rounded-3xl text-base" +
                (errors.login && touched.login
                  ? " border border-[#c80000]"
                  : "")
              }
              placeholder="Login"
            />
          </div>
          {errors.login && touched.login && (
            <p className="text-[#c80000] text-sm">{errors.login}</p>
          )}
        </div>
        <div className="w-full mb-5">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <BiLockAlt />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                "outline-none w-full pr-7 pl-9 py-2 bg-[#e6e6e6] text-[#666] rounded-3xl text-base" +
                (errors.password && touched.password
                  ? " border border-[#c80000]"
                  : "")
              }
              placeholder="Password"
            />
          </div>

          {errors.password && touched.password && (
            <p className="text-[#c80000] text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-12 font-medium text-white bg-[#0F172A] rounded-3xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
