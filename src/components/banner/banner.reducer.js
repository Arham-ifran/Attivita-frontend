import {
    GET_BANNERS,
    BEFORE_BANNER,
} from '../../redux/types';

const initialState = {
    getBannerAuth: false,
    banners: null,
}
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_BANNERS:
            return {
                ...state,
                getBannerAuth: true,
                banners: action.payload
            }
        case BEFORE_BANNER:
            return {
                ...state,
                getBannerAuth: false,
                banners: null
            }
        default:
            return {
                ...state
            }
    }
}
