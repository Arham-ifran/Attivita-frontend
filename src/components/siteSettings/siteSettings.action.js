import {
    EMPTY_ERRORS,
    GET_ERRORS,
    GET_SETTINGS,
    GET_COUNTRY_DATA,
    BEFORE_SETIINGS

} from "../../redux/types";
import { ENV } from "../../config/config";

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeSettings = (data) => {
    return {
        type: BEFORE_SETIINGS,
    };
};

export const getSettings = () => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "settings/get", {
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
                    type: GET_SETTINGS,
                    payload: data.settings,
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

export const getVATforCountry = (countryName) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + `users/getVATforCountry/${countryName}`, {
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
                    type: GET_COUNTRY_DATA,
                    payload: data.VAT,
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