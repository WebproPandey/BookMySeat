import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./reducers/adminAuthReducer";
import busReducer from "./reducers/busReducer";
import promoReducer from "./reducers/promoReducer";
import userReducer from "./reducers/userReducer";
import { revenueReducer } from "./reducers/revenueReducer";
import { cancelBusBookingsReducer } from "./reducers/cancelBusBookingsReducer";
import { userAuthReducer } from "./reducers/user/userAuthReducers";
import userBusReducer from "./reducers/user/userBusReducer";
import userPromoReducer from "./reducers/user/userPromoReducer";
import userPaymentReducer from "./reducers/user/userPaymentReducer";
import { userTicketReducer } from "./reducers/user/userTicketReducer";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, 
    bus: busReducer,
    promo: promoReducer,
    user:userReducer,
    revenue: revenueReducer,
    cancelBusBookings: cancelBusBookingsReducer,

    userAuth:userAuthReducer,
    userBus:userBusReducer,
    userPromo: userPromoReducer,
    userPayment: userPaymentReducer,
    userTicket: userTicketReducer, 
  },
});

export default store;