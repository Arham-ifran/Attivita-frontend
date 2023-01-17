import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import ReactDOm from 'react-dom';
import { Container, Row, Col} from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImg from '../../assets/images/home-banner.svg'
import bannerImg2 from '../../assets/images/home-banner-2.png'
import { beforeBanner, getBanners } from "../banner/banner.action";
import "./HomeSlider.css";

const HomeSlider = (props) =>  {
	const [banners, setBanners] = useState([])
	var settings = {
	  dots: true,
	  infinite: true,
	  speed: 500,
	  slidesToShow: 1,
	  slidesToScroll: 1
	};
	useEffect(() => {
		props.beforeBanner();
		props.getBanners();
	}, []);
	useEffect(() => {
		if(props.banner.getBannerAuth){
			setBanners(props.banner.banners)
		}
		props.beforeBanner();
	}, [props.banner.getBannerAuth]);
	return (
		<>
			{
				banners.length > 0 ?
					<Slider {...settings} className="home-banner-slider">
						{
							banners.map((banner, index) => {
								return (
									<div className="home-banner custom-container" style={{ background:banner.color }} key={index}>
									{/* <div className="home-banner custom-container" style={"background:"+banner.color} key={index}>{banner.color} */}
										<Container fluid style={{ background:banner.color }}>
											<Row className="align-items-center">
												<Col lg="6" md="6" xs="12">
													<div className="banner-text">
														<h1 style={{ color:banner.fontColor }}>{banner.title}</h1>
														<p style={{ color:banner.fontColor }} dangerouslySetInnerHTML={{ __html: banner.description }}></p>
													</div>
												</Col>
												<Col lg="6" md="6" xs="12">
													{
														banner.type == "video" && banner.url &&
														<div className="banner-img">
															<video height="240" loop="true" autoplay="autoplay" id="myVideo" muted>
																<source src={banner.url} type="video/mp4"/>
															</video>
														</div>
													}
													{
														banner.type == "banner" && banner.banner &&
														<div className="banner-img">
															<img src={banner.banner} className="img-fluid" alt="bannerImg" title="" />
														</div>
													}
												</Col>
											</Row>
										</Container>
									</div>
								)
							}) 
						}
				</Slider>
				: ''
			}
		</>
	);
}
const mapStateToProps = state => ({
	banner: state.banner
})
export default connect(mapStateToProps,{beforeBanner, getBanners})(HomeSlider)
