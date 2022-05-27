import authAPI from "../api/authAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signin = createAsyncThunk("user/signin", async (payload) => {
  const checkemail = await authAPI.checkemail({
    email: payload.emailPhone,
  });
  const checkphone = await authAPI.checkphone({
    phone: payload.emailPhone,
  });
  if (checkphone === 403 && checkemail === 403) {
    return null;
  }
  if (checkphone === 200) {
    const data = await authAPI.signinbyphone({
      phone: payload.emailPhone,
      password: payload.password,
    });
    if (data.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      return data;
    }
    return data;
  }
  if (checkemail === 200) {
    const data = await authAPI.signinbyemail({
      email: payload.emailPhone,
      password: payload.password,
    });
    if (data.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      return data;
    }
    return data;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {
      accessToken: JSON.parse(localStorage.getItem("accessToken")),
      refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      user: JSON.parse(localStorage.getItem("user")),
    },
  },
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
