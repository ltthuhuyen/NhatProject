import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./SlideShow.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import banner1 from "../../assets/images/banner2.jpg";
import banner5 from "../../assets/images/banner5.jpg"
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg"
import LeftArrow from "../../assets/images/banner1.jpg";
import RightArrow from "../../assets/images/banner1.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideShow = () => {
  // const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  //   <img src={LeftArrow} alt="prevArrow" {...props} />
  // );

  // const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  //   <img src={RightArrow} alt="nextArrow" {...props} />
  // );
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    // nextArrow: <SlickArrowRight />,
    // prevArrow: <SlickArrowLeft />,
  };
  return (
    <div className="row slide-show img-wrap img z-0">
      <div className="col-7  img-wrap img ">
        <Slider {...settings}>
          <div className="px-1">
            <img
              className=" object-contain" 
              src={banner1}
              alt="bn1"
            />
          </div>
          <div className="px-1">
            <img
              className=" object-cover"
              src={banner3}
              alt="bn1"
            />
          </div>
          <div className="px-1">
            <img
              className=" object-cover"
              src={banner4}
              alt="bn3"
            />
          </div>
        </Slider>
      </div>
      <div className="col-5 img-wrap img ">
        <div className='row'>
          <img className="" src={banner5} alt="" />
        </div>
       
      
        {/* <img className="row object-cover mt-3" src={banner1} alt="" /> */}
      </div>
    
    </div>
  );
};

export default SlideShow;
