import React, { useState, Fragment, useMemo, Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/images/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import Select from 'react-select'
import countryList from 'react-select-country-list'



const BuyProduct = (props) => {
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = value => {
        setValue(value)
    }
    let { customername } = ENV.getUserKeys();
    return (
        <Fragment>
            {customername ? <AuthHeader /> : <Header />}

            <div id="main">
                <section className="contact-form custom-container">
                    <h2>ORDER VOUCHER</h2>
                    <form className="contact-us-form vouchers-form">
                        <Container fluid>
                            <Row>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputSelect1" className="form-label">Product<span id="form-label-required">*</span></label>
                                        <div className="form-floating login-form-input">
                                            <select className="w-100 form-select p-3" id="floatingSelect" aria-label="Floating label select example">
                                                <option selected disabled>Transfer Immunity Bundle</option>
                                                <option value="1">Immunity Bundle 1</option>
                                                <option value="2">Immunity Bundle 2</option>
                                                <option value="3">Immunity Bundle 3</option>
                                                <option value="4">Immunity Bundle 4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="voucher-product-detail voucher-w-50">
                                        <h4>Secondary Products</h4>
                                        <p>Move Immunity, NED.link, aikQ, QR Code, Email marketing</p>
                                        <div>
                                            <span id="product-price-h">Price:</span>
                                            <span id="product-price">€5.00 EUR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputText1" className="form-label">Name<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText" />
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputEmail1" className="form-label">Email<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputTel1" className="form-label">Phone</label>
                                        <div>
                                            <input type="tel" className="form-control" id="exampleInputPhone" />
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputText1" className="form-label">City<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText" />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputText1" className="form-label">Street<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText" />
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputText1" className="form-label">Zip Code</label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-end">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <div id="textHelp" className="form-text">0% VAT will be applied</div>
                                        <label for="exampleInputText1" className="form-label">Quantity<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText" />
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputSelect1" className="form-label">Country<span id="form-label-required">*</span></label>
                                        <div className="form-floating login-form-input">
                                            <Select options={options} value={value} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row w-100">
                                    <label for="floatingTextarea" className="mb-2">Message(if any)</label>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    </div>
                                </div>
                                <div className="vouchers-form-btn-group d-flex justify-content-end w-100">
                                    <Link to="#" className="order-cancel">
                                        <button className="order-cancel-btn">Cancel</button>
                                    </Link>
                                    <Link to="#" className="main-btn">Place Order</Link>
                                </div>
                            </Row>
                        </Container>
                    </form>
                </section>
            </div>
            <Footer />
        </Fragment>
    )
}

export default BuyProduct;