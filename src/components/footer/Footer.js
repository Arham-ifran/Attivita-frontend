import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoImg from '../../assets/images/footer-logo.svg'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux/es/exports';
import { getMenu, beforeCMS } from '../CMS/CMS.action'
import "./Footer.css";

import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = (props) => {
    const [setting, setSetting] = useState()
    const [cookieOk, setcookieOk] = useState(localStorage.getItem('cookieAllowed'))
    const [footerMenus, setFooterMenus] = useState([])

    useEffect(() => {
        props.getMenu('footer')
    }, []);

    useEffect(() => {
        if (props.cms.getMenu) {
            setFooterMenus(props.cms.menus)
            props.beforeCMS()
        }
    }, [props.cms.getMenu]);

    useEffect(() => {
        if (props.siteSetting.getSettings) {
            setSetting(props.siteSetting.settings)
        }
    }, [props.siteSetting.getSettings]);

    const setCookieAllowed = () => {
        setcookieOk(true)
        localStorage.setItem('cookieAllowed', 'true');
    }
    return (
        <>
            {!cookieOk ?
                <div className="text-center cookiealert" role="alert">
                    <b>Do you like cookies?</b> 🍪 We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn more</a>

                    <button type="button" className="btn acceptcookies" onClick={() => setCookieAllowed()}>
                        I agree
                    </button>
                </div>
                : ''}
            <footer id="footer">
                <div className="container-fluid">
                    <div className="footer-content d-flex justify-content-center align-items-center flex-column">
                        <strong className="footer-logo-img">
                            <Link to="/">
                                <img src={logoImg} alt="logo" className="img-fluid" />
                            </Link>
                        </strong>
                        <div className="footer-nav  text-center mb-3">
                            <ul className="navbar-nav flex-row">
                                {
                                    footerMenus.length > 0 &&
                                    footerMenus.map((menu, index) => (
                                        <li className="nav-item" key={index}>
                                            <Link className="nav-link" to={"/page/" + menu.slug}>{menu.title}</Link>
                                        </li>

                                    ))
                                }
                            </ul>
                            <p><FontAwesomeIcon icon={faEnvelope }/> : <span>{setting? setting.email : ''}</span></p>
                            <p><FontAwesomeIcon icon={faPhone }/> : <span>{setting? setting.phone : ''}</span></p>
                        </div>
                        <div className="footer-icons">
                            <ul className="list-unstyled d-flex">
                                {
                                    setting?.facebook &&
                                    <li>
                                        <a href={setting?.facebook}>
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </a>
                                    </li>
                                }
                                {
                                    setting?.twitter &&
                                    <li>
                                        <a href={setting?.twitter}>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>
                                    </li>
                                }
                                {
                                    setting?.linkedin &&
                                    <li>
                                        <a href={setting?.linkedin}>
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </a>
                                    </li>
                                }
                                {
                                    setting?.pinterest &&
                                    <li>
                                        <a href={setting?.pinterest}>
                                            <FontAwesomeIcon icon={faPinterest} />
                                        </a>
                                    </li>
                                }
                            </ul>
                        </div>
                        <p>Copyright © Attivita GmbH. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}


const mapStateToProps = state => ({
    siteSetting: state.siteSetting,
    cms: state.cms
});
export default connect(mapStateToProps, { getMenu, beforeCMS })(Footer);