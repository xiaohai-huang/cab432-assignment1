import { configureStore } from "@reduxjs/toolkit";
import qutReducer from "./qutSlice";
export const store = configureStore({
  reducer: {
    qut: qutReducer,
  },
});
