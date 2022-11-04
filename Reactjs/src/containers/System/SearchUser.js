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
    };
  }

  async componentDidMount() {
    await this.getAllSearchUsersFromReact();
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
    let { arrSearchUser } = this.state;
    // console.log("arrSearchUserg", arrSearchUser);
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
          <div className="row header">
            <div className="d-flex">
              <div className="img">
                <img src={imageBase64} className="img-img" />
              </div>
              <div className="profile-info">
                Xin chào{" "}
                {userInfo && userInfo.firstName + userInfo.lastName
                  ? userInfo.firstName + " " + userInfo.lastName
                  : ""}
              </div>
            </div>
          </div>
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
            <div className="table">
              <Table>
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
                            <button
                              type="button"
                              className="btn btn-edit mx-2 "
                              onClick={() => this.handleEditUser(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
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
