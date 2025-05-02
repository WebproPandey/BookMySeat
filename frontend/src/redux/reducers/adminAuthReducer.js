import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAILURE,
  } from "../actionTypes/adminAuthTypes";
  
  const initialState = {
    admin: null,
    loading: false,
    error: null,
  };
  
  const adminAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_REGISTER_REQUEST:
      case ADMIN_LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
  
      case ADMIN_REGISTER_SUCCESS:
      case ADMIN_LOGIN_SUCCESS:
        return { ...state, loading: false, admin: action.payload, error: null };
  
      case ADMIN_REGISTER_FAILURE:
      case ADMIN_LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default adminAuthReducer;
  