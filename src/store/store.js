import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "../slice/CurrencySlice";

export const store = configureStore({
  reducer: {
    cur: currencySlice,
  },
});
