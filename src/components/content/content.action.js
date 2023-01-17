import { EMPTY_ERRORS, GET_ERRORS, BEFORE_CONTENT, GET_AUTH_HEADER_CONTENT, GET_HEADER_CONTENT } from '../../redux/types'
import { ENV } from './../../config/config'

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS
    }
}

export const beforeContent = () => {
    return {
        type: BEFORE_CONTENT
    }
}

export const getAuthHeaderContent = (page = '') => dispatch => {
    dispatch(emptyError())
    fetch(`${ENV.url}content/${page}`, {
        method: 'GET',
        headers: {
            lang: localStorage.getItem('language') ? localStorage.getItem('language') : '',
            "Authorization": ENV.Authorization,
            "x-auth-token": ENV.x_auth_token
        }
    }).then((res) => res.json())
        .then((data) => {
            dispatch({
                type: GET_AUTH_HEADER_CONTENT,
                payload: data,
            })
        })
        .catch((errors) => {
            dispatch({
                type: GET_ERRORS,
                payload: errors,
            })
        })
}

export const getHeaderContent = (page = '') => dispatch => {
    dispatch(emptyError())
    fetch(`${ENV.url}content/${page}`, {
        method: 'GET',
        headers: {
            lang: localStorage.getItem('language') ? localStorage.getItem('language') : '',
            "Authorization": ENV.Authorization,
            "x-auth-token": ENV.x_auth_token
        }
    }).then((res) => res.json())
        .then((data) => {
            dispatch({
                type: GET_HEADER_CONTENT,
                payload: data,
            })
        })
        .catch((errors) => {
            dispatch({
                type: GET_ERRORS,
                payload: errors,
            })
        })
}