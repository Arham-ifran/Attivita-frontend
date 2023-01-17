import React, { Component, Fragment, useState } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader"; import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import TablePagination from '../tablepagination/TablePagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faGift, faDownload, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import ExchangeImg from '../../assets/images/exchange.svg'


import "./VoucherTable.css";


const VoucherTable = (props) => {
	return (
		<section className="vouchers-main voucher-table custom-container">
			<Container fluid>
				<div className="table-responsive">
					<table className="table table-striped attivita-table mb-5">
						<thead>
							<tr className="data-table-header">
								<th scope="col">
									<div className="data-table-header-seperator">Order Id</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Actions</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Status</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Product</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Date</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Quantity</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Used</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Remaining</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Unit Price</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Discount (%)</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Taxes</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
								<th scope="col">
									<div className="d-flex justify-content-between data-table-header-seperator">
										<div>Total Payable Amount</div>
										<div><img src={ExchangeImg} className="img-fluid" /></div>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
							<tr>
								<td>DevilStark-041-120-120-22</td>
								<td className="table-actions">
									<ul className="d-flex list-unstyled">
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faGift} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faCreditCard} />
												</button>
											</a>
										</li>
										<li>
											<a href="vouchers.html">
												<button>
													<FontAwesomeIcon icon={faDownload} />
												</button>
											</a>
										</li>
									</ul>
								</td>
								<td>
									<div className="d-flex">
										<div className="status me-2">Approved</div>
										<div className="status">Active</div>
									</div>
								</td>
								<td>
									<div className="d-flex flex-column">
										<span>Transfer Immunity Bundle</span>
										<b>Secondary Platforms</b>
										<span>Move Immunity, NED.link,aikQ,QR Code, Email Marketing</span>
									</div>
								</td>
								<td>12 Jan,2022</td>
								<td>0</td>
								<td>12</td>
								<td>$15.00</td>
								<td>12</td>
								<td>0</td>
								<td>0% VAT</td>
								<td>%15.00</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="attivita-table-pagination d-flex justify-content-between align-items-center">
					<span>Showing result of 1 to 10 of 10 entries</span>
					<TablePagination />
				</div>
				<div className="attivita-table-btns d-flex justify-content-center">
					<Link to="buy-product-form.html" className="main-btn-2">
						<button className="main-btn">Get More Vouchers</button>
					</Link>
					<Link to="dashboard.html">
						<button className="main-btn main-btn-1">Visit Redeem Page</button>
					</Link>
				</div>
			</Container>
		</section>
	)
}


export default VoucherTable;