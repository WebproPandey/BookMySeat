import  api from "../../../services/api";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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
    dispatch({ type:  USER_REGISTER_REQUEST });
    try {
      const response = await api.post("/api/user/login", loginData);
      const { token } = response.data;
      
      localStorage.setItem("userToken", token);
      dispatch({
        type:  USER_REGISTER_SUCCESS,
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
        type:  USER_REGISTER_FAIL,
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