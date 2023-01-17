import React, { useState, useMemo, Component, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import { verifyEmail, beforeLogin, setPasswordAction } from "../login/login.action";
import LoginImg from '../../assets/images/side-logo.svg'
import EmailImg from '../../assets/images/vote.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import "./Register.css";

const EmailVerified = (props) => {
    const history = useHistory()
    const { userId } = useParams()
    const [PasswordKey, setPasswordKey] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    useEffect(() => {
        props.verifyEmail(userId)
    }, [])

    useEffect(() => {
        if (props.login.customerPasswordAuth) {
            props.beforeLogin()
            let { isPasswordEmpty } = props.login.customerPasswordData
            setPasswordKey(isPasswordEmpty)
        }
    }, [props.login.customerPasswordAuth])

    const showPasswordMethod = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const showConfirmPasswordMethod = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword)
    }

    const setCustomerPassword = () => {
        if (password !== confirmPassword) {
            swal({
                text: "Passwords do not match",
                icon: "error",
                button: "OK!",
            });
            return;
        }
        let payload = {
            password, userId
        }
        props.setPasswordAction(payload)
        history.push('/login')
    }



    return (
        <section className="wrapper account-verification">
            <Container fluid>
                {PasswordKey ?
                    <Row>
                        <Col lg="4" md="4" xs="12" className="pl-0 pr-0">
                            <div className="form-side-display d-flex justify-content-center align-items-center">
                                <Link to="/" className="d-inline-block">
                                    <img src={LoginImg} alt="logo" className="img-fluid" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg="8" md="8" xs="12" className="pl-0 pr-0 ">
                            <div className="email-wrapper d-flex flex-column">
                                <h5>Set Your Password!</h5>
                                <div className="mb-3 login-form-input form-password-eye-box">
                                    <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" id="exampleInputPassword1"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button onClick={(e) => showPasswordMethod(e)} className="form-password-eye">
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                                <div className="mb-3 login-form-input form-password-eye-box">
                                    <input type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Re type Password" id="exampleInputPassword1"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button onClick={(e) => showConfirmPasswordMethod(e)} className="form-password-eye">
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                                <button onClick={() => setCustomerPassword()} type="button" className="btn main-btn text-capitalize">Set Password</button>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col lg="4" md="6" xs="12" className="pl-0 pr-0">
                            <div className="form-side-display d-flex justify-content-center align-items-center">
                                <Link to="/" className="d-inline-block">
                                    <img src={LoginImg} alt="logo" className="img-fluid" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg="8" md="8" xs="12" className="pl-0 pr-0 ">
                            <div className="email-wrapper d-flex flex-column">
                                <h5>Email successfully verified!</h5>
                                <img src={EmailImg} alt="logo" className="img-fluid" />
                                <button onClick={() => history.push('/login')} type="button" className="btn main-btn text-capitalize">Continue</button>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        </section>
    )
}


const mapStateToProps = state => ({
    errors: state.errors,
    login: state.login
})
export default connect(mapStateToProps, { verifyEmail, beforeLogin, setPasswordAction })(EmailVerified);