import {
    FETCH_PROMOS_REQUEST,
    FETCH_PROMOS_SUCCESS,
    FETCH_PROMOS_FAIL,
    ADD_PROMO_REQUEST,
    ADD_PROMO_SUCCESS,
    ADD_PROMO_FAIL,
    UPDATE_PROMO_REQUEST,
    UPDATE_PROMO_SUCCESS,
    UPDATE_PROMO_FAIL,
    DELETE_PROMO_REQUEST,
    DELETE_PROMO_SUCCESS,
    DELETE_PROMO_FAIL,
  } from "../actionTypes/adminTypes";
  
  const initialState = {
    promos: [],
    loading: false,
    error: null,
  };
  
  const promoReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROMOS_REQUEST:
      case ADD_PROMO_REQUEST:
      case UPDATE_PROMO_REQUEST:
      case DELETE_PROMO_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_PROMOS_SUCCESS:
        return { ...state, loading: false, promos: action.payload };
  
      case ADD_PROMO_SUCCESS:
        return { ...state, loading: false, promos: [...state.promos, action.payload] };
  
      case UPDATE_PROMO_SUCCESS:
        return {
          ...state,
          loading: false,
          promos: state.promos.map((promo) =>
            promo._id === action.payload._id ? action.payload : promo
          ),
        };
  
      case DELETE_PROMO_SUCCESS:
        return {
          ...state,
          loading: false,
          promos: state.promos.filter((promo) => promo._id !== action.payload),
        };
  
      case FETCH_PROMOS_FAIL:
      case ADD_PROMO_FAIL:
      case UPDATE_PROMO_FAIL:
      case DELETE_PROMO_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default promoReducer;