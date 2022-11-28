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
  getAllUsers,
  createNewUserService,
  editUserService,
} from "../../services/userService";
import {
  getAllAddressOfUser,
  deleteAddressSerVice,
} from "../../services/addressService";
import { Table } from "reactstrap";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllCollectionForm,
  getCollectionFormStatusByCurrentDate,
} from "../../services/collectionformService";

class DetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: {},
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
      roleIdData: {},
      genderData: {},
      image: {},
      search: "",
      arrSearchUser: [],
      arrAddresses: [],
      userData: {},
      arrCollectionForms: [],
      isShowNotification: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
    await this.getAllAddressFromReact();
    await this.getAllCollectionFormReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("update");
  }
  getAllUsersFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let userId = this.props.match.params.id;
      let response = await getAllUsers(userId);
      if (response && response.errCode === 0) {
        this.setState({
          arrUsers: response.users,
          imgUser: response.users.image,
        });
      }
    }
  };

  getAllAddressFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let userId = this.props.match.params.id;
      let response = await getAllAddressOfUser(userId);
      if (response) {
        this.setState({
          arrAddresses: response.addresses,
        });
      }
    }
  };

  getAllCollectionFormReact = async () => {
    let response = await getAllCollectionForm("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCollectionForms: response.appointments,
      });
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let response = await getCollectionFormStatusByCurrentDate({
      date: moment(today).format(dateFormat.FORMAT_DATE),
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
      });
    }
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSearch = async (search) => {
    this.props.history.push(`/system/search-user/${this.state.search}`);
    let response = await searchUser(this.state.search);
    if (response) {
      this.setState({
        arrSearchUser: response.data,
      });
    }
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
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessange);
      } else {
        toast.success("Thêm người dùng thành công!");
        await this.getAllUsersFromReact();
        await this.getAllAddressFromReact();
        this.setState({
          isOpenModalUser: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success("Sửa thông tin người dùng thành công");
        await this.getAllUsersFromReact();
        await this.getAllAddressFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      } else if (res && res.errCode === 1) {
        toast.error("Không tìm thấy người dùng này");
      } else if (res && res.errCode === 2) {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteAddress = async (address) => {
    console.log("address", address.userId);
    // try {
    //   let res = await deleteAddressSerVice(address.id);
    //   if (res && res.errCode === 0) {
    //     toast.success("Xóa địa chỉ người dùng thành công!");
    //     await this.getAllAddressFromReact();
    //   } else {
    //     alert(res.errMessange);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  render() {
    let {
      arrUsers,
      imgUser,
      arrAddresses,
      arrCollectionForms,
      arrCollectsStatusByCurrentDate,
      isShowNotification,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    let imageUser;
    if (imgUser) {
      imageUser = new Buffer(imgUser, "base64").toString("binary");
    }

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
                                let tt = moment(`${t}`);
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
              <div className="col-10 title-manage">CHI TIẾT NGƯỜI DÙNG</div>
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
              <div className="detail shadow">
                <div className="d-flex">
                  <div className="col-4">
                    <div className="img">
                      <img src={imageUser} className="img-img" />
                    </div>
                  </div>
                  <div className="col-8 mt-3">
                    <p className="d-flex">
                      <div className="lable"> ID:</div>
                      <div className="text"> {arrUsers.id}</div>
                    </p>
                    <p className="d-flex">
                      <div className="lable"> Email:</div>
                      <div className="text"> {arrUsers.email}</div>
                    </p>
                    <p className="d-flex">
                      <div className="lable"> Họ tên:</div>
                      <div className="text">
                        {arrUsers.firstName} {arrUsers.lastName}
                      </div>
                    </p>
                    <p className="d-flex">
                      <div className="lable"> Số điện thoại:</div>
                      <div className="text">{arrUsers.phone}</div>
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  <div className="lable ml-0">Địa chỉ</div>
                  {arrAddresses &&
                    arrAddresses.map((item, index) => {
                      console.log("item", item);
                      return (
                        <p className="d-flex">
                          <div className="col-10 mt-2">
                            {item.address_name} - {item?.ward_name} -{" "}
                            {item?.district_name} - {item?.city_name}
                          </div>
                          <div className="col-2 z-index d-flex">
                            <button
                              type="button"
                              className="btn btn-edit mx-2 "
                              onClick={() => this.handleEditUser(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
                            {arrCollectionForms &&
                            arrCollectionForms
                              .map(
                                (arrCollectionForms) =>
                                  arrCollectionForms.giverId
                              )
                              .includes(item.userId) ? (
                              <>
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-delete  "
                                  onClick={() => this.handleDeleteAddress(item)}
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
                                  .includes(item.userId) ? (
                                  <>
                                    {" "}
                                    <button
                                      type="button"
                                      className="btn btn-delete  "
                                      onClick={() =>
                                        this.handleDeleteAddress(item)
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
                                        this.handleDeleteAddress(item)
                                      }
                                    >
                                      <AiIcons.AiOutlineDelete />
                                    </button>
                                  </>
                                )}
                              </>
                            )}

                            {/* <button
                              type="button"
                              className="btn btn-delete  "
                              onClick={() => this.handleDeleteAddress(item)}
                              disabled={arrCollectionForms
                                .map(
                                  (arrCollectionForms) =>
                                    arrCollectionForms.giverId ||
                                    arrCollectionForms.recipientId
                                )
                                .includes(item.userId)}
                              // {console.log(item.userId)}
                            >
                              <AiIcons.AiOutlineDelete />
                            </button> */}
                            {/* <button
                              type="button"
                              className="btn btn-delete  "
                              onClick={() => this.handleDeleteAddress(item)}
                              // disabled={arrCollectionForms
                              //   .map(
                              //     (arrCollectionForms) =>
                              //       arrCollectionForms.giverId ||
                              //       arrCollectionForms.recipientId
                              //   )
                              //   .includes(item.userId)}
                            >
                              <AiIcons.AiOutlineDelete />
                            </button> */}
                          </div>
                        </p>
                      );
                    })}
                </p>
              </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailUser)
);
