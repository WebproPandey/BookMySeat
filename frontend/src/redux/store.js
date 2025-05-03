import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./reducers/adminAuthReducer";
import busReducer from "./reducers/busReducer";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, 
    bus: busReducer,
  },
});

export default store;