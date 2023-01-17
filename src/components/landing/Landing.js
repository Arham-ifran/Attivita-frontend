import React, { Component } from 'react';
import ReactDOm from 'react-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Banner from '../banner/Banner';
import About from '../about/About';
import HomeProduct from '../product/HomeProduct';
import ProductBtn from '../productbtn/ProductBtn';
import Faq from '../faq/Faq';
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";




const Landing = (props) => {

    let { customername } = ENV.getUserKeys();

    return (
        <div>
            {customername ? <AuthHeader /> : <Header />}
            <div id="main">
                <Banner />
                <HomeProduct />
                <ProductBtn />
                <About />
                <Faq />
                <Footer />

            </div>
        </div>
    )
}

export default Landing;
