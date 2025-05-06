import { FETCH_USERSPROMO_FAIL, FETCH_USERSPROMO_REQUEST, FETCH_USERSPROMO_SUCCESS } from "../../actionTypes/userActionTypes";



const initialState = {
    promos: [],
    loading: false,
    error: null,
}

const userPromoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERSPROMO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERSPROMO_SUCCESS:
            return {
                ...state,
                loading: false,
                promos: action.payload,
            };
        case FETCH_USERSPROMO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default userPromoReducer;