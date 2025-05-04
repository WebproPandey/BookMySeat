import api from "../../services/api";
import {
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGOUT,

} from "../actionTypes/adminTypes";

export const registerAdmin = (adminData, navigate, showError) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_REGISTER_REQUEST });
    try {
      const response = await api.post("/api/admin/register", adminData);
      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: response.data,
      })
      navigate("/admin/dashboard");
    } catch (error) {
      const message = error.response?.data?.error || "Registration failed";
      if (showError) showError(message);
      if (
        message === "Only one admin is allowed." ||
        message === "Admin already exists" ||
        message.includes("E11000")
      ) {
        navigate("/admin/login");
      }

      dispatch({
        type: ADMIN_REGISTER_FAILURE,
        payload: message,
      });
    }
  };
};


export const loginAdmin = (adminData, navigate, showError) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    try {
      const response = await api.post("/api/admin/login", adminData);
      const { token } = response.data;
      // console.log("token:" , token)
    //   localStorage.setItem("adminToken", token);


      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: { token },
      });
      navigate("/admin/dashboard");
    } catch (error) {
      const message = error.response?.data?.error || "Login failed";
      if (showError) showError(message)
        {
            navigate("/admin/login");
          }
      dispatch({
        type: ADMIN_LOGIN_FAILURE,
        payload: message,
      });
    }
  };
};

export const logoutAdmin = (navigate) => (dispatch) => {
    localStorage.removeItem("adminToken"); 
    dispatch({ type: ADMIN_LOGOUT });
    navigate("/admin/login");
};


