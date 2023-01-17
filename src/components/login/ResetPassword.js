import React, { useEffect, useState } from 'react';
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginImg from '../../assets/images/side-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginAction, beforeLogin, resetPassword } from "./login.action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import swal from 'sweetalert'



const ResetPassword = (props) => {
    const history = useHistory();
    const { resetPasswordToken } = queryString.parse(window.location.search);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const showPasswordMethod = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const showConfirmPasswordMethod = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword)
    }

    const resetPassword = () => {

        if (password !== confirmPassword) {
            swal({
                text: "Passwords do not match",
                icon: "error",
                button: "OK!",
            });
            return;
        }


        let params = new URLSearchParams(window.location.search)
        let token = params.get('resetPasswordToken')
        let payload = {
            resetPasswordToken: token,
            password
        }
        props.resetPassword(payload)


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
                                <h2>Reset Password</h2>
                                <form className="login-form-main">
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
                                    <button onClick={() => resetPassword()} type="button" className="btn main-btn text-capitalize">Reset Password</button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}


const mapStateToProps = state => ({
    errors: state.errors,
    login: state.login
})
export default connect(mapStateToProps, { beforeLogin, loginAction, resetPassword })(ResetPassword);