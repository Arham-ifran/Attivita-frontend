import React, { useEffect, useState } from 'react';
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginImg from '../../assets/images/side-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginAction, beforeLogin, forgetPassword } from "./login.action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const ForgetPassword = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState();

    const submit = () => {
        props.forgetPassword({ email })
        history.push('/')
    }



    return (
        <section className="wrapper account-verification">
            <Container fluid>
                <Row className="align-items-center">
                    <Col lg="4" md="4" xs="12" className="pl-0 pr-0">
                        <div className="form-side-display d-flex justify-content-center align-items-center">
                            <Link to="/" className="d-inline-block">
                                <img src={LoginImg} alt="logo" className="img-fluid" />
                            </Link>
                        </div>
                    </Col>
                    <Col lg="8" md="8" xs="12" className="pl-0 pr-0 ">
                        <div className="login-main">
                            <div className="login-main-child">
                                <h2>Forget Password?</h2>
                                <p>Inform your email account, we will send you a link to reset and create your new password
                                </p>
                                <form className="login-form-main">
                                    <div className="mb-3 login-form-input">
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Your Email"
                                        />
                                    </div>
                                    <div className="contact-us-main-btn">
                                        <button disabled={!email} onClick={() => submit()} className="main-btn mb-5 d-inline-block btn-disabled">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}


const mapStateToProps = state => ({
    errors: state.errors,
    login: state.login
})
export default connect(mapStateToProps, { beforeLogin, loginAction, forgetPassword })(ForgetPassword);