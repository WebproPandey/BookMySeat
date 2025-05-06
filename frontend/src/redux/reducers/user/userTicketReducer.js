import { FETCH_TICKET_FAIL, FETCH_TICKET_REQUEST, FETCH_TICKET_SUCCESS } from "../../actionTypes/userActionTypes";

const initialState = {
    tickets: [] ,
    loading: false,
    error: null,
}
  


  export const userTicketReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKET_REQUEST:
        return { loading: true, tickets: [] };
      case FETCH_TICKET_SUCCESS:
        return { loading: false, tickets: action.payload };
      case FETCH_TICKET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };