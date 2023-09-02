import * as yup from "yup";

const passwordRules = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

export const loginSchema = yup.object().shape({
  login: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export const createUserSchema = yup.object().shape({
  login: yup
    .string()
    .min(4, "Login too short!")
    .max(50, "Login too long!")
    .required("Required"),
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Password must contain 6 or more characters, at least 1 digit.",
    })
    .required("Required"),
  role: yup.string(),
  services: yup.array().min(1, "Required"),
});

export const updateUserSchema = yup.object().shape({
  login: yup
    .string()
    .min(4, "Login too short!")
    .max(50, "Login too long!"),
  services: yup.array(yup.string()),
  password: yup.string().matches(passwordRules, {
    message: "Password must contain 6 or more characters, at least 1 digit.",
  }),
  role: yup.string(),
});
