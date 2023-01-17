import React, { Component } from 'react';
import ReactDOm from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/landing/Landing';
import Shop from './components/shop/Shop';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contactus/ContactUs';
import ProductDetail from './components/productdetail/ProductDetail';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';

// import Dashboard from './components/dashboard/Dashboard';
// import QuotationListing from './components/dashboard/QuotationListing';
// import SalesOrdersListing from './components/dashboard/SalesOrdersListing';
// import InvoicesListing from './components/dashboard/InvoicesListing';
// import QuotationDetail from './components/quotationdetail/QuotationDetail';
// import InvoiceDetail from './components/invoicedetail/InvoiceDetail';
// import Thankyou from './components/thankyou/Thankyou';
// import UserProfile from './components/userprofile/UserProfile';

import DashboardCard from './components/dashboardcard/DashboardCard';
import Voucher from './components/voucher/Voucher';
import VoucherTable from './components/vouchertable/VoucherTable';
import TablePagination from './components/tablepagination/TablePagination';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Tabletop from './components/tabletop/Tabletop';

import Imprint from './components/imprint/Imprint';
import PrivacyPolicy from './components/privacypolicy/PrivacyPolicy';
import TermsOfUse from './components/termsofuse/TermsOfUse';
import NotFound from './components/notfound/NotFound';
import BuyProduct from './components/buyproduct/BuyProduct';
import EmailVerified from "./components/register/EmailVerified";
import AuthHeader from "./components/authheader/AuthHeader";
import ForgetPassword from "./components/login/ForgetPassword";
import ResetPassword from "./components/login/ResetPassword";

import { PrivateRoute } from '../src/privateRoute';
import "../src/App.css";

import routes from '../src/privateroutes/privateroutes'
import CMS from './components/CMS/CMS';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Route exact path='/contactus' component={ContactUs} />
          <Route exact path='/productdetail/:id' component={ProductDetail} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' component={Checkout} />
          {/* <Route exact path='/dashboard' component={Dashboard} /> */}
          <Route exact path='/dashboardcard' component={DashboardCard} />
          <Route exact path='/voucher' component={Voucher} />
          <Route exact path='/vouchertable' component={VoucherTable} />
          <Route exact path='/tablepagination' component={TablePagination} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          {/* <Route exact path='/quotationlisting' component={QuotationListing} />
          <Route exact path='/salesorderlisting' component={SalesOrdersListing} />
          <Route exact path='/invoicelisting' component={InvoicesListing} /> */}
          <Route exact path='/tabletop' component={Tabletop} />
          {/* <Route exact path='/quotationdetail/:id' component={QuotationDetail} />
          <Route exact path='/invoicedetail/:id' component={InvoiceDetail} /> */}
          <Route exact path='/imprint' component={Imprint} />
          <Route exact path='/privacypolicy' component={PrivacyPolicy} />
          <Route exact path='/termsofuse' component={TermsOfUse} />
          <Route exact path='/notfound' component={NotFound} />
          {/* <Route exact path='/userProfile' component={UserProfile} /> */}
          <Route exact path='/verify-email/:userId' component={EmailVerified} />
          <Route exact path='/forget-password' component={ForgetPassword} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/buyproduct' component={BuyProduct} />
          {/* <Route exact path='/thankyou/:id' component={Thankyou} /> */}
          <Route exact path='/authheader' component={AuthHeader} />
          <Route exact path='/page/:slug' component={CMS} />

          {
            routes.map((route, index) => (
              <PrivateRoute
                key={index}  
                path={route.path}
                exact={true}
                access={true}
                component={props => (
                    <route.component {...props} />
                )}
              />

            ))

          }

        </Switch>
      </Router>
    )
  }
}

export default App;