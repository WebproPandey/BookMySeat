import {
    CANCEL_BUS_BOOKINGS_REQUEST,
    CANCEL_BUS_BOOKINGS_SUCCESS,
    CANCEL_BUS_BOOKINGS_FAIL,
  } from '../actionTypes/adminTypes';
  
  const initialState = {
    loading: false,
    successMessage: null,
    error: null,
  };
  
  export const cancelBusBookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CANCEL_BUS_BOOKINGS_REQUEST:
        return { ...state, loading: true, successMessage: null, error: null };
      case CANCEL_BUS_BOOKINGS_SUCCESS:
        return { ...state, loading: false, successMessage: action.payload };
      case CANCEL_BUS_BOOKINGS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };