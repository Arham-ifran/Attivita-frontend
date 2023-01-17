import { EMPTY_ERRORS, GET_ERRORS, BEFORE_CMS, GET_CMS, GET_FOOTER_PAGES } from '../../redux/types'
import { ENV } from '../../config/config'

export const emptyError = () => {
    return {
        type: EMPTY_ERRORS
    }
}

export const beforeCMS = () => {
    return {
        type: BEFORE_CMS
    }
}

export const getPage = (slug = '') => dispatch => {
    dispatch(emptyError())
    fetch(`${ENV.url}cms/${slug}`, {
        method: 'GET',
        headers: {
            lang: localStorage.getItem('language') ? localStorage.getItem('language') : '',
            "Authorization": ENV.Authorization,
            "x-auth-token": ENV.x_auth_token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({
            type: GET_CMS,
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

export const getMenu = (type = '') => dispatch => {
    dispatch(emptyError())
    fetch(`${ENV.url}cms/getMenus/${type}`, {
        method: 'GET',
        headers: {
           // lang: localStorage.getItem('language') ? localStorage.getItem('language') : '',
            "Authorization": ENV.Authorization,
            "x-auth-token": ENV.x_auth_token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({
            type: GET_FOOTER_PAGES,
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
