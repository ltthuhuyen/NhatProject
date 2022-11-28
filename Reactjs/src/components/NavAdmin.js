import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { changeLanguageApp } from "../store/actions";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa";
import CustomScrollbars from "../components/CustomScrollbars";
import "./NavAdmin.scss";

class NavAdmin extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    const { processLogout, isLoggedIn } = this.props;
    let language = this.props.language;
    console.log(isLoggedIn);
    return (
      <>
        <nav className="sidebar ps-container ">
          <CustomScrollbars style={{ onmouseover: "auto", width: "100%" }}>
            <div className="title-nav">Việt Nam Thu Gom</div>
            <ul id="sidebar_menu" class="metismenu">
              <li>
                {/* <Link to="/system/dashboard">
                <div className="icon">
                  <AiIcons.AiOutlineHome />
                </div>
                <span>Dashboard</span>
              </Link> */}
                <NavLink
                  to="/system/home"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                    // borderRadius: "13px",
                  }}
                >
                  <div className="icon">
                    <AiIcons.AiOutlineHome />
                  </div>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/system/user-manage"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div className="icon">
                    <FaIcons.FaUserAlt />
                  </div>
                  <span>Quản lý người dùng</span>
                </NavLink>
                <ul className="mm-collapse mm-show">
                  <li>
                    <NavLink
                      to="/system/giver-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Quản lý người cho</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/recipient-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Quản lý người nhận</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="mm-active">
                <NavLink
                  to="/system/product-manage"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div className="icon">
                    <RiIcons.RiProductHuntLine />
                  </div>
                  <span>Quản lý sản phẩm</span>
                </NavLink>
              </li>
              <li className="mm-active">
                <NavLink
                  to="/system/collection-form-manage"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div className="icon">
                    <GrIcons.GrUnorderedList />
                  </div>
                  <span>Quản lý đơn thu gom</span>
                </NavLink>
                <ul className="mm-collapse mm-show">
                  <li>
                    <NavLink
                      to="/system/collection-form-status-s1-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span> Đơn chưa nhận</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/collection-form-status-s2-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Chờ xác nhận</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/collection-form-status-s3-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Chờ thu gom</span>
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      to="/system/collection-form-status-s4-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Đã nhận xong</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/collection-form-status-s5-manage"
                      activeStyle={{
                        background: "#7ed000",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <span>Đơn bị hủy</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="mm-active">
                <NavLink
                  to="/system/news-manage"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div className="icon">
                    <HiIcons.HiOutlineNewspaper />
                  </div>
                  <span>Quản lý tin tức</span>
                </NavLink>
              </li>
              <li className="mm-active">
                <NavLink
                  to="/system/competition-manage"
                  activeStyle={{
                    background: "#7ed000",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div className="icon">
                    <HiIcons.HiOutlineNewspaper />
                  </div>
                  <span>Quản lý cuộc thi</span>
                </NavLink>
              </li>
            </ul>
          </CustomScrollbars>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavAdmin);
