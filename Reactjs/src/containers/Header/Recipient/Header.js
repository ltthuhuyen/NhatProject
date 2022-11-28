import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { dateFormat } from "../../../utils";
import "../Giver/Header.scss";
import * as actions from "../../../store/actions";
import * as FiIcons from "react-icons/fi";
import CustomScrollbars from "../../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import { getCollectionFormOfWaittingRecipientByCurrentDate } from "../../../services/collectionformService";

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
      arrCollectionFormOfRecipientStatusS3: [],
    };
  }

  async componentDidMount() {
    await this.getAllCollectionFormOfWaittingRecipientByCurrentDate();
  }

  getAllCollectionFormOfWaittingRecipientByCurrentDate = async () => {
    let userInfo = this.props.userInfo;

    let response = await getCollectionFormOfWaittingRecipientByCurrentDate({
      recipientId: userInfo.id,
      currentDate: this.state.currentDate,
    });

    if (response && response.errCode == 0) {
      this.setState({
        arrCollectionFormOfRecipientStatusS3: response.appointments,
      });
    }
  };

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

  handleDetailUser = (userInfo) => {
    this.props.history.push("/recipient/user-info");
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleDetailCollectForm = (collectForm) => {
    this.props.history.push(
      `/recipient/collection-form-detail/${collectForm.id}`
    );
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  render() {
    const { processLogout, isLoggedIn, userInfo } = this.props;
    let {
      isShowNotification,
      curentDate,
      arrCollectionFormOfRecipientStatusS3,
    } = this.state;

    let imageBase64 = "";
    if (userInfo) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <div>
        <div className="home-header">
          <div className="row t">
            <div className="col-4"></div>
            <div className="col-4 title">Việt Nam Thu Gom</div>
            <div className="col-4 d-flex ">
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
                            {arrCollectionFormOfRecipientStatusS3.length > 0 &&
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
                                        {item.giverData.lastName}
                                        {" - "}
                                        {item.addressData.address_name} {""}
                                        {item.addressData.ward_name} {""}
                                        {item.addressData.district_name}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
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
          <div className="row content">
            <div className="center-content">
              <div className="child-content">
                <NavLink
                  to="/recipient/home"
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
                  to="/recipient/collection-history"
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
                  to="/recipient/contest"
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
              {/* <div className="right-content">
                            <input type="text" class="form-control rounded-pill" id="exampleInputPassword1"
                                onChange={(e) => {this.handleOnChangeInput(e, 'search')}}

                            />
                           
                            <button type="search" class="btn btn-search rounded-pill">Tìm kiếm</button>
                        </div> */}
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
