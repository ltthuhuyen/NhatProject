import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import { LockOpen } from "@mui/icons-material";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../../services/addressService";
import ModalChangePassword from "./ModalChangePassword";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Recipient/Header";
import {
  getAllAddressOfUser,
  editAddressInfoService,
  deleteAddressSerVice,
} from "../../../services/addressService";
import { getAllCollectionForm } from "../../../services/collectionformService";

class AddressInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      district: "",
      ward: "",
      address_name: "",
      ward_name: "",
      district_name: "",
      city_name: "",
      arrAddresses: [],
      arrCollectionForms: [],
      isOpenModalChangePassword: false,
    };
  }

  async componentDidMount() {
    await this.getAllCollectionFormReact();
    await this.getAllAddressOfUserFromReact();
    await this.getAllCitiesFromReact();
    await this.getAllDistrictsFromReact();
    await this.getAllWardFromReact();
    await this.props.getGenderStart();
    await this.props.getRoleStart();
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

  getAllCollectionFormReact = async () => {
    let response = await getAllCollectionForm("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCollectionForms: response.appointments,
      });
    }
  };

  getAllAddressOfUserFromReact = async () => {
    let userInfo = this.props.userInfo;
    let response = await getAllAddressOfUser(userInfo.id);
    if (response) {
      this.setState({
        arrAddresses: response.addresses,
      });
    }
  };

  handleEditAddress = (address) => {
    this.setState({
      isShow: !this.state.isShow,
    });
    this.setState({
      id: address.id,
      address_name: address.address_name,
      ward_name: address.ward_name,
      district_name: address.district_name,
      city_name: address.city_name,
    });
  };

  handleSaveAddress = async () => {
    let addressId = this.state.id;
    if (addressId) {
      let res = await editAddressInfoService(this.state);
      if (res && res.errCode === 0) {
        toast.success("Sửa địa chỉ thành công");
        await this.getAllAddressOfUserFromReact();
      } else {
        toast.error("Sửa địa chỉ không thành công");
      }
    }
  };

  handleDeleteAddress = async (address) => {
    let res = await deleteAddressSerVice(address.id);
    if (res && res.errCode === 0) {
      toast.success("Xóa địa chỉ thành công");
      await this.getAllAddressOfUserFromReact();
    } else {
      toast.error("Xóa địa chỉ không thành công");
    }
  };

  render() {
    let { arrCollectionForms, arrAddresses, arrCities, districts, wards } =
      this.state;
    let userInfo = this.props.userInfo;
    return (
      <>
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
                  to="/recipient/change-password"
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
                  <div className="icon">
                    <FaIcons.FaInfo />
                  </div>
                  <div className="text">ĐỊA CHỈ</div>
                </NavLink>
              </div>
              <hr></hr>
            </div>
            <div className="row ">
              <div className="info mr-1">
                <FiIcons.FiMapPin className="icon " /> Địa chỉ hiện tại:{" "}
              </div>
            </div>
            <div className="row">
              <div>
                {arrAddresses.length > 0 &&
                  arrAddresses.map((item, index) => {
                    return (
                      <div className=" mr-1">
                        <div className="d-flex">
                          <div className="col-10">
                            {item.address_name} - {item.ward_name} -{" "}
                            {item.district_name} - {item.city_name}
                          </div>

                          {this.state.isShow ? (
                            ""
                          ) : (
                            <div className="col-2 d-flex">
                              <button
                                type="button"
                                className="btn btn-edit mx-2 "
                                onClick={() => this.handleEditAddress(item)}
                              >
                                <AiIcons.AiOutlineEdit />
                              </button>
                              <button
                                type="button"
                                className="btn btn-delete  "
                                onClick={() => this.handleDeleteAddress(item)}
                                disabled={arrCollectionForms
                                  .map(
                                    (arrCollectionForms) =>
                                      arrCollectionForms.recipientId
                                  )
                                  .includes(item.userId)}
                              >
                                <AiIcons.AiOutlineDelete />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {this.state.isShow ? (
              <form className="form-create-edit">
                <hr></hr>
                <div className="form-row">
                  <div className="col-3">
                    <label>Thành phố</label>
                    <select
                      id="citiesId"
                      class="form-control"
                      onChange={(e) => this.handleClickCity(e, "citiesId")}
                    >
                      <option selected>{this.state.city_name}</option>
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
                      onChange={(e) =>
                        this.handleClickDistrict(e, "districtId")
                      }
                    >
                      <option selected>{this.state.district_name}</option>
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
                      <option selected>{this.state.ward_name}</option>
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
                        this.handleOnChangeInput(e, "address_name");
                      }}
                      value={this.state.address_name}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-save"
                  onClick={() => this.handleSaveAddress()}
                >
                  Lưu
                </button>
              </form>
            ) : (
              ""
            )}
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
  connect(mapStateToProps, mapDispatchToProps)(AddressInfo)
);
