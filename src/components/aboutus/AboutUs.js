import React, { Component } from 'react';
import ReactDOm from 'react-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import AboutUsBanner from '../aboutusbanner/AboutUsBanner';
import Cyber from '../cyber/Cyber';
import AboutSpeciality from '../aboutspeciality/AboutSpeciality';
import AboutProduct from '../aboutproduct/AboutProduct';

import About from '../about/About';
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";



const AboutUs = (props) => {
    let { customername } = ENV.getUserKeys();
    return (<div>
        {customername ? <AuthHeader /> : <Header />}
        <div id="main">
            <AboutUsBanner />
            <Cyber />
            <AboutSpeciality />
            <AboutProduct />
            <About />
            <Footer />

        </div>
    </div>
    )
}

export default AboutUs;
