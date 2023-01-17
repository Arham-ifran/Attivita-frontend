import React, { Fragment, useEffect, useState } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Tab, Tabs, TabContent, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productImg2 from '../../assets/images/products-device.png'
import productImg3 from '../../assets/images/products-office.png'
import { getProductsList, beforeProducts } from "./product.action";
import { getVATforCountry } from "../siteSettings/siteSettings.action";
import { connect } from 'react-redux';
import { variationCurrencyFormat, currencyFormat } from "../../utils/functions"
import { ENV } from "../../config/config";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Product.css";


const HomeProduct = (props) => {
	let user = ENV.getUserKeys();
	const [products, setProducts] = useState([])
	const [manufacturers, setManufacturers] = useState([])
	const [vatPercentage, setVatPercentage] = useState(16)
	const [showAllProducts, setShowAllProducts] = useState(true)
	const [currency, setCurrency] = useState({
		symbol: "€",
		code: "EUR"
	})

	useEffect(() => {
		props.getProductsList()
	}, [])
	
	useEffect(() => {
		if (props.siteSetting.getSettings) {
			if(user?.addresses && user?.addresses?.length > 0)
			{
				props.getVATforCountry(user?.addresses[0]?.country)
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
		if(props.product.getproductsList){
			setManufacturers(props.product.productsList.manufacturers)
			setProducts(props.product.productsList.products)
			props.beforeProducts()
		}
	}, [props.product.getproductsList]);

	return (
		<section className="products-section custom-container home-product-sec">
			<Container fluid>
				<h2 className="text-center">Attivita</h2>
				<h3 className="text-center">Security Product Framework</h3>
				<h3 className="vendor-head-sty">Choose from Vendors</h3>
				<Tab.Container>
					<Row className="mb-5 vendor-row">
						<Col lg="12" md="12" sm="12">
							<Nav variant="pills" className="row flex-row">
								{
									manufacturers.length > 0 ?
									manufacturers.map((manufacturer, index) => {
										return (
											<Nav.Item className="col-xl-2 col-lg-4 col-md-4 col-sm-4" key={index} onClick={() => setShowAllProducts(false)}>
												<Nav.Link eventKey={index+"-event"} className="link-unstyled  vendor-images">
													<div className="products-card d-flex justify-content-center align-items-center flex-column">
														<div className="products-same-img">
															<img src={manufacturer.image} className="img-fluid" alt="product email" title="" />
														</div>
													</div>

												</Nav.Link>
												<div className="products-card-text"><h5 className="text-center">{manufacturer.name}</h5></div>
											</Nav.Item>
										)
									}):
									<Fragment>
										<Nav.Item className="col-lg-2">
											<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
											<p>
												<Skeleton count={3} />
											</p>
											</SkeletonTheme>
										</Nav.Item>
										<Nav.Item className="col-lg-2">
											<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
											<p>
												<Skeleton count={3} />
											</p>
											</SkeletonTheme>
										</Nav.Item>

									</Fragment>
									
								}
								
							</Nav>
								
						</Col>
					</Row>
					<h3>Our Products Range</h3>
					<Row>
						<Col lg="12" md="12" sm="12">
							{
								showAllProducts ? 
									products.length > 0 ?
									<Row className="all_products_row">
										{ 
											products.map((product, index_) => {
												let allow_display = true
												let initialPrice = 0
												let lastPrice = 0
												initialPrice = product.initialPrice + (product.initialPrice * vatPercentage / 100)
												lastPrice = product.lastPrice + (product.lastPrice * vatPercentage / 100)
												if(window.location.pathname.split('/')[1] == '' && index_ > 7 )
													{
														allow_display = false
													}
												if(allow_display){
													return (
														<Link to={"/productdetail/"+product._id} className="link-unstyled col-xl-3 col-lg-4 col-md-4 col-sm-6" key={index_}>
															<div className="products-card all-products-card d-flex justify-content-between align-items-center flex-column">
																<div className="products-same-img">
																	<img src={product.Image && JSON.parse(product.Image) ? JSON.parse(product.Image) : productImg2} className="img-fluid" alt={product.name} title="" />
																</div>
																<div className="products-card-text">
																	<h5 title={product.name} className="text-capitalize">{product.name}</h5>
																	<span id="product-price">
																		{product.initialPrice == product.lastPrice ? currencyFormat(initialPrice,currency.code,currency.symbol) : '' }
																		{product.initialPrice < product.lastPrice ? variationCurrencyFormat(initialPrice,lastPrice,currency.code,currency.symbol) : '' }
																	</span>
																</div>
															</div>
														</Link>
													)
												}
											})
										}
									</Row>
									:
									<Fragment>
											<Nav.Item className="col-lg-2" >
												<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
												<p>
													<Skeleton count={6} />
												</p>
												</SkeletonTheme>
											</Nav.Item>
											<Nav.Item className="col-lg-2" >
												<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
												<p>
													<Skeleton count={6} />
												</p>
												</SkeletonTheme>
											</Nav.Item>

									</Fragment>
								: ''
							}
							<Tab.Content className="row product-tabs">
							{
								products && products.length > 0 && manufacturers.length > 0 ?
								manufacturers.map((manufacturer, index) => {
									return (
										<Tab.Pane eventKey={index+"-event"} className="col-lg-12" key={index}>
											<Row>
												{
													manufacturer.products.length > 0 ? 
													manufacturer.products.map((product, index_) => {
														let product_ = products.filter((p)=>{
															return p._id == product._id;
														})
														let allow_display = true
														let initialPrice = 0
														let lastPrice = 0
														initialPrice = product_[0].initialPrice + (product_[0].initialPrice * vatPercentage / 100)
														lastPrice = product_[0].lastPrice + (product_[0].lastPrice * vatPercentage / 100)
														if(window.location.pathname.split('/')[1] == '' && index_ > 7 )
														{
															allow_display = false
														}
														if(allow_display){
															return (
																<Link to={"/productdetail/"+product._id} className="link-unstyled col-xl-3 col-lg-4 col-md-4 col-sm-6" key={index_}>
																	<div className="products-card d-flex justify-content-between align-items-center flex-column">
																		<div className="products-same-img">
																			<img src={product_[0].Image && JSON.parse(product_[0].Image) ? JSON.parse(product_[0].Image) : productImg2} className="img-fluid" alt={product_[0].name} title="" />
																		</div>
																		<div className="products-card-text">
																			<h5 title={product_[0].name} className="text-capitalize">{product_[0].name}</h5>
																			<span id="product-price">
																				{product_[0].initialPrice == product_[0].lastPrice ? currencyFormat(initialPrice,currency.code,currency.symbol) : '' }
																				{product_[0].initialPrice < product_[0].lastPrice ? variationCurrencyFormat(initialPrice,lastPrice,currency.code,currency.symbol) : '' }
																			</span>
																		</div>
																	</div>
																</Link>
															)
														}
													}):''
												}
											</Row>
										</Tab.Pane>
									)
								})
								:
								<Fragment>
										<Nav.Item className="col-lg-2" >
											<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
											<p>
												<Skeleton count={6} />
											</p>
											</SkeletonTheme>
										</Nav.Item>
										<Nav.Item className="col-lg-2" >
											<SkeletonTheme color="#202020" highlightColor="#7E9DF3">
											<p>
												<Skeleton count={6} />
											</p>
											</SkeletonTheme>
										</Nav.Item>

									</Fragment>
							}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</section>
	)

}


const mapStateToProps = state => ({
	errors: state.errors,
	product: state.product,
	siteSetting: state.siteSetting
});
export default connect(mapStateToProps, { beforeProducts, getProductsList, getVATforCountry })(HomeProduct);