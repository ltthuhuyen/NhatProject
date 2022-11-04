import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import KeyIcon from "@mui/icons-material/Key";
import { handleChangePassword } from "../../../services/userService";
import PasswordIcon from "@mui/icons-material/Password";

class ModalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalAlert: false,
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
      isOpenModalAlert: !this.state.isOpenModalAlert,
    });
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
        <ModalBody></ModalBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);
