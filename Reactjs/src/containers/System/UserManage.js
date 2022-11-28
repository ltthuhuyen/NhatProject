import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import ModalUser from "./ModalUser";
import {
  searchUser,
  getAllUsers,
  createNewUserService,
  deleteUserSerVice,
} from "../../services/userService";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { dateFormat } from "../../utils";
import {
  getCollectionFormStatusByCurrentDate,
  getAllCollectionForm,
} from "../../services/collectionformService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      roleIdData: "",
      genderData: "",
      search: "",
      arrSearchUser: [],
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
      arrCollectsStatusByCurrentDate: [],
      arrCollectionForms: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
    await this.getAllCollectionFormReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrUsers: response.users,
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

  getAllCollectionFormReact = async () => {
    let response = await getAllCollectionForm("ALL");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrCollectionForms: response.appointments,
        },
        () => {
          console.log("arrCollectionForms", this.state.arrCollectionForms);
        }
      );
    }
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleSearch = async (search) => {
    let response = await searchUser(this.state.search);
    if (response) {
      this.setState({
        arrSearchUser: response.data,
      });
    }
    this.props.history.push(`/system/search-user/${this.state.search}`);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewuser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm người dùng thành công!");
        await this.getAllAddressFromReact();
        this.props.history.push("/system/user-manage");
      } else if (res && res.errCode === 1) {
        toast.error("Email này đã tồn tại");
      } else if (res && res.errCode === 2) {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    } catch (e) {}
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

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleDetailUser = async (item) => {
    this.props.history.push(`/system/user-manage-detail/${item.id}`);
  };

  render() {
    let {
      arrUsers,
      arrCollectsStatusByCurrentDate,

      currentDateTimeStop,
    } = this.state;
    let arrCollectionForms = this.state.arrCollectionForms;
    currentDateTimeStop = moment(currentDateTimeStop);
    let { isShowNotification } = this.state;
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrUsers.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrUsers.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    // const renderPageNumbers = pageNumbers.map((number) => {
    //   return (

    //     <button
    //       className="btn btn-pageNumber d-flex active"
    //       key={number}
    //       id={number}
    //       onClick={this.handleClick}
    //     >
    //       {number}
    //     </button>
    //   );
    // });

    const { processLogout, userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <>
        <NavAdmin />
        <div className="main_content ">
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
            createNewuser={this.createNewuser}
          />
          {/* <div className="wrapper-welcome">
          
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
          </div> */}
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
              <div className="col-6 title-manage">QUẢN LÝ NGƯỜI DÙNG</div>
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
              <div className="wrapper-title-sum-statistic d-flex">
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">{arrUsers.length} người dùng</div>
                </span>
              </div>

              <Table className="shadow">
                <thead className="thead">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Quyền</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ảnh đại diện</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Hành động</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {currentTodos && currentTodos.length > 0 ? (
                    <>
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
                              <td>{item.phone}</td>
                              <td className="z-index">
                                <button
                                  type="button"
                                  className="btn btn-detail mx-2  "
                                  onClick={() => this.handleDetailUser(item)}
                                >
                                  <BsIcons.BsThreeDots />
                                </button>
                                {/* <button
                                  type="button"
                                  className="btn btn-edit mx-2 "
                                  onClick={() => this.handleEditUser(item)}
                                >
                                  <AiIcons.AiOutlineEdit />
                                </button> */}
                                {arrCollectionForms &&
                                arrCollectionForms
                                  .map(
                                    (arrCollectionForms) =>
                                      arrCollectionForms.giverId
                                  )
                                  .includes(item.id) ? (
                                  <>
                                    {" "}
                                    <button
                                      type="button"
                                      className="btn btn-delete  "
                                      onClick={() =>
                                        this.handleDeleteUser(item)
                                      }
                                      disabled
                                    >
                                      <AiIcons.AiOutlineDelete />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {arrCollectionForms &&
                                    arrCollectionForms
                                      .map(
                                        (arrCollectionForms) =>
                                          arrCollectionForms.recipientId
                                      )
                                      .includes(item.id) ? (
                                      <>
                                        {" "}
                                        <button
                                          type="button"
                                          className="btn btn-delete  "
                                          onClick={() =>
                                            this.handleDeleteUser(item)
                                          }
                                          disabled
                                        >
                                          <AiIcons.AiOutlineDelete />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <button
                                          type="button"
                                          className="btn btn-delete  "
                                          onClick={() =>
                                            this.handleDeleteUser(item)
                                          }
                                        >
                                          <AiIcons.AiOutlineDelete />
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {arrUsers &&
                        arrUsers.map((item, index) => {
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
                              <td>{item.phone}</td>
                              <td className="z-index">
                                <button
                                  type="button"
                                  className="btn btn-detail mx-2  "
                                  onClick={() => this.handleDetailUser(item)}
                                >
                                  <BsIcons.BsThreeDots />
                                </button>
                                {/* <button
                                  type="button"
                                  className="btn btn-edit mx-2 "
                                  onClick={() => this.handleEditUser(item)}
                                >
                                  <AiIcons.AiOutlineEdit />
                                </button> */}
                                <button
                                  type="button"
                                  className="btn btn-delete  "
                                  onClick={() => this.handleDeleteUser(item)}
                                >
                                  <AiIcons.AiOutlineDelete />
                                </button>
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
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
