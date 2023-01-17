import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_CHECKOUT,
    GET_COUNTRIES,
    ORDER_PLACED,
    GET_ORDER,
    GET_USER,
    GET_LANGUAGES
} from "../../redux/types";
import { ENV } from "../../config/config";

import swal from 'sweetalert'
export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeCheckout = (data) => {
    return {
        type: BEFORE_CHECKOUT,
    };
};

export const getCountries = () => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "country/list", {
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
                    type: GET_COUNTRIES,
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

export const placeOrder = (body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "shop/placeOrder", {
        method: "POST",
        headers: {
            'Authorization': ENV.Authorization,
            'Content-Type': "application/json",
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(body)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: ORDER_PLACED,
                    payload: data,
                });
            } else {
                swal({
                    text: data.message,
                    icon: "warning",
                    button: "OK!",
                });
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

export const getOrder = (orderId) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}shop/getOrder/${orderId}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_ORDER,
                payload: data.order
            })
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const getUser = (userId) => dispatch => {
    dispatch(emptyError());
    let url = `${ENV.url}users//${userId}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
    }).then(res => res.json()).then(data => {
        if (data) {
            dispatch({
                type: GET_USER,
                payload: data
            })
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const getLanguages = () => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "language/list", {
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
                    type: GET_LANGUAGES,
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