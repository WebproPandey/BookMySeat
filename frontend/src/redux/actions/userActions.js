import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_USER_BOOKINGS_REQUEST,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
  } from "../actionTypes/adminTypes";
  import api from "../../services/api";
  
  export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAIL,
        payload: error.response?.data?.message || "Failed to fetch users",
      });
    }
  };
  
  export const fetchUserBookingHistory = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_BOOKINGS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get(`/api/admin/user/${userId}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      dispatch({ type: FETCH_USER_BOOKINGS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_USER_BOOKINGS_FAIL,
        payload: error.response?.data?.message || "Failed to fetch booking history",
      });
    }
  };