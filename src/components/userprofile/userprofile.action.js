import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_PROFILE,
    UPSERT_USER,
    UPSERT_EXTRACT,

} from "../../redux/types";
import { ENV } from "../../config/config";
import axios from "axios";
export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeProfile = (data) => {
    return {
        type: BEFORE_PROFILE,
    };
};

export const updateProfile = (userID, body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + `users/${userID}`, {
        method: "PUT",
        headers: {
            Authorization: ENV.Authorization,
            'Content-Type': "application/json",
            "x-auth-token": ENV.x_auth_token,
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            dispatch({
                type: UPSERT_USER,
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

export const uploadExtract = (e = {}) => dispatch => {
    dispatch(emptyError());
    let url = ENV.url + `users/uploadExtract`;
    let data = new FormData();
    data.append('extractFile', e.target.files[0]);
    axios({
        method: 'post',
        url:url,
        data: data,
        headers: {'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
                'x-auth-token': process.env.REACT_APP_X_AUTH_TOKEN}
        })
        .then(data => {
           
            if (data.data.success) {
                dispatch({
                    type: UPSERT_EXTRACT,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: data,
                });
            }
        })
        .catch(error => {
           
            dispatch({
                type: GET_ERRORS,
                payload: error
            })
        })
}