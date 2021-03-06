import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import imglogin from '../../images/hinh1.png'
import './Login.scss';
import { FormatteMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log('username: ' +this.state.username)
        // console.log('password: ' +this.state.password)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
        // console.log('User', data)
                if(data && data.errCode !== 0){
                    this.setState({
                        errMessage: data.message,
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }

        } catch (error) {
            if(error.response) {
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            // console.log(e)
            console.log('hoidanit', error.response)
            
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        console.log('check event', event)
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }
    render() {
        let userInfo = this.props.userInfo
        //console.log("check userInfo",userInfo)
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>????ng Nh???p</div>
                        <div className='col-12 form-group login-input'>
                            <label>T??n ????ng nh???p</label>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    // placeholder='Nh???p t??i kho???n..'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                ></input>
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>M???t kh???u</label>
                            <div className='custom-input-password'>
                                <input 
                                    type= {this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control' 
                                    // placeholder='Nh???p m???t kh???u'
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                ></input>
                            <span
                                onClick={() => { this.handleShowHidePassword()
                                }}
                            ><i className= {this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 text-center'>
                        <button className='btn-login
                        ' onClick={() => {this.handleLogin()}}> LOGIN</button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Qu??n m???t kh???u</span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                        <span className='text-order-login'>????ng nh???p b???ng c??ch kh??c</span> 
                        </div>
                        <div className='col-12  icon'>
                            <label><i className="fab fa-facebook"></i></label>
                            <label><i className="fab fa-google-plus-g"></i></label>
                            <label><i className="fab fa-twitter"></i></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
