import React, { Component, useState } from "react";
import ReactDOm from 'react-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productOffcImg from '../../assets/images/products-office.png'

import "./SimpleSlider.css";


export default class AsNavFor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nav1: null,
        nav2: null
      };
    }
  
    componentDidMount() {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2
      });
      

    }
  
    render() {
      return (
          <div>
            
            <Slider
              asNavFor={this.state.nav2}
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnHover={true}
              ref={slider => (this.slider1 = slider)} className="product-slider">
                {this.props.images.map((image, indes) => {
                    return(
                        <div key={indes}>
                          <img src={image} />
                        </div>
                    )
                  })
                }
                
            </Slider>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={3}
              slidesToScroll={3}
              initialSlide={0}
              infinite={false}
              loop={true}
              swipeToSlide={true}
              focusOnSelect={true} className="product-bottom-slider"
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnHover={true}
            >
              {this.props.images.map((image, indes) => {
                    return(
                        <div key={indes}>
                          <img src={image} />
                        </div>
                    )
                  })
                }
              </Slider>
        
      </div>
    );
  }
}