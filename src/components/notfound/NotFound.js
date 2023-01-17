import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/images/error404.png'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";

import "./NotFound.css";


const NotFound = (props) => {
    let { customername } = ENV.getUserKeys();
    return (
        <Fragment>
            {customername ? <AuthHeader /> : <Header />}

            <div id="main">
                <section className="page-not-find custom-container">
                    <Container fluid>
                        <Row>
                            <div className="w-100 d-flex justify-content-center align-items-center flex-column">
                                <div className="page-not-find-img">
                                    <img src={ErrorImg} className="img-fluid" alt="error404" title="" />
                                </div>
                                <Link to="/">
                                    <button className="home-btn">Back To Home</button>
                                </Link>
                            </div>
                        </Row>
                    </Container>
                </section>
            </div>
            <Footer />
        </Fragment>
    )
}


export default NotFound;