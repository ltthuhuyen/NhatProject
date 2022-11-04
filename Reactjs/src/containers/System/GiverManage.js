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
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import NavAdmin from "../../components/NavAdmin";

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
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getUserRoleID();
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
    let response = await getUserRoleIDService("R2");
    if (response && response.errCode == 0) {
      this.setState({
        arrRoleID: response.users,
      });
    }
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
    let arrRoleID = this.state.arrRoleID;
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
            <div className="col-10 title-manage">QUẢN LÝ NGƯỜI CHO</div>
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
                  {currentTodos &&
                    currentTodos.map((item, index) => {
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
                </tbody>
              </Table>
            </div>
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
