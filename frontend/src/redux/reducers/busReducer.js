import {
    ADD_BUS_REQUEST,
    ADD_BUS_SUCCESS,
    ADD_BUS_FAIL,
    FETCH_BUSES_REQUEST,
    FETCH_BUSES_SUCCESS,
    FETCH_BUSES_FAIL,
  } from "../actionTypes/adminTypes";
  
  const initialState = {
    buses: [],
    loading: false,
    error: null,
  };
  
  const busReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_BUS_REQUEST:
      case FETCH_BUSES_REQUEST:
        return { ...state, loading: true, error: null };
  
      case ADD_BUS_SUCCESS:
        return { ...state, loading: false, buses: [...state.buses, action.payload] };
  
      case FETCH_BUSES_SUCCESS:
        return { ...state, loading: false, buses: action.payload };
  
      case ADD_BUS_FAIL:
      case FETCH_BUSES_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default busReducer;