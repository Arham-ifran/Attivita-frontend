import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import aboutImg from '../../assets/images/about-us.svg'
import "./About.css";


const About = (props) => {
	return (
		<section className="about-us">
			<Container fluid>
				<Row className="align-items-center">
					<Col lg="6" md="6" xs="12">
						<div className="about-us-text">
							<h2>About Us</h2>
							<h5>We Cyber-Guard Your Data, Devices & E-Communications</h5>
							<p>Attivita is an eCommerce platform that provides endpoint security solutions to individuals and organizations for data protection from cyber threats. Whether you transfer an email account, perform cloud storage migration, or move large files as embedded links in emails, everything uploaded to our system and shared through it is always checked for viruses and malware.</p>
						</div>
					</Col>
					<Col lg="6" md="6" xs="12">
						<div className="text-center about-us-section-img">
							<img src={aboutImg} className="img-fluid" alt="about-us" title="" />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default About;