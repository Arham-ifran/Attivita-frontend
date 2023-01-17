import React, { Component, useState, useEffect} from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { beforeProducts, searchProducts } from '../product/product.action'
import { variationCurrencyFormat, currencyFormat } from "../../utils/functions"

import "./Search.css";


const Search = (props) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [sort, setSort] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [currency, setCurrency] = useState({
		symbol: "€",
		code: "EUR"
	})
	const searchProducts = () => {
		if(searchQuery)
			props.searchProducts(searchQuery, sort)
		setSearchResults([])
	}

	useEffect(() => {
		if(props.product.getsearchProducts){
			setSearchResults(props.product.products)
			props.beforeProducts()
		}
	}, [props.product.getsearchProducts]);
	
	useEffect(() => {
		searchProducts()
	}, [searchQuery, sort]);
	return (
		<Container>
			<div className="shop-searching">
				<div className="shop-search-wrapper m-auto">
					<div id="search-field">
						<input type="search" className="form-control shop-searching-box" onInput={(e) => {
								setSearchQuery(e.target.value)
							}
						} placeholder='Search' />
					</div>
					{searchResults && searchResults.length > 0 ?
						<div id="search-result">
							<ul>
								{
									searchResults.map( (searchResult, index) => {
										return (
											<li>
												<Link to={"/productdetail/"+searchResult._id} className="link-unstyled col-lg-12" >
													{searchResult.name} 
													<span className="float-right"> Starting from {currencyFormat(searchResult.initialPrice,currency.code,currency.symbol)}</span>
												</Link>
											</li>
										)
									})
								}
							</ul>
						</div>
						:''
					}
					<div id="search-icon">
						<FontAwesomeIcon icon={faMagnifyingGlass }/>
					</div>
					<div className="shop-search-dropdown">
						<Dropdown>
							<Dropdown.Toggle variant="default" id="dropdown-basic">
								<span>
									{
										sort == 1 ? 'Price: Asc' : ''
									}
									{
										sort == 2 ? 'Price: Desc' : ''
									}
									{
										sort == 3 ? 'Name: Asc' : ''
									}
									{
										sort == 4 ? 'Name: Desc' : ''
									}
									{
										!sort ? 'Sort by' : ''
									}
								</span>
							</Dropdown.Toggle>
							<Dropdown.Menu>
							<ul>
								<li><Link className="dropdown-item" to="#" onClick={()=>setSort(1)}>Price: Asc</Link></li>
								<li><Link className="dropdown-item" to="#" onClick={()=>setSort(2)}>Price: Desc</Link></li>
								<li><Link className="dropdown-item" to="#" onClick={()=>setSort(3)}>Name: Asc</Link></li>
								<li><Link className="dropdown-item" to="#" onClick={()=>setSort(4)}>Name: Desc</Link></li>
							</ul>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
		</Container>
	)
}

const mapStateToProps = state => ({
	errors: state.errors,
	product: state.product
});
export default connect(mapStateToProps, { beforeProducts, searchProducts})(Search);