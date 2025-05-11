import {
  FETCH_BUSES_REQUEST,
  FETCH_BUSES_SUCCESS,
  FETCH_BUSES_FAIL,
  ADD_BUS_REQUEST,
  ADD_BUS_SUCCESS,
  ADD_BUS_FAIL,
  UPDATE_BUS_REQUEST,
  UPDATE_BUS_SUCCESS,
  UPDATE_BUS_FAIL,
  DELETE_BUS_REQUEST,
  DELETE_BUS_SUCCESS,
  DELETE_BUS_FAIL,
} from "../actionTypes/adminTypes";
import api from "../../services/api";

export const fetchBuses = () => async (dispatch) => {
  dispatch({ type: FETCH_BUSES_REQUEST });
  try {
    const token = localStorage.getItem("adminToken");
    const response = await api.get("/api/admin/buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_BUSES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_BUSES_FAIL,
      payload: error.response?.data?.message || "Failed to fetch buses",
    });
  }
};

export const addBus = (busData, handleSuccess, handleError ,navigate) => async (dispatch) => {
  dispatch({ type: ADD_BUS_REQUEST });
  try {
    const token = localStorage.getItem("adminToken");
    const response = await api.post("/api/admin/add-bus", busData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_BUS_SUCCESS, payload: response.data });
    handleSuccess("Bus added successfully");
    navigate("/admin/dashboard/buses")

  } catch (error) {
    dispatch({
      type: ADD_BUS_FAIL,
      payload: error.response?.data?.message || "Failed to add bus",
    });
    handleError(error.response?.data?.message || "Failed to add bus");
  }
};

export const updateBus = (busId, updatedData, handleSuccess, handleError) => async (dispatch) => {
  dispatch({ type: UPDATE_BUS_REQUEST });
  try {
    const token = localStorage.getItem("adminToken");
    const response = await api.put(`/api/admin/bus/${busId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",

      },
    });
    dispatch({ type: UPDATE_BUS_SUCCESS, payload: response.data });
    handleSuccess("Bus updated successfully");
  } catch (error) {
    console.log("update error", error);
    dispatch({
      type: UPDATE_BUS_FAIL,
      payload: error.response?.data?.message || "Failed to update bus",
    });
    handleError(error.response?.data?.message || "Failed to update bus");
  }
};

export const deleteBus = (busId, handleSuccess, handleError) => async (dispatch) => {
  dispatch({ type: DELETE_BUS_REQUEST });
  try {
    const token = localStorage.getItem("adminToken");
    await api.delete(`/api/admin/bus/${busId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_BUS_SUCCESS, payload: busId });
    handleSuccess("Bus deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_BUS_FAIL,
      payload: error.response?.data?.message || "Failed to delete bus",
    });
    handleError(error.response?.data?.message || "Failed to delete bus");
  }
};