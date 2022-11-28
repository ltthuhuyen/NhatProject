import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Manage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import Header from "../Header/Admin/Header";
import {
  searchUser,
  createNewUserService,
  editUserService,
  deleteUserSerVice,
} from "../../services/userService";
import { Table } from "reactstrap";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import { emitter } from "../../utils/emitter";
import { ToastContainer, toast } from "react-toastify";
import NavAdmin from "../../components/NavAdmin";
import * as FiIcons from "react-icons/fi";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
      roleIdData: "",
      genderData: "",
      search: "",
      arrSearchUser: [],
      isShowNotification: false,
    };
  }

  async componentDidMount() {
    await this.getAllSearchUsersFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

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

  handleSearch = async () => {
    let response = await searchUser(this.state.search);
    if (response) {
      this.setState({
        arrSearchUser: response,
      });
    }
  };

  getAllSearchUsersFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.search
    ) {
      let search = this.props.match.params.search;
      let response = await searchUser(search);
      console.log("response", response);
      if (response) {
        this.setState(
          {
            arrSearchUser: response,
          },
          () => {
            console.log("arrSearchUser", this.state?.arrSearchUser);
          }
        );
      }
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let currentDate = moment(today).format("YYYY-MM-DD");
    var currentTime =
      today.getHours() +
      ":" +
      ("0" + today.getMinutes()).slice(-2) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    let currentDateTimeBegin = currentDate + " " + "00:00:00";
    let currentDateTimeStop = currentDate + " " + currentTime;
    // console.log("moment", currentDate);
    // console.log("moment", currentTime);
    // console.log("currentDateTimeBegin", currentDateTimeBegin);
    // console.log("currentDateTimeStop", currentDateTimeStop);
    let response = await getCollectionFormStatusByCurrentDate({
      currentDateBegin: currentDateTimeBegin,
      currentDateStop: currentDateTimeStop,
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
        currentDateTimeBegin: currentDateTimeBegin,
        currentDateTimeStop: currentDateTimeStop,
      });
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  createNewuser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessange);
      } else {
        toast.success("Thêm người dùng thành công!");
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleEditUser = async (user) => {
    //console.log('edit user ', user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        toast.success("Sửa thông tin người dùng thành công!");
        await this.getAllUsersFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserSerVice(user.id);
      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công!");
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessange);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDetailUser = async (item) => {
    console.log("item", item);
    this.props.history.push(`/system/user-manage-detail/${item.id}`);
  };

  render() {
    let {
      arrSearchUser,
      isShowNotification,
      arrCollectsStatusByCurrentDate,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    const { processLogout, userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <>
        <NavAdmin />

        <div className="main_content">
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
            createNewuser={this.createNewuser}
          />
          {this.state.isOpenModalEditUser && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              toggleFromParent={this.toggleEditUserModal}
              currentUser={this.state.userEdit}
              editUser={this.doEditUser}
            />
          )}
          <div className="container-fluid  ">
            <div className=" header_right justify-content-between align-items-center">
              <div className="d-flex">
                <div className="d-flex wrapper-welcome">
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
                        <CustomScrollbars style={{ height: "180px" }}>
                          {arrCollectsStatusByCurrentDate.length > 0 &&
                            arrCollectsStatusByCurrentDate.map(
                              (item, index) => {
                                let t = moment(item.createdAt);
                                console.log("t", t);
                                let tt = moment(`${t}`);
                                console.log("tt", tt);
                                return (
                                  <>
                                    <div
                                      className="info-notification"
                                      onClick={(e) =>
                                        this.handleDetailCollectForm(item)
                                      }
                                    >
                                      {item.giverData.firstName} {""}
                                      {item.giverData.lastName}{" "}
                                      <div>
                                        đặt lịch thu gom{" "}
                                        {item.productData.product_name} {""}
                                        tại {item.addressData.address_name} {""}
                                        {item.addressData.ward_name}
                                        {/* {currentDateTimeStop} */}
                                        {/* {item.createdAt} */}
                                      </div>
                                      <div className="text-minutes">
                                        {currentDateTimeStop.diff(
                                          tt,
                                          "minutes"
                                        ) > 60 ? (
                                          <>
                                            {Math.floor(
                                              currentDateTimeStop.diff(
                                                tt,
                                                "minutes"
                                              ) / 60
                                            )}{" "}
                                            giờ trước
                                          </>
                                        ) : (
                                          <>
                                            {currentDateTimeStop.diff(tt)} phút
                                            trước
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            )}
                        </CustomScrollbars>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="img">
                    <img src={imageBase64} className="img-img" />
                  </div>
                  <div className="profile-info">
                    {userInfo && userInfo.firstName + userInfo.lastName
                      ? userInfo.firstName + " " + userInfo.lastName
                      : ""}
                  </div>
                  <div className="btn btn-logout" onClick={processLogout}>
                    <FiIcons.FiLogOut />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-manage shadow-sm ">
            <div className="row title d-flex">
              <div className="col-6 title-manage">TÌM KIẾM NGƯỜI DÙNG</div>
              <div className="serach_field-area d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search here..."
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "search");
                  }}
                />
                <button
                  type="search"
                  className="btn btn-search rounded-pill"
                  onClick={() => this.handleSearch()}
                >
                  <BsIcons.BsSearch /> Tìm
                </button>
              </div>
              <button
                className="col-1 btn btn-create "
                onClick={this.handleAddNewUser}
              >
                <MdIcons.MdOutlineCreate />{" "}
                <FormattedMessage id="manage-user.add" />
              </button>
            </div>

            <div className="row content">
              <Table className="shadow">
                <thead className="thead">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">
                      <FormattedMessage id="manage-user.roleID" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-user.email" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-user.fullName" />{" "}
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-user.gender" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-user.image" />
                    </th>
                    {/* <th scope="col"><FormattedMessage id="manage-user.phone"/></th>
                                <th scope="col"><FormattedMessage id="manage-user.address"/></th> */}
                    <th scope="col">
                      <FormattedMessage id="manage-user.action" />
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {arrSearchUser &&
                    arrSearchUser.map((item, index) => {
                      console.log("arrSearchUser", arrSearchUser);
                      let imageBase64 = "";
                      if (item.image) {
                        imageBase64 = new Buffer(item.image, "base64").toString(
                          "binary"
                        );
                      }
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.roleIdData.valueVi}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>

                          <td>{item.genderData.valueVi}</td>
                          <td>
                            <div className="img">
                              <img src={imageBase64} className="img-img" />
                            </div>
                          </td>
                          {/* <td>{item.phone}</td> */}
                          {/* <td>{item.address}</td> */}
                          <td className="z-index">
                            <button
                              type="button"
                              className="btn btn-detail  "
                              onClick={() => this.handleDetailUser(item)}
                            >
                              <IoIcons.IoIosMore />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchUser)
);
