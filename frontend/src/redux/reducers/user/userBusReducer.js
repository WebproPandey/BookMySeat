import { FETCH_USERSBUS_FAIL, FETCH_USERSBUS_REQUEST, FETCH_USERSBUS_SUCCESS } from "../../actionTypes/userActionTypes";



const  initialState = {
    buses: [],
    loading: false,
    error: null,
}

const userBusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERSBUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERSBUS_SUCCESS:
            return {
                ...state,
                loading: false,
                buses: action.payload,
            };
        case FETCH_USERSBUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default userBusReducer;