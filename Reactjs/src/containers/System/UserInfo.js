import React, { Component } from "react";
import { CommonUtils } from "../../utils";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import "./UserInfo.scss";
import NavAdmin from "../../components/NavAdmin";
import ModalUser from "./ModalUser";
import { editUserService } from "../../services/userService";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../services/addressService";
import { getAllAddressOfUser } from "../../services/addressService";
import ModalChangePassword from "./ModalChangePassword";
import { toast } from "react-toastify";
import * as FaIcons from "react-icons/fa";
import { LockOpen } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
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
    await this.getAddressUserFromReact();
    await this.getAllCitiesFromReact();
    await this.getAllDistrictsFromReact();
    await this.getAllWardFromReact();
    await this.props.getGenderStart();
    await this.props.getRoleStart();
    let userInfo = this.props.userInfo;
    console.log("user", userInfo);
    if (userInfo) {
      let imageBase64 = "";
      if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      }

      //Lấy giá trị hiện tại
      // this.setState({
      //   id: userInfo.id,
      //   email: userInfo.email,
      //   password: "HARDCODES",
      //   firstName: userInfo.firstName,
      //   lastName: userInfo.lastName,
      //   phone: userInfo.phone,
      //   gender: userInfo.gender,
      //   roleId: userInfo.roleId,
      //   image: imageBase64,
      // });
      {
        this.state.arrAddresses.length > 0 &&
          this.state.arrAddresses.map((item, index) => {
            this.setState({
              id: item.id,
              city_name: item.city_name,
              district_name: item.district_name,
              ward_name: item.ward_name,
              address_name: item.address_name,
              email: item.userData.email,
              password: "HARDCODES",
              firstName: item.userData.firstName,
              lastName: item.userData.lastName,
              phone: item.userData.phone,
              gender: item.userData.gender,
              roleId: item.userData.roleId,
              image: imageBase64,
            });
          });
      }
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

  getAddressUserFromReact = async () => {
    let userId = this.props.userInfo.id;
    let response = await getAllAddressOfUser(userId);
    if (response) {
      this.setState(
        {
          arrAddresses: response.addresses,
        },
        () => {
          console.log("arrAddresses", this.state.arrAddresses);
        }
      );
    }
  };

  getAllCitiesFromReact = async () => {
    let response = await getAllCities();
    if (response) {
      this.setState({
        arrCities: response,
      });
    }
  };

  getAllDistrictsFromReact = async () => {
    let response = await getAllDistricts();
    if (response) {
      this.setState({
        arrDistricts: response,
      });
    }
  };

  getAllWardFromReact = async () => {
    let response = await getAllWards();
    if (response) {
      this.setState({
        arrWards: response,
      });
    }
  };

  handleClickCity = (e) => {
    let { arrCities, arrDistricts } = this.state;
    const idx = e.target.value;
    let kq = arrDistricts.filter((item) => item.province_code == idx);
    let kq2 = arrCities.filter((item) => item.code == idx);
    this.setState({
      districts: kq,
      city_name: kq2[0].name,
    });
  };

  handleClickDistrict = (e) => {
    let { arrDistricts, arrWards } = this.state;
    const idx = e.target.value;
    let kq = arrWards.filter((item) => item.district_code == idx);
    let kq2 = arrDistricts.filter((item) => item.code == idx);
    this.setState({
      wards: kq,
      district_name: kq2[0].name,
    });
  };

  handleClickWard = (e) => {
    let { arrWards } = this.state;
    const idx = e.target.value;
    let kq2 = arrWards.filter((item) => item.code == idx);
    this.setState({
      ward_name: kq2[0].name,
    });
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
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

  handleSaveUser = async (e) => {
    e.preventDefault();
    let res = await editUserService({
      id: this.state.id,
      city_name: this.state.city_name,
      district_name: this.state.district_name,
      ward_name: this.state.ward_name,
      address_name: this.state.address_name,
      email: this.state.email,
      password: "HARDCODES",
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      gender: this.state.gender,
      roleId: this.state.roleId,
      image: this.state.imageBase64,
    });
    if (res && res.errCode === 0) {
      toast.success("Sửa thông tin người dùng thành công");
    } else if (res && res.errCode === 1) {
      toast.error("Không tìm thấy người dùng này");
    } else if (res && res.errCode === 2) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

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

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let { arrCities, districts, wards, arrAddresses } = this.state;
    let {
      email,
      password,
      firstName,
      lastName,
      gender,
      roleId,
      phone,
      city_name,
      district_name,
      ward_name,
      address_name,
    } = this.state;
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
          <ModalChangePassword
            isOpen={this.state.isOpenModalChangePassword}
            toggleFromParent={this.toggleChangePassword}
            currentUserEmail={this.state.userEmail}
          />
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
              {/* nút logout */}
              <div className="btn btn-logout" onClick={processLogout}>
                <LogoutIcon />
              </div>
            </div>
          </div>
          <div className="row title d-flex">
            <div className="col-6 title-manage">THÔNG TIN CÁ NHÂN</div>
            {/* <div className="serach_field-area d-flex align-items-center">
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
            </button> */}
          </div>
          <div className="row content">
            <div className="user-info">
              <div className="user-info-content shadow">
                <div className="col-12">
                  <div className="account d-flex">
                    <NavLink
                      to="/system/user-info"
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
                      to="/system/change-password"
                      onClick={() => this.handleChangePassword(userInfo.email)}
                      className="link-homepage d-flex"
                    >
                      <div className="icon">
                        <LockOpen />
                      </div>
                      <div className="text">BẢO MẬT</div>
                    </div>
                  </div>
                  <hr></hr>
                </div>
                <form className="form-create-edit">
                  <div className="form-row">
                    <div className="col-8">
                      <label className="label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "email");
                        }}
                        value={email}
                      />
                    </div>
                    <div className="col-4">
                      <label className="label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "password");
                        }}
                        value={password}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-5">
                      <label className="label">Họ</label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "firstName");
                        }}
                        value={firstName}
                      />
                    </div>
                    <div className="col-5">
                      <label className="label">Tên</label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "lastName");
                        }}
                        value={lastName}
                      />
                    </div>
                    <div className="col-2">
                      <label className="label">Giới tính</label>
                      <select
                        id="gender"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "gender");
                        }}
                        value={gender}
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
                      <label className="label">Số điện thoại</label>
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "phone");
                        }}
                        value={phone}
                      />
                    </div>
                    <div className="col-4">
                      <label className="label">Quyền</label>
                      <select
                        id="roleId"
                        class="form-control"
                        onChange={(e) => {
                          this.handleOnChangeInput(e, "roleId");
                        }}
                        value={roleId}
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
                          <i className="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.image})`,
                          }}
                          onClick={() => this.openPreviewImage()}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <label className="label">Thành phố</label>
                      <select
                        id="citiesId"
                        class="form-control"
                        onChange={(e) => this.handleClickCity(e, "citiesId")}
                      >
                        <option selected>{city_name}</option>
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
                      <label className="label">Quận</label>
                      <select
                        id="districtId"
                        class="form-control"
                        onChange={(e) =>
                          this.handleClickDistrict(e, "districtId")
                        }
                      >
                        <option selected>{district_name}</option>
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
                      <label className="label">Phường</label>
                      <select
                        id="wardId"
                        class="form-control"
                        onChange={(e) => {
                          this.handleClickWard(e, "wardId");
                        }}
                      >
                        <option selected>{ward_name}</option>
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
                        value={address_name}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-save"
                    onClick={(e) => this.handleSaveUser(e)}
                  >
                    Lưu
                  </button>
                </form>
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
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
