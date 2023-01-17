import {
    EMPTY_ERRORS,
    GET_ERRORS,
    GET_FAQS,
    BEFORE_FAQS

} from "../../redux/types";
import { ENV } from "../../config/config";

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeFaqs= (data) => {
    return {
        type: BEFORE_FAQS,
    };
};

export const getFaqList= () => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "faq/list", {
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
                    type: GET_FAQS,
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