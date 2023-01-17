import { LOGIN_ACTION, REGISTER_ACTION, BEFORE_LOGIN, SET_CUSTOMER_PASSWORD, CART_RETURNED } from '../../redux/types';

const initialState = {
    loginActionAuth: false,
    cartAuth: false,
    cart: null,
    resetRequiredAuth: false,
    registerActionAuth: false,
    customerPasswordAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ACTION:
            return {
                ...state,
                loginActionAuth: true,
                loginData: action.payload
            }
        case CART_RETURNED:
            return {
                ...state,
                cartAuth: true,
                cart: action.payload,
            }
        case REGISTER_ACTION:
            return {
                ...state,
                registerActionMessage: action.payload,
                registerActionAuth: true,
            }
        case SET_CUSTOMER_PASSWORD:
            return {
                ...state,
                customerPasswordData: action.payload,
                customerPasswordAuth: true,
            }
        case BEFORE_LOGIN:
            return {
                ...state,
                loginActionAuth: false,
                resetRequiredAuth: false,
                registerActionAuth: false,
                cartAuth: false,
                cart: null,
                customerPasswordAuth: false
            }
        default:
            return {
                ...state
            }
    }
}