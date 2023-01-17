import {
    BEFORE_CONTENT,
    GET_AUTH_HEADER_CONTENT,
    GET_HEADER_CONTENT
} from '../../redux/types';

const initialState = {
    getAuthHeaderContent: false,
    getHeaderContent: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_AUTH_HEADER_CONTENT:
            return {
                ...state,
                authHeaderContent: action.payload,
                getAuthHeaderContent: true
            }
        case GET_HEADER_CONTENT:
            return {
                ...state,
                headerContent: action.payload,
                getHeaderContent: true
            }
        case BEFORE_CONTENT:
            return {
                ...state,
                getAuthHeaderContent: false,
                getHeaderContent: false
            }
        default:
            return {
                ...state
            }
    }
}
