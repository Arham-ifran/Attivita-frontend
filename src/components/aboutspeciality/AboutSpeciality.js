import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SpecialityImg from '../../assets/images/about-us-speciality.png'
import SpecialityFastImg from '../../assets/images/about-speciality-fast.svg'
import SpecialityCcImg from '../../assets/images/about-speciality-cc.svg'
import SpecialityDuplicateImg from '../../assets/images/about-speciality-duplicate.svg'
import SpecialityCameraImg from '../../assets/images/about-speciality-camera.svg'


import "./AboutSpeciality.css";


const AboutSpeciality = (props) => {
		return (
			<section className="about-us-speciality">
				<Container fluid>
					<Row className="align-items-center">
						<Col lg="6" md="12" xs="12">
							<div className="about-us-speciality-img text-center d-inline-block">
								<img src={SpecialityImg} className="img-fluid " alt="about-us" title="" />
							</div>
						</Col>
						<Col lg="6" md="12" xs="12">
							<div className="about-us-speciality-main">
								<ul className="list-unstyled m-0">
									<li className="d-flex">
										<div className="speciality-icon-bg d-flex justify-content-center align-items-center">
											<div className="speciality-icon-bg-img">
												<img src={SpecialityFastImg} alt="icon" className="img-fluid"/>
											</div>
										</div>
										<div className="about-us-speciality-text">
											<h3>Fast and Reliable</h3>
											<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur neque quam, pharetra sit amet lorem in, fringilla hendrerit odio.</p>
										</div>
									</li>
									<li className="d-flex">
										<div className="speciality-icon-bg d-flex justify-content-center align-items-center">
											<div className="speciality-icon-bg-img">
												<img src={SpecialityCcImg} alt="icon" className="img-fluid"/>
											</div>
										</div>
										<div className="about-us-speciality-text">
											<h3>Loram Lityoiuny Kiolio</h3>
											<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur neque quam, pharetra sit amet lorem in, fringilla hendrerit odio.</p>
										</div>
									</li>
									<li className="d-flex">
										<div className="speciality-icon-bg d-flex justify-content-center align-items-center">
											<div className="speciality-icon-bg-img">
												<img src={SpecialityDuplicateImg} alt="icon" className="img-fluid"/>
											</div>
										</div>
										<div className="about-us-speciality-text">
											<h3>Kilo Gumber Huirtop</h3>
											<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur neque quam, pharetra sit amet lorem in, fringilla hendrerit odio.</p>
										</div>
									</li>
									<li className="d-flex">
										<div className="speciality-icon-bg d-flex justify-content-center align-items-center">
											<div className="speciality-icon-bg-img">
												<img src={SpecialityCameraImg} alt="icon" className="img-fluid"/>
											</div>
										</div>
										<div className="about-us-speciality-text">
											<h3>Nexrtio and Jhe Breiwty</h3>
											<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur neque quam, pharetra sit amet lorem in, fringilla hendrerit odio.</p>
										</div>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

		)
}


export default AboutSpeciality;