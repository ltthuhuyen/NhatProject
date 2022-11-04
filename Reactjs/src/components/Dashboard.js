import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { changeLanguageApp } from "../store/actions";
import "./Dashboard.scss";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import avata from "../../src/assets/images/header-banner.jpg";
import { countUser } from "../services/userService";
import { countCollect } from "../services/collectionformService";
import { countSubmission } from "../services/submissionService";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    // currentDate.setHours(0,0,0,0);
    this.state = {
      countUser: [],
      countCollect: [],
      countSubmission: [],
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  async componentDidMount() {
    await this.countAllCountUserFromReact();
    await this.countAllCountCollectFromReact();
    await this.countAllCountSubmissionFromReact();
  }

  countAllCountUserFromReact = async () => {
    let res = await countUser("ALL");
    console.log("res", res);
    if (res) {
      this.setState({
        countUser: res.users,
      });
    }
  };

  countAllCountCollectFromReact = async () => {
    let res = await countCollect("ALL");
    console.log("res", res);
    if (res) {
      this.setState({
        countCollect: res.collects,
      });
    }
  };

  countAllCountSubmissionFromReact = async () => {
    let res = await countSubmission("ALL");
    if (res) {
      this.setState({
        countSubmission: res.submissions,
      });
    }
  };

  render() {
    let { countUser, countCollect, countSubmission } = this.state;
    let { userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    const { processLogout, isLoggedIn } = this.props;
    console.log(isLoggedIn);
    return (
      <>
        <section className="main_content dashboard_part large_header_bg">
          <div className="container-fluid g-0">
            <div className="row ">
              <div className=" col-6 header_iner d-flex justify-content-between align-items-center">
                <div className="serach_field-area d-flex align-items-center">
                  <input type="text" placeholder="Search here..." />
                  <button type="search" className="btn btn-search rounded-pill">
                    <BsIcons.BsSearch /> Tìm
                  </button>
                </div>
              </div>
              <div className="col-6 header_right justify-content-between align-items-center">
                <div className="d-flex">
                  {/* <div className="header_notification_warp d-flex align-items-center">
                    <div className="link-notification">
                      <Link className="bell_notification_clicker nav-link-notify">
                        <div className="icon"></div>
                        <RiIcons.RiNotification2Line />
                      </Link>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="d-flex">
                      <div className="img">
                        <img src={imageBase64} className="img-img" />
                      </div>
                      <div className="profile-info">
                        Xin chào
                        {userInfo && userInfo.firstName + userInfo.lastName
                          ? userInfo.firstName + " " + userInfo.lastName
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-lg-12 page-title">
                <h3 className="text-white">Dashboard</h3>
              </div>
            </div>
            <div className="row card-content ">
              {countUser.length > 0 &&
                countUser.map((item, index) => {
                  return (
                    <div className="col-lg-3 d-flex shadow card_height_100">
                      <div className="icon">
                        <FaIcons.FaUserAlt />
                      </div>
                      <div className="text d-flex">
                        Người dùng:
                        <div className="count">{item.count}</div>
                      </div>
                    </div>
                  );
                })}
              {countCollect.length > 0 &&
                countCollect.map((item, index) => {
                  return (
                    <div className="col-lg-3 d-flex shadow card_height_100">
                      <div className="icon">
                        <GrIcons.GrUnorderedList />
                      </div>
                      <div className="text d-flex">
                        Đơn thu gom:
                        <div className="count">{item.count}</div>
                      </div>
                    </div>
                  );
                })}
              {countSubmission.length > 0 &&
                countSubmission.map((item, index) => {
                  return (
                    <div className="col-lg-3 d-flex shadow card_height_100">
                      <div className="icon">
                        <GrIcons.GrUnorderedList />
                      </div>
                      <div className="text d-flex">
                        Bài dự thi:
                        <div className="count">{item.count}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
