import api from '../../services/api';
import {
  CANCEL_BUS_BOOKINGS_REQUEST,
  CANCEL_BUS_BOOKINGS_SUCCESS,
  CANCEL_BUS_BOOKINGS_FAIL,
} from '../actionTypes/adminTypes';

export const cancelBusBookings = (busId) => async (dispatch) => {
  dispatch({ type: CANCEL_BUS_BOOKINGS_REQUEST });
  try {
    const token = localStorage.getItem('adminToken');
    const response = await api.put(`/api/admin/cancel-bus-bookings/${busId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  console.log("Api Response:", response)
    dispatch({
      type: CANCEL_BUS_BOOKINGS_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    console.error('Error cancelling bus bookings:', error);
    dispatch({
      type: CANCEL_BUS_BOOKINGS_FAIL,
      payload: error.response?.data?.message || 'Failed to cancel bookings.',
    });
  }
};