import { useEffect, useState } from "react";
import { useCreateUserMutation } from "../redux/services/userApi";
import { useFormik } from "formik";
import { createUserSchema } from "../schemas";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { services } from "../assets/constants";
import Select from "react-select";

const AddUser = ({ setShowAdd, setBackMsg, setType }) => {
  const [createUser] = useCreateUserMutation();
  const { userInfo } = useSelector((state) => state.user);
  const options =
    userInfo?.role == "Super-Admin"
      ? services
      : userInfo?.role == "Admin"
      ? services.filter((services) =>
          userInfo?.services.includes(services.value)
        )
      : [];
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      login: "",
      password: "",
      role: "",
      services: [],
    },
    validationSchema: createUserSchema,
    onSubmit: (values, actions) => {
      createUser(values)
        .unwrap()
        .then((response) => {
          setBackMsg(response.message);
          setType("success");
          actions.resetForm();
          setShowAdd(false);
        })
        .catch((err) => {
          setType("error");
          if (err.status === 409) {
            setBackMsg(err.data.message);
          } else {
            setBackMsg("Server Error");
          }
        });
    },
  });
  return (
    <div className="w-full h-full z-10 absolute top-0 left-0 bg-transparent/20 py-20 px-20 xl:px-80">
      <div className="flex flex-col h-full justify-center items-center bg-white rounded-lg">
        <div className="relative w-full h-full">
          <button
            className="absolute top-3 right-3"
            title="close"
            onClick={() => setShowAdd(false)}
          >
            <AiOutlineCloseCircle size={20} />
          </button>
          <form
            className="w-full h-full flex flex-col p-10 overflow-y-auto overflow-x-hidden"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="w-full flex justify-center items-center m-6">
              <p className="text-2xl font-bold">Add New User</p>
            </div>
            <div className="w-full mb-5">
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
              {errors.login && touched.login && (
                <p className="text-[#c80000] text-sm">{errors.login}</p>
              )}
            </div>
            <div className="w-full mb-5">
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
              {errors.password && touched.password && (
                <p className="text-[#c80000] text-sm">{errors.password}</p>
              )}
            </div>
            {userInfo?.role == "Super-Admin" && (
              <div className="w-full mb-5">
                <select
                  value={values.role}
                  onChange={handleChange}
                  name="role"
                  className={
                    "outline-none w-full pr-7 pl-9 py-2 bg-[#e6e6e6] text-[#666] rounded-3xl text-base appearance-none" +
                    (errors.role && touched.role
                      ? " border border-[#c80000]"
                      : "")
                  }
                >
                  <option value="">Select Roles</option>
                  <option value="Super-Admin">Super-Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
                {errors.role && touched.role && (
                  <p className="text-[#c80000] text-sm">{errors.role}</p>
                )}
              </div>
            )}
            <div className="w-full mb-5">
              <Select
                options={options}
                onChange={(selected) => {
                  setValues({
                    ...values,
                    services: selected.map((option) => option.value),
                  });
                }}
                classNames={{
                  control: () =>
                    "!bg-[#e6e6e6] !rounded-3xl !text-[#666] !pl-6",
                }}
                isMulti
                name="services"
                placeholder="Select Services"
              />
              {errors.services && touched.services && (
                <p className="text-[#c80000] text-sm">{errors.services}</p>
              )}
            </div>
            <button
              className="w-full py-3 font-medium text-white bg-[#0F172A] rounded-3xl"
              type="submit"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
