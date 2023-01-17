import {
    EMPTY_ERRORS,
    GET_ERRORS,
    BEFORE_PROFILE,
    UPSERT_USER,
    UPSERT_EXTRACT
} from '../../redux/types';

const initialState = {
   data: null,
   extract: null,
   upsertProfile: false,
   upsertExtract: false
}
export default function (state = initialState, action) {
    switch (action.type) {

        case UPSERT_USER:
            return {
                ...state,
                data: action.payload,
                upsertProfile: true
            }
        case UPSERT_EXTRACT:
            return {
                ...state,
                extract: action.payload,
                upsertExtract: true
            }
        case BEFORE_PROFILE:
            return {
                ...state,
                data: null,
                extract: null,
                upsertProfile: false,
                upsertExtract: false
            }
        default:
            return {
                ...state
            }
    }
}
