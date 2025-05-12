import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAILURE,
    ADMIN_LOGOUT,
    ADMIN_PROFILE_REQUEST,
    ADMIN_PROFILE_FAILURE,
    ADMIN_PROFILE_SUCCESS,
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
      case ADMIN_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case ADMIN_REGISTER_SUCCESS:
      case ADMIN_LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload.token, admin: action.payload.admin };
      
      case ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };
  
      case ADMIN_REGISTER_FAILURE:
      case ADMIN_LOGIN_FAILURE:
           case ADMIN_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADMIN_LOGOUT:
            return { ...state, token: null , admin:null};
      default:
        return state;
    }
  };
  
  export default adminAuthReducer;
  