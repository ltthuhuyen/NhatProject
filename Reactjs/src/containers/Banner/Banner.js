import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import './Banner.scss'

import banner from '../../assets/images/vntc-page-chgd-img-07.jpg';
class Banner extends Component {
    render() {
        return (
            <div className='banner'>
                <div className='img'>
                    <img src={banner} className='img-pro'></img>
                </div>
                <div className="slide-show mt-5">
                    <div className="home-header-banner slide-show img-wrap img"></div>
                </div>
            </div>

        )
    }
    
}
    
export default (Banner);