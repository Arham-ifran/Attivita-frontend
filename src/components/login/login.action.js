import { BEFORE_LOGIN, REGISTER_ACTION, GET_ERRORS, LOGIN_ACTION, SET_CUSTOMER_PASSWORD, CART_RETURNED } from '../../redux/types';
import { ENV } from '../../config/config';
import swal from 'sweetalert'


export const beforeLogin = () => {
    return {
        type: BEFORE_LOGIN
    }
}

export const registerAction = (payload) => dispatch => {
    fetch(ENV.url + 'auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
        if (data.status) {
            // swal({
            //     text: data.message,
            //     icon: "success",
            //     button: "OK",
            // });
            dispatch({
                type: REGISTER_ACTION,
                payload: data.message
            });
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(errors => {
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

export const loginAction = (payload) => dispatch => {
    fetch(ENV.url + 'auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            ENV.encryptUserData(data.data);
            dispatch({
                type: LOGIN_ACTION,
                payload: data
            });
        } else {
            swal({
                text: data.message,
                icon: "warning",
                button: "OK!",
            });
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(errors => {
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

export const verifyEmail = (userId) => dispatch => {
    let url = `${ENV.url}/auth/verify-email/${userId}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'user-platform': 2 // 2 = admin
        }
    }).then(res => res.json()).then(data => {
        if (data.success && data.data.isPasswordEmpty) {
            console.log(data, "data inside")

            swal({
                text: data.message,
                icon: "success",
                button: "OK",
            });
            dispatch({
                type: SET_CUSTOMER_PASSWORD,
                payload: data.data
            });
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

export const setPasswordAction = (payload) => dispatch => {
    fetch(ENV.url + 'auth/set-password', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            swal({
                text: data.message,
                icon: "success",
                button: "OK",
            });
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(errors => {
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

export const forgetPassword = (payload) => dispatch => {
    fetch(ENV.url + 'auth/forgot-password', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            swal({
                text: data.message,
                icon: "success",
                button: "OK",
            });
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(errors => {
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

export const resetPassword = (payload) => dispatch => {
    fetch(ENV.url + 'auth/reset-password', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            swal({
                text: data.message,
                icon: "success",
                button: "OK",
            });
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(errors => {
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

export const getUserCart = (userId) => (dispatch) => {
    fetch(ENV.url + `abandonedCart/getUserCart/${userId}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            dispatch({
                type: CART_RETURNED,
                payload: data.abandonedCart,
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