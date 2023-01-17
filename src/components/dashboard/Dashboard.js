import React, { useState, useEffect } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { beforeDashboard, getDashboardData } from "./dashboard.action";
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader"; import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import "./Dashboard.css";

const Dashboard = (props) => {
	let user = ENV.getUserKeys();
	const [dashboardData, setDashboardData] = useState({
		quotations: 0,
		salesOrders: 0,
		invoices: 0,
	})
	const [userData, setUserData] = useState({})

	useEffect(() => {
		props.getDashboardData(user._id)
	}, []);

	useEffect(() => {
		if (props.dashboard.getDataAuth) {
			setDashboardData(props.dashboard.data)
			setUserData(props.dashboard.data.user)
			props.beforeDashboard();
		}
	}, [props.dashboard.getDataAuth]);
	let { customername } = ENV.getUserKeys();
	return (
		<div>
			{customername ? <AuthHeader /> : <Header />}

			<div id="main">
				{/* <DashboardCard/>
					<Voucher/>
					<VoucherTable/> */}
				<div class="row dark-green div-breadcrumbs" style={{ background: 'rgb(146 132 250)', color: 'white', padding: '10px' }}>
					<div class="container">
						<div>
							Dashboard
						</div>
					</div>
				</div>
				<section class="content-section userdashboard-page" id="account-page">
					<Container>
						<div class="mt-4 row bottom-space">
							<Container>
								<Row>
									<div class="col-lg-8">
										<h3>Documents</h3>
										<div class="o_portal_docs list-group">
											<Link class="list-group-item list-group-item-action d-flex align-items-center justify-content-between" to="/quotationlisting" title="Quotations">
												Quotations
												<span class="badge badge-secondary badge-pill">{dashboardData.quotations}</span>
											</Link>
											<Link class="list-group-item list-group-item-action d-flex align-items-center justify-content-between" to="/salesorderlisting" title="Sales Orders">
												Sales Orders
												<span class="badge badge-secondary badge-pill">{dashboardData.salesOrders}</span>
											</Link>
											<Link class="list-group-item list-group-item-action d-flex align-items-center justify-content-between" to="/invoicelisting" title="Invoices &amp; Bills">
												Invoices
												<span class="badge badge-secondary badge-pill">{dashboardData.invoices}</span>
											</Link>
										</div>
									</div>
									{user &&
										<div class="col-lg-4 shop-search-bar">
											<Row>
												<div class="col-lg-12">
													<div className="dashboard-user-detail">
														<h3 className="text-uppercase"> {user.customername} </h3>
														<address class="mb-0">
															<div itemprop="address">
																{
																	user && user?.addresses?.length > 0 && user.addresses[0] &&
																	<div className="d-flex">
																		<span><FontAwesomeIcon icon={faLocationDot }/></span>
																		<div className="info-holder">
																			<h2 className="text-capitalize">Location</h2>
																			<p class="w-100 o_force_ltr d-block" itemprop="streetAddress">{user.addresses[0].street}<br />{user.addresses[0].city}  <br />{user.addresses[0].country}</p>
																		</div>
																	</div>
																}
																<div  className="d-flex">
																	<span><FontAwesomeIcon icon={faPhone }/></span>
																	<div className="info-holder">
																		<h2 className="text-capitalize">Contact Us</h2>
																		<a href={"tel:"+user.mobile} class="o_force_ltr" itemprop="telephone">{user.mobile}</a>
																	</div>
																</div>
																<div  className="d-flex">
																	<span><FontAwesomeIcon icon={faEnvelope}/></span>
																	<div className="info-holder">
																		<h2 className="text-capitalize">Email</h2>
																		<a href={"mailto:"+user.email} itemprop="email">{user.email}</a>
																	</div>
																</div>
																<div className="mt-3">
																	<Link className="btn main-btn" to="/userprofile">Profile</Link>
																</div>
															</div>
														</address>
													</div>
												</div>
											</Row>
										</div>
									}
								</Row>
							</Container>
						</div>
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
export default connect(mapStateToProps, { beforeDashboard, getDashboardData })(Dashboard);