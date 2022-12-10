import { configureStore } from "@reduxjs/toolkit";
import setUserReducer from "./features/userSlice";
export const store = configureStore({
  reducer: { setUserReducer },
});
