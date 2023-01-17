import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_DASHBOARD,
    GET_LISTING,
    GET_DASHBOARD_ORDER,
    GET_DATA
} from "../../redux/types";

import { ENV } from "../../config/config";


export const emptyError = () => {
    return {
        type: EMPTY_ERRORS,
    };
};

export const beforeDashboard = (data) => {
    return {
        type: BEFORE_DASHBOARD,
    };
};

export const getDashboardData = (userId,qs = '') => (dispatch) => {
    dispatch(emptyError());
    // let url = ENV.url + "dashboard/getDashboardData?userId=62ac263aa0b6a8330890d745"
    let url = ENV.url + "dashboard/getDashboardData?userId="+userId
    if (qs)
        url += `&${qs}`
    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
       
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_DATA,
                    payload: data.data
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
export const getDashboardListing = (userId, type, qs = '') => (dispatch) => {
    dispatch(emptyError());
    // let url = ENV.url + "dashboard/getDashboardListing?userId=62ac263aa0b6a8330890d745&type="+type
    let url = ENV.url + "dashboard/getDashboardListing?userId="+userId+"&type="+type
    if (qs)
        url += `&${qs}`
    fetch(url, {
    method: "GET",
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
       
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_LISTING,
                    payload: data
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
export const getOrder = (orderId) => (dispatch) => {
    dispatch(emptyError());
    let url = ENV.url + "dashboard/getOrder/"+orderId
    
    fetch(url, {
    method: "GET",
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
       
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch({
                    type: GET_DASHBOARD_ORDER,
                    payload: data
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
