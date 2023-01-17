import {
    BEFORE_CMS,
    GET_CMS,
    GET_FOOTER_PAGES
} from '../../redux/types';

const initialState = {
    getCms: false,
    content: null,
    getMenu: false,
    menus: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_CMS:
            return {
                ...state,
                getCms: true,
                content: action.payload.cms
            }
        case GET_FOOTER_PAGES:
            return {
                ...state,
                getMenu: true,
                menus: action.payload.cms
            }
        case BEFORE_CMS:
            return {
                ...state,
                getCms: false,
                content: null,
                getMenu: false,
                menus: null
            }
        default:
            return {
                ...state
            }
    }
}
