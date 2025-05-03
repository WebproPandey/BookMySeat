import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAILURE,
    ADMIN_LOGOUT,
  } from "../actionTypes/adminTypes";
  
  const initialState = {
    token: localStorage.getItem("adminToken") || null,
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
        return { ...state, loading: false, token: action.payload.token, error: null };
  
      case ADMIN_REGISTER_FAILURE:
      case ADMIN_LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADMIN_LOGOUT:
            return { ...state, token: null };
      default:
        return state;
    }
  };
  
  export default adminAuthReducer;
  