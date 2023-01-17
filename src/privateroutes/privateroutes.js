import Dashboard from '../components/dashboard/Dashboard';
import QuotationListing from '../components/dashboard/QuotationListing';
import SalesOrdersListing from '../components/dashboard/SalesOrdersListing';
import InvoicesListing from '../components/dashboard/InvoicesListing';
import QuotationDetail from '../components/quotationdetail/QuotationDetail';
import InvoiceDetail from '../components/invoicedetail/InvoiceDetail';
import Thankyou from '../components/thankyou/Thankyou';
import UserProfile from '../components/userprofile/UserProfile';



var routes = [
    {
        path: "/dashboard",
        exact: true,
        component: Dashboard
    },
    {
        path: "/quotationlisting",
        exact: true,
        component: QuotationListing
    },
    {
        path: "/salesorderlisting",
        exact: true,
        component: SalesOrdersListing
    },
    {
        path: "/invoicelisting",
        exact: true,
        component: InvoicesListing
    },
    {
        path: "/quotationdetail/:id",
        exact: true,
        component: QuotationDetail
    },
    {
        path: "/invoicedetail/:id",
        exact: true,
        component: InvoiceDetail
    },
    {
        path: "/userProfile",
        exact: true,
        component: UserProfile
    },
    {
        path: "/thankyou/:id",
        exact: true,
        component: Thankyou
    },
]

export default routes;