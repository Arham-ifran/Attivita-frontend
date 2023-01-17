import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductBackupImg from '../../assets/images/products-backup.png'
import ProductOfficeImg from '../../assets/images/products-office.png'


import "./AboutProduct.css";


const AboutProduct = (props) => { 
		return (
			<section className="about-us-products">
				<Container fluid>
					<Row className="align-items-center products-row-gap">
						<Col lg="6" md="6" xs="12">
							<div className="about-us-products-text">
								<h2>Neque Yorro Buisquam</h2>
								<p>Donec placerat egestas metus a vestibulum. Proin in ullamcorper. ellen tesque habitant mbni aworbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin hendrerit placerat augue kiosit amet congued nean sed justo porta libero tincidunt varius id sed metus. Donec pulvinar fringilla massa quis tempus. drerit placerat augue sit amet congue. nean sed justo porta libero tincidunt varius id sed. </p>
								<p>Gllen tesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin hendrerit placerat augue sit amet congue. nean sed justo porta libero tincidunt varius id sed metus.</p>
							</div>
						</Col>
						<Col lg="6" md="6" xs="12">
							<div className="text-center about-us-products-img">
								<img src={ProductBackupImg} alt="office-immunuity" className="img-fluid"/>
							</div>
						</Col>
					</Row>
					<Row className="align-items-center products-reverse-row">
						<Col lg="6" md="6" xs="12">
							<div className="text-center about-us-products-img-2">
								<img src={ProductOfficeImg} alt="backup-immunuity" className="img-fluid"/>
							</div>
						</Col>
						<Col lg="6" md="6" xs="12">
							<div className="about-us-products-text">
								<h2>Neque Yorro Buisquam</h2>
								<p>Donec placerat egestas metus a vestibulum. Proin in ullamcorper. ellen tesque habitant mbni aworbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin hendrerit placerat augue kiosit amet congued nean sed justo porta libero tincidunt varius id sed metus. Donec pulvinar fringilla massa quis tempus. drerit placerat augue sit amet congue. nean sed justo porta libero tincidunt varius id sed. </p>
								<p>Gllen tesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin hendrerit placerat augue sit amet congue. nean sed justo porta libero tincidunt varius id sed metus.</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

		)
}


export default AboutProduct;