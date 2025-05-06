import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
  } from "../../actionTypes/userActionTypes";
  
  const initialState = {
    order: null,
    loading: false,
    error: null,
  };
  
  const userPaymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, order: action.payload };
      case CREATE_ORDER_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userPaymentReducer;