import {
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
    BOOK_TICKET_REQUEST,
    BOOK_TICKET_SUCCESS,
    BOOK_TICKET_FAIL,
} from "../../actionTypes/userActionTypes";

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  downloading: false, // For tracking download status
};

export const userTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKET_REQUEST:
      return { ...state, loading: true, tickets: [] };
    case FETCH_TICKET_SUCCESS:
      return { ...state, loading: false, tickets: action.payload };
    case FETCH_TICKET_FAIL:
      return { ...state, loading: false, error: action.payload };

      case BOOK_TICKET_REQUEST:
        return { ...state, loading: true, error: null };
      case BOOK_TICKET_SUCCESS:
        return { ...state, loading: false, ticket: action.payload };
      case BOOK_TICKET_FAIL:
        return { ...state, loading: false, error: action.payload };

    case CANCEL_TICKET_REQUEST:
    case DELETE_TICKET_REQUEST:
      return { ...state, loading: true };

    case CANCEL_TICKET_SUCCESS:
       return {
         ...state,
            loading: false,
            tickets: state.tickets.map((ticket) =>
              ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket
            ), // Ensure tickets remain an array
          };

    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload.ticketId
        ),
      };

    case CANCEL_TICKET_FAIL:
    case DELETE_TICKET_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DOWNLOAD_TICKET_REQUEST:
      return { ...state, downloading: true };
    case DOWNLOAD_TICKET_SUCCESS:
      return { ...state, downloading: false };
    case DOWNLOAD_TICKET_FAIL:
      return { ...state, downloading: false, error: action.payload };

    default:
      return state;
  }
};
