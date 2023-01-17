import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ContactBannerImg from '../../assets/images/contact-banner.png'
import "./ContactBanner.css";


const ContactBanner = (props) => {
	return (
			<section className="contact-us-banner custom-container">
				<Container fluid>
					<Row className="align-items-center">
						<Col lg="6" md="6" xs="12">
							<div className="banner-text">
								<h1>GET IN TOUCH</h1>
								<p>CONTACT US & YOU’LL HEAR BACK TODAY.</p>
							</div>
						</Col>
						<Col lg="6" md="6" xs="12">
							<div className="banner-img">
								<img src={ContactBannerImg} className="img-fluid" alt="Contact Banner" title="" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		)
}


export default ContactBanner;