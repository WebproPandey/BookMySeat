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
  FETCH_TICKET_REQUEST,
  FETCH_TICKET_SUCCESS,
  FETCH_TICKET_FAIL,
  CANCEL_TICKET_REQUEST,
  CANCEL_TICKET_SUCCESS,
  CANCEL_TICKET_FAIL,
  DELETE_TICKET_REQUEST,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
  DOWNLOAD_TICKET_REQUEST,
  DOWNLOAD_TICKET_SUCCESS,
  DOWNLOAD_TICKET_FAIL,
} from "../../actionTypes/userActionTypes";
import { toast } from 'react-toastify';

export const registerUser = (userData ,navigate, showError) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await api.post("/api/user/register", userData);
    const { token, user } = response.data;
    localStorage.setItem("userToken", token);
    dispatch({ type: USER_REGISTER_SUCCESS, payload:user });
    navigate("/user/home");
     toast.success("Registration successful!");

  } catch (error) {
    const message = error.response?.data?.error || "Registration failed";
    if (showError) showError(message);
    dispatch({ type: USER_REGISTER_FAIL, payload: message });
    navigate("/user/login");
  }}

export const loginUser = (loginData , navigate ,showError) => {
  return async (dispatch) => {
    dispatch({ type:  USER_LOGIN_REQUEST });
    try {
      const response = await api.post("/api/user/login", loginData);
      const { token ,user} = response.data;
      
      localStorage.setItem("userToken", token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      });
       toast.success("Login successful!");
      navigate("/user/home");
    } catch (error) {
        const message = error.response?.data?.error || "Login failed";
        if (showError) showError(message);
         dispatch({ type: USER_LOGIN_FAIL, payload: message });
         navigate("/user/login");
        }
    };
};

export const logoutUser = (navigate ,showError) => (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: USER_LOGOUT });
  navigate("/user/login");

};

export const fetchUserDetails = (navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("User details fetched successfully:", response.data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    // console.error("Error fetching user details:", error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.error || "Failed to fetch user details",
    });
  }

}

export const fetchBusUser = (navigate) => async (dispatch) => {
  dispatch({ type: FETCH_USERSBUS_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.get("/api/user/available-buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Available buses fetched successfully:", response.data);
    dispatch({ type: FETCH_USERSBUS_SUCCESS, payload: response.data });
    
  } catch (error) {
    // console.error("Error fetching available buses:", error.message);
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
    // console.log("Fetching promo code with token:", token);
    const response = await api.get("/api/user/promos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Promo details fetched successfully:", response.data);
    dispatch({ type: FETCH_USERSPROMO_SUCCESS, payload: response.data });
  } catch (error) {
    // console.error("Error fetching user details:", error.message);
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
    // console.log("Order created successfully:", response.data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    return response.data; 
  } catch (error) {
    // console.error("Error creating Razorpay order:", error);
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
    const response = await api.post("/api/user/tickets/book", ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: BOOK_TICKET_SUCCESS, payload: response.data });
    // console.log("Ticket booked successfully:", response.data);
    return response.data; // Return ticket details
  } catch (error) {
    // console.error("Error booking ticket:", error.message);
    dispatch({
      type: BOOK_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to book ticket",
    });
    throw error;
  }
};


export const fetchTickets = () => async (dispatch) => {
  dispatch({ type: FETCH_TICKET_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.get("/api/user/my-tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Tickets fetched successfully:", response.data);
    dispatch({ type: FETCH_TICKET_SUCCESS, payload: response.data });
  } catch (error) {
    // console.error("Error fetching tickets:", error.message);
    dispatch({
      type: FETCH_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to fetch tickets",
    });
  }
};

export const cancelTicket = (ticketId) => async (dispatch) => {
  dispatch({ type: CANCEL_TICKET_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.patch(`/api/user/tickets/cancel/${ticketId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Ticket canceled successfully:", response.data);
    dispatch({ type: CANCEL_TICKET_SUCCESS, payload: { ticketId } });
    // toast.success("Ticket canceled successfully!");
    return response.data;
  } catch (error) {
    // console.error("Error canceling ticket:", error);
    dispatch({
      type: CANCEL_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to cancel tickets ",
    });
    // toast.error(error.response?.data?.error || "Failed to cancel ticket");
    // throw error;
  }
};

// Delete Ticket
export const deleteTicket = (ticketId) => async (dispatch) => {
  dispatch({ type: DELETE_TICKET_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.delete(`/api/user/tickets/delete/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Ticket deleted successfully:", response.data);

    // Dispatch the ticketId to the reducer
    dispatch({ type: DELETE_TICKET_SUCCESS, payload: { ticketId } });
    // toast.success("Ticket deleted successfully!");
    return response.data;
  } catch (error) {
    // console.error("Error deleting ticket:", error.message);
    dispatch({
      type: DELETE_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to delete ticket",
    });
    // toast.error(error.response?.data?.error || "Failed to delete ticket");
  }
};

export const downloadTicketPDF = (ticketId) => async (dispatch) => {
  dispatch({ type: DOWNLOAD_TICKET_REQUEST });
  try {
    const token = localStorage.getItem("userToken");
    const response = await api.get(`/api/user/tickets/pdf/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    // Create a URL for the PDF and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ticket-${ticketId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch({ type: DOWNLOAD_TICKET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_TICKET_FAIL,
      payload: error.response?.data?.error || "Failed to download ticket PDF",
    });
  }
};