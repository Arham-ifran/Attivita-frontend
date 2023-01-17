import {
    EMPTY_ERRORS,
    GET_ERRORS,
    GET_PRODUCTS,
    GET_PRODUCT,
    BEFORE_PRODUCTS,
    SEARCH_PRODUCT

} from "../../redux/types";
import { ENV } from "../../config/config";

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeProducts = (data) => {
    return {
        type: BEFORE_PRODUCTS,
    };
};

export const getProductsList = () => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "product/list", {
        method: "GET",
        headers: {
            Authorization: ENV.Authorization,
            "x-auth-token": ENV.x_auth_token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_PRODUCTS,
                    payload: data.data,
                });
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: data,
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
export const getProduct = (prodId) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + 'product/get/'+prodId, {
        method: "GET",
        headers: {
            Authorization: ENV.Authorization,
            "x-auth-token": ENV.x_auth_token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_PRODUCT,
                    payload: data.product,
                });
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: data,
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
export const searchProducts = (searchQuery, sort = '') => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + `product/search?searchquery=${searchQuery}&sortBy=${sort}`, {
        method: "GET",
        headers: {
            Authorization: ENV.Authorization,
            "x-auth-token": ENV.x_auth_token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: SEARCH_PRODUCT,
                    payload: data.products,
                });
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: data,
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