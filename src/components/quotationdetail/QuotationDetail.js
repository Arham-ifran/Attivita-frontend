import React, { Component, Fragment, useState, useEffect } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import { connect } from "react-redux";
import { beforeDashboard, getOrder } from "../dashboard/dashboard.action";
import { currencyFormat } from "../../utils/functions";
import moment from 'moment';
// import Tabletop from '../tabletop/Tabletop';



import "./QuotationDetail.css";


const QuotationDetail = (props) => {
	let history = useHistory()
	const [order, setOrder] = useState(null)

	useEffect(() => {
		props.getOrder(window.location.pathname.split('/')[2])
	}, []);
	useEffect(() => {
		if (props.dashboard.getOrderAuth) {
			setOrder(props.dashboard.data.order)
			props.beforeDashboard()
		}
	}, [props.dashboard.getOrderAuth]);
	let { customername } = ENV.getUserKeys();
	return (
		<Fragment>
			{customername ? <AuthHeader /> : <Header />}

			<div class="row dark-green div-breadcrumbs" style={{ background: 'rgb(146 132 250)', color: 'white', padding: '10px' }}>
				<div class="container">
					<div>
						<Link style={{ color: 'white', 'font-weight': '500' }} to="/dashboard">Dashboard</Link> /
						Order Detail {order && order.order_nr}
					</div>
				</div>
			</div>
			<div id="main" className="custom-w-wrapper">
				{/* <Tabletop /> */}
				{
					order &&

					<section className="vouchers-main voucher-table custom-container mb-5">
						<Container fluid>
							<Row>
								<Col lg="12" md="12" xs="12">
									<div className="invoice-left-wrapper">
										<Row>
											<Col lg="6" md="6" xs="12">
												<span className="currency-holder">{currencyFormat(order.grandTotal)}</span>
											</Col>
											<Col lg="6" md="6" xs="12">
												<span className="text-capitalize pricing-holder">Sale order pricing</span>
											</Col>
										</Row>	
									</div>
								</Col>
								<Col lg="12" md="12" xs="12">
									<div class="invoice-header">
										<h4>Sales Orders/{order.order_nr}</h4>
									</div>
									<div class="invoice-conatienr">
										<div className="info-wrapper mb-3">
											<p className="mb-2"><b>Order Date:</b> {moment(order.createdAt).format('MM-DD-YYYY')}</p>
											<h3>Invoicing and Shipping Address:</h3>
											<p>{order.shipping.address}</p>
										</div>
										{
											order.isInvoiced == true &&
											<div className="invoice-detail">
												<h6 className="font-weight-bold">Invoice</h6>
												<span onClick={() => history.push('/invoicedetail/' + order._id)}>{order.invoice_nr} / {moment(order.invoicedAt).format('MM-DD-YYYY')}</span>
											</div>

										}
										<h5>Pricing</h5>
									</div>
									<div className="table-responsive">
										<table className="invoice-detail-table table table-striped attivita-table">
											<thead>
												<tr className="data-table-header">
													<th scope="col">
														<div className="data-table-header-seperator">Products</div>
													</th>
													<th scope="col">
														<div className="data-table-header-seperator">Quantity</div>
													</th>
													<th scope="col">
														<div className="data-table-header-seperator">Unit Price</div>
													</th>
													<th scope="col">
														<div className="data-table-header-seperator">Taxes</div>
													</th>
													<th scope="col">
														<div className="data-table-header-seperator">Amount</div>
													</th>
												</tr>
											</thead>
											<tbody>
												{
													order.items.map((item, index) => {
														return (
															<tr key={index}>
																<td>{item.item}</td>
																<td>{item.quantity}</td>
																<td>{currencyFormat(item.salesPrice)}</td>
																<td>{order.vatPercentage}% VAT</td>
																<td>{currencyFormat(item.subTotal)}</td>
															</tr>
														)
													})
												}
												<tr>
													<td className="custom-tr-width text-left"></td>
													<td className="custom-tr-width text-right invoice-status-table" colspan="5">
														<table className="w-100">
															<tbody>
																<tr>
																	<td colspan="4" className="text-right"><b>SubTotal</b></td>
																	<td>{currencyFormat(order.subtotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Discount</b></td>
																	<td>{currencyFormat(order.discountTotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Tax</b></td>
																	<td>{currencyFormat(order.taxtTotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Total</b></td>
																	<td>{currencyFormat(order.grandTotal)}</td>
																</tr>

															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</Col>
							</Row>
						</Container>
					</section>
				}
			</div>
			<Footer />
		</Fragment>
	)
}


const mapStateToProps = state => ({
	dashboard: state.dashboard
})

export default connect(mapStateToProps, { beforeDashboard, getOrder })(QuotationDetail);