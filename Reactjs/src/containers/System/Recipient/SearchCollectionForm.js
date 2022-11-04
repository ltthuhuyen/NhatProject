import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DatePicker from "../../../components/Input/DatePicker";
import { dateFormat } from "../../../utils";
import moment from "moment";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./SearchCollectionForm.scss";
import { withRouter } from "react-router";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
} from "../../../services/addressService";
import { searchCollectByAddressService } from "../../../services/searchService";
import { saveUpdateStaticS2 } from "../../../services/appointmentService";
import { Diversity1 } from "@mui/icons-material";

class SearchCollectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: [],
      arrCollectionFormsByAddress: [],
      statusArr: [],
      status: "",
      statusType: "",
      recipientId: "",
      obj: {},
      currentPage: 1,
      todosPerPage: 10,
      isShowAlert: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  componentDidMount() {
    this.getAllCitiesFromReact();
    this.getAllDistrictsFromReact();
    this.getAllWardFromReact();
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

  handleOnChangeDataPicker = (date) => {
    this.setState({
      currentDate: moment(date[0]).format(dateFormat.SEND_TO_SERVER),
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleSearchAddress = async () => {
    if (
      this.state.city_name &&
      this.state.district_name &&
      this.state.ward_name &&
      this.state.currentDate
    ) {
      let response = await searchCollectByAddressService({
        city_name: this.state.city_name,
        district_name: this.state.district_name,
        ward_name: this.state.ward_name,
        date: this.state.currentDate,
      });
      if (response) {
        this.setState({
          arrCollectionFormsByAddress: response,
        });
      }
    }
  };

  handleUpdate = async (id) => {
    let response = await saveUpdateStaticS2({
      id: id.id,
      recipientId: this.props.userInfo.id,
    });
    if (response && response.errCode == 0) {
      toast.success("Đăng ký đơn thu gom thành công!");
    }
    // this.props.history.push(`/recipient/collection-form-detail/${id.id}`);
  };

  render() {
    let { arrCities, arrCollectionFormsByAddress } = this.state;
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrCollectionFormsByAddress.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(arrCollectionFormsByAddress.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    let { address, districts, wards } = this.state;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    return (
      <>
        <div className="search-collection-form">
          <div className="title-search-collection-form">TÌM ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="search-content shadow">
            <div className="row d-flex">
              <div className="col-3">
                {/* <label className='label'>Thành phố</label> */}
                <select
                  id="citiesId"
                  className="select"
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
                {/* <label className='label'>Quận</label> */}
                <select
                  id="districtId"
                  className="select"
                  onChange={(e) => this.handleClickDistrict(e, "districtId")}
                >
                  <option>Chọn quận huyện</option>
                  {districts &&
                    districts.length > 0 &&
                    districts.map((item, index) => {
                      return (
                        <>
                          <option
                            key={index}
                            value={item.code}
                            className="option"
                          >
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                {/* <label className='label'>Phường</label> */}
                <select
                  id="wardId"
                  className="select"
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
              <div className="col-2 ">
                {/* <label>Chọn ngà</label> */}
                {/* <div className='icon'><BsIcons.BsCalendarDate/></div> */}
                <DatePicker
                  onChange={this.handleOnChangeDataPicker}
                  className="select"
                  placeholder="Chọn ngày"
                  value={this.state.currentDate}
                  date={new Date()}
                />
              </div>
              <div className="col-1">
                <button
                  type="search"
                  className="btn btn-search"
                  onClick={() => this.handleSearchAddress()}
                >
                  <BsIcons.BsSearch />
                </button>
              </div>
            </div>
            <div className=" ">
              {arrCollectionFormsByAddress &&
                arrCollectionFormsByAddress.map((item, index) => {
                  console.log("item", item);
                  let imageBase64 = "";
                  if (item.giverData.image) {
                    imageBase64 = new Buffer(
                      item.giverData.image,
                      "base64"
                    ).toString("binary");
                  }
                  return arrCollectionFormsByAddress > "0" ? (
                    <div className="row shadow" aria-hidden="true">
                      <div className="col-3">
                        <img src={imageBase64} className="img-pro" />
                      </div>
                      <div className="col-9 mt-3">
                        <p className="info-giver">
                          {item.giverData.firstName} {item.giverData.lastName} -{" "}
                          <HiIcons.HiOutlineMail /> Email:{" "}
                          {item.giverData.email}
                        </p>
                        <div className="d-flex">
                          <span className="info-collection mr-1">
                            <RiIcons.RiProductHuntLine className=" icon" /> Sản
                            phẩm thu gom:{" "}
                          </span>
                          <p>{item.productData.product_name}</p>
                        </div>
                        <div className="d-flex">
                          <span className="info-collection mr-1">
                            <BsIcons.BsTelephoneInbound className="icon" /> Điện
                            thoại:{" "}
                          </span>
                          <p> {item.giverData.phone}</p>
                        </div>
                        <div className="d-flex">
                          <span className="info-collection mr-1">
                            <FiIcons.FiMapPin className="icon" /> Địa chỉ thu
                            gom:{" "}
                          </span>
                          <p>
                            {item.addressData.address_name} -{" "}
                            {item.addressData.ward_name} -{" "}
                            {item.addressData.district_name} -{" "}
                            {item.addressData.city_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <span className="info-collection mr-1">
                            <BsIcons.BsCalendarDate className="icon" /> Ngày:{" "}
                          </span>
                          <p>{item.date}</p>
                          <span className="info-collection ml-1 mr-1">
                            {" "}
                            - Thời gian:{" "}
                          </span>
                          <p>{item.timeTypeData.valueVi}</p>
                        </div>
                      </div>
                      {item.statusType === "S1" ? (
                        <button
                          className="btn-register-receive"
                          onClick={() => this.handleUpdate(item)}
                        >
                          <IoIcons.IoMdArrowRoundForward /> Đăng ký
                        </button>
                      ) : (
                        <div disabled className="registed">
                          <CheckCircleOutlineIcon className="icon" />
                          Đã đăng ký
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="wrapper-alert shadow ">
                      <div className="row text-blue">
                        Hiện tại, địa điểm này chưa có đơn thu gom
                      </div>
                    </div>
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
    systemMenuPath: state.app.systemMenuPath,
    statusRedux: state.admin.statuses,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusStart: () => dispatch(actions.fetchStatusStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchCollectionForm)
);
