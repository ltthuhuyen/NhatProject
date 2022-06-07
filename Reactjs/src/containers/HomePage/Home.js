import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";
import * as FaIcons from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {LANGUAGES} from "../../utils"
import { changeLanguageApp } from '../../store/actions'
// import './HomePageHeader.scss';
import ModalEditUser from '../System/ModalEditUser';
class Home extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    constructor(props){
        super(props);
        this.state = {
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    toggleEditUserModal = () =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    handleEditUserInfo = (userId) =>{
        console.log('check userId',userId )
        this.setState({
            isOpenModalEditUser: true,
            userEdit: userId
        })
    }
    
    render() {
        const { processLogout , isLoggedIn, userInfo } = this.props;
        let language = this.props.language;
        console.log(isLoggedIn)
        return (
          <div>
            {
                this.state.isOpenModalEditUser &&
                <ModalEditUser 
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleEditUserModal}
                    currentUser = {this.state.userEdit}
                />
            }
            <div className="home-header-container bg-blue-200">
                <div className="home-header-content">
                    <div className="left-content">
                        <FontAwesomeIcon  style={{ fontSize: "2rem", marginLeft: "1rem", cursor: "pointer"}} icon={faBars} />
                        <h1><a className='font header-logo' style={{color: 'white'}} href="">Nhặt</a></h1>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <Link to ='/home' className='link-homepage'>
                                <FormattedMessage id="homeheader.page"/>
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/cart/:id' className='link-homepage'>
                                <FormattedMessage id="homeheader.appointment-schedule"/>
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/collection-form' className='link-homepage'>
                                <FormattedMessage id="homeheader.collection-history"/>
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/news' className='link-homepage'>
                                <FormattedMessage id="homeheader.news"/>
                            </Link>
                        </div>
                      
                    </div>
                    <div className="language-content">
                        <div className="support">
                        
                        </div>
                        <div className={language ===  LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN </span></div>
                        <div className={language ===  LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}> EN</span></div>
                    </div>
                    <div className="login-register-content">
                        {isLoggedIn === false ? (
                            <>
                                <div className="btn-content">
                                    <Link to ='/login'>
                                        <button className='btn btn-login-register'><FormattedMessage id="login.login"/></button>
                                    </Link> 
                                </div>
                                <div className="btn-content">
                                    <Link to ='/register'>
                                        <button className='btn btn-login-register'><FormattedMessage id="register.register"/></button>
                                    </Link> 
                                </div>
                            </>
                        ) :<>
                                <div className='container-welcome' onClick={() => this.handleEditUserInfo(userInfo)}>  

                                    <div className='icon-user'>
                                        <FaIcons.FaUserAlt/>
                                    </div>

                                    <div className='ten'>
                                        {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }
                                    </div>

                                </div>

                                <div className="btn btn-logout" onClick={processLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                </div>
                           </>
                        }
                    </div>
                    
                    
                    
                </div>
            </div>
            
              
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);