import React, { useState, useMemo, useEffect, useRef } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import LoginImg from '../../assets/images/side-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import countryList from 'react-select-country-list';
import { connect } from "react-redux";
import { registerAction, beforeLogin, loginAction } from "../login/login.action";
import { getCountries } from "../checkout/checkout.action";
import "./Register.css";
import swal from 'sweetalert'
import ReCAPTCHA from "react-google-recaptcha";

const Register = (props) => {
    const history = useHistory()
    const inputRef = useRef(null)
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [countriesList, setCountriesList] = useState();
    const [citiesList, setCitiesList] = useState();
    const [captcha, setCaptcha] = useState('')
    const [open, setOpen] = useState(false)

    const [userData, setUserData] = useState({
        customername: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryName: "",
        cityName: "",
        street: "",
        state: "",
        zipCode: "",
        companyName: ""
    });
    const [msg, setMsg] = useState({
        customername: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryName: "",
        street: "",
    });

    useEffect(() => {
        props.getCountries()

    }, [])

    useEffect(() => {
        if (props.checkout.getCountries) {
            let countryArray = props.checkout.countries
            let countryList = Object.keys(countryArray).map((item) => (
                {
                    label: countryArray[item].name,
                    value: countryArray[item].name,
                }
            ))
            setCountriesList(countryList)
        }
    }, [props.checkout.getCountries])
    
    useEffect(() => {
        if(props.errors?.message){
            swal({
                text: props.errors.message,
                icon: "error",
                button: "OK",
            });
        }
    }, [props.errors]);

    useEffect(() => {
        if (props.login.registerActionAuth) {
            swal({
                text: props.login.registerActionMessage,
                icon: "success",
                timer: 4000,
                button: "OK",
            });
            setTimeout(function () {
                login({
                    email: userData.email,
                    password: userData.password
                })
            }, 4000);

            setUserData({
                customername: "",
                email: "",
                password: "",
                confirmPassword: "",
                countryName: "",
                cityName: "",
                street: "",
                state: "",
                zipCode: ""
            })
            // history.push('/login')
            props.beforeLogin()
        }

    }, [props.login.registerActionAuth])

    useEffect(() => {
		if (props.login.loginActionAuth) {
			props.beforeLogin()
			history.push('/');
		}
	}, [props.login.loginActionAuth])
    
    const register = (e) => {
        e.preventDefault();
        if (captcha && userData.customername && userData.email && userData.password && userData.confirmPassword && userData.countryName) {
            if (userData.password !== userData.confirmPassword) {
                swal({
                    text: "Passwords do not match",
                    icon: "error",
                    button: "OK!",
                });
                return;
            }
            setMsg({
                customername: "",
                email: "",
                password: "",
                confirmPassword: "",
                countryName: "",
            });
            let payload = {
                customername: userData.customername,
                email: userData.email,
                password: userData.password,
                countryName: userData.countryName,
                companyName: userData.companyName,
            };
            props.registerAction(payload);
            props.beforeLogin();
        } else {
            setMsg({
                customername: !userData.customername ? 'Name is required' : '',
                email: !userData.email ? 'Email is required' : '',
                password: !userData.password ? 'Password is required' : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password) ? '' : "Password must be 8 characters with atleast one character, capital and small alphabet with a number",
                confirmPassword: userData.confirmPassword != userData.password ? 'Password does not match' : '',
                countryName: !userData.countryName ? 'Country is required' : '',
                captcha: !captcha ? 'Prove you are a human' : '',
            });
        }
    }

    const login = (payload) => {
        props.loginAction(payload)
    }
    const showPasswordMethod = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }
    const showConfirmPasswordMethod = (e) => {
        e.preventDefault();
        setConfirmPassword(!showConfirmPassword)
    }

    const handleCountryChange = (option) => {
        setUserData({
            ...userData,
            countryName: option.label
        })
        // var cities = require('countries-cities').getCities(option.label);
        // let citiesArray = cities.map((item, key) => (
        //     {
        //         label: item,
        //     }
        // ))
        // setCitiesList(citiesArray)
    }

    function onChange(value) {
        setCaptcha(value)
    }
    function onExpired(value) {
        setCaptcha('')
    }

    return (
        <section className="wrapper">
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
                                <h6>Hello User</h6>
                                <h2>Register As New Reseller</h2>
                                <form className="login-form-main">
                                    <div className="mb-3 login-form-input">
                                        <input type="text" className="form-control" placeholder="Name" id="exampleInputText1"
                                            value={userData.customername}
                                            onChange={(e) => setUserData({ ...userData, customername: e.target.value })}
                                        />
                                        {msg.customername && <small className="error">{msg.customername}</small>}
                                    </div>
                                    <div className="mb-3 login-form-input">
                                        <input type="email" className="form-control" placeholder="Email" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                        {msg.email && <small className="error">{msg.email}</small>}
                                    </div>
                                    <div className="mb-3 login-form-input">
                                        <Select
                                            options={countriesList}
                                            placeholder="Select Country"
                                            onChange={(option) => handleCountryChange(option)}
                                            value={countriesList?.filter(option => option.value === userData.countryName)}
                                        />
                                        {msg.countryName && <small className="error">{msg.countryName}</small>}
                                    </div>
                                    <div className="mb-3 login-form-input">
                                        <input type="text" className="form-control" placeholder="Company Name"  
                                            value={userData.companyName}
                                            onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3 login-form-input form-password-eye-box">
                                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" id="exampleInputPassword1"
                                            value={userData.password}
                                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        />
                                        <button onClick={(e) => showPasswordMethod(e)} className="form-password-eye">
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                        {msg.password && <small className="error">{msg.password}</small>}
                                    </div>
                                    <div className="mb-3 login-form-input form-password-eye-box">
                                        <input type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Re type Password" id="exampleInputPassword1"
                                            value={userData.confirmPassword}
                                            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                        />
                                        <button onClick={(e) => showConfirmPasswordMethod(e)} className="form-password-eye">
                                            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                        </button>
                                        {msg.confirmPassword && <small className="error">{msg.confirmPassword}</small>}
                                    </div>
                                    <div className="form-floating mb-3 login-form-input">
                                        {/* <Accordion className="address-option"  >
                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="text-capitalize" ref={inputRef} onClick={() => setOpen(!open)}>
                                                        Select address options
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="mb-2 login-form-input">
                                                            <Select
                                                                options={countriesList}
                                                                placeholder="Select Country"
                                                                onChange={(option) => handleCountryChange(option)}
                                                                value={countriesList?.filter(option => option.value === userData.countryName)}
                                                            />
                                                            {msg.countryName && <small className="error">{msg.countryName}</small>}
                                                        </div>
                                                        <div className="mb-2 login-form-input">
                                                            <Select
                                                                options={citiesList}
                                                                placeholder="Select City"
                                                                onChange={(option) => setUserData({ ...userData, cityName: option.label })}
                                                                value={citiesList?.filter(option => option.label === userData.cityName)}
                                                            />
                                                        </div>
                                                        <div className="mb-2 login-form-input">
                                                            <input type="text" className="form-control" placeholder="Street" id="exampleInputStreet1"
                                                                onChange={(e) => setUserData({ ...userData, street: e.target.value })}
                                                                value={userData.street}
                                                            />
                                                            {msg.street && <small className="error">{msg.street}</small>}
                                                        </div>
                                                        <div className="mb-2 login-form-input">
                                                            <input type="text" className="form-control" placeholder="State" id="exampleInputState1"
                                                                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                                                                value={userData.state}
                                                            />
                                                        </div>
                                                        <div className="mb-2 login-form-input">
                                                            <input type="text" className="form-control" placeholder="Zipcode" id="exampleInputZipcode1"
                                                                onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                                                                value={userData.zipCode}
                                                            />
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="contact-us-main-btn">
                                                <button onClick={(e) => register(e)} type="submit" className="main-btn mb-5">Register</button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="g-recaptcha">
                                                <ReCAPTCHA
                                                    sitekey="6LdnLssgAAAAAF281tTopBy4uBTQ8LZohl2YFSeb"
                                                    onChange={onChange}
                                                    onExpired={onExpired}
                                                />
                                                {msg.captcha && <small className="error">{msg.captcha}</small>}

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to="/login" id="register-new-user">Already Have a Customer Account</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </section >
    )
}


const mapStateToProps = state => ({
    errors: state.errors,
    login: state.login,
    checkout: state.checkout
})
export default connect(mapStateToProps, { beforeLogin, registerAction, getCountries, loginAction })(Register);