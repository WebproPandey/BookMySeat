import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from "../../actionTypes/userActionTypes";
  
  const initialState = {
    loading: false,
    user: null,
    error: null,
  };
  
  export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
      case USER_LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case USER_REGISTER_SUCCESS:
      case USER_LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case USER_REGISTER_FAIL:
      case USER_LOGIN_FAIL:
        return { ...state, loading: false, error: action.payload };
      case USER_LOGOUT:
        return { ...state, token: null };
      default:
        return state;
    }
  };
  
