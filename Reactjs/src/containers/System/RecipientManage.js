import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { connect } from "react-redux";
import "./Manage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import Header from "../../containers/Header/Admin/Header";
import {
  searchUser,
  getUserRoleIDService,
  createNewUserService,
  editUserService,
  deleteUserSerVice,
} from "../../services/userService";
import { IconContext } from "react-icons";
import { Table } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      arrRoleID: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
      search: "",
      arrSearchUser: [],
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getUserRoleID();
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

  getUserRoleID = async () => {
    let response = await getUserRoleIDService("R3");
    if (response && response.errCode == 0) {
      this.setState({
        arrRoleID: response.users,
      });
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

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleSearch = async (search) => {
    let response = await searchUser(this.state.search);
    console.log("response searchUser", response);
    if (response) {
      this.setState({
        arrSearchUser: response.data,
      });
    }
    this.props.history.push(`/system/search-user/${this.state.search}`);
  };

  handleDetailUser = async (item) => {
    this.props.history.push(`/system/user-manage-detail/${item.id}`);
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewuser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessange);
      } else {
        toast.success("Thêm người dùng thành công!");
        await this.getUserRoleID();
        this.setState({
          isOpenModalUser: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }

    // console.log('check data from child: ', data)
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
        await this.getUserRoleID();
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
        await this.getUserRoleID();
      } else {
        alert(res.errMessange);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let {
      arrRoleID,
      arrCollectsStatusByCurrentDate,
      isShowNotification,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    const { processLogout, userInfo } = this.props;
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrRoleID.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrRoleID.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
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
          <div className="container-fluid ">
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
              <div className="col-10 title-manage">
                QUẢN LÝ NGƯỜI NHẬN THU GOM
              </div>
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
            {/* <div className="title text-center">
                    QUẢN LÝ NGƯỜI NHẬN
                </div>
                <button 
                        className='btn btn-light  btn-create px-2'
                             onClick={this.handleAddNewUser}
                    >

                        <div className='title-create'>
                            <GrIcons.GrAddCircle  />  <FormattedMessage id='manage-user.add'/>
                        </div>

                </button> */}
            <div className="row content">
              <div className="wrapper-title-sum-statistic d-flex">
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">{arrRoleID.length} người dùng</div>
                </span>
              </div>

              <Table className="shadow">
                <tr className="thead">
                  <th scope="col">ID</th>
                  <th scope="col">Quyền</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ảnh đại diện</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Hành động</th>
                </tr>
                <tbody className="tbody">
                  {currentTodos && currentTodos.length > 0 ? (
                    <>
                      {" "}
                      {currentTodos &&
                        currentTodos.map((item, index) => {
                          let imageBase64 = "";
                          if (item.image) {
                            imageBase64 = new Buffer(
                              item.image,
                              "base64"
                            ).toString("binary");
                          }
                          return (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.roleIdData.valueVi}</td>
                              <td>{item.email}</td>
                              <td>
                                <div className="img">
                                  <img src={imageBase64} className="img-img" />
                                </div>
                              </td>
                              <td>
                                {item.firstName} {item.lastName}
                              </td>
                              <td>{item.genderData.valueVi}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-detail  "
                                  onClick={() => this.handleDetailUser(item)}
                                >
                                  <BsIcons.BsThreeDots />
                                </button>
                                {/* <button type="button" className="btn btn-edit mx-3" onClick={() => this.handleEditUser(item)}><AiIcons.AiOutlineEdit /></button>
                                                <button type="button" className="btn btn-delete" onClick={() => this.handleDeleteUser(item)}><AiIcons.AiOutlineDelete /></button> */}
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {arrRoleID &&
                        arrRoleID.map((item, index) => {
                          let imageBase64 = "";
                          if (item.image) {
                            imageBase64 = new Buffer(
                              item.image,
                              "base64"
                            ).toString("binary");
                          }
                          return (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.roleIdData.valueVi}</td>
                              <td>{item.email}</td>
                              <td>
                                <div className="img">
                                  <img src={imageBase64} className="img-img" />
                                </div>
                              </td>
                              <td>
                                {item.firstName} {item.lastName}
                              </td>
                              <td>{item.genderData.valueVi}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-detail  "
                                  onClick={() => this.handleDetailUser(item)}
                                >
                                  <BsIcons.BsThreeDots />
                                </button>
                                {/* <button type="button" className="btn btn-edit mx-3" onClick={() => this.handleEditUser(item)}><AiIcons.AiOutlineEdit /></button>
                                                <button type="button" className="btn btn-delete" onClick={() => this.handleDeleteUser(item)}><AiIcons.AiOutlineDelete /></button> */}
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
            <div className="row btn-pageNumber d-flex">
              {pageNumbers.map((number) => {
                return (
                  <button
                    className="btn btn-prev-next d-flex"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                  >
                    {number}
                  </button>
                );
              })}
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
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
