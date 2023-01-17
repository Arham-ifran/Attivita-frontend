import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import closeMenuImg from '../../assets/images/x.svg'
import menuIcon from '../../assets/images/menu.svg'
import logoImg from '../../assets/images/logo.svg';
import userImg from '../../assets/images/user-icon.svg'
import usaImg from '../../assets/images/usa.svg';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { ENV } from "../../config/config";
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { connect } from 'react-redux';
import { predefinedContent } from "./content";
import { beforeSettings, getSettings } from '../siteSettings/siteSettings.action';
import { getHeaderContent, beforeContent } from "../content/content.action";
import { beforeCheckout, getUser, getLanguages } from "../checkout/checkout.action";
import Cart from "../cart/Cart";

const Header = (props) => {
  let pathName = window.location.pathname
  let userData = ENV.getUserKeys();
  const [click, setClick] = useState(false);
  const [logo, setLogo] = useState();
  const handleClick = () => setClick(!click);
  const [pageContent, setPageContent] = useState(predefinedContent);
  const closeMobileMenu = () => setClick(false);
  const [languages, setLanguages] = useState();
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'en')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.getSettings()
    props.getLanguages()
    if (!props.content.getHeaderContent) {
      props.getHeaderContent('header')
    }
  }, [])

  useEffect(() => {
    if (props.checkout.getLanguagesAuth) {
      const { languages } = props.checkout.languages
      setLanguages(languages)
    }
  }, [props.checkout.getLanguagesAuth])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
  }, [localStorage.getItem("cart")]);


  useEffect(() => {
    if (props.siteSetting.getSettings) {
      setLogo(props.siteSetting.settings.siteLogo)
    }
  }, [props.siteSetting.getSettings]);

  // set page content for given lang
  useEffect(() => {
    if (props.content.getHeaderContent) {
      const { content } = props.content.headerContent
      if (content) {
        setPageContent(content.content)
      }
      props.beforeContent()
    }
  }, [props.content.getHeaderContent])

  const setSiteLang = (name, code) => {
    localStorage.setItem('language', code)
    setSelectedLanguage(code)
    window.location.reload();
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
                  {/* <div className="cart-icon-holder">
                  <FontAwesomeIcon icon={faBagShopping} onClick={()=>handleShow()} />
                </div> */}
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
                    {/* <div id="currency" className="d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <span className="account-text-btn">$ - USD</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul>
                          <li><a className="dropdown-item" href="#">€ - EUR</a></li>
                          <li><a className="dropdown-item" href="#">лв - BGN</a></li>
                          <li><a className="dropdown-item" href="#">R$ - BRL</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                          <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div> */}
                  </div>
                  <Link to="/register" className="my-account-seller">
                    <button type="button">{pageContent.resellerText}</button>
                  </Link>
                  <Link to="/login" className="my-account-login">
                    <button type="button" className="account-text-btn">{pageContent.loginText}</button>
                    <button type="button" className="account-icon-btn">
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
            <div className="my-account show-my-account">
              <div className="cart-icon-holder position-relative">
                <FontAwesomeIcon icon={faBagShopping} onClick={() => handleShow()} title="Cart" />
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
                {/* <div id="currency" className="d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <span className="account-text-btn">$ - USD</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ul>
                      <li><a className="dropdown-item" href="#">€ - EUR</a></li>
                      <li><a className="dropdown-item" href="#">лв - BGN</a></li>
                      <li><a className="dropdown-item" href="#">R$ - BRL</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                      <li><a className="dropdown-item" href="#">Kč - CZK</a></li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}
              </div>
              <Link to="/login" className="my-account-login">
                <button type="button" className="account-text-btn">{pageContent.loginText}</button>
                <button type="button" className="account-icon-btn">
                  <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </Link>
              <Link to="/register" className="my-account-seller">
                <button type="button">{pageContent.resellerText}</button>
              </Link>
            </div>
          </Container>
        </nav>
        <div className="login-menu-m">
          <div className="cart-icon-holder position-relative">
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
  content: state.content
})
export default connect(mapStateToProps, { beforeSettings, getSettings, getHeaderContent, beforeContent, beforeCheckout, getLanguages, })(Header);