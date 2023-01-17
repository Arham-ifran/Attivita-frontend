import React, { Component, Fragment, useState } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader"; import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


import "./Tabletop.css";


const Tabletop = (props) => {
	return (
		<section className="custom-container mb-4">
			<Container fluid>
				<div className="vouchers-detail d-flex flex-column align-items-start justify-content-between">
					<div className="voucher-header-text">
						<h2>Voucher</h2>
					</div>
					<div className="vouchers-detail-box d-flex justify-content-end w-100">
						<div className="vouchers-search">
							<div className="d-flex justify-content-end">
								<input type="search" className="form-control" placeholder='Search' />
							</div>
							<button>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</button>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}


export default Tabletop;