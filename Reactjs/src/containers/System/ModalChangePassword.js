import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import KeyIcon from "@mui/icons-material/Key";
import { handleChangePassword } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
import PasswordIcon from "@mui/icons-material/Password";

class ModalChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      new_password: "",
      confirm_password: "",
      isShowPassword: false,
      errMessage: "",
      isOpenModalChangePassword: true,
    };
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
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

  handleConfirmChangePassword = async (e) => {
    e.preventDefault();
    if (this.state.new_password !== this.state.password) {
      if (this.state.confirm_password == this.state.new_password) {
        let res = await handleChangePassword({
          email: this.props.currentUserEmail,
          password: this.state.password,
          new_password: this.state.new_password,
        });
        if (res && res.errCode == 0) {
          toast.success("Thay đổi mật khẩu thành công!");
          this.setState({
            isOpenModalChangePassword: false,
          });
          let processLogout = this.props.processLogout;
        }
      } else {
        toast.error("Mật khẩu mới nhập lại  không đúng");
      }
    } else {
      toast.error("Mật khẩu và mật khẩu mới trùng nhau");
    }
  };

  render() {
    let userInfo = this.props.userInfo;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="md"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <KeyIcon className="mr-2" />
          ĐỔI MẬT KHẨU{" "}
        </ModalHeader>
        <ModalBody>
          <form className="form-change-password">
            <div className="form-row">
              <div className="col-12 forgot-input">
                <label className="label">Mật khẩu hiện tại</label>
                <div className="d-flex">
                  <div className="icon">
                    <PasswordIcon />
                  </div>
                  <input
                    type="password"
                    class=""
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "password");
                    }}
                    value={this.state.password}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-12 forgot-input">
                <label className="label">Mật khẩu mới</label>
                <div className="d-flex">
                  <div className="icon">
                    <PasswordIcon />
                  </div>
                  <input
                    type="password"
                    class=""
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "new_password");
                    }}
                    value={this.state.new_password}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-12 forgot-input">
                <label className="label">Nhập lại mật khẩu mới</label>
                <div className="d-flex">
                  <div className="icon">
                    <PasswordIcon />
                  </div>
                  <input
                    type="password"
                    class=""
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "confirm_password");
                    }}
                    value={this.state.confirm_password}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-confirm"
              onClick={(e) => this.handleConfirmChangePassword(e)}
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalChangePassword);
