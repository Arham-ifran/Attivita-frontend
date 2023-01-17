import React, { Component, Fragment, useState, useEffect } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productOffcImg from '../../assets/images/products-office.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import productImg2 from '../../assets/images/products-device.png'
import { getVATforCountry } from "../siteSettings/siteSettings.action";

import { ENV } from "../../config/config";
import { variationCurrencyFormat, currencyFormat } from "../../utils/functions"
import { beforeCart, validateCoupon, addToUserCart } from "./cart.action";
import "./Cart.css";


const Cart = (props) => {
	const [vatPercentage, setVatPercentage] = useState(19)
	const [inValidCoupon, setInValidCoupon] = useState(false)
	let userData = ENV.getUserKeys();
	const [currency, setCurrency] = useState({
		symbol: "€",
		code: "EUR"
	})
	const [cartTotals, setCartTotals] = useState({
		subTotal: 0,
		discount: 0,
		tax: 0,
		total: 0,
	})
	const [couponCode, setCouponCode] = useState(JSON.parse(localStorage.getItem("coupon")) ? JSON.parse(localStorage.getItem("coupon")).promotionCode : '')
	const [coupon, setCoupon] = useState(JSON.parse(localStorage.getItem("coupon")) ? JSON.parse(localStorage.getItem("coupon")) : {})
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])

	useEffect(() => {
		updateCart()
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
		updateCart()
	}, [cart]);

	useEffect(() => {
		if (props.siteSetting.getSettings) {
			if(userData?.addresses && userData?.addresses?.length > 0)
			{
				props.getVATforCountry(userData?.addresses[0]?.country)
			}
			else
			{
				setVatPercentage(props.siteSetting.settings.vatPercentage)
			}
		}
	}, [props.siteSetting.getSettings]);
	useEffect(() => {
		if (props.siteSetting.getCountry) {
			setVatPercentage(props.siteSetting.vat)
		}
	}, [props.siteSetting.getCountry]);
	useEffect(() => {
		if (props.cart.validateCouponAuth) {
			if(!props.cart.coupon.priceList.customer || ( props.cart.coupon.priceList.customer && props.cart.coupon.priceList.customer == userData._id )){
				setCoupon(props.cart.coupon.priceList)
				setInValidCoupon(false)
			} else {
				setInValidCoupon(true)
			}
			props.beforeCart()
		}
	}, [props.cart.validateCouponAuth]);
	useEffect(() => {
		if (props.cart.inValidateCouponAuth) {
			setInValidCoupon(true)
			props.beforeCart()
		}
	}, [props.cart.inValidateCouponAuth]);

	useEffect(() => {
		updateCart()
	}, [vatPercentage]);

	useEffect(() => {
		if (coupon && coupon.rules) {
			applyCouponToCart()
			localStorage.setItem("coupon", JSON.stringify(coupon))
		}
		else {
			resetCoupon()
			localStorage.setItem("coupon", JSON.stringify({}))
		}
	}, [coupon]);

	const incrementQuantity = (index) => {
		let localCart = cart
		localCart[index].quantity += 1
		setCart([...localCart])
	}
	const decremenetQuantity = (index) => {
		let localCart = cart
		localCart[index].quantity -= 1
		if (localCart[index].quantity == 0) {
			localCart.splice(index, 1)
		}
		setCart([...localCart])

	}
	const removeProduct = (index) => {
		let localCart = cart
		localCart[index].quantity = 0
		if (localCart[index].quantity == 0) {
			localCart.splice(index, 1)
		}
		setCart([...localCart])

	}
	const checkCoupon = () => {
		if (couponCode ) {
			resetCoupon()
			props.validateCoupon({ promotionCode: couponCode })
		} else {
			resetCoupon()
		}
	}

	const applyCouponToCart = () => {
		let localCart = cart
		localCart.map((item, cartIndex) => {
			let discountPercentage = 0
			if (coupon) {
				coupon.rules.map((rule, ruleIndex) => {
					if (rule.type === 1) // If the rule is applicable on all products
					{
						discountPercentage = rule.percentage
						return
					}
					else if (rule.type == 2) // If the rule is applicable on specific product
					{
						if (item.productId == rule.productId) {
							discountPercentage = rule.percentage
							return
						}
					}
					else if (rule.type == 3) // If the rule is applicable on specific product and variation
					{
						if (item.productId == rule.productId && item.variationId == rule.productVariationId) {
							discountPercentage = rule.percentage
							return
						}
					}
				})
			}
			item.discountPercentage = discountPercentage

		})
		setCart([...localCart])
	}

	const resetCoupon = () => {
		let localCart = cart
		localCart.map((item, cartIndex) => {
			item.discountPercentage = 0
		})
		setCart([...localCart])
	}

	const updateCart = () => {
		let subTotal = 0
		let discount = 0
		let tax = 0
		let total = 0

		cart.map((item) => {
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

		setCartTotals({
			subTotal: subTotal,
			discount: discount,
			tax: tax,
			total: total
		})
		localStorage.setItem('cartTotal', JSON.stringify({
			subTotal: subTotal,
			discount: discount,
			tax: tax,
			total: total
		}))

		if (userData?._id) {	//If user is logged in 
			cart.map((item, index) => {
				cart[index].unitSalesPrice = cart[index].salesPrice
				cart[index].totalPrice = cart[index].salesPrice * cart[index].quantity
			})

			let cartParams = {
				userId: userData._id,
				isCheckout: false,
				items: cart
			}
			props.addToUserCart(cartParams)
		}

	}
	return (
		<section className="cart-wrapper">
			<Container>
				<Row>
					<Col lg="12" xs="12" className="mb-5">
						<div className="card card-info">
						
							<div className="card-body">
								<div className="cart-product-box">
									{
										cart && cart.length > 0 ?
											cart.map((item, index) => {
												return (

													<Row className="cart_row" key={index}>
														<Col lg="12" md="12" sm="12">
															<Row>
																<Col lg="2" md="2" sm="2">
																	<div className="product-img-wrap">
																		<Link target="_blank" title="View product" to="#.">
																			<img className="img-responsive" src={item.image ? item.image : productImg2} />
																		</Link>
																	</div>
																</Col>
																<Col lg="8" md="8" sm="8">
																	<p className="product-name ml-2">
																		<strong title="Product name">{item.name} {item.variationName}</strong>
																	</p>
																</Col>
																<Col lg="2" md="2" sm="2">
																	<div className="dlt-btn-wrap">
																		<button type="button" className="btn btn-link btn-xs" onClick={() => removeProduct(index)}>
																			<FontAwesomeIcon icon={faXmark} />
																		</button>
																	</div>
																</Col>
															</Row>
														</Col>
														<Col lg="12" md="12" sm="12">
															<div className="quantity-price-wrapper mt-3 mb-3">

																<div className="quantity-div cart-quilty-incremnt">
																	<button type="button" className="decrement" id="" title="Decrease quantity" onClick={() => decremenetQuantity(index)}>
																		<FontAwesomeIcon icon={faMinus} />
																	</button>
																	<input title="Quantity" type="text" maxlength="2" max="10" size="1" value={item.quantity}
																		className="qty-input form-control" />
																	<button type="button" className="increment" id="" title="Increase quantity" onClick={() => incrementQuantity(index)}>
																		<FontAwesomeIcon icon={faPlus} />
																	</button>
																</div>
																<div className="text-right">
																	<h6 title="Unit price">
																		<strong>
																			{/* {currencyFormat( item.salesPrice + (item.salesPrice * vatPercentage / 100)  ,currency.code,currency.symbol)} */}
																			{currencyFormat(item.salesPrice, currency.code, currency.symbol)} &nbsp;
																			<span className="text-muted" >x</span>&nbsp;
																			{item.quantity}
																		</strong>
																	</h6>

																</div>
															</div>
														</Col>
													</Row>
												)
											})
											:
											<Row className="cart_row">
												<Col lg="12" md="12" sm="12">
													<p className="product-name text-center">
														Nothing in the cart. Click <Link to="/shop" >here</Link> to add product to cart
													</p>
												</Col>
											</Row>
									}
								</div>


								<Row id="couponArea">
									{/* <Col lg="5" md="12" xs="12"> */}
									<Col md="12" xs="12">
										{/* <h6 className="text-right">Have a coupon</h6> */}
										<h6 className="">Have a coupon</h6>
									</Col>
									{/* <Col lg="7" md="12" xs="12"> */}
									<Col md="12" xs="12">
										<input type="text" className="form-control" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} id="coupon-code-text" placeholder="Enter Coupon Code" />
										<button type="button" className="btn btn-default btn-sm btn-block" onClick={() => checkCoupon()}>
											Apply Coupon
										</button>
										{inValidCoupon && <small class="error">Coupon is invalid</small>} 
									</Col>
								</Row>
							</div>
							<div className="card-footer">
								<Row className="text-center">
									<Col lg="12" xs="12">

										<h6 className="text-right cart-h6">Sub Total
											<strong id="subtotal_price" className="ml-2">
												{currencyFormat(cartTotals.subTotal, currency.code, currency.symbol)}
											</strong>
										</h6>
										<h6 className="text-right cart-h6">Discount
											<strong id="subtotal_price" className="ml-2">
												{currencyFormat(cartTotals.discount, currency.code, currency.symbol)}
											</strong>
										</h6>
										<h6 className="text-right cart-h6">VAT {vatPercentage}%
											<strong id="vat_total_price" className="ml-2">
												{currencyFormat(cartTotals.tax, currency.code, currency.symbol)}
											</strong>
										</h6>
										<h6 className="text-right cart-h6">Total
											<strong id="total_price" className="ml-2">
												{currencyFormat(cartTotals.total, currency.code, currency.symbol)}
											</strong>
										</h6>
									</Col>
									<Col lg="12" ms="12" sm="12">
										{cart && cart.length > 0 &&
											<div id="checkoutButton" className="mt-3">
												<Link to={"/checkout"} >
													<button type="button" className="btn btn-success btn-block" >
														Checkout
													</button>
												</Link>
											</div>
										}
									</Col>

								</Row>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

const mapStateToProps = state => ({
	siteSetting: state.siteSetting,
	cart: state.cart,
})
export default connect(mapStateToProps, { beforeCart, validateCoupon, addToUserCart, getVATforCountry })(Cart);