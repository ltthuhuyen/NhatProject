import React, { Component } from 'react';

import { connect } from 'react-redux';
// import "./SlideShow.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import banner1 from "../../assets/images/banner2.jpg";
import banner2 from "../../assets/images/phanloairac.jpg"
import banner3 from "../../assets/images/banner3.jpg"
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
    // dots: true,
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
    <div className="row slide-show z-0">
      <div className="col-7">
        <Slider {...settings}>
          <div className="px-1">
            <img
              className=" object-cover rounded-2xl"
              src={banner1}
              alt="bn1"
            />
          </div>
          <div className="px-1">
            <img
              className=" object-cover rounded-2xl"
              src={banner2}
              alt="bn1"
            />
          </div>
          <div className="px-1">
            <img
              className=" object-cover rounded-2xl"
              src={banner4}
              alt="bn3"
            />
          </div>
        </Slider>
      </div>
      <div className="col-5 justify-between ">
        <div className='row'>
          <img className=" rounded-2xl" src={banner3} alt="" />
        </div>
       
      
        {/* <img className="row object-cover mt-3 rounded-2xl" src={banner1} alt="" /> */}
      </div>
    
    </div>
  );
};

export default SlideShow;
