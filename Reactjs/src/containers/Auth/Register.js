import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";
import imgRegister from "../../assets/images/banner3.jpg";
import "./Register.scss";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../services/addressService";
import { createNewUserService } from "../../services/userService";

class Register extends Component {
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
      avatar: "",
      lastName: "",
      gender: "",
      phone: "",
      roleId: "",
    };
  }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check input", this.state);
      }
    );
  };

  componentDidMount() {
    this.getAllCitiesFromReact();
    this.getAllDistrictsFromReact();
    this.getAllWardFromReact();
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
  }

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

  handleCheckRole = (e) => {
    this.setState({
      roleId: e.target.value,
    });
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

  createNewuser = async (data) => {
    let res = await createNewUserService(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm người dùng thành công!");
      this.props.history.push("/login");
    } else if (res && res.errCode === 1) {
      toast.error("Email này đã tồn tại");
    } else if (res && res.errCode === 2) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  handleRegister = () => {
    this.createNewuser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      gender: this.state.gender,
      roleId: this.state.roleId,
      city_name: this.state.city_name,
      district_name: this.state.district_name,
      ward_name: this.state.ward_name,
      address_name: this.state.address,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    console.log("check event", event);
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleregister();
    }
  };
  render() {
    let genders = this.state.genderArr;
    let arrCities = this.state.arrCities;
    let { address, districts, wards } = this.state;
    return (
      <div className="register">
        <div className="register-header">
          VIỆT NAM THU GOM "Làm Cho Thế Giới Sạch Hơn"
        </div>
        <div className="register-background row d-flex">
          <img className="imgregister object-cover col-8" src={imgRegister} />
          <div className="register-container shadow">
            <div className="register-content row ">
              <div className="col-12 text-register">ĐĂNG KÝ THÀNH VIÊN</div>
              <div className="col-6 register-input">
                <label>Tên đăng nhập</label>
                <div className="d-flex">
                  <input
                    className="input"
                    type="text"
                    value={this.state.email}
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "email");
                    }}
                    // value={email}
                  ></input>
                </div>
              </div>
              <div className="col-6 register-input">
                <label>Mật khẩu</label>
                <div className="d-flex custom-input-password">
                  <input
                    className="input"
                    type={this.state.isShowPassword ? "text" : "password"}
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "password");
                    }}
                    value={this.state.password}
                    // onKeyDown={(event) => this.handleKeyDown(event)}
                  ></input>
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-4 register-input">
                <label>Họ </label>
                <div className="d-flex">
                  <input
                    className="input"
                    type="text"
                    value={this.state.firstName}
                    onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                  ></input>
                </div>
              </div>
              <div className="col-4 register-input">
                <label>Tên </label>
                <div className="d-flex">
                  <input
                    className="input"
                    type="text"
                    value={this.state.lastName}
                    onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                  ></input>
                </div>
              </div>
              <div className="col-4 register-input">
                <label>Giới tính </label>
                <div className="d-flex">
                  <select
                    id="gender"
                    class="select"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "gender");
                    }}
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
              <div className="col-4 register-input">
                <label>Thành phố</label>
                <select
                  id="citiesId"
                  class="select"
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
              <div className="col-4 register-input">
                <label>Quận</label>
                <select
                  id="districtId"
                  class="select"
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
              <div className="col-4 register-input">
                <label>Phường</label>
                <select
                  id="wardId"
                  class="select"
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
              <div className="col-8 register-input">
                <label for="inputAddress">Địa chỉ</label>
                <div className="d-flex">
                  <input
                    className="input"
                    type="text"
                    value={address}
                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                  ></input>
                </div>
              </div>
              <div className="col-4 register-input">
                <label>SĐT </label>
                <div className="d-flex">
                  <input
                    className="input"
                    type="text"
                    value={this.state.phone}
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "phone");
                    }}
                  ></input>
                </div>
              </div>
              <div className="col-12 register-input">
                <label>Chọn thành viên</label>
                <div className="d-flex">
                  <input
                    type="radio"
                    clasName="mx-2"
                    value="R2"
                    checked={this.state.roleId === "R2"}
                    onChange={(e) => this.handleCheckRole(e, "roleId")}
                  />
                  <label className="mt-2 mx-2"> Người cho</label>
                  <input
                    type="radio"
                    clasName="mx-2"
                    value="R3"
                    checked={this.state.roleId === "R3"}
                    onChange={(e) => this.handleCheckRole(e, "roleId")}
                  />
                  <label className="mt-2 mx-2"> Người nhận thu gom</label>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 text-center">
                <button
                  className="btn btn-register
                                "
                  onClick={() => {
                    this.handleRegister();
                  }}
                >
                  Đăng ký
                </button>
              </div>

              {/* <div className='col-12'>
                                    <span className='forgot-password'>Quên mật khẩu</span>
                                </div>
                                <div className='col-12 text-center mt-3'>
                                <span className='text-order-register'>Đăng nhập bằng cách khác</span> 
                                </div>
                                <div className='col-12  icon'>
                                    <label><i className="fab fa-facebook"></i></label>
                                    <label><i className="fab fa-google-plus-g"></i></label>
                                    <label><i className="fab fa-twitter"></i></label>
                                </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
