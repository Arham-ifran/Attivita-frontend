import React, { useState, Fragment, useEffect } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { beforeCheckout, getOrder } from "../checkout/checkout.action";
import ThankImg from '../../assets/images/thank-you-envelope.png'
import productOffcImg from '../../assets/images/products-office.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";


import "./Thankyou.css";

const Thankyou = (props) => {
	const history = useHistory()
	const [order, setOrder] = useState()
	useEffect(() => {
		props.getOrder(window.location.pathname.split('/')[2])
	}, []);
	useEffect(() => {
		if (props.checkout.getOrder) {
			if (props.checkout.order)
				setOrder(props.checkout.order)
			else {
				history.push('/')
			}
		}
	}, [props.checkout.getOrder]);
	let { customername } = ENV.getUserKeys();
	return (
		<Fragment>
			{customername ? <AuthHeader /> : <Header />}

			<div id="main">
				<section className="checkout-form mt-5 mb-5">
					{
						order &&
						<Container>
							<Row>
								<Col lg="12" md="12" sm="12">
									<div className="main-checkout-wrapper">
										<div className="checkout-header mb-5 text-center">
											<h4 className="text-capitalize mb-3"> Thank you For Shopping With Attivita</h4>
											<h6>Your order number:<span className="text-order"> {order.order_nr}</span></h6>
											<p>Order confirmation email has been sent.</p>
										</div>
										<div className="checkout-container pt-5">
											<Row >
												<Col lg="6" md="6" sm="12">
													<div className="billing-info mb-4">
														<h5 className="text-capitalize">Billing address</h5>
														<p>{order.shipping?.address}</p>
													</div>
												</Col>
												<Col lg="6" md="6" sm="12">
													<div className="billing-info mb-4">
														<h5 className="text-capitalize">Information</h5>
														<p>{order.shipping?.name}</p>
														<p>{order.shipping?.email}</p>
														<p>{order.shipping?.mobile}</p>
													</div>
												</Col>
											</Row>
											<Row>
												<Col lg="12" md="12" sm="12">
													<div className="product-tbl-wrapper">
														<table class="theme-bordered-tbl product_tbl">
															<thead>
																<tr>
																	<th>Product Name</th>
																	<th>Quantity</th>
																	<th>Excl.VAT</th>
																	<th>Total Price</th>
																</tr>
															</thead>
															<tbody>
																{
																	order.items.map((item, index) => {
																		return (
																			<tr>
																				<td>
																					<div class="item-title">{item.item}</div>
																				</td>
																				<td><span class="value">{item.quantity}</span>
																				</td>
																				<td><span class="value">{order.currency.symbol} {parseFloat(item.salesPrice).toFixed(2)} {order.currency.code}</span>
																				</td>
																				<td><span class="value">{order.currency.symbol} {parseFloat(item.subTotal).toFixed(2)} {order.currency.code}</span>
																				</td>
																			</tr>
																		)
																	})
																}
															</tbody>
														</table>
													</div>
												</Col>
											</Row>
											<hr />
											<Row className="mt-5">
												<Col lg="7" md="6" xs="12">
												</Col>
												<Col lg="5" md="6" xs="12">
													<div className="d-flex flex-column h-100">
														<div className="checkout-header card-checkout-header">
															<h5>
																Cart
																<span className="price">
																	<FontAwesomeIcon icon={faCartShopping} />
																</span>
															</h5>
														</div>
														<div className="checkout-container checkout checkout-summary">
															<p>Sub Total
																<span className="price">
																	<b>
																		{order.currency.symbol} {parseFloat(order.subtotal).toFixed(2)} {order.currency.code}
																	</b>
																</span>
															</p>
															<p>Discount
																<span className="price">
																	<b>
																		{order.currency.symbol} {parseFloat(order.discountTotal).toFixed(2)} {order.currency.code}
																	</b>
																</span>
															</p>
															<p>Tax
																<span className="price">
																	<b>
																		{order.currency.symbol} {parseFloat(order.taxtTotal).toFixed(2)} {order.currency.code}
																	</b>
																</span>
															</p>
															<p>Total
																<span className="price">
																	<b>
																		{order.currency.symbol} {parseFloat(order.grandTotal).toFixed(2)} {order.currency.code}
																	</b>
																</span>
															</p>
														</div>
													</div>
												</Col>
											</Row>

										</div>
									</div>
								</Col>
							</Row>
						</Container>
					}
				</section>
			</div>
			<Footer />
		</Fragment>
	)
}
const mapStateToProps = state => ({
	checkout: state.checkout
})
export default connect(mapStateToProps, { beforeCheckout, getOrder })(Thankyou);