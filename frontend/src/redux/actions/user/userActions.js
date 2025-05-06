import  api from "../../../services/api";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  FETCH_USERSBUS_REQUEST,
  FETCH_USERSBUS_SUCCESS,
  FETCH_USERSBUS_FAIL,
  FETCH_USERSPROMO_REQUEST,
  FETCH_USERSPROMO_FAIL,
  FETCH_USERSPROMO_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAIL,
} from "../../actionTypes/userActionTypes";

export const registerUser = (userData ,navigate, showError) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await api.post("/api/user/register", userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
    navigate("/user/dashboard");
    console.log("User registered successfully:", response.data);

  } catch (error) {
    console.error("Error registering user:", error.message);
    const message = error.response?.data?.error || "Registration failed";
    if (showError) showError(message)
      {
          navigate("/user/login");
        }
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.error || "Registration failed",
    });
  }
};

export const loginUser = (loginData , navigate ,showError) => {
  return async (dispatch) => {
    dispatch({ type:  USER_LOGIN_REQUEST });
    try {
      const response = await api.post("/api/user/login", loginData);
      const { token } = response.data;
      
      localStorage.setItem("userToken", token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { token },
      });
      navigate("/user/dashboard");
    } catch (error) {
      const message = error.response?.data?.error || "Login failed";
      if (showError) showError(message)
        {
            navigate("/user/login");
          }
      dispatch({
        type:USER_LOGIN_FAIL,
        payload: message,
      });
    }
  };
};

export const logoutUser = (navigate) => (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: USER_LOGOUT });
  navigate("/user/login");

};

export const fetchBusUser = (navigate) => async (dispatch) => {
  dispatch({ type: FETCH_USERSBUS_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.get("/api/user/available-buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Available buses fetched successfully:", response.data);
    dispatch({ type: FETCH_USERSBUS_SUCCESS, payload: response.data });
    
  } catch (error) {
    console.error("Error fetching available buses:", error.message);
    dispatch({
      type: FETCH_USERSBUS_FAIL,
      payload: error.response?.data?.error || "Failed to fetch buses",
    });
    
  }

};

export const fetchPromoCode = (navigate) => async (dispatch) => {
  dispatch({ type: FETCH_USERSPROMO_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    console.log("Fetching promo code with token:", token);
    const response = await api.get("/api/user/promos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Promo details fetched successfully:", response.data);
    dispatch({ type: FETCH_USERSPROMO_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    dispatch({
      type: FETCH_USERSPROMO_FAIL,
      payload: error.response?.data?.error || "Failed to fetch buses",
    });
  }
};

export const createOrder = (amount) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.post("/api/user/payment/create-order", { amount }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Order created successfully:", response.data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    return response.data; 
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.error || "Failed to create order",
    });
    throw error;
  }
};

// Book Ticket
export const bookTicket = (ticketData) => async (dispatch) => {
  dispatch({ type: BOOK_TICKET_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.post("/api/tickets/book", ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: BOOK_TICKET_SUCCESS, payload: response.data });
    return response.data; // Return ticket details
  } catch (error) {
    console.error("Error booking ticket:", error.message);
    dispatch({
      type: BOOK_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to book ticket",
    });
    throw error;
  }
};

