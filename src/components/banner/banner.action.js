import {
    EMPTY_ERRORS,
    GET_ERRORS,
    GET_BANNERS,
    BEFORE_BANNER,

} from "../../redux/types";
import { ENV } from "../../config/config";

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeBanner = () => {
    return {
        type: BEFORE_BANNER,
    };
};

export const getBanners = (body) => (dispatch) => {
    dispatch(emptyError());
    fetch(ENV.url + "settings/getHomePageBanners", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            dispatch({
                type: GET_BANNERS,
                payload: data.homeBanners,
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
            payload: errors,
        });
    });
};