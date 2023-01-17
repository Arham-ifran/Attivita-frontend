import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_CART,
    VALIDATE_COUPON,
    INVALIDATE_COUPON,
    CART_ADDED,
    CART_NOT_ADDED,

} from "../../redux/types";
import { ENV } from "../../config/config";

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeCart = () => {
    return {
        type: BEFORE_CART,
    };
};

export const validateCoupon = (body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "shop/validateCoupon", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
        body : JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            dispatch({
                type: VALIDATE_COUPON,
                payload: data.data,
            });
        } else {
            dispatch({
                type: INVALIDATE_COUPON,
            });
        }
    })
    .catch((errors) => {
        dispatch({
            type: GET_ERRORS,
            payload: errors,
        });
    });
};

export const addToUserCart = (body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "abandonedCart/create", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
        body : JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            dispatch({
                type: CART_ADDED,
                payload: data.data,
            });
        } else {
            dispatch({
                type: CART_NOT_ADDED,
            });
        }
    })
    .catch((errors) => {
        dispatch({
            type: GET_ERRORS,
            payload: errors,
        });
    });
};