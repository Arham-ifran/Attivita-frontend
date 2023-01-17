import React, { useEffect, useState } from 'react';
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginImg from '../../assets/images/side-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginAction, beforeLogin, getUserCart } from "./login.action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ENV } from "../../config/config";
import { getVATforCountry, getSettings } from "../siteSettings/siteSettings.action";

const Login = (props) => {

	const history = useHistory();
	const [value, setValue] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	});
	const [captcha, setCaptcha] = useState('')

	const [msg, setMsg] = useState({
		email: '',
		passowrd: '',
		captcha: ''
	})

	const login = (e) => {
		e.preventDefault();
		let payload = {
			email: userData.email,
			password: userData.password
		};
		if (!captcha || !userData.email || !userData.password) {
			setMsg({
				email: !userData.email ? "Email is required" : '',
				passowrd: !userData.password ? "Password is required" : '',
				captcha: !captcha ? "Prove you are a human" : ''
			})
		}
		else {
			setMsg({
				email: '',
				passowrd: '',
				captcha: ''
			})
			props.loginAction(payload);

		}
	}

	useEffect(() => {
		if (props.login.loginActionAuth) {
			let userData = ENV.getUserKeys();
			props.getUserCart(userData._id)
			
		}
	}, [props.login.loginActionAuth])


	useEffect(() => {
		if (props.login.cartAuth) {
			// props.getSettings()
			console.log('props.login')
			console.log(props.login)
			if(props.login.cart){
				ENV.setLocalCart(props.login.cart)
			}
			props.beforeLogin()
			history.push('/');
		}
	}, [props.login.cartAuth])

	

	const showPasswordMethod = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword)
	}

	function onChange(value) {
		setCaptcha(value)
	}
	function onExpired(value) {
		setCaptcha('')
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
								<h6>Welcome Back</h6>
								<h2>Login to your account</h2>
								<form className="login-form-main">
									<div className="mb-3 login-form-input">
										<input type="email" className="form-control" placeholder="name@domain.com" id="exampleInputEmail1" aria-describedby="emailHelp"
											value={userData.email}
											onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

										{msg.email && <small className="error">{msg.email}</small>}
									</div>
									<div className="mb-3 login-form-input form-password-eye-box">
										<input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" id="exampleInputPassword1"
											value={userData.password}
											onChange={(e) => setUserData({ ...userData, password: e.target.value })}
										/>
										<button onClick={(e) => showPasswordMethod(e)} className="form-password-eye">
											<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
										</button>
										{msg.passowrd && <small className="error">{msg.passowrd}</small>}
									</div>
									<div className="mb-4 form-check pl-0 d-flex justify-content-between">
										<div className="mb-4 form-check d-flex justify-content-between custom-control custom-checkbox">
											<input type="checkbox" class="custom-control-input" id="defaultChecked" />
											<label class="custom-control-label" for="defaultChecked">Remember Me</label>
										</div>
										<Link to="/forget-password" id="forget-password">Forget Password?</Link>
									</div>
									<div className="g-recaptcha">
										<ReCAPTCHA
											sitekey="6LdnLssgAAAAAF281tTopBy4uBTQ8LZohl2YFSeb"
											onChange={onChange}
											onExpired={onExpired}
										/>
									</div>
									{msg.captcha && <small className="error">{msg.captcha}</small>}
									<div className="contact-us-main-btn">
										<button onClick={(e) => login(e)} className="main-btn mb-5 d-inline-block">Sign In</button>
									</div>
									<div>
										<Link to="/register" id="register-new-user">Register As New Customer</Link>
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
	siteSetting: state.siteSetting,
	login: state.login
})
export default connect(mapStateToProps, { beforeLogin, loginAction, getUserCart, getVATforCountry, getSettings })(Login);