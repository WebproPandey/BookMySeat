import {
    FETCH_REVENUE_REQUEST,
    FETCH_REVENUE_SUCCESS,
    FETCH_REVENUE_FAIL,
  } from '../actionTypes/adminTypes';
  
  const initialState = {
    loading: false,
    revenueStats: [],
    error: null,
  };
  
  export const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REVENUE_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_REVENUE_SUCCESS:
        return { ...state, loading: false, revenueStats: action.payload };
      case FETCH_REVENUE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };