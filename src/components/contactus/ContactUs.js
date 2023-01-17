import React, { Component } from 'react';
import ReactDOm from 'react-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import ContactBanner from '../contactbanner/ContactBanner';
import ContactForm from '../contactform/ContactForm';

import Footer from '../footer/Footer';
import { ENV } from "../../config/config";



const ContactUs = (props) => {
    let { customername } = ENV.getUserKeys();
    return (
        <div>
            {customername ? <AuthHeader /> : <Header />}

            <div id="main">
                <ContactBanner />
                <ContactForm />
                <Footer />

            </div>
        </div>
    )
}

export default ContactUs;
