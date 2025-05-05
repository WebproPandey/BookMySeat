import api from '../../services/api';
import {
  FETCH_REVENUE_REQUEST,
  FETCH_REVENUE_SUCCESS,
  FETCH_REVENUE_FAIL,
} from '../actionTypes/adminTypes';

// Fetch revenue statistics
export const fetchRevenueStats = () => async (dispatch) => {
  dispatch({ type: FETCH_REVENUE_REQUEST });
  try {
    const token = localStorage.getItem('adminToken');
    const response = await api.get('/api/admin/revenue', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('API Response:', response.data);
    dispatch({
      type: FETCH_REVENUE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching revenue statistics:', error);
    dispatch({
      type: FETCH_REVENUE_FAIL,
      payload: error.response?.data?.message || 'Failed to fetch revenue statistics.',
    });
  }
};