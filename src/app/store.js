import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (
    getDefaultMiddleware //khỏi bị lỗi anon serializeable
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
