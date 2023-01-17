import React, { useState, Fragment, useMemo, Component, useEffect, useRef} from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/images/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header';
import { connect } from "react-redux";
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import Select from 'react-select'
import { beforeProfile, updateProfile, uploadExtract } from "./userprofile.action";
import { getCountries, getUser, beforeCheckout } from "../checkout/checkout.action";
import { ENV } from "../../config/config";
import swal from 'sweetalert'
import { SET_CUSTOMER_PASSWORD } from "../../redux/types";
import userProfileImg from '../../assets/images/avatar.png'

const UserProfile = (props) => {
    const [value, setValue] = useState('');
    const myRef = useRef(null)
    const [profileImage, setProfileImage] = useState('');
    const [countriesList, setCountriesList] = useState();
    const [citiesList, setCitiesList] = useState();
    let { _id, customername, email, addresses, mobile } = ENV.getUserKeys()
    const [msg, setMsg] = useState({
        name: '',
        email: '',
        street: '',
        country: '',
        companyName: '',
        cityName: '',
        password: '',
        confirmPassword: '',
    })
    
    const [userData, setUserData] = useState({
        customername,
        email,
        mobile,
        password: "",
        confirmPassword: "",
        countryName: addresses[0] ? addresses[0].country : '',
        cityName: addresses[0] ? addresses[0].city : '',
        street: addresses[0] ? addresses[0].street : '',
        state: addresses[0] ? addresses[0].state : '',
        zipCode: addresses[0] ? addresses[0].zipCode : '',
        companyType: "",
        companyName: "",
        companyURL: "",
        companyVAT: "",
        companyRegistrationExtact: "",
    });

    useEffect(() => {
        props.getUser(_id)
    }, [])
    
    useEffect(() => {
		if (props.checkout.getUser) {
            let user = props.checkout.user.data
            setProfileImage(user.profileImage)
			setUserData({
                customername: user.customername,
                email: user.email,
                mobile: user.mobile,
                password: "",
                confirmPassword: "",
                countryName: user.addresses[0] ? user.addresses[0].country : '',
                cityName: user.addresses[0] ? user.addresses[0].city : '',
                street: user.addresses[0] ? user.addresses[0].street : '',
                state: user.addresses[0] ? user.addresses[0].state : '',
                zipCode: user.addresses[0] ? user.addresses[0].zipCode : '',
                companyType: user.companyType,
                companyName: user.companyName,
                companyURL: user.companyURL,
                companyVAT: user.companyVAT,
                companyRegistrationExtact: user.companyRegistrationExtact,
            });
            props.getCountries()
            props.beforeCheckout()
		}
	}, [props.checkout.getUser]);
    
    useEffect(() => {
		if (props.profile.upsertProfile) {
            swal({
                text: "Profile Updated",
                icon: "success",
                button: "OK",
            });
            ENV.encryptUserData(props.profile.data);
            props.getUser(_id)
            props.beforeProfile()
		}
	}, [props.profile.upsertProfile]);

    useEffect(() => {
        if(props.profile.upsertExtract){
            setUserData({...userData, companyRegistrationExtact: ENV.uploadedImgPath+props.profile.extract.path})
            props.beforeProfile()
        }
    }, [props.profile.upsertExtract])

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
            if(userData.countryName){
                handleCountryChange({label:userData.countryName})
            }
            props.beforeCheckout()
        }
    }, [props.checkout.getCountries])

    const handleCountryChange = (option) => {
        setUserData({
            ...userData,
            countryName: option.label
        })
        var cities = require('countries-cities').getCities(option.label);
        let citiesArray = cities.map((item, key) => (
            {
                label: item,
            }
        ))
        setCitiesList(citiesArray)
    }
    const fileSelectHandler = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if(files.length>0){
            const reader = new FileReader();
            reader.onload = () => {
                // setProfileImage(reader.result);
            };
            // setImageFile(files[0]);
            reader.readAsDataURL(files[0]);

        }
    };
    const handleSubmit = () => {
        let data = {
            profileImage: profileImage,
            customername: userData.customername,
            email: userData.email,
            mobile: userData.mobile,
            countryName: userData.countryName,
            cityName: userData.cityName,
            street: userData.street,
            state: userData.state,
            zipCode: userData.zipCode,
            companyType: userData.companyType,
            companyName: userData.companyName,
            companyVAT: userData.companyVAT,
            companyURL: userData.companyURL,
            companyRegistrationExtact: userData.companyRegistrationExtact,
        }
        let allowSubmit = true

        setMsg({
            name: !userData.customername ? "Name is required" : '' ,
            email: !userData.email ? "Email is required" : '',
            street: !userData.street ? "Street is required" : '',
            country: !userData.countryName ? "Country is required" : '',
            cityName: !userData.cityName ? "City is required" : '',
            companyName: userData.companyType && !userData.companyName ? "Company Name is required" : '',
        })
        if(!userData.customername || !userData.email || !userData.street || !userData.countryName || !userData.cityName || ( userData.companyType && !userData.companyName)){
            allowSubmit = false
        }
        if(userData.password != ""){
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)){
                if(userData.password == userData.confirmPassword){
                    data.password = userData.password
                    setMsg({...msg, confirmPassword: ""})
                }else{
                    allowSubmit = false
                    setMsg({...msg, confirmPassword: "Password doesnot match"})
                }
                setMsg({...msg, password: ""})
            }else{
                allowSubmit = false
                setMsg({...msg, password: "Password must be 8 characters with atleast one character, capital and small alphabet with a number"})
            }
        }
        if(allowSubmit)
        {
            setMsg({
                name: '',
                email: '',
                street: '',
                country: '',
                password: '',
                confirmPassword: '',
            })
            props.updateProfile(_id, data)

        }else{
            myRef.current.scrollIntoView()
        }
    }
    const extractSelectHandler = (e) => {
        props.uploadExtract(e);
    };
    return (
        <Fragment>
            {customername ? <AuthHeader /> : <Header />}

            <div id="main">
                <section className="user-profile contact-form custom-container">
                    <form className="contact-us-form vouchers-form">
                        <Container fluid>
                            <Row>
                                <div className="vouchers-form-row mb-4 profile-main-hover text-center"  ref={myRef}>
                                    <div className="user-profile-img d-inline-block">
                                        <img src={profileImage ? profileImage : userProfileImg} alt="" className="img-fluid" />
                                        <div className="user-profile-img-hover">
                                            <form>
                                                <label for="myfile" className="user-profile-img-hover-label">
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </label>
                                                <div className="d-none">
                                                    <input type="file" id="myfile" name="myfile" onChange={async (e) => {
                                                         e.preventDefault();
                                                         let files;
                                                        if (e.dataTransfer) {
                                                            files = e.dataTransfer.files;
                                                        } else if (e.target) {
                                                            files = e.target.files;
                                                        }
                                                        if(files.length>0){
                                                            fileSelectHandler(e);
                                                            const res = await ENV.uploadImage(e);
                                                            setProfileImage(res ? ENV.uploadedImgPath + res : "")
                                                        }
                                                }}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputText1" className="form-label">Name<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText"
                                                value={userData.customername}
                                                onChange={(e) => setUserData({ ...userData, customername: e.target.value })} />
                                                {msg.name && <small className="error">{msg.name}</small>}
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputEmail1" className="form-label">Email<span id="form-label-required">*</span></label>
                                        <div>
                                            {/* {userData.email} */}
                                            <input readonly="true" type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            />
                                            {msg.email && <small className="error">{msg.email}</small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputTel1" className="form-label">Mobile</label>
                                        <div>
                                            <input type="tel" className="form-control" id="exampleInputPhone"
                                                value={userData.mobile}
                                                onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputText1" className="form-label">State</label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText1"
                                                value={userData.state}
                                                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputText1" className="form-label">Street<span id="form-label-required">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText"
                                                value={userData.street}
                                                onChange={(e) => setUserData({ ...userData, street: e.target.value })}
                                            />
                                            
                                            {msg.street && <small className="error">{msg.street}</small>}
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputText1" className="form-label">Zip Code</label>
                                        <div>
                                            <input type="text" className="form-control" id="exampleInputText1"
                                                value={userData.zipCode}
                                                onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-end user-profile-select">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputSelect1" className="form-label">Country<span id="form-label-required">*</span></label>
                                        <div className="form-floating login-form-input">
                                            <Select
                                                options={countriesList}
                                                placeholder="Select Country"
                                                onChange={(option) => handleCountryChange(option)}
                                                value={countriesList?.filter(option => option.value === userData.countryName)}
                                            />
                                            
                                            {msg.country && <small className="error">{msg.country}</small>}
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                    <label for="exampleInputSelect2" className="form-label">City<span id="form-label-required">*</span></label>
                                        <Select
                                            options={citiesList}
                                            placeholder="Select City"
                                            onChange={(option) => setUserData({ ...userData, cityName: option.label })}
                                            value={citiesList?.filter(option => option.label === userData.cityName)}
                                        />
                                        {msg.cityName && <small className="error">{msg.cityName}</small>}
                                    </div>
                                </div>
                                {/* Company Fields */}
                                <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputPassword1" className="form-label">Company Type</label>  
                                    </div>
                                    <div className="voucher-w-50">
                                        <label className="right-label-radio mb-2 mr-2">
                                            <div className='d-flex align-items-center'>
                                                <input name="companyType" type="radio" checked={userData.companyType} value={userData.companyType} onChange={(e) => { setUserData({ ...userData, companyType: true }) }} />
                                                <span className="checkmark"></span>
                                                <span className='ml-1' onChange={(e) => {
                                                    setUserData({ ...userData, companyType: true })
                                                }} ><i />Company</span>
                                            </div>
                                        </label>
                                        <label className="right-label-radio mr-3 mb-2">
                                            <div className='d-flex align-items-center'>
                                                <input name="companyType" type="radio" checked={!userData.companyType} value={!userData.companyType} onChange={(e) => { setUserData({ ...userData, companyType: false }) }} />
                                                <span className="checkmark"></span>
                                                <span className='ml-1' onChange={(e) => {
                                                    setUserData({ ...userData, companyType: false })
                                                }} ><i />Individual</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                {
                                    userData.companyType ?
                                    <>
                                        <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                            <div className="voucher-w-50 voucher-row-me">
                                                <label for="exampleInputPassword1" className="form-label">Company Name<span id="form-label-required">*</span></label>
                                                <div>
                                                    <input type="text" className="form-control" id="exampleInputPassword" 
                                                        value={userData.companyName}
                                                        onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}/>
                                                    {msg.companyName && <small className="error">{msg.companyName}</small>}
                                                </div>
                                            </div>
                                            <div className="voucher-w-50">
                                                <label for="exampleInputPassword1" className="form-label">Company URL</label>
                                                <div>
                                                    <input type="text" className="form-control" id="exampleInputPassword" 
                                                        value={userData.companyURL}
                                                        onChange={(e) => setUserData({ ...userData, companyURL: e.target.value })}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vouchers-form-row mb-4 d-flex justify-content-between align-items-center">
                                            <div className="voucher-w-50 voucher-row-me">
                                                <label for="exampleInputPassword1" className="form-label">Company VAT</label>
                                                <div>
                                                    <input type="text" className="form-control" id="exampleInputPassword" 
                                                        value={userData.companyVAT}
                                                        onChange={(e) => setUserData({ ...userData, companyVAT: e.target.value })}/>
                                                </div>
                                            </div>
                                            <div className="voucher-w-50">
                                                <label for="exampleInputPassword1" className="form-label">Company Registraction Extract</label>
                                                <div>
                                                        <input type="file" id="myfile" name="myfile" onChange={async (e) => {
                                                            extractSelectHandler(e);
                                                        }}/>
                                                        {
                                                            userData.companyRegistrationExtact &&
                                                            <a className="btn btn-primary main-btn" target="_blank" href={userData.companyRegistrationExtact}>View Extract</a>
                                                        }
                                                </div>
                                            </div>
                                        </div>
                                    </>:''
                                }
                                {/* Company End */}
                                <div className="vouchers-form-row mb-4 user-profile-password d-flex justify-content-between align-items-center">
                                    <div className="voucher-w-50 voucher-row-me">
                                        <label for="exampleInputPassword1" className="form-label">New Password</label>
                                        <div>
                                            <input type="password" className="form-control" id="exampleInputPassword" 
                                                value={userData.password}
                                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>
                                            {msg.password && <small className="error">{msg.password}</small>}
                                        </div>
                                    </div>
                                    <div className="voucher-w-50">
                                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                                        <div>
                                            <input type="password" className="form-control" id="exampleInputPassword" 
                                                value={userData.confirmPassword}
                                                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}/>
                                                {msg.confirmPassword && <small className="error">{msg.confirmPassword}</small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="vouchers-form-btn-group d-flex justify-content-start">
                                    <Link to="#" className="main-btn" onClick={()=>handleSubmit()}>Update</Link>
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


const mapStateToProps = state => ({
    errors: state.errors,
    login: state.login,
    checkout: state.checkout,
    profile: state.profile
})
export default connect(mapStateToProps, { getCountries, beforeProfile, updateProfile, getUser, uploadExtract, beforeCheckout})(UserProfile);