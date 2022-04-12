import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";
// import Navigator from '../../components/Navigator';
// import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {LANGUAGES} from "../../utils"
import { changeLanguageApp } from '../../store/actions'
import './HomePageHeader.scss';
class HomePage extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    
    render() {
        const { processLogout } = this.props;
        let language = this.props.language;
        return (
          <div>
             <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <FontAwesomeIcon  style={{ fontSize: "2rem", marginLeft: "1rem", cursor: "pointer"}} icon={faBars} />
                        <h1><a className='font header-logo' style={{color: 'white'}} href="">Nhặt</a></h1>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.page"/></b></div>
                           
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.introduce"/></b></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.contract"/></b></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.news"/></b></div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <FontAwesomeIcon  style={{ fontSize: "1rem", marginLeft: "1rem", cursor: "pointer"}} icon={faQuestion} />
                        </div>
                        <div className={language ===  LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN </span></div>
                        <div className={language ===  LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}> EN</span></div>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                    
                </div>
            </div>
              <Container />
              <Footer />
              <div className='test'>

              </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);