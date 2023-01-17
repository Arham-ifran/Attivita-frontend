import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ShopBannerImg from '../../assets/images/shop-banner.png'
import "./ShopBanner.css";


const ShopBanner = (props) => {
	return (
			<section className="shop-banner custom-container">
				<Container fluid>
					<Row className="align-items-center">
						<Col lg="6" md="6" xs="12">
							<div className="banner-text">
								<h3>ALL-IN-ONE</h3>
								<h1>TRUE CYBER PROTECTION</h1>
							</div>
						</Col>
						<Col lg="6" md="6" xs="12">
							<div className="banner-img">
								<img src={ShopBannerImg} className="img-fluid" alt="laptop" title="" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>

		)
}


export default ShopBanner;