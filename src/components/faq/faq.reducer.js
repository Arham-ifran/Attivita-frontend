import {
    BEFORE_FAQS,
    GET_FAQS,
} from '../../redux/types';

const initialState = {
    faqList: {},
    getFaqList: false
}
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_FAQS:
            return {
                ...state,
                faqList: action.payload,
                getFaqList: true
            }
        case BEFORE_FAQS:
            return {
                ...state,
                getFaqList: false
            }
        default:
            return {
                ...state
            }
    }
}
