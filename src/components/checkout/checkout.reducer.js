import {
    BEFORE_PRODUCTS,
    GET_PRODUCTS,
    BEFORE_CHECKOUT,
    GET_COUNTRIES,
    ORDER_PLACED,
    GET_ORDER,
    GET_USER,
    GET_ERRORS,
    GET_LANGUAGES
} from '../../redux/types';

const initialState = {
    countries: null,
    languages: null,
    getCountries: false,
    getLanguagesAuth: false,
    orderPlaced: false,
    order: null,
    getOrder: false,
    getUser: false,
    user: null,
    getError: false,
    error: null,

}
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_LANGUAGES:
            return {
                ...state,
                languages: action.payload,
                getLanguagesAuth: true
            }
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries,
                getCountries: true
            }
        case GET_ERRORS:
            return {
                ...state,
                getError: true,
                error: action.payload,
            }
        case GET_USER:
            return {
                ...state,
                getUser: true,
                user: action.payload
            }
        case ORDER_PLACED:
            return {
                ...state,
                order: action.payload.order,
                orderPlaced: true
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload,
                getOrder: true
            }
        case BEFORE_PRODUCTS:
            return {
                ...state,
                countries: null,
                getCountries: false,
                getLanguagesAuth: false,
                orderPlaced: false,
                order: null,
                order: null,
                getOrder: false,
                getUser: false,
                user: null,
                getError: false,
                error: null,
            }
        default:
            return {
                ...state
            }
    }
}
