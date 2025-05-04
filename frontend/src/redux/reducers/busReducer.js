import {
  ADD_BUS_REQUEST,
  ADD_BUS_SUCCESS,
  ADD_BUS_FAIL,
  UPDATE_BUS_REQUEST,
  UPDATE_BUS_SUCCESS,
  UPDATE_BUS_FAIL,
  DELETE_BUS_REQUEST,
  DELETE_BUS_SUCCESS,
  DELETE_BUS_FAIL,
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
    case FETCH_BUSES_REQUEST:
    case ADD_BUS_REQUEST:
    case UPDATE_BUS_REQUEST:
    case DELETE_BUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: action.payload,
      };

    case ADD_BUS_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: [...state.buses, action.payload],
      };

    case UPDATE_BUS_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: state.buses.map((bus) =>
          bus._id === action.payload._id ? action.payload : bus
        ), 
      };

    case DELETE_BUS_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: state.buses.filter((bus) => bus._id !== action.payload), 
      };

    case FETCH_BUSES_FAIL:
    case ADD_BUS_FAIL:
    case UPDATE_BUS_FAIL:
    case DELETE_BUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default busReducer;