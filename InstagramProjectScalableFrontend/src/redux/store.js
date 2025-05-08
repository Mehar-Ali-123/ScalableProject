import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import authReducer from "./reducer/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
