import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import ReactDOm from 'react-dom';
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader"; import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { variationCurrencyFormat, currencyFormat } from "../../utils/functions"
import Select from 'react-select';
import { beforeCheckout, getCountries, placeOrder, getUser } from "./checkout.action";
import { beforeCart, addToUserCart } from "../cart/cart.action";
import productOffcImg from '../../assets/images/products-office.png'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import productImg2 from '../../assets/images/products-device.png'
import { getVATforCountry } from "../siteSettings/siteSettings.action";
import "./Checkout.css";
import swal from 'sweetalert'
import FullPageLoader from '../FullPageLoader/FullPageLoader'
const Checkout = (props) => {
	let userData = ENV.getUserKeys();
	const myRef = useRef(null)
	const history = useHistory();
	const [currency, setCurrency] = useState({
		symbol: "€",
		code: "EUR"
	})
	const [billingData, setBillingData] = useState({
		agreementCheck: '',
		fullname: '',
		email: '',
		phone: '',
		address: '',
		country: '',
		city: '',
		zipCode: ''
	})
	const [msg, setMsg] = useState({
		fullname: '',
		email: '',
		phone: '',
		address: '',
		country: '',
		city: '',
	})
	const [accountInactiveModal, setAccountInactiveModal] = useState(false)
	const [user, setUser] = useState()
	const [loader, setLoader] = useState(false)
	const [agreementCheck, setAgreementCheck] = useState(false)
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState([])
	const [countryOptions, setCountryOptions] = useState([])
	const [vatPercentage, setVatPercentage] = useState(19)
	const [coupon, setCoupon] = useState(JSON.parse(localStorage.getItem("coupon")) ? JSON.parse(localStorage.getItem("coupon")) : {})
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
	const [cartTotal, setCartTotal] = useState(JSON.parse(localStorage.getItem("cartTotal")) ? JSON.parse(localStorage.getItem("cartTotal")) : [])
	const [billingAddressOptions, setBillingAddressOptions] = useState([])
	const [selectedBillingAddress, setSelectedBillingAddress] = useState()
	const [showAddressFields, setShowAddressFields] = useState(false)

	useEffect(() => {
		props.beforeCheckout()
		if (!cart || cart.length == 0) {
			history.push('/shop')
		}
		if (userData._id) {
			setBillingData({
				agreementCheck: '',
				fullname: userData.customername,
				email: userData.email,
				phone: userData.mobile,
				address: '',
				country: '',
				city: '',
				zipCode: ''
			})
			props.getUser(userData._id)
		}
		props.getCountries()
	}, []);
	useEffect(() => {
		setCart(JSON.parse(localStorage.getItem("cart")))
		
	}, [localStorage.getItem("cart")]);
	useEffect(() => {
		updateCart()
		
	}, [cart]);
	useEffect(() => {
		if (props.checkout.getCountries) {
			if (props.checkout?.user?.data) {
				let billingAddressOptions_ = props.checkout?.user?.data?.addresses?.map(address => ({
					label: address?.street + ' ' + address?.city + ' ' + address?.state + ' ' + address?.zipCode,
					value: address._id,
				}))
				setBillingAddressOptions(billingAddressOptions_)
			}

		}
	}, [props.checkout.getCountries]);
	useEffect(() => {
		if (props.checkout.getUser) {
			if (userData?.addresses && userData?.addresses?.length > 0) {
				props.getVATforCountry(userData?.addresses[0]?.country)
			}
			else {
				setVatPercentage(props.siteSetting.settings.vatPercentage)
			}
		}
	}, [props.checkout.getUser]);
	
	useEffect(() => {
		if (props.siteSetting.getCountry) {
			setVatPercentage(props.siteSetting.vat)
		}
	}, [props.siteSetting.getCountry]);

	useEffect(() => {
		setLoader(false)

		if (props.checkout.orderPlaced) {
			
			let cart = localStorage.getItem("cart")
			cart = cart ? JSON.parse(cart) : [];

			if (userData) {	//If user is logged in 
				cart.map((item, index) => {
					cart[index].unitSalesPrice = cart[index].salesPrice
					cart[index].totalPrice = cart[index].salesPrice * cart[index].quantity
				})

				let cartParams = {
					userId: userData._id,
					isCheckout: true,
					items: cart
				}
				props.addToUserCart(cartParams)
			}
			localStorage.removeItem('coupon')
			localStorage.removeItem('cart')
			localStorage.removeItem('cartTotal')

			props.beforeCheckout()
			history.push('/thankyou/' + props.checkout.order._id)
		}
	}, [props.checkout.orderPlaced]);
	useEffect(() => {
		if(props.checkout.getError)
			setLoader(false)
	}, [props.checkout.getError]);

	useEffect(() => {
		if (props.checkout.getCountries) {
			let options = []
			props.checkout.countries.map((country) => {
				options.push({
					label: country.name,
					value: country._id,
				})
			})
			setCountryOptions([...options])
		}
	}, [props.checkout.getCountries]);


	const placeOrder = () => {
		// if (userData.status) {
			let error = false
			if (userData._id) {
				if (showAddressFields) {
					if (!agreementCheck || !billingData.fullname || !billingData.email || !billingData.address || !billingData.country || !billingData.city) {
						setMsg({
							agreementCheck: !agreementCheck ? "Agree to terms and conditions" : '',
							fullname: !billingData.fullname ? "Fullname is required" : '',
							email: !billingData.email ? "Email is required" : '',
							phone: !billingData.phone ? "Phone is required" : '',
							address: !billingData.address ? "Address is required" : '',
							country: !billingData.country ? "Country is required" : '',
							city: !billingData.city ? "City is required" : '',
						})
						error = true
					} else {
						setMsg({
							agreementCheck: '',
							fullname: '',
							email: '',
							phone: '',
							address: '',
							country: '',
							city: '',
							selectAddress: '',
						})
					}
				} else {
					if (!agreementCheck || !billingData.fullname || !billingData.email || !selectedBillingAddress) {
						setMsg({
							agreementCheck: !agreementCheck ? "Agree to terms and conditions" : '',
							fullname: !billingData.fullname ? "Fullname is required" : '',
							email: !billingData.email ? "Email is required" : '',
							phone: !billingData.phone ? "Phone is required" : '',
							address: '',
							country: '',
							city: '',
							selectAddress: !selectedBillingAddress ? 'Select the address' : '',
						})
						error = true
					} else {
						setMsg({
							agreementCheck: '',
							fullname: '',
							email: '',
							phone: '',
							address: '',
							country: '',
							city: '',
							selectAddress: '',
						})
					}
				}
			}
			else {
				if (!agreementCheck || !billingData.fullname || !billingData.email || !billingData.address || !billingData.country || !billingData.city) {
					setMsg({
						agreementCheck: !agreementCheck ? "Agree to terms and conditions" : '',
						fullname: !billingData.fullname ? "Fullname is required" : '',
						email: !billingData.email ? "Email is required" : '',
						phone: !billingData.phone ? "Phone is required" : '',
						address: !billingData.address ? "Address is required" : '',
						country: !billingData.country ? "Country is required" : '',
						city: !billingData.city ? "City is required" : '',
						selectAddress: '',
					})
					error = true
				} else {
					setMsg({
						agreementCheck: '',
						fullname: '',
						email: '',
						phone: '',
						address: '',
						country: '',
						city: '',
						selectAddress: '',
					})
				}
			}

			if (!error) {

				let body = makeOrderRequestBody()
				setLoader(true)
				props.placeOrder(body)
			} else {
				myRef.current.scrollIntoView()
			}
			setAccountInactiveModal(false)
		// } else {
		// 	swal({
		// 		text: "You cannot plcae the order as your account is not active yet. Kindly contact admin.",
		// 		icon: "warning",
		// 		button: "OK!",
		// 	});
		// }
	}
	const makeOrderRequestBody = () => {
		let products = [];
		cart.map(item => {
			let subtotal = (item.salesPrice * item.quantity)
			subtotal = subtotal - (subtotal * item.discountPercentage / 100)
			subtotal = subtotal + (subtotal * vatPercentage / 100)
			products.push({
				productID: item.productId,
				productVariationID: item.variationId,
				quantity: item.quantity,
				salesPrice: item.salesPrice,
				discountPercentage: item.discountPercentage,
				subTotal: subtotal,
			})
		})
		if (userData._id) {	// Logged in User Checkout Params
			let params = {
				customer: userData._id,
				priceList: coupon._id ? coupon._id : null,
				vatPercentage: vatPercentage,
				products: products,
				subTotal: cartTotal.subTotal,
				taxTotal: cartTotal.taxTtoal,
				discountTotal: cartTotal.discount,
				grandTotal: cartTotal.grandTotal,
				status: 0,    // Quotation
				currency: currency,    // Quotation
				billingData,
				cartTotal
			}
			if (showAddressFields) {	// Selected address	
				params.customerAddress = billingData.address + ' ' + billingData.city + ' ' + billingData.country.label + ' ' + billingData.zipCode
				params.countryID = country.value
			}
			else {
				params.customerAddress = selectedBillingAddress.label
				params.customerAddressID = selectedBillingAddress.value
				params.countryID = country.value
			}
			return params

		} else {	// Guest Checkout Params
			return {
				// 'customer': customer._id,
				customerAddress: billingData.address + ' ' + billingData.city + ' ' + billingData.country.label + ' ' + billingData.zipCode,
				countryID: country.value,
				priceList: coupon._id ? coupon._id : null,
				vatPercentage: vatPercentage,
				products: products,
				subTotal: cartTotal.subTotal,
				taxTotal: cartTotal.taxTtoal,
				discountTotal: cartTotal.discount,
				grandTotal: cartTotal.grandTotal,
				status: 0,    // Quotation
				currency: currency,    // Quotation
				billingData,
				cartTotal
			}

		}
	}
	const updateCart = () => {
		let subTotal = 0
		let discount = 0
		let tax = 0
		let total = 0
		let cart_ = cart
		cart_.map((item) => {
			let subTotal_ = item.quantity * item.salesPrice		//	SalesPrice * Quantity
			subTotal += subTotal_
			let discountPercentage = item.discountPercentage ? item.discountPercentage : 0	// DiscountPercentage
			let discountedPrice = subTotal_ - (subTotal_ * discountPercentage / 100)	// (SalesPrice * Quantity) - Discount
			let taxAmount = (discountedPrice * vatPercentage / 100)

			discount += subTotal_ * discountPercentage / 100
			item.price = discountedPrice + taxAmount
			tax += taxAmount
		})
		total = subTotal - discount + tax

		localStorage.setItem('cartTotal', JSON.stringify({
			subTotal: subTotal,
			discount: discount,
			tax: tax,
			total: total
		}))
		setCartTotal({
			subTotal: subTotal,
			discount: discount,
			tax: tax,
			total: total
		})

	}
	let { customername } = ENV.getUserKeys();
	return (
		<Fragment>
			{customername ? <AuthHeader /> : <Header />}
			{loader && <FullPageLoader/>}
			<section className="checkout-form mt-5 mb-5">
				<Container>
					<Row>
						<Col lg="12" md="12" sm="12">
							<div className="main-checkout-wrapper">
								{
									!userData?._id &&
									<Row>
										<Col lg="12" md="12" sm="12">
											<div className="text-center alert alert-danger">
												You are not logged in to the system. Kindly <Link to="/login">login</Link> to continue
											</div>
										</Col>
									</Row>

								}
								<div className="checkout-header mb-4">
									<h4 className="text-capitalize">Complete order</h4>
								</div>
								<div className="checkout-container" ref={myRef}>
									<h5>Terms & conditions and cancellation policy</h5>
									<h6>Please note the cancellation policy.</h6>
									<div className="d-flex align-items-center mb-5">
										<div className="custom-control custom-checkbox">
											<input type="checkbox" class="custom-control-input" id="defaultChecked" onClick={() => setAgreementCheck(!agreementCheck)} />
											<label className="custom-control-label" for="defaultChecked">I have read the terms and conditions and agree to them.</label>
											{msg.agreementCheck && <><br /><small class="error">{msg.agreementCheck}</small></>}<br />
										</div>
									</div>
									{
										userData?._id &&
										<Row >
											<Col lg="6" md="6" sm="12">
												<div className="billing-info mb-4">
													<h5 className="text-capitalize">Personal Details</h5>
													<div id="billing_info" className="align-items-center">
														<label for="fname">Full Name<small>*</small></label>
														<input required='required' type="text" value={billingData.fullname} onInput={(event) => setBillingData({ ...billingData, fullname: event.target.value })} placeholder="John M. Doe" />
														{msg.fullname && <small class="error">{msg.fullname}</small>} <br />

														<label for="email">Email<small>*</small></label>
														<input required='required' type="text" value={billingData.email} onInput={(event) => setBillingData({ ...billingData, email: event.target.value })} placeholder="john@example.com" />
														{msg.email && <small class="error">{msg.email}</small>}<br />

														<label for="phone">Phone No</label>
														<input type="number" value={billingData.phone} onInput={(event) => setBillingData({ ...billingData, phone: event.target.value })} placeholder="4965874851" />


													</div>
												</div>
											</Col>
											<Col lg="6" md="6" sm="12">
												<div className="billing-info mb-4">
													<h5 className="text-capitalize">Billing address</h5>
													<div id="billing_info" className="align-items-center">
														{
															!showAddressFields &&
															<>
															<label for="address">Select address</label>
																<Select
																	placeholder="Select Address"
																	options={billingAddressOptions}
																	onChange={(option) => {
																		setSelectedBillingAddress(option)
																	}
																	}
																	// value={billingAddressOptions?.filter(option => option.value === selectedBillingAddress?._id)}
																	value={selectedBillingAddress}
																/>
																{msg.selectAddress && <small class="error">{msg.selectAddress}</small>}<br />

																<button type="button" className="btn main-btn btn-block text-capitalize" onClick={() => setShowAddressFields(true)} >
																	Add New Address
																</button>
															</>
														}
														{
															showAddressFields &&
															<>
																<label for="adr">Address<small>*</small></label>
																<input required='required' type="text" value={billingData.address} onInput={(event) => setBillingData({ ...billingData, address: event.target.value })} placeholder="542 W. 15th Street" />
																{msg.address && <small class="error">{msg.address}</small>}<br />

																<label for="">Country<small>*</small></label>
																<Select
																	placeholder="Select Country"
																	options={countryOptions}
																	name="productType"
																	onChange={(option) => {
																		setCountry(option)
																		setBillingData({ ...billingData, country: option.label })
																	}
																	}
																	value={countryOptions?.filter(option => option.label === billingData.country)}
																/>
																{msg.country && <small class="error">{msg.country}</small>}<br />
																<input type="hidden" className="form-control" name="billing[state]" />

																<label for="city">City<small>*</small></label>
																<input required='required' type="text" value={billingData.city} onInput={(event) => setBillingData({ ...billingData, city: event.target.value })} name="billing[city]" placeholder="New York" />
																{msg.city && <small class="error">{msg.city}</small>}<br />

																<label for="zip">Zip Code</label>
																<input type="text" value={billingData.zipCode} onInput={(event) => setBillingData({ ...billingData, zipCode: event.target.value })} name="billing[zip]" placeholder="10001" />
																{msg.zipCode && <small class="error">{msg.zipCode}</small>}<br />

																<button type="button" className="btn main-btn btn-block text-capitalize" onClick={() => setShowAddressFields(false)} >
																	Select from existing addresses
																</button>
															</>
														}
													</div>
												</div>
											</Col>
										</Row>
									}

									<Row>
										<Col lg="12" md="12" sm="12">
											<div className="product-tbl-wrapper">
												<div className="table-responsive">
													<table class="theme-bordered-tbl product_tbl">
														<thead>
															<tr>
																<th>Product</th>
																<th>Product Name</th>
																<th>Quantity</th>
																<th>Excl.VAT</th>
																<th>Total Price</th>
															</tr>
														</thead>
														<tbody>
															{
																cart.length > 0 ?
																	cart.map((item, index) => {
																		return (
																			<tr key={index}>
																				<td>
																					<div class="item-image">
																						<Link target="_blank" title="View product" to="#.">
																							<img className="img-responsive" width="100" src={item.image ? item.image : productImg2} />
																						</Link>
																					</div>
																				</td>
																				<td>
																					<div class="item-title">{item.name} </div>
																				</td>
																				<td><span class="value">{item.quantity}</span>
																				</td>
																				<td><span class="value">{currencyFormat(item.salesPrice, currency.code, currency.symbol)}</span>
																				</td>
																				{/* <td><span class="value">{currencyFormat(item.totalPrice, currency.code, currency.symbol)}</span> */}
																				<td><span class="value">{currencyFormat((item.quantity * item.salesPrice).toFixed(2), currency.code, currency.symbol)}</span>
																				</td>
																			</tr>

																		)
																	})

																	: ''

															}
														</tbody>
													</table>
												</div>
											</div>
										</Col>
									</Row>
									<hr />
									<Row className="mt-5">
										<Col lg="6" md="4" xs="12">
											{/* <div className="d-flex flex-column h-100">
													<h5 className="text-capitalize">additional information</h5>
													<div className="additional-info">
														<label>Donec at nibh urna. Nam pellentesque </label>
														<textarea className="form-control" placeholder="Message"></textarea>
													</div>
												</div> */}
										</Col>
										<Col lg="6" md="8" xs="12">
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
													<div className="summary-info">
														{cart && cart.length > 0 ?
															cart.map((item, index) => {
																return (
																	<>
																		<p key={index}>
																			<a href="#.">
																				{item.name}<br />
																				{item.variationName}
																			</a>
																			<span className="price">
																				{currencyFormat(item.salesPrice, currency.code, currency.symbol)}
																			</span>
																		</p>
																		{index < cart.length - 1 && <hr />}
																	</>
																)
															}) : ''
														}
													</div>

													<p>Sub Total
														<span className="price">
															<b>
																{currencyFormat(cartTotal.subTotal, currency.code, currency.symbol)}
															</b>
														</span>
													</p>
													<p>Discount
														<span className="price">
															<b>
																{currencyFormat(cartTotal.discount, currency.code, currency.symbol)}
															</b>
														</span>
													</p>
													<p>
														VAT ({vatPercentage} %)
														<span className="price">
															<b>
																{currencyFormat(cartTotal.tax, currency.code, currency.symbol)}
															</b>
														</span>
													</p>
													<p>Total
														<span className="price">
															<b>
																{currencyFormat(cartTotal.total, currency.code, currency.symbol)}
															</b>
														</span>
													</p>
													{
														userData?._id &&
														<button type="button" className="btn main-btn btn-block mt-4" onClick={() => placeOrder()} >
															Place Order
														</button>
													}
												</div>
											</div>
										</Col>
									</Row>

								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<Footer />
		</Fragment>
	)
}
const mapStateToProps = state => ({
	siteSetting: state.siteSetting,
	checkout: state.checkout
})

export default connect(mapStateToProps, { beforeCheckout, getCountries, placeOrder, beforeCart, addToUserCart, getUser, getVATforCountry })(Checkout);