import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
// import "./UserInfo.scss";
import * as FaIcons from "react-icons/fa";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { LockOpen } from "@mui/icons-material";
import { CommonUtils } from "../../../utils";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../../services/addressService";
import ModalEditUser from "../../System/ModalEditUser";
import ModalChangePassword from "./ModalChangePassword";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Recipient/Header";
import {
  getAllUsers,
  editUserService,
  editUserInfoService,
} from "../../../services/userService";
import { getAllAddressOfUser } from "../../../services/addressService";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      image: "",
      lastName: "",
      gender: "",
      phone: "",
      roleId: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      city_name: "",
      district_name: "",
      ward_name: "",
      isOpenModalChangePassword: false,
      userEmail: "",
    };
  }

  async componentDidMount() {
    await this.props.getGenderStart();
    await this.props.getRoleStart();
    let userInfo = this.props.userInfo;
    if (userInfo) {
      let imageBase64 = "";
      if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      }
      //Lấy giá trị hiện tại
      this.setState({
        id: userInfo.id,
        email: userInfo.email,
        password: "HARDCODES",
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        gender: userInfo.gender,
        roleId: userInfo.roleId,
        image: imageBase64,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
  }

  handleChangePassword = (email) => {
    this.setState({
      isOpenModalChangePassword: true,
      userEmail: email,
    });
  };

  toggleChangePassword = () => {
    this.setState({
      isOpenModalChangePassword: !this.state.isOpenModalChangePassword,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  getAllAddressOfUserFromReact = async () => {
    let userInfo = this.props.userInfo;
    let response = await getAllAddressOfUser(userInfo.id);
    if (response) {
      this.setState({
        arrAddresses: response.addresses,
        //    userData: response.addresses.userData
      });
    }
  };

  handleSaveUser = async () => {
    let userInfo = this.props.userInfo;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    if (userInfo.id) {
      await editUserInfoService(this.state);
      await getAllUsers(userInfo.id);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  };

  render() {
    let userInfo = this.props.userInfo;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let { arrCities, arrAddresses } = this.state;

    return (
      <>
        <ModalEditUser
          isOpen={this.state.isOpenModalEditUser}
          toggleFromParent={this.toggleEditUserModal}
          currentUser={this.state.userEdit}
          editUser={this.doEditUser}
        />
        <ModalChangePassword
          isOpen={this.state.isOpenModalChangePassword}
          toggleFromParent={this.toggleChangePassword}
          currentUserEmail={this.state.userEmail}
        />
        <Header />
        <div className="user-info">
          <div className="title-user-info">THÔNG TIN CÁ NHÂN</div>
          <div className="line"></div>
          <div className="user-info-content shadow">
            <div className="col-12">
              <div className="account d-flex">
                <NavLink
                  to="/recipient/user-info"
                  className="link-homepage d-flex"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                  }}
                >
                  <div className="icon">
                    <FaIcons.FaUserAlt />
                  </div>
                  <div className="text">TÀI KHOẢN</div>
                </NavLink>
                <div
                  to="/recipient/address-info"
                  onClick={() => this.handleChangePassword(userInfo.email)}
                  className="link-homepage d-flex"
                >
                  <div className="icon">
                    <LockOpen />
                  </div>
                  <div className="text">BẢO MẬT</div>
                </div>
                <NavLink
                  to="/recipient/address-info"
                  className="link-homepage d-flex"
                  activeStyle={{
                    background: "white",
                    color: "#019117",
                  }}
                >
                  <div className="icon ">
                    <FaIcons.FaInfo />
                  </div>
                  <div className="text">ĐỊA CHỈ</div>
                </NavLink>
              </div>
              <hr></hr>
            </div>
            <div className="row d-flex">
              {/* <div className="col-3 img">
                <img className="img-pro img" src={this.state.image} />
              </div> */}
              {/* <div className='col-9 info'>
                            <div className='row'>
                                <div className="col-8 d-flex">
                                    <label className='mr-1'>Email: </label>
                                    {user.email}
                                </div>
                                <div className="col-4 d-flex">
                                    <label className='mr-1'>Password:</label>
                                    {user.password}
                                </div>
                              
                            </div>
                            <div className='row'>
                                <div className="col-8">
                                    <label className='mr-1'>Họ Tên:</label>
                                    {user.firstName + ' ' + user.lastName}
                                </div>
                                <div className='col-4'>
                                    <label className='mr-1'>Giới tính:</label>
                                    {user?.genderData?.valueVi}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <label className='mr-1'>Số điện thoại:</label>
                                    {user.phone}
                                </div>
                            </div>
                            <div className='row d-flex'>
                                <div className='col-12'>
                                  
                                    {
                                        arrAddresses && arrAddresses.map((item , index) => {
                                            return (
                                                <div className='row' style={{display: 'flex'}}>
                                                    <div className='col-10 d-flex'>
                                                        <FiIcons.FiMapPin className='icon'/>
                                                        {item.address_name} - {item.ward_name} - {item.district_name} - {item.city_name}
                                                        
                                                    </div> 
                                                    <div className="col-2 btn-edit d-flex " onClick={() => this.handleEditUser(item)}><AiIcons.AiOutlineEdit /></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div> */}
            </div>
            <div className="row d-flex"></div>
            <form className="form-create-edit">
              <div className="form-row">
                <div className="col-8">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "email");
                    }}
                    value={this.state.email}
                    disabled
                  />
                </div>
                <div className="col-4">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "password");
                    }}
                    value={this.state.password}
                    disabled
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-5">
                  <label>Họ</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                </div>
                <div className="col-5">
                  <label>Tên</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                </div>
                <div className="col-2">
                  <label>Giới tính</label>
                  <select
                    id="gender"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "gender");
                    }}
                    value={this.state.gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.valueVi}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-4">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "phone");
                    }}
                    value={this.state.phone}
                  />
                </div>
                <div className="col-4">
                  <label>Quyền</label>
                  <select
                    id="roleId"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "roleId");
                    }}
                    value={userInfo.roleId}
                    disabled
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.valueVi}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4">
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) => this.handleOnchangeImage(event)}
                    />
                    <label className="upload-file" htmlFor="previewImg">
                      Tải ảnh
                      <PhotoCameraIcon className="ml-1" />
                    </label>
                    <div
                      className="preview-image"
                      style={{ backgroundImage: `url(${this.state.image})` }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
              </div>
              {/* <div className="form-row">
                <div className="col-3">
                  <label>Thành phố</label>
                  <select
                    id="citiesId"
                    class="form-control"
                    onChange={(e) => this.handleClickCity(e, "citiesId")}
                  >
                    <option>Chọn thành phố</option>
                    {arrCities &&
                      arrCities.length > 0 &&
                      arrCities.map((item, index) => {
                        return (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Quận</label>
                  <select
                    id="districtId"
                    class="form-control"
                    onChange={(e) => this.handleClickDistrict(e, "districtId")}
                  >
                    <option>Chọn quận huyện</option>
                    {districts &&
                      districts.length > 0 &&
                      districts.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Phường</label>
                  <select
                    id="wardId"
                    class="form-control"
                    onChange={(e) => {
                      this.handleClickWard(e, "wardId");
                    }}
                  >
                    <option>Chọn xã phường</option>
                    {wards &&
                      wards.length > 0 &&
                      wards.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label for="inputAddress">Địa chỉ</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "address");
                    }}
                    value={address}
                  />
                </div>
              </div> */}
              <button
                type="submit"
                class="btn btn-save"
                onClick={() => this.handleSaveUser()}
              >
                Lưu
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    userInfo: state.user.userInfo,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
