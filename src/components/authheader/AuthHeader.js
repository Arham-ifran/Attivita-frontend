import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import closeMenuImg from '../../assets/images/x.svg'
import menuIcon from '../../assets/images/menu.svg'
import logoImg from '../../assets/images/logo.svg';
import userImg from '../../assets/images/user-icon.svg'
import userProfileImg from '../../assets/images/avatar.png'
import usaImg from '../../assets/images/usa.svg';
import { faRightToBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'


import { ENV } from "../../config/config";
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { connect } from 'react-redux';
import { beforeSettings, getSettings } from '../siteSettings/siteSettings.action'
import { beforeCheckout, getUser, getLanguages } from "../checkout/checkout.action";
import { predefinedContent } from "./content";
import { getAuthHeaderContent, beforeContent } from "../content/content.action";
import { useHistory } from 'react-router-dom';

import Cart from "../cart/Cart";
const AuthHeader = (props) => {
  const history = useHistory();
  let pathName = window.location.pathname
  let { _id, customername, profileImageLocal } = ENV.getUserKeys();
  const [click, setClick] = useState(false);
  const [countries, setCountries] = useState([]);
  const [logo, setLogo] = useState();
  const handleClick = () => setClick(!click);
  const [languages, setLanguages] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'en');
  const closeMobileMenu = () => setClick(false);
  const [show, setShow] = useState(false);
  const [pageContent, setPageContent] = useState(predefinedContent);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileImage, setProfileImage] = useState(profileImageLocal);
  const [name, setName] = useState(customername);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        console.log('countruiesss');
        console.log(response.data);
      })
      .catch(error => console.log(error))
    props.getSettings()
    props.getUser(_id)
    props.getLanguages()
    if (!props.content.getAuthHeaderContent) {
      props.getAuthHeaderContent('auth-header')
    }
  }, [])
 
  useEffect(() => {
    if (props.checkout.getUser) {
      let user = props.checkout.user.data
      if (user) {
        setProfileImage(user.profileImage)
        setName(user.customername)
        setConfirmationCode(user.confirmationCode)
        props.beforeCheckout()
      }
    }
  }, [props.checkout.getUser]);

  useEffect (() => {
    let user_ = ENV.getUserKeys();
    setName(user_.customername)
    setProfileImage(user_.profileImage)
  },[localStorage.getItem('attivitaEncryptedUser')])
  
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
  }, [localStorage.getItem("cart")]);

  useEffect(() => {
    if (props.checkout.getLanguagesAuth) {
      const { languages } = props.checkout.languages
      setLanguages(languages)
    }
  }, [props.checkout.getLanguagesAuth])

  useEffect(() => {
    if (props.siteSetting.getSettings) {
      setLogo(props.siteSetting.settings.siteLogo)
    }
  }, [props.siteSetting.getSettings]);

  // set page content for given lang
  useEffect(() => {
    if (props.content.getAuthHeaderContent) {
      const { content } = props.content.authHeaderContent
      if (content) {
        setPageContent(content.content)
      }
      props.beforeContent()
    }
  }, [props.content.getAuthHeaderContent])

  const setSiteLang = (name, code) => {
    localStorage.setItem('language', code)
    setSelectedLanguage(code)
    window.location.reload();
  }

  // Logout User
  const logout = () => {
    ENV.clearStorage()
    history.push('/')
    window.location.reload()
  }



  return (

    <Fragment>
      <header id="header" className="header">
        <nav className="navbar header-navbar navbar-expand-lg navbar-light">
          <Container fluid>
            <strong className="logo">
              <Link to="/">
                <img src={logoImg} className="img-fluid" alt="main-logo" title="logo" />
              </Link>
            </strong>
            <div className={click ? "nav-options active" : "nav-options"}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${pathName === "/" ? "active" : ""} `}>{pageContent.homeButton}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className={`nav-link ${pathName === "/shop" ? "active" : ""} `}>{pageContent.shopButton}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/aboutus" className={`nav-link ${pathName === "/aboutus" ? "active" : ""} `}>{pageContent.aboutUsButton}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contactus" className={`nav-link ${pathName === "/contactus" ? "active" : ""} `}>{pageContent.headerContactText}</Link>
                </li>
                <div className="my-account hide-my-account">
                  <div className="my-account-filter">
                    <div id="country" className="d-flex align-items-center">
                      <Dropdown>
                        <Dropdown.Toggle variant="default" id="dropdown-basic">
                          <div className="country-selection-img">
                            <img src={'/'+selectedLanguage+'.svg'} className="img-fluid" alt="country" title="" />
                            <span>{selectedLanguage}</span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <ul>
                            {languages && languages.map(lang =>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <Dropdown.Item><span id="lang-name" title={lang.name} onClick={() => setSiteLang(lang.name, lang.iso_code)}>{lang.name}</span></Dropdown.Item>
                                  <span id="flag-img">
                                    <img src={'/'+lang.iso_code+'.svg'} className="img-fluid" alt="country" title="" />
                                  </span>
                                </a>
                              </li>
                            )}
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="user-profile-wrapper">
                    <Dropdown>
                      <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <div className="my-account-login profile-img">
                          <div className="account-text-btn">
                            <img src={profileImage ? profileImage : userProfileImg} className="img-fluid" alt="Profile Image" title="Profile" />
                            <span>{name}</span>
                            {/* <FontAwesomeIcon icon={faArrowRightToBracket} className="more-icon" /> */}
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul className="list-unstyled">
                          <li class="user-header">
                            <img src={profileImage ? profileImage : userProfileImg} className="img-fluid" alt="Profile Image" title="Profile" />
                            <p className="mt-2"><span className="text-purple font-weight-bold text-capitalize">{name}</span> <br />
                            </p>
                            <span class="badge unverified-badge">{confirmationCode ? pageContent.emailVerifiedText : pageContent.emailNotVerifiedText }</span>
                          </li>
                          <li class="user-body">
                            <Row>
                              <Col lg="4" md="4" sm="4" className="text-center">
                                <Link to="/dashboard">{pageContent.AccountText}</Link>
                              </Col>
                              <Col lg="4" md="4" sm="4" className="text-center">
                                <Link to="/userprofile">{pageContent.profileText}</Link>
                              </Col>
                              <Col lg="4" md="4" sm="4" className="text-center" onClick={() => logout()}>
                                <Link >{pageContent.logoutText}</Link>
                              </Col>
                            </Row>
                          </li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </ul>
            </div>
            <div className="my-account show-my-account">
              {/* <Link to={'/cart'} className="cart-icon-wrap"> */}
              <div className="cart-icon-holder position-relative" onClick={() => handleShow()} >
                <FontAwesomeIcon icon={faBagShopping} title="Cart" />
                <span className="cart-qty count my-count">{cart.length}</span>
              </div>
              <div className="my-account-filter">
                <div id="country" className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                      <div className="country-selection-img">
                        <img src={'/'+selectedLanguage+'.svg'} className="img-fluid" alt="country" title="" />
                        <span>{selectedLanguage}</span>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ul>
                        {languages && languages.map(lang =>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span id="lang-name" title={lang.name} onClick={() => setSiteLang(lang.name, lang.iso_code)}>{lang.name}</span>
                              <span id="flag-img">
                                <img src={'/'+lang.iso_code+'.svg'} className="img-fluid" alt="country" title="" />
                              </span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="user-profile-wrapper">
                <Dropdown>
                  <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <div className="my-account-login profile-img">
                      <div className="account-text-btn">
                        <img src={profileImage ? profileImage : userProfileImg} className="img-fluid" alt="Profile Image" title="Profile" />
                        <span>{name}</span>
                        {/* <FontAwesomeIcon icon={faArrowRightToBracket} className="more-icon" /> */}
                      </div>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ul className="list-unstyled">
                      <li class="user-header">
                        <img src={profileImage ? profileImage : userProfileImg} className="img-fluid" alt="Profile Image" title="Profile" />
                        <p className="mt-2"><span className="text-purple font-weight-bold text-capitalize">{name}</span> <br />
                        </p>
                        <span class="badge unverified-badge">{confirmationCode ? pageContent.emailVerifiedText : pageContent.emailNotVerifiedText }</span>
                      </li>
                      <li class="user-body">
                        <Row>
                          <Col md="4" className="text-center">
                            <Link to="/dashboard">{pageContent.AccountText}</Link>
                          </Col>
                          <Col md="4" className="text-center">
                            <Link to="/userprofile">{pageContent.profileText}</Link>
                          </Col>
                          <Col md="4" className="text-center" onClick={() => logout()}>
                            <Link >{pageContent.logoutText}</Link>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </nav>
        <div className="login-menu-m">
          <div className="cart-icon-holder position-relative" onClick={() => handleShow()} >
            <FontAwesomeIcon icon={faBagShopping} onClick={() => handleShow()} title="Cart" />
            <span className="cart-qty count my-count">{cart.length}</span>
          </div>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? (
              <img src={closeMenuImg} className="menu-icon" />
            ) : (
              <img src={menuIcon} className="menu-icon" />
            )}
          </div>
        </div>
      </header>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} className="cart-modal">
        <Modal.Header closeButton>
          <h4 className="mb-0"><span className="glyphicon glyphicon-shopping-cart"></span> <b>Cart</b></h4>
        </Modal.Header>
        <Modal.Body>
          <Cart />
        </Modal.Body>
      </Modal>
    </Fragment>

  );
};

const mapStateToProps = state => ({
  siteSetting: state.siteSetting,
  checkout: state.checkout,
  profile: state.profile,
  content: state.content,
  profile: state.profile
})
export default connect(mapStateToProps, { beforeSettings, getSettings, beforeCheckout, getUser, getLanguages, getAuthHeaderContent, beforeContent })(AuthHeader);