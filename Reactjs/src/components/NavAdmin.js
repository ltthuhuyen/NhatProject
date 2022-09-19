import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import { changeLanguageApp } from '../store/actions'
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa";
import './NavAdmin.scss'


class NavAdmin extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    
    render() {
        const { processLogout , isLoggedIn } = this.props;
        let language = this.props.language;
        console.log(isLoggedIn)
        return (
        <>
            <nav className='sidebar ps-container '>
                <div className='title-nav'>R E C Y C L E  C O L L E C T I O N</div>
                <ul id="sidebar_menu" class="metismenu">
                    <li >
                        <Link>
                            <div className='icon'><AiIcons.AiOutlineHome/></div>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className='mm-active'>
                        <Link className='has-arrow' to="/system/user-manage">
                            <div className='icon'><FaIcons.FaUserAlt/></div>
                            <span>Quản lý người dùng</span>
                        </Link>
                        <ul className='mm-collapse mm-show'>
                            <li>
                            <Link to='/system/giver-manage'>Quản lý người cho</Link>
                            </li>
                            <li>
                            <Link to='/system/recipient-manage'>Quản lý người nhận</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='mm-active'>
                        <Link to='/system/product-manage'>
                            <div className='icon'><RiIcons.RiProductHuntLine/></div>
                            <span>Quản lý sản phẩm</span>
                        </Link>
                       
                    </li>
                    <li className='mm-active'>
                        <Link className='has-arrow' to='/system/collection-form-manage'>
                            <div className='icon'><GrIcons.GrUnorderedList/></div>
                            <span>Quản lý đơn thu gom</span>
                        </Link>
                        <ul className='mm-collapse mm-show'>
                            <li>
                            <Link to='/system/collection-form-status-s1-manage'>Đơn chưa nhận</Link>
                            </li>
                            <li>
                            <Link to='/system/collection-form-status-s2-manage'>Chờ xác nhận</Link>
                            </li>
                            <li>
                            <Link to='/system/collection-form-status-s3-manage'>Chờ thu gom</Link>
                            </li>
                            <li>
                            <Link to='/system/collection-form-status-s4-manage'>Đã nhận xong</Link>
                            </li>
                            <li>
                            <Link to='/system/collection-form-status-s5-manage'>Đơn bị hủy</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='mm-active'>
                        <Link to='/system/news-manage'>
                            <div className='icon'><HiIcons.HiOutlineNewspaper/></div>
                            <span>Quản lý tin tức</span>
                        </Link>
                       
                    </li>
                </ul> 
               
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavAdmin);