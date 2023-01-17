import {
    BEFORE_CONTACT,
    FORM_SUBMIT
} from '../../redux/types';

const initialState = {
   formSubmit: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case FORM_SUBMIT:
            return {
                ...state,
                formSubmit: true
            }
        case BEFORE_CONTACT:
            return {
                ...state,
                formSubmit: false
            }
        default:
            return {
                ...state
            }
    }
}
