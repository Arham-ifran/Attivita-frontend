import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import SimpleSlider from '../simpleslider/SimpleSlider';
import { connect } from 'react-redux';
import { getProduct, beforeProducts } from "../product/product.action";
import Select from 'react-select';
import productOffcImg from '../../assets/images/products-office.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ENV } from "../../config/config";
import { variationCurrencyFormat, currencyFormat } from "../../utils/functions"
import { getVATforCountry } from "../siteSettings/siteSettings.action";
import { beforeCart, addToUserCart } from '../cart/cart.action'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from 'sweetalert'

import FullPageLoader from '../FullPageLoader/FullPageLoader'
import "./ProductDetail.css";
import Cart from "../cart/Cart";


const ProductDetail = (props) => {
	const history = useHistory();
	const myRef = useRef(null)
	let userData = ENV.getUserKeys();
	const [product, setProduct] = useState()
	const [vatPercentage, setVatPercentage] = useState(19)
	const [variationError, setVariationError] = useState(false)
	const [loader, setLoader] = useState(false)

	const [language, setLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'en')

	const [currency, setCurrency] = useState({
		symbol: "€",
		code: "EUR"
	})
	const [selectedVariation, setSelectedVariation] = useState({
		id: '',
		price: '',
		quantity: 1,
		variationName: ''
	})
	const [variationOptions, setVariationOptions] = useState([])

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		myRef.current.scrollIntoView()
		props.getProduct(window.location.pathname.split('/')[2])
	}, []);

	useEffect(() => {
		if (props.product.getproduct) {
			switch(language) {
				case 'en':
					break;
				case 'de':
					props.product.product.shortDescription =  props.product.product.shortDescriptionDE
					props.product.product.longDescription =  props.product.product.longDescriptionDE
					break;
					
			}
			setProduct(props.product.product)
			let variationOptions_ = props.product.product.variations?.map(variation => ({
				label: variation.details.map((detail, index_) => {
					return (
						detail.attributeName + ": " + detail.attributeValue
					)
				}).join(', '),
				value: variation._id,
				price: variation.salesPrice,
			}))
			setVariationOptions([...variationOptions_])
			setSelectedVariation({ ...selectedVariation, price: props.product.product.salesPrice })
			props.beforeProducts()
		}
	}, [props.product.getproduct]);

	useEffect(() => {
		if (props.siteSetting.getSettings) {
			if (userData?.addresses && userData?.addresses?.length > 0) {
				props.getVATforCountry(userData?.addresses[0]?.country)
			}
			else {
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
		if (props.cart.cartAddedAuth) {
			props.beforeCart()
			
			setLoader(false)
		}

	}, [props.cart.cartAddedAuth]);
	
	useEffect(() => {
		if (props.cart.cartNotAddedAuth) {
			swal({
				text: "Your account is not active yet. Kindly contact admin to continue.",
				icon: "warning",
				button: "OK!",
			});
			localStorage.removeItem('coupon')
			localStorage.removeItem('cart')
			localStorage.removeItem('cartTotal')
			handleClose()
			props.beforeCart()
			setLoader(false)
		}

	}, [props.cart.cartNotAddedAuth]);

	const addToCart = () => {
		if (product.variations.length > 0) {
			if (!selectedVariation.id) {
				setVariationError(true)
			}
			else {
				setVariationError(false)


				setCart(product, selectedVariation.price, selectedVariation.id, selectedVariation.quantity, selectedVariation.variationName)
				let cart = localStorage.getItem("cart")
				cart = cart ? JSON.parse(cart) : [];

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
					setLoader(true)
					props.addToUserCart(cartParams)
				}
				handleShow();
				// history.push("/cart")
			}
		}
		else {
			setCart()
			let cart = localStorage.getItem("cart")
			cart = cart ? JSON.parse(cart) : [];
			if (userData) {	//If user is logged in 
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
			handleShow();
			// history.push("/cart")
		}

	}

	const setCart = () => {
		let cart = localStorage.getItem("cart")
		cart = cart ? JSON.parse(cart) : [];
		let addNew = true
		cart.forEach(item => {
			if (item.productId == product._id && item.variationId == selectedVariation.id) {
				item.quantity += selectedVariation.quantity
				addNew = !addNew
			}
		})
		if (addNew) {
			let selectedProduct = {
				productId: product._id,
				name: product.name,
				shortDescription: product.shortDescription,
				image: JSON.parse(product.Image),
				variationName: selectedVariation.variationName ? selectedVariation.variationName : '',
				variationId: selectedVariation.id ? selectedVariation.id : '',
				quantity: selectedVariation.quantity,
				price: selectedVariation.price + (selectedVariation.price * vatPercentage / 100),
				salesPrice: selectedVariation.price,
				discountPercentage: 0
			}
			cart.push(selectedProduct)
		}
		localStorage.setItem("cart", JSON.stringify(cart))
	}
	let { customername } = ENV.getUserKeys();
	return (
		<Fragment>
			{customername ? <AuthHeader /> : <Header />}
			<div id="main"  ref={myRef}>
				{product ?
					<section className="content-section mt-5 mb-5 product-detail-page" id="shop-page">
						<form id="addToCart" method="post" >
							<input type="hidden" name="product_id" />
							<Container>
								<Row className="clearfix">
									<Col lg="6" md="12" xs="12">
										<Row>
											<Col lg="2" md="2" xs="2"></Col>
											<Col lg="8" md="12" xs="12">
												<div className="feature-product-img">
													< SimpleSlider images={product.eccomerceImages} />
												</div>
											</Col>
											<Col lg="2" md="2" xs="2"></Col>
										</Row>
									</Col>
									<Col lg="6" md="12" xs="12">
										<div className="product-details">
											<div className="d-flex flex-row justify-content-between align-items-start product-title-price mb-2">
												<h3 className="d-flex justify-content-between align-items-center product_price_label font-weight-bold">
													{product.name}
												</h3>
												<span title="Price Inclusive Tax" className="price-area">
													{product.initialPrice == product.lastPrice ? currencyFormat(product.initialPrice + (product.initialPrice * vatPercentage / 100), currency.code, currency.symbol) : ''}
													{product.initialPrice < product.lastPrice ? variationCurrencyFormat(product.initialPrice + (product.initialPrice * vatPercentage / 100), product.lastPrice + (product.lastPrice * vatPercentage / 100), currency.code, currency.symbol) : ''}
												</span>
											</div>
											<small className="vat d-flex justify-content-end w-100">Inclusive of {vatPercentage}% VAT</small>
											<div className="product-details-bottom-section mt-3 mb-3 ps-lg-0 " dangerouslySetInnerHTML={{ __html: product.shortDescription && product.shortDescription != "undefined" ? product.shortDescription : '' }}>
											</div>
											<div className="panel-group custom-panel-style mb-5" id="accordion">
												<h3 className="d-flex justify-content-between align-items-center product_price_label">Choose Variant</h3>
												<Select
													placeholder="Select Product Type"
													options={variationOptions}
													name="productType"
													onChange={(option) => {
														setSelectedVariation({ ...selectedVariation, id: option.value, price: option.price, variationName: option.label })
													}
													}
													value={variationOptions?.filter(option => option.value === selectedVariation.id)}
												/>
												{
													variationError &&
													<small class="error">Please select variation</small>

												}
												<div id="variation-error" className="animated fadeInDown"></div>
											</div>
											<Row>
												<Col lg="12" md="12" xs="12">
													<div className="cart-quilty-incremnt">
														<button type="button" id="decrement" onClick={(event) => {
															if (selectedVariation.quantity > 1)
																setSelectedVariation({ ...selectedVariation, quantity: selectedVariation.quantity - 1 })
														}}>
															<FontAwesomeIcon icon={faMinus} />
														</button>
														<input type="text" name="quantity" min="1" value={selectedVariation.quantity} maxlength="2" max="10" size="1"
															id="quantity" readonly />
														<button type="button" id="increment" onClick={(event) => {
															setSelectedVariation({ ...selectedVariation, quantity: selectedVariation.quantity + 1 })
														}}>
															<FontAwesomeIcon icon={faPlus} />
														</button>
													</div>
													<div id="quantity-error" className="invalid-feedback animated fadeInDown"></div>
												</Col>
												<Col lg="6" md="12" xs="12" className="button-center">
													<button type="button" className="main-btn mb-5" onClick={() => addToCart()}>Add To Cart</button>
												</Col>
											</Row>
										</div>
									</Col>
								</Row>

								<Row className="clearfix">
									<Col lg="12" md="12" xs="12">
										<hr />
									</Col>
									<Col lg="12" md="12" xs="12" className="product-long-description-area" dangerouslySetInnerHTML={{ __html: product.longDescription && product.longDescription != "undefined" ? product.longDescription : '' }}>
									</Col>
								</Row>
							</Container>
						</form>
					</section>
					:
					<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
						<section className="content-section mt-5 mb-5 product-detail-page" id="shop-page">
							<form id="addToCart" method="post" >
								<input type="hidden" name="product_id" />
								<Container>
									<Row className="clearfix">
										<Col lg="6" md="12" xs="12">
											<Row>
												<Col lg="2" md="2" xs="2"></Col>
												<Col lg="8" md="12" xs="12">
													<div className="feature-product-img">
														<Skeleton height={250} width={250} />
													</div>
												</Col>
												<Col lg="2" md="2" xs="2"></Col>
											</Row>
										</Col>
										<Col lg="6" md="12" xs="12">
											<div className="product-details">
												<div className="d-flex flex-row justify-content-between align-items-start product-title-price mb-2">
													<h3 className="d-flex justify-content-between align-items-center product_price_label font-weight-bold">
														<Skeleton count={2} />
													</h3>
													<span title="Price Inclusive Tax" className="price-area">
													<Skeleton count={2} />
													</span>
												</div>
												<small className="vat d-flex justify-content-end w-100"><Skeleton count={1} /></small>
												<div className="product-details-bottom-section mt-3 mb-3 ps-lg-0 " >
												<Skeleton count={2} />
												</div>
												<div className="panel-group custom-panel-style mb-5" id="accordion">
													<Skeleton count={3} />
												</div>
												<Row>
													<Col lg="12" md="12" xs="12">
														<div className="cart-quilty-incremnt">
														<Skeleton count={5} />
														</div>
														<div id="quantity-error" className="invalid-feedback animated fadeInDown"></div>
													</Col>
													<Col lg="6" md="12" xs="12" className="button-center">
													<Skeleton count={1} />
													</Col>
												</Row>
											</div>
										</Col>
									</Row>

									<Row className="clearfix">
										<Col lg="12" md="12" xs="12">
											<hr />
										</Col>
										<Col lg="12" md="12" xs="12">
										<Skeleton count={6} />
										</Col>
									</Row>
								</Container>
							</form>
						</section>
					</SkeletonTheme>
				} 
				{loader && <FullPageLoader/>}
			</div>
			<Footer />

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false} className="cart-modal">
				<Modal.Header closeButton>
					<h4 className="mb-0"><span className="glyphicon glyphicon-shopping-cart"></span> <b>Cart</b></h4>
				</Modal.Header>
				<Modal.Body>
					<Cart />
				</Modal.Body>

			</Modal>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	errors: state.errors,
	siteSetting: state.siteSetting,
	product: state.product,
	cart: state.cart
})

export default connect(mapStateToProps, { beforeProducts, getProduct, addToUserCart, beforeCart, getVATforCountry })(ProductDetail);