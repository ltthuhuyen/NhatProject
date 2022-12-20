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
import DirectionsIcon from "@mui/icons-material/Directions";
import "./SearchCollectionForm.scss";
import { withRouter } from "react-router";
import {
  getAllCities,
  getAllDistricts,
  getAllWards,
  getAllAddressOfUser,
} from "../../../services/addressService";
import { searchCollectByAddressService } from "../../../services/searchService";
import {
  registerCollectionForm,
  getAllScheduleStatus,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import { Diversity1 } from "@mui/icons-material";

class SearchCollectionForm extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
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
      addressUser: [],
      arrScheduleStatusS2: [],
      arrCollect: [],
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

  async componentDidMount() {
    await this.getAllCitiesFromReact();
    await this.getAllDistrictsFromReact();
    await this.getAllWardFromReact();
    await this.getAllCollectsNearAddress();
    await this.getScheduleS2();
    await this.getAllCollectionByScheduleOfRecipient();
    // await this.getCollectFormStatusS2OfRecipient();
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

  //Đơn thu gom gần địa chỉ của bạn
  getAllCollectsNearAddress = async () => {
    let userId = this.props.userInfo.id;
    let response = await getAllAddressOfUser(userId);
    if (response) {
      this.setState({
        addressUser: response.addresses,
      });
    }
    let { addressUser } = this.state;
    for (let i = 0; i < addressUser.length; i++) {
      let today = new Date();
      if (addressUser[i].city_name && addressUser[i].district_name) {
        let response = await searchCollectByAddressService({
          city_name: addressUser[i].city_name,
          district_name: addressUser[i].district_name,
          date: moment(today).format(dateFormat.SEND_TO_SERVER),
        });
        if (response) {
          this.setState({
            arrCollectionFormsByAddress: response,
          });
        }
      }
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
        this.setState(
          {
            arrCollectionFormsByAddress: response,
          },
          () => {
            console.log(
              "arrCollectionFormsByAddress",
              this.state.arrCollectionFormsByAddress
            );
          }
        );
      }
    }
  };

  handleUpdate = async (schedule) => {
    let response = await registerCollectionForm({
      scheduleId: schedule.id,
      recipientId: this.props.userInfo.id,
      registerDate: new Date(),
      receivedDate: "",
      status: "S2",
    });
    if (response && response.errCode == 0) {
      toast.success("Đăng ký đơn thu gom thành công!");
    }
    await this.getAllCollectionByScheduleOfRecipient();
  };

  getScheduleS2 = async () => {
    let response = await getAllScheduleStatus("S2");
    if (response && response.errCode == 0) {
      this.setState({
        arrScheduleStatusS2: response.appointments,
      });
    }
  };

  getAllCollectionByScheduleOfRecipient = async () => {
    let { arrScheduleStatusS2 } = this.state;
    let response;
    let arr = [];
    let temp = [];
    if (arrScheduleStatusS2) {
      for (let i = 0; i < arrScheduleStatusS2.length; i++) {
        arr.push(arrScheduleStatusS2[i].id);
      }
      console.log("arr", arr);

      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          response = await getAllCollectionFormBySchedule({
            scheduleId: arr[i],
            recipientId: this.state.recipientId,
            status: "No",
          });
          if (
            response &&
            response.errCode === 0 &&
            response.appointments != null
          ) {
            temp.push(response.appointments);
          }
        }
      }
      if (temp) {
        this.setState(
          {
            arrCollect: temp,
          },
          () => {
            console.log("arrCollect", this.state.arrCollect);
          }
        );
      }
    }
  };

  render() {
    let { arrCities, arrCollectionFormsByAddress, arrCollect } = this.state;
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
            <div className="wrapper-search d-flex">
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
              <div className="wrapper-title d-flex">
                <div className="title">
                  ĐƠN THU GOM GẦN BẠN , ĐẾN THU GOM NGAY !!!
                </div>
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">
                    {arrCollectionFormsByAddress.length} đơn
                  </div>
                </span>
              </div>
              {arrCollectionFormsByAddress &&
                arrCollectionFormsByAddress.map((item, index) => {
                  let imageBase64 = "";
                  if (item.giverData.image) {
                    imageBase64 = new Buffer(
                      item.giverData.image,
                      "base64"
                    ).toString("binary");
                  }
                  return arrCollectionFormsByAddress > "0" ? (
                    <>
                      <div className="row shadow" aria-hidden="true">
                        <div className="col-4 mt-2">
                          <div>
                            <iframe
                              width="280"
                              height="230"
                              frameborder="0"
                              scrolling="no"
                              marginheight="0"
                              marginwidth="0"
                              id="gmap_canvas"
                              src={`https://maps.google.com/maps?width=706&height=320&hl=en&q=${item.addressData.address_name}''${item.addressData.address_name}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                            ></iframe>
                            {/* <a href="https://maps-generator.com/">Maps Generator</a> */}
                          </div>
                        </div>
                        <div className="col-8 pl-1 mt-4">
                          <p className="info-giver">
                            {item.giverData.firstName} {item.giverData.lastName}{" "}
                            - <HiIcons.HiOutlineMail /> Email:{" "}
                            {item.giverData.email}
                          </p>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <RiIcons.RiProductHuntLine className=" icon" />{" "}
                              Sản phẩm thu gom:{" "}
                            </span>
                            <p>{item.productData.product_name}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsTelephoneInbound className="icon" />{" "}
                              Điện thoại:{" "}
                            </span>
                            <p> {item.giverData.phone}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <FiIcons.FiMapPin className="icon" /> Thu gom:{" "}
                            </span>
                            <p>
                              {item.addressData.address_name} -{" "}
                              {item.addressData.ward_name} -{" "}
                              {item.addressData.district_name} -{" "}
                              {item.addressData.city_name}
                            </p>
                            {/* <div>
                              <DirectionsIcon /> Chỉ đường
                            </div> */}
                            {/* <button
                              className="btn btn-map "
                              onClick={() => this.handleMap()}
                            >
                              <DirectionsIcon className="icon" />
                              Chỉ đường
                            </button> */}
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsCalendarDate className="icon mr-1" />
                              Ngày:{" "}
                            </span>
                            <p>{item.date}</p>
                            <span className="info-collection ml-1 mr-1">
                              {" "}
                              - Thời gian:{" "}
                            </span>
                            <p>{item.timeTypeData.valueVi}</p>
                          </div>
                        </div>
                        {item.statusType === "S2" ? (
                          arrCollect.map(
                            (arrCollect) => arrCollect.scheduleId == item.id
                          ) ? (
                            <div disabled className="registed">
                              <CheckCircleOutlineIcon className="icon" />
                              Đã đăng ký
                            </div>
                          ) : (
                            <button
                              className="btn-register-receive"
                              onClick={() => this.handleUpdate(item)}
                            >
                              <IoIcons.IoMdArrowRoundForward /> Đăng ký1
                            </button>
                          )
                        ) : item.statusType === "S1" ? (
                          <button
                            className="btn-register-receive"
                            onClick={() => this.handleUpdate(item)}
                          >
                            <IoIcons.IoMdArrowRoundForward /> Đăng ký
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
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
