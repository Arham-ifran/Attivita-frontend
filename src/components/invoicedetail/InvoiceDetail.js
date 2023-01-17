import React, { Component, Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { connect } from "react-redux";
import { beforeDashboard, getOrder } from "../dashboard/dashboard.action";
import { currencyFormat } from "../../utils/functions";
import moment from 'moment';
// import Tabletop from '../tabletop/Tabletop';
import { ENV } from "../../config/config";


import "./InvoiceDetail.css";


const InvoiceDetail = (props) => {
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
						<Link style={{ color: 'white', 'font-weight': '500' }} to="/invoicelisting">Invoices</Link> /
						Invoice Detail {order && order.invoice_nr}
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
										<Row className="align-items-center">
											<Col lg="6" md="6" xs="12">
												<span className="currency-holder">{currencyFormat(order.grandTotal)}</span>
											</Col>
											<Col lg="6" md="6" xs="12">
												<a href={ENV.invoicePath + order.invoice_nr + ".pdf"} target="_blank" className="pricing-holder pull-right" >
													<Button className="btn main-btn" variant="info">
														Download Invoice
													</Button>
												</a>
											</Col>
										</Row>
									</div>
								</Col>
								<Col lg="12" md="12" xs="12">
									<div class="invoice-header">
										<h4>Invoices/ {order.invoice_nr}</h4>
									</div>
									<div class="invoice-conatienr">
										<div className="info-wrapper mb-3">
											<h3>Invoicing and Shipping Address:</h3>
											<p>{order.shipping.address}</p>
										</div>
										<div className="invoice-detail">
											<ul className="list-unstyled">
												<li><b>Invoice Date:</b></li>
												<li>{moment(order.invoicedAt).format('MM-DD-YYYY')}</li>
												<li><b>Order#</b></li>
												<li>{order.order_nr}</li>
											</ul>

										</div>
									</div>
									<div className="table-responsive">
										<table className="invoice-detail-table table table-striped attivita-table">
											<thead>
												<tr className="data-table-header">
													<th scope="col">
														<div className="data-table-header-seperator">Description</div>
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
																	<td colspan="4" className="text-right"><b>Tax</b></td>
																	<td>{currencyFormat(order.taxtTotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Discount</b></td>
																	<td>{currencyFormat(order.discountTotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Total</b></td>
																	<td>{currencyFormat(order.grandTotal)}</td>
																</tr>
																<tr>
																	<td colspan="4" className="text-right"><b>Payment Status</b></td>
																	<td>
																		{
																			order.paidAmount == 0 ? 'Un Paid' : (order.paidAmount < order.grandTotal) ? 'Partially Paid' : 'Paid'
																		}
																	</td>
																</tr>
																{
																	order.paidAmount > 0 &&
																	<tr>
																		<td colspan="4" className="text-right"><b>Total Paid</b></td>
																		<td>{currencyFormat(order.paidAmount)}</td>
																	</tr>
																}
																{
																	order.paidAmount > 0 &&
																	<tr>
																		<td colspan="4" className="text-right"><b>Remaining Amount</b></td>
																		<td>{currencyFormat(order.grandTotal - order.paidAmount)}</td>
																	</tr>
																}
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

export default connect(mapStateToProps, { beforeDashboard, getOrder })(InvoiceDetail);