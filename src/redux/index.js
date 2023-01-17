import { combineReducers } from 'redux'
import faqReducer from "../components/faq/faq.reducer";
import productReducer from "../components/product/product.reducer";
import siteSettingReducer from "../components/siteSettings/siteSettings.reducer";
import cartReducer from "../components/cart/cart.reducer";
import checkoutReducer from "../components/checkout/checkout.reducer";
import contactReducer from "../components/contactus/contactUs.reducer";
import errorReducer from "./Shared/error/error.reducer";
import loginReducer from "../components/login/login.reducer";
import bannerReducer from "../components/banner/banner.reducer";
import dashboardReducer from "../components/dashboard/dashboard.reducer";
import profileReducer from "../components/userprofile/userprofile.reducer";
import contentReducer from "../components/content/content.reducer";
import cmsReducer from "../components/CMS/CMS.reducer";

export default combineReducers({
    errors: errorReducer,
    product: productReducer,
    faq: faqReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    contact: contactReducer,
    siteSetting: siteSettingReducer,
    login: loginReducer,
    banner: bannerReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    content: contentReducer,
    cms: cmsReducer
})