import React, { Component, useState, useEffect } from "react";
import ReactDOm from 'react-dom';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactBannerImg from '../../assets/images/contact-banner.png'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'

import "./ContactForm.css";
import { beforeContact, submitQuery } from "../contactus/contactUs.action";

import ReCAPTCHA from "react-google-recaptcha";
const ContactForm = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	})
	const [formDataMsg, setFormDataMsg] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		captcha: '',
	})
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [captcha, setCaptcha] = useState()

	const [contactDetails, setContactDetails] = useState({
		phone:'',
		email:'',
		location:''
	})
	useEffect(() => {
		if(props.contact.formSubmit){
			swal({
				text: "Your Query has been submitted",
				icon: "success",
				button: "OK!",
			});
			setIsSubmitted(true)
			setFormData({
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: '',
				captcha: '',
			})
			props.beforeContact()
		}
	}, [props.contact.formSubmit]);

	useEffect(() => {
		if(props.siteSetting.getSettings){
		  setContactDetails({
			phone:props.siteSetting.settings.phone,
			email:props.siteSetting.settings.email,
			location:props.siteSetting.settings.address
		})
		}
	}, [props.siteSetting.getSettings]);

	const submitQuery = () => {
		let submit = true
		let errors = {}
		if(formData.name == ''){
			submit = false
			errors.name = "Name is required"
		}
		if(formData.email == ''){
			submit = false
			errors.email = "Email is required"
		}
		if(formData.subject == ''){
			submit = false
			errors.subject = "Subject is required"
		}
		if(formData.message == ''){
			submit = false
			errors.message = "Message is required"
		}
		if(!captcha){
			submit = false
			errors.captcha = "Prove you are a human"
		}
		setFormDataMsg(errors)
		if(submit){
			setFormDataMsg({
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: '',
				captcha: '',
			})
			props.submitQuery(formData)

		}
		
	}
	function onChange(value) {
        setCaptcha(value)
    }
    function onExpired(value) {
        setCaptcha('')
    }

	return (
			<section className="contact-form custom-container">
				<Container fluid>
					<h2>Send us Enquiries</h2>
					<Row>
						<div className="col-md-6">
							<form className="contact-us-form">
								<div className="contact-us-form-box">
									<div className="mb-3">
										<input type="text" className="form-control" value={formData.name} onInput={(event) => setFormData({...formData, name: event.target.value})} placeholder="Name" id="exampleInputText"/>
										{formDataMsg.name && <small className="text-danger">{formDataMsg.name}</small>}
									</div>
									<div className="mb-3">
										<input type="email" className="form-control" value={formData.email} onInput={(event) => setFormData({...formData, email: event.target.value})} placeholder="Email" id="exampleInputEmail" aria-describedby="emailHelp"/>
										{formDataMsg.email && <small className="text-danger">{formDataMsg.email}</small>}
									</div>
									<div className="mb-3">
										<input type="tel" className="form-control" value={formData.phone} onInput={(event) => setFormData({...formData, phone: event.target.value})} placeholder="Phone Number" id="exampleInputPhone"/>
									</div>
									<div className="mb-3">
										<input type="text" className="form-control" value={formData.subject} onInput={(event) => setFormData({...formData, subject: event.target.value})} placeholder="Subject" id="exampleInputSubject"/>
										{formDataMsg.subject && <small className="text-danger">{formDataMsg.subject}</small>}
									</div>
									<div className="contact-us-form form-floating mb-3">
										<textarea className="form-control" value={formData.message} onInput={(event) => setFormData({...formData, message: event.target.value})} placeholder="Message" id="floatingTextarea"></textarea>
										{formDataMsg.message && <small className="text-danger">{formDataMsg.message}</small>}
									</div>
								</div>
								<div className="g-recaptcha">
									<ReCAPTCHA
										sitekey="6LdnLssgAAAAAF281tTopBy4uBTQ8LZohl2YFSeb"
										onChange={onChange}
										onExpired={onExpired}
									/>
									{formDataMsg.captcha && <small className="text-danger">{formDataMsg.captcha}</small>}

								</div>
								<div className="contact-us-main-btn">
									<Button  className="main-btn" onClick={()=>submitQuery()}>Submit</Button>
								</div>
								{/* {isSubmitted &&
								<p>Query has been submitted</p>} */}
							</form>
						</div>
						<div className="col-md-6">
							<div className="contact-us-details">
								<ul className="list-unstyled m-0">
									<li className="d-flex">
										<div className="contact-us-details-icons-bg d-flex justify-content-center align-items-center">
											<FontAwesomeIcon icon={faPhone }/>
										</div>
										<div className="flex-1">
											<h5>Call us</h5>
											<a href={"tel:"+contactDetails.phone}>{contactDetails.phone}</a>
										</div>
									</li>
									<li className="d-flex">
										<div className="contact-us-details-icons-bg d-flex justify-content-center align-items-center">
											<FontAwesomeIcon icon={faEnvelope }/>
										</div>
										<div className="flex-1">
											<h5>Email</h5>
											<a href={"mailto:"+contactDetails.email}>{contactDetails.email}</a>
										</div>
									</li>
									<li className="d-flex">
										<div className="contact-us-details-icons-bg d-flex justify-content-center align-items-center">
											<i className="fa fa-map-marker" aria-hidden="true"></i>
											<FontAwesomeIcon icon={faLocationDot }/>
										</div>
										<div className="flex-1">
											<h5>Location</h5>
											<a href="#.">{contactDetails.location}</a>   
										</div>
										
									</li>
								</ul>
							</div>
						</div>
					</Row>
				</Container>
		</section>
		)
}

const mapStateToProps = state => ({
	contact: state.contact,
	siteSetting: state.siteSetting,
})
export default connect(mapStateToProps,{beforeContact, submitQuery})(ContactForm);