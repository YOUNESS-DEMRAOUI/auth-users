import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("USER")) || {},
  token: localStorage.getItem("TOKEN") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("USER", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("TOKEN", action.payload);
    },
    logout: (state) => {
      localStorage.clear();
      state.userInfo = {};
      state.token = "";
    },
  },
});

export const { setUserInfo, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
