import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_USER_BOOKINGS_REQUEST,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
  } from "../actionTypes/adminTypes";
  
  const initialState = {
    users: [],
    userBookings: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
      case FETCH_USER_BOOKINGS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
  
      case FETCH_USER_BOOKINGS_SUCCESS:
        return { ...state, loading: false, userBookings: action.payload };
  
      case FETCH_USERS_FAIL:
      case FETCH_USER_BOOKINGS_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default userReducer;