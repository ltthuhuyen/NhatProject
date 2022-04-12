import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";
// import Navigator from '../../components/Navigator';
// import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigator from '../../components/Navigator';
import { adminMenu, giverMenu, recipientMenu } from '../Header/menuApp';
import {LANGUAGES, USER_ROLE} from "../../utils"
import { changeLanguageApp } from '../../store/actions'
import './Header.scss';
import _ from 'lodash';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuApp: []
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount(){
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu
            }
            if(role === USER_ROLE.GIVER){
                menu = giverMenu
            }
            if(role === USER_ROLE.RECIPIENT){
                menu = recipientMenu
            }
        }

        this.setState ({
            menuApp: menu
        })
        
    }

    render() {
        const { processLogout , userInfo} = this.props;
        let language = this.props.language;
        return (
            <div className='row'>
                <div className="col-12 header-container">
                    {/* thanh navigator */}
                    <div className="col-8 header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div>
                    <span className='col-2 welcome'><FormattedMessage id='menu.system.welcome'/> {userInfo && userInfo.lastName ? userInfo.lastName : '' }</span>
                    <div className='col-1 language'>
                        <div className={language ===  LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN </span></div>
                        <div className={language ===  LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}> EN</span></div>
                    </div>
                
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);