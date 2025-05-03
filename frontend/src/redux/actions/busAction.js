import api from "../../services/api";
import {
  ADD_BUS_REQUEST,
  ADD_BUS_SUCCESS,
  ADD_BUS_FAIL,
  FETCH_BUSES_REQUEST,
  FETCH_BUSES_SUCCESS,
  FETCH_BUSES_FAIL,
} from "../actionTypes/adminTypes";

export const addBus = (busData, handleSuccess, handleError) => async (dispatch) => {
  try {
    dispatch({ type: ADD_BUS_REQUEST });

    const token = localStorage.getItem("adminToken");
    // console.log("Token in addBus:", token); 

    const response = await api.post("/api/admin/add-bus", busData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: ADD_BUS_SUCCESS, payload: response.data });
    handleSuccess("Bus added successfully");
  } catch (error) {
    console.error("Add Bus Error:", error);
    dispatch({ type: ADD_BUS_FAIL, payload: error.response?.data?.message || "Something went wrong" });
    // handleError(error.response?.data?.message || "Failed to add bus");
  }
};

export const fetchBuses = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BUSES_REQUEST });

    const token = localStorage.getItem("adminToken");
    // console.log("Token in fetchBuses:", token); 

    const response = await api.get("/api/admin/buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: FETCH_BUSES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Fetch Buses Error:", error);
    dispatch({ type: FETCH_BUSES_FAIL, payload: error.response?.data?.message || "Failed to fetch buses" });
  }
};