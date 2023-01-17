import {
    BEFORE_SETIINGS,
    GET_SETTINGS,
    GET_COUNTRY_DATA
} from '../../redux/types';

const initialState = {
    settings: {},
    getSettings: false,
    getCountry: false,
    vat: null,

}
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_COUNTRY_DATA:
            return {
                ...state,
                getCountry: true,
                vat: action.payload,
            }
        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                getSettings: true
            }
        case BEFORE_SETIINGS:
            return {
                ...state,
                getSettings: false,
                getCountry: false,
                vat: null,
            }
        default:
            return {
                ...state
            }
    }
}
