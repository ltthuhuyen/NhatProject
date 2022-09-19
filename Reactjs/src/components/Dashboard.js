import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import { changeLanguageApp } from '../store/actions'
import './Dashboard.scss'
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import avata from '../../src/assets/images/header-banner.jpg'


class Dashboard extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    
    render() {
        const { processLogout , isLoggedIn } = this.props;
        let language = this.props.language;
        console.log(isLoggedIn)
        return (
        <>
            <section className="main_content dashboard_part large_header_bg">
                <div className='container-fluid g-0'>
                    <div className='row '>
                        <div className=' col-6 header_iner d-flex justify-content-between align-items-center'>
                            <div className='serach_field-area d-flex align-items-center'>
                                <input type="text" placeholder="Search here..."/>
                                <button type="search" className="btn btn-search rounded-pill"
                                    ><BsIcons.BsSearch/> Tìm</button>
                            </div>
                        </div>
                        <div className='col-6 header_right justify-content-between align-items-center'>
                            <div className='d-flex'>
                                <div className='header_notification_warp d-flex align-items-center'>
                                    <div className='link-notification'>
                                        <Link className='bell_notification_clicker nav-link-notify'>
                                            <div className='icon'></div><RiIcons.RiNotification2Line/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="img">
                                    <img src={avata} className='img-img'/>
                                </div>
                                <div className='profile-info'>Xin chào </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div>
                    <div className='row'>
                        <div className='col-lg-12 page-title'>
                            <h3 className='text-white'>Dashboard</h3>
                        </div>
                    </div>
                    <div className='row card-content '>
                        <div className='col-lg-5 card_height_100'>
                            <h3 className='text-white'></h3>
                        </div>
                        <div className='col-lg-4 card_height_50'>
                            <div className='white_card '>
                                <div className='date_picker_wrapper'>Date date_picker_wrapper</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);