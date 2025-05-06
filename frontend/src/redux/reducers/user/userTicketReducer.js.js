import {
    BOOK_TICKET_REQUEST,
    BOOK_TICKET_SUCCESS,
    BOOK_TICKET_FAIL,
  } from "../../actionTypes/userActionTypes";
  
  const initialState = {
    ticket: [],
    loading: false,
    error: null,
  };
  
  const userTicketReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOK_TICKET_REQUEST:
        return { ...state, loading: true, error: null };
      case BOOK_TICKET_SUCCESS:
        return { ...state, loading: false, ticket: action.payload };
      case BOOK_TICKET_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userTicketReducer;