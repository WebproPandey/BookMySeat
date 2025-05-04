import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./reducers/adminAuthReducer";
import busReducer from "./reducers/busReducer";
import promoReducer from "./reducers/promoReducer";
import userReducer from "./reducers/userReducer";
import { revenueReducer } from "./reducers/revenueReducer";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, 
    bus: busReducer,
    promo: promoReducer,
    user:userReducer,
    revenue: revenueReducer,
  },
});

export default store;