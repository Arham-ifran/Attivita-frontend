import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./ProductBtn.css";


const ProductBtn = (props) => {
	return (
				<Row className="justify-content-center product-btn">
					<Link to="/shop" className="view-main-btn text-center">
						<button type="button" className="main-btn">View All Products</button>
					</Link>
				</Row>
            )
    }


export default ProductBtn;