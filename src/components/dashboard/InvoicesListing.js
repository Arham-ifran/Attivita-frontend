import React, { useState, useEffect } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { beforeDashboard, getDashboardListing } from "./dashboard.action";
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import "./Dashboard.css";
import { currencyFormat } from "../../utils/functions"
import moment from 'moment'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';


const InvoicesListing = (props) => {
	let history = useHistory()
	let userData = ENV.getUserKeys();
	const [invoices, setInvoices] = useState([])
	const [Page, setPage] = useState(1)
	const [pagination, setPagination] = useState(null)

	useEffect(() => {
		props.getDashboardListing(userData._id, 2)
	}, []);

	useEffect(() => {
		if (props.dashboard.getListingAuth) {
			setInvoices(props.dashboard.data.data.orders)
			setPagination(props.dashboard.data.data.pagination)
			props.beforeDashboard()
		}
	}, [props.dashboard.getListingAuth]);

	const onPageChange = async (page) => {
		setPage(page)
		const qs = ENV.objectToQueryString({ page: page, limit: 10 })
		props.getDashboardListing(userData._id, 1, qs)
	}
	let { customername } = ENV.getUserKeys();

	return (
		<div>
			{customername ? <AuthHeader /> : <Header />}

			<div id="main">
				<div className="row dark-green div-breadcrumbs" style={{ background: 'rgb(146 132 250)', color: 'white', padding: '10px' }}>
					<div className="container">
						<div>
							<Link style={{ color: 'white', 'font-weight': '500' }} to="/dashboard">Dashboard</Link> /
							Invoices
						</div>
					</div>
				</div>
				<section className="content-section mt-3 mb-3" id="account-page">
					<Container>
						<Row className="mt-2 bottom-space">
							<Col lg="12" sm="12">
								<h3 className="mt-3 mb-3 w-100">Invoices</h3>
								<div id="sales-datatable_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer w-100">
									<div className="table-responsive">
										<table id="sales-datatable" class="table table-bordered table-striped dataTable no-footer dtr-inline">
											<thead>
												<tr role="row">
													<th>Invoice #</th>
													<th>Invoice Date</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
											{
												invoices.length > 0 ?
													invoices.map((quotation, index) => {
														return (
															<tr role="row" key={index} onClick={() => history.push('/invoicedetail/' + quotation._id)}>
																<td>{"AVS" + quotation.orderNumber.toString().padStart(5, 0)}</td>
																<td>{moment(quotation.createdAt).format('MM-DD-YYYY')}</td>
																<td>{currencyFormat(quotation.grandTotal)}</td>
															</tr>
														)
													})
													:
													<tr role="row">
														<td colspan="3">No order found</td>
													</tr>
											}
											</tbody>
										</table>
									</div>
									<div className="pb-4">
										{pagination &&
											<Pagination
												className="m-3"
												defaultCurrent={1}
												pageSize // items per page
												current={Page > pagination.pages ? pagination.pages : Page} // current active page
												total={pagination.pages} // total pages
												onChange={onPageChange}
											/>
										}
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
			<Footer />
		</div>
	)
}

const mapStateToProps = state => ({
	dashboard: state.dashboard
})
export default connect(mapStateToProps, { beforeDashboard, getDashboardListing })(InvoicesListing);