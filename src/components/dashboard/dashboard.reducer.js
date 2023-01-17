import {
    BEFORE_DASHBOARD,
    GET_LISTING,
    GET_DASHBOARD_ORDER,
    GET_DATA
} from '../../redux/types';

const initialState = {
   data: null,
   getDataAuth: false,
   getOrderAuth: false,
   getListingAuth: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                getDataAuth: true
            }
        case GET_DASHBOARD_ORDER:
            return {
                ...state,
                data: action.payload,
                getOrderAuth: true
            }
        case GET_LISTING:
            return {
                ...state,
                data: action.payload,
                getListingAuth: true
            }
        case BEFORE_DASHBOARD:
            return {
                ...state,
                data: null,
                getOrderAuth: false,
                getDataAuth: false,
                getListingAuth: false
            }
        default:
            return {
                ...state
            }
    }
}
