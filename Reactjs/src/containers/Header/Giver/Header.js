import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import * as FiIcons from "react-icons/fi";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import CustomScrollbars from "../../../components/CustomScrollbars";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import ModalEditUser from "../../System/ModalEditUser";
import { editUserService } from "../../../services/userService";
import { toast } from "react-toastify";

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  constructor(props) {
    super(props);

    var today = new Date(),
      date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

    this.state = {
      isShowNotification: false,
      currentDate: date,
    };
    this.state = {
      isOpenModalEditUser: false,
      userEdit: {},
      search: "",
    };
  }

  // toggleEditUserModal = () =>{
  //     this.setState({
  //         isOpenModalEditUser: !this.state.isOpenModalEditUser,
  //     })
  // }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check good state", this.state);
      }
    );
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleDetailUser = (userInfo) => {
    this.props.history.push("/giver/user-info");
  };

  // getAllAddressFromReact = async () =>{
  //     if (this.props.userInfo) {
  //         let userI
  //         d = this.props.match.params.id
  //         let response = await getAllAddressOfUser(userId);
  //         if (response) {
  //             this.setState({
  //                 arrAddresses: response.addresses,
  //             //    userData: response.addresses.userData
  //             }, () => {
  //                 console.log('arrAddresses', this.state.arrAddresses)
  //             })
  //         }
  //     }
  // }

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        toast.success("Sửa thông tin người dùng thành công!");
      } else {
        alert(res.errCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { processLogout, isLoggedIn, userInfo } = this.props;
    let { isShowNotification } = this.state;
    let language = this.props.language;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <div>
        <div className="home-header">
          <div className="row t">
            <div className="col-4"></div>
            <div className="col-4 title">Việt Nam Thu Gom</div>
            <div className="col-4 d-flex  justify-center">
              <div className="login-register-content">
                {isLoggedIn === false ? (
                  <>
                    <div className="btn-content">
                      <Link to="/login">
                        <button className="btn btn-login-register">
                          <FormattedMessage id="login.login" />
                        </button>
                      </Link>
                    </div>
                    <div className="btn-content">
                      <Link to="/register">
                        <button className="btn btn-login-register">
                          <FormattedMessage id="register.register" />
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="wrapper-welcome">
                    <div
                      className="btn btn-logout"
                      onClick={(e) => this.handleNotifications(e)}
                    >
                      <NotificationsNoneIcon />
                      {isShowNotification ? (
                        <div className="wrapper-notification shadow rounded">
                          <div className="title-notification">
                            Thông báo
                            <CloseIcon
                              className="icon-close"
                              onClick={(e) => this.handleNotifications(e)}
                            />
                          </div>
                          <CustomScrollbars
                            style={{ height: "180px", width: "100%" }}
                          >
                            {/* {arrCollectionFormOfRecipientStatusS3.length > 0 &&
                              arrCollectionFormOfRecipientStatusS3.map(
                                (item, index) => {
                                  return (
                                    <div
                                      className="info-notification"
                                      onClick={(e) =>
                                        this.handleDetailCollectForm(item)
                                      }
                                    >
                                      Bạn có đơn thu gom {""}
                                      {item.productData.product_name} {""}
                                      <div>
                                        tại {item.giverData.firstName} {""}
                                        {item.giverData.lastName}{" "}
                                        {item.addressData.ward_name} {""}
                                      </div>
                                    </div>
                                  );
                                }
                              )} */}
                          </CustomScrollbars>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="container-welcome">
                      <div
                        className="d-flex"
                        onClick={() => this.handleDetailUser(userInfo)}
                      >
                        <div className="img">
                          <img src={imageBase64} className="img-img" />
                        </div>
                        <div className="profile-info">
                          {userInfo && userInfo.firstName + userInfo.lastName
                            ? userInfo.firstName + " " + userInfo.lastName
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                      <FiIcons.FiLogOut />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row content ">
            <div className=" center-content">
              <div className="child-content">
                <NavLink
                  to="/giver/home"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  TRANG CHỦ
                </NavLink>
              </div>
              <div className="child-content">
                <NavLink
                  to="/giver/cart/:id"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  ĐẶT LỊCH THU GOM
                </NavLink>
              </div>
              <div className="child-content">
                <NavLink
                  to="/giver/collection-history"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  LỊCH SỬ THU GOM
                </NavLink>
              </div>
              <div className="child-content">
                <NavLink
                  to="/news"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  TIN TỨC
                </NavLink>
              </div>
              <div className="child-content">
                <NavLink
                  to="/competition"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  CUỘC THI
                </NavLink>
              </div>
              <div className="child-content">
                <NavLink
                  to="/identification"
                  className="link-homepage"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                    padding: "10px",
                    borderRadius: "13px",
                  }}
                >
                  NHẬN DẠNG
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
