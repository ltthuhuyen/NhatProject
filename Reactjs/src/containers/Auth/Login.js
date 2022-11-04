import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import imglogin from "../../assets/images/banner4.jpg";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import "./Login.scss";
import { FormatteMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
import ForgotPassword from "./ForgotPassword";
import { faFlushed } from "@fortawesome/free-regular-svg-icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      isOpenModalForgot: false,
    };
  }

  handleForgot = () => {
    this.setState({
      isOpenModalForgot: true,
    });
  };

  toggleForgotModal = () => {
    this.setState({
      isOpenModalForgot: !this.state.isOpenModalForgot,
    });
  };

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    // console.log(event.target.value)
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    // console.log('username: ' +this.state.username)
    // console.log('password: ' +this.state.password)
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      // console.log('User', data)
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succeeds");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      // console.log(e)
      console.log("hoidanit", error.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    let userInfo = this.props.userInfo;
    //console.log("check userInfo",userInfo)
    return (
      <>
        <ForgotPassword
          isOpen={this.state.isOpenModalForgot}
          toggleFromParent={this.toggleForgotModal}
        />
        <div className="login">
          <div className="login-header">
            VIỆT NAM THU GOM "Làm Cho Thế Giới Sạch Hơn"
          </div>
          <div className="login-background row">
            <img className="imgLogin object-cover col-9" src={imglogin} />
            <div className="login-container col-3 shadow">
              <div className="login-content row ">
                <div className="col-12 text-login">ĐĂNG NHẬP</div>
                <div className="col-12 login-input">
                  <label>Tên đăng nhập</label>
                  <div className="d-flex">
                    <div className="icon">
                      <HiIcons.HiOutlineMail />
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập email"
                      value={this.state.username}
                      onChange={(event) => this.handleOnChangeUsername(event)}
                    ></input>
                  </div>
                </div>

                <div className="col-12 login-input">
                  <label>Mật khẩu</label>
                  <div className="d-flex custom-input-password">
                    <div className="icon">
                      <RiIcons.RiLockPasswordLine />
                    </div>
                    <input
                      type={this.state.isShowPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      onChange={(event) => this.handleOnChangePassword(event)}
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    ></input>
                    <span
                      onClick={() => {
                        this.handleShowHidePassword();
                      }}
                    >
                      <div
                        className={
                          this.state.isShowPassword ? (
                            <BsIcons.BsEye />
                          ) : (
                            <BsIcons.BsEyeSlash />
                          )
                        }
                      ></div>
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <span className="forgot-password">
                    <div
                      to="/forgot-password"
                      className="link-forgot-password"
                      onClick={this.handleForgot}
                    >
                      Quên mật khẩu ?
                    </div>
                  </span>
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-login
                                    "
                    onClick={() => {
                      this.handleLogin();
                    }}
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
