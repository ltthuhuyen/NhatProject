import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import "./ForgotPassword.scss";
import {
  handleLoginApi,
  handleSendEmailForgotPassword,
} from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
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
    console.log("check event", event);
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleConfirmSendEmail = async (e) => {
    e.preventDefault();
    await handleSendEmailForgotPassword({
      email: this.state.email,
    });
  };

  render() {
    let userInfo = this.props.userInfo;
    //console.log("check userInfo",userInfo)
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="md"
        // centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          QUÊN MẬT KHẨU{" "}
        </ModalHeader>
        <ModalBody>
          <form className="form-forgot-password">
            <div className="form-row">
              <div className="col-12 forgot-input">
                <label> Email của bạn</label>
                <div className="d-flex">
                  <div className="icon">
                    <HiIcons.HiOutlineMail />
                  </div>
                  <input
                    type="text"
                    class=""
                    onChange={(event) => {
                      this.handleOnChangeEmail(event, "email");
                    }}
                    value={this.state.email}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-confirm"
              onClick={(e) => this.handleConfirmSendEmail(e)}
            >
              Xác nhận
            </button>
          </form>
        </ModalBody>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
