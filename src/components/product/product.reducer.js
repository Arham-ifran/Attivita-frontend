import {
    BEFORE_PRODUCTS,
    GET_PRODUCTS,
    GET_PRODUCT,
    SEARCH_PRODUCT
} from '../../redux/types';

const initialState = {
    productsList: {},
    product: null,
    products: null,
    getproductsList: false,
    getsearchProducts: false,
    getproduct: false
}
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                productsList: action.payload,
                getproductsList: true
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                getproduct: true
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                products: action.payload,
                getsearchProducts: true
            }
        case BEFORE_PRODUCTS:
            return {
                ...state,
                product: null,
                getproduct: false,
                getproductsList: false,
                getsearchProducts: false,
            }
        default:
            return {
                ...state
            }
    }
}
