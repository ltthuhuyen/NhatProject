import React, { Component } from 'react';

import { connect } from 'react-redux';
// import "./SlideShow.scss";
// import "./Slick.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/header-banner1.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

class SlideShow extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div>
           <div className='section-Ungdung'>
            
            <div className='section-content'>
               
                <div className='section-body'>
                <Slider {...settings}>
                    <div className='img-UD'>
                        <img src={banner1}/>
                
                         
                    </div>
                    <div className='img-UD'>
                    <img src={banner2}/>
                    
                    </div>
                    <div className='img-UD'>
                    <img src={banner1}/>
                   
                    </div>
                    <div className='img-UD'>
                    <img src={banner1}/>
                  
                    </div>
                </Slider>
                </div>
                
                </div>
            </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
