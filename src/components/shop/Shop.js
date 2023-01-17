import React, { Component } from 'react';
import ReactDOm from 'react-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import ShopBanner from '../shopbanner/ShopBanner';
import Search from '../search/Search';
import Product from '../product/Product';
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";



const Shop = (props) => {
    let { customername } = ENV.getUserKeys();
    return (<div>
        {customername ? <AuthHeader /> : <Header />}

        <div id="main">
            <ShopBanner />
            <Search />
            <Product />
            <div className='p-3'></div>
            <Footer />

        </div>
    </div>
    )
}

export default Shop;
