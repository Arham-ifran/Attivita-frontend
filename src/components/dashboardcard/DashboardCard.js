import React, { Component, Fragment, useState } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader"; import Footer from '../footer/Footer';
import { ENV } from "../../config/config";



import "./DashboardCard.css";


const DashboardCard = (props) => {
	return (
		<section className="custom-container dashboard-card-details">
			<Container fluid>
				<Row className="align-items-center">
					<Col lg="3" md="6" xs="12">
						<div className="dashboard-card d-flex justify-content-between align-items-center">
							<span className="dashboard-card-name">Total Orders</span>
							<span className="dashboard-card-number">10</span>
						</div>
					</Col>
					<Col lg="3" md="6" xs="12">
						<div className="dashboard-card d-flex justify-content-between align-items-center">
							<span className="dashboard-card-name">Total Vouchers</span>
							<span className="dashboard-card-number">42</span>
						</div>
					</Col>
					<Col lg="3" md="6" xs="12">
						<div className="dashboard-card d-flex justify-content-between align-items-center">
							<span className="dashboard-card-name">Used Vouchers</span>
							<span className="dashboard-card-number">02</span>
						</div>
					</Col>
					<Col lg="3" md="6" xs="12">
						<div className="dashboard-card d-flex justify-content-between align-items-center">
							<span className="dashboard-card-name">Remaining Vouchers</span>
							<span className="dashboard-card-number">40</span>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}


export default DashboardCard;