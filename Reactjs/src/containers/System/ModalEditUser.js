import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../utils";
import * as actions from "../../store/actions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./Create.scss";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../services/addressService";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      genderArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      roleId: "",
      image: "",
      action: "",
      arrCities: [],
      arrDistricts: [],
      arrWards: [],
      citiesId: "",
      districts: [],
      wards: [],
      city_name: "",
      district_name: "",
      ward_name: "",
      address_name: "",
    };
  }

  async componentDidMount() {
    await this.props.getGenderStart();
    await this.props.getRoleStart();

    let user = this.props.currentUser;
    let imageBase64 = "";
    if (this.props.currentUser) {
      //Lấy giá trị hiện tại
      this.setState({
        id: user?.id,
        email: user?.userData?.email,
        password: "HARDCODES",
        firstName: user?.userData?.firstName,
        lastName: user?.userData?.lastName,
        phone: user?.userData?.phone,
        gender: user?.userData?.gender,
        roleId: user?.userData?.roleId,
        image: imageBase64,
        previewImgURL: new Buffer(user?.userData.image, "base64").toString(
          "binary"
        ),
        city_name: user?.city_name,
        district_name: user?.district_name,
        ward_name: user?.ward_name,
        address_name: user?.address_name,

        action: CRUD_ACTIONS.EDIT,
      });
    }
    await this.getAllCitiesFromReact();
    await this.getAllDistrictsFromReact();
    await this.getAllWardFromReact();
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        // gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      console.log("arrRoles", arrRoles);
      this.setState({
        roleArr: arrRoles,
        // role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
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

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "phone"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Đối số không hợp lệ " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    // call API edit user
    this.props.editUser(this.state);
  };

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    console.log("roles", roles);
    let { arrCities, districts, wards } = this.state;
    let {
      email,
      password,
      firstName,
      lastName,
      phone,
      gender,
      roleId,
      city_name,
      district_name,
      ward_name,
      address_name,
      previewImgURL,
    } = this.state;

    return (
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
          {" "}
          SỬA THÔNG TIN NGƯỜI DÙNG{" "}
        </ModalHeader>
        <ModalBody>
          <div className="form-create-edit">
            <div className="form-row">
              <div className="input-container col-8">
                <label for="inputEmail4">
                  {" "}
                  <FormattedMessage id="manage-user.email" />{" "}
                </label>
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
              <div className="form-group input-container col-4">
                <label for="">
                  {" "}
                  <FormattedMessage id="manage-user.password" />{" "}
                </label>
                <div className="custom-icon">
                  <input
                    className="form-control"
                    type="password"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "password");
                    }}
                    value={password}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group input-container col-5">
                <label for="">
                  {" "}
                  <FormattedMessage id="manage-user.fName" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "firstName");
                  }}
                  value={firstName}
                />
              </div>
              <div className="form-group input-container col-5">
                <label for="">
                  {" "}
                  <FormattedMessage id="manage-user.lName" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "lastName");
                  }}
                  value={lastName}
                />
              </div>
              <div className="form-group input-container col-2">
                <label for="">
                  {" "}
                  <FormattedMessage id="manage-user.gender" />{" "}
                </label>
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
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group input-container col-md-4">
                <label for="">
                  {" "}
                  <FormattedMessage id="manage-user.phone" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "phone");
                  }}
                  value={phone}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">
                  {" "}
                  <FormattedMessage id="manage-user.roleID" />{" "}
                </label>
                <select
                  id="roleId"
                  class="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "roleId");
                  }}
                  value={roleId}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      console.log("roles", roles);
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div class="form-group col-md-4">
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="upload-file" htmlFor="previewImg">
                    <FormattedMessage id="common.upload-image" />{" "}
                    <CameraAltIcon className="icon" />
                  </label>
                  <div
                    className="preview-image"
                    style={{ backgroundImage: `url(${previewImgURL})` }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-3">
                <label>Thành phố</label>
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
                <label>Quận</label>
                <select
                  id="districtId"
                  class="form-control"
                  onChange={(e) => this.handleClickDistrict(e, "districtId")}
                  value={district_name}
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
                <label>Phường</label>
                <select
                  id="wardId"
                  class="form-control"
                  onChange={(e) => {
                    this.handleClickWard(e, "wardId");
                  }}
                  value={ward_name}
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
                    this.handleOnChangeInput(e, "address_name");
                  }}
                  value={address_name}
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-save"
              onClick={() => this.handleSaveUser()}
            >
              <FormattedMessage id="manage-user.save" />
            </button>
          </div>
        </ModalBody>
        {/* <ModalFooter>   
                    <Button color="primary" className='px-2' onClick={() => {this.handleSaveUser()}}>Lưu</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter> */}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // doEditUser: (inputData) => dispatch(actions.doEditUser(inputData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
