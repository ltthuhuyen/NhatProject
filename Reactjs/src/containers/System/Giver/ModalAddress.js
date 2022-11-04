import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./AppointmentScheduleManage.scss";
import Header from "../../Header/Giver/Header";
import Footer from "../../Footer/Footer";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../../services/addressService";

class ModalAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      address: "",
      giverId: "",
    };
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  async componentDidMount() {
    await this.getAllCitiesFromReact();
    await this.getAllDistrictsFromReact();
    await this.getAllWardFromReact();
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

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check good state", this.props);
      }
    );
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

  handleSaveAddress = () => {
    this.setState(
      {
        giverId: this.props.userInfo.id,
      },
      () => {
        console.log("giverId", this.state.giverId);
      }
    );
    this.props.createAddress({
      giverId: this.state.giverId,
      city_name: this.state.city_name,
      district_name: this.state.district_name,
      ward_name: this.state.ward_name,
      address_name: this.state.address,
    });
  };

  render() {
    let arrCities = this.state.arrCities;
    let {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      districts,
      wards,
    } = this.state;
    if (this.props.userInfo) {
      this.state.giverId = this.props.userInfo.id;
    }
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-container"}
          size="lg"
          //centered
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            THÊM MỚI ĐỊA CHỈ{" "}
          </ModalHeader>
          <ModalBody>
            <form className="form-create-edit">
              <div className="form-row">
                <div className="col-6">
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
                <div className="col-6">
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
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-6">
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
                <div className="col-6">
                  <label for="inputAddress">Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="Địa chỉ "
                    class="form-control"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "address");
                    }}
                    value={address}
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
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    allTime: state.admin.allTime,
    allProduct: state.admin.allProduct,
    userInfo: state.user.userInfo,
    temps: state.admin.temps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAppointmentTime: () => dispatch(actions.fetchAllAppointmentTime()),
    fetchAllTemp: (giverId) => dispatch(actions.fetchAllTemp(giverId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddress);
