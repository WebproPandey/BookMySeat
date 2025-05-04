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
  import api from "../../services/api";
  
  export const fetchPromos = () => async (dispatch) => {
    dispatch({ type: FETCH_PROMOS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get("/api/admin/promos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: FETCH_PROMOS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_PROMOS_FAIL,
        payload: error.response?.data?.message || "Failed to fetch promo codes",
      });
    }
  };
  
  export const addPromo = (promoData, handleSuccess, handleError) => async (dispatch) => {
    dispatch({ type: ADD_PROMO_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.post("/api/admin/promo", promoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: ADD_PROMO_SUCCESS, payload: response.data });
      handleSuccess("Promo code added successfully");
      dispatch(fetchPromos());
    } catch (error) {
      dispatch({
        type: ADD_PROMO_FAIL,
        payload: error.response?.data?.message || "Failed to add promo code",
      });
      handleError(error.response?.data?.message || "Failed to add promo code");
    }
  };
  
  export const updatePromo = (promoId, promoData, handleSuccess, handleError) => async (dispatch) => {
    dispatch({ type: UPDATE_PROMO_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.put(`/api/admin/promo/${promoId}`, promoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: UPDATE_PROMO_SUCCESS, payload: response.data });
      handleSuccess("Promo code updated successfully");
    } catch (error) {
      dispatch({
        type: UPDATE_PROMO_FAIL,
        payload: error.response?.data?.message || "Failed to update promo code",
      });
      handleError(error.response?.data?.message || "Failed to update promo code");
    }
  };
  
  export const deletePromo = (promoId, handleSuccess, handleError) => async (dispatch) => {
    dispatch({ type: DELETE_PROMO_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/api/admin/promo/${promoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: DELETE_PROMO_SUCCESS, payload: promoId });
      handleSuccess("Promo code deleted successfully");
    } catch (error) {
        console.log("delete error", error.message);
      dispatch({
        type: DELETE_PROMO_FAIL,
        payload: error.response?.data?.message || "Failed to delete promo code",
      });
      handleError(error.response?.data?.message || "Failed to delete promo code");
    }
  };