import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_CONTACT,
    FORM_SUBMIT
} from "../../redux/types";
import { ENV } from "../../config/config";


export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeContact = (data) => {
    return {
        type: BEFORE_CONTACT,
    };
};

export const submitQuery = (body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "contact/submit", {
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
                    type: FORM_SUBMIT,
                });
            } else {
                dispatch({
                    type: GET_ERRORS,
                });
            }
        })
        .catch((errors) => {
            dispatch({
                type: GET_ERRORS,
            });
        });
};
