import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AboutBannerImg from '../../assets/images/about-us-banner.png'
import "./AboutUsBanner.css";


const AboutUsBanner = (props) => {
    return (
        <section className="about-us-banner custom-container">
            <Container fluid>
                <Row className="align-items-center">
                    <Col lg="6" md="6" xs="12">
                        <div className="banner-text">
                            <h1>ABOUT US</h1>
                            <p>WE CYBER-GUARD YOUR DATA, DEVICES & E-COMMUNICATIONS</p>
                        </div>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <div className="banner-img">
                            <img src={AboutBannerImg} className="img-fluid" alt="about-us-banner" title="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}


export default AboutUsBanner;