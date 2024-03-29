import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import * as  FaIcons from 'react-icons/fa';
import Navigator from '../../../components/Navigator';
import { adminMenu, recipientMenu } from '../../Header/menuApp';
import {LANGUAGES, USER_ROLE} from "../../../utils"
import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
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
            <div className='admin-header'>
            <div className='row t'>
                <div className='col-4'></div>
                <div className='col-4 title-header'>R E C Y C L E   C O L L E C T I O N</div>
                <div className="col-4 "></div>
            </div>
            <div className='row'>
                <div className="col-12 header-container">
                    {/* thanh navigator */}
                    <div className="col-9 header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div>
                    <span className='col-2 welcome'><FormattedMessage id='menu.system.welcome'/> <FaIcons.FaUserAlt/>  { userInfo && userInfo.lastName ? userInfo.lastName : '' } </span>
                
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);