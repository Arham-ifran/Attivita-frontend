import {
    BEFORE_CART,
    VALIDATE_COUPON,
    CART_ADDED,
    CART_NOT_ADDED,
    INVALIDATE_COUPON
} from '../../redux/types';

const initialState = {
    cartAddedAuth: false,
    cartNotAddedAuth: false,
    validateCouponAuth: false,
    inValidateCouponAuth: false,
    coupon: null,
}
export default function (state = initialState, action) {
    switch (action.type) {

        case CART_ADDED:
            return {
                ...state,
                cartAddedAuth: true,
                cart: action.payload,
            }
        case CART_NOT_ADDED:
            return {
                ...state,
                cartNotAddedAuth: true,
            }
        case VALIDATE_COUPON:
            return {
                ...state,
                validateCouponAuth: true,
                coupon: action.payload,
            }
        case INVALIDATE_COUPON:
            return {
                ...state,
                inValidateCouponAuth: true,
            }
        case BEFORE_CART:
            return {
                ...state,
                cartAddedAuth: false,
                cartNotAddedAuth: false,
                validateCouponAuth: false,
                inValidateCouponAuth: false,
                coupon: null,
            }
        default:
            return {
                ...state
            }
    }
}
