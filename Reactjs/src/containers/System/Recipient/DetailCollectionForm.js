import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "./CollectionFormStatus.scss";
import avata from "../../../assets/images/avata.jpg";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LabelIcon from "@mui/icons-material/Label";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import NearMeIcon from "@mui/icons-material/NearMe";
import ScrollUp from "../../../components/ScrollUp";
import Footer from "../../Footer/Footer";
import {
  saveUpdateStatic,
  saveUpdateRecivedDate,
} from "../../../services/appointmentService";
import {
  getAllCollectionForm,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import { getAllAddressOfUser } from "../../../services/addressService";
class DetailCollectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: {},
      statusArr: [],
      status: "",
      statusType: "",
      giverData: {},
      recipientData: {},
      productData: {},
      statusTypeData: {},
      timeTypeData: {},
      date: "",
      phone: "",
      recipientId: "",
      img: "",
      isShowMap: false,
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
        console.log("check good state", this.state);
      }
    );
  };

  async componentDidMount() {
    await this.getCollectionFormDeatailReact();
    await this.props.getStatusStart();
    await this.getAllAddressOfUserFromReact();
  }

  getCollectionFormDeatailReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let scheduleId = this.props.match.params.id;
      let response = await getAllCollectionFormBySchedule({
        scheduleId: scheduleId,
        recipientId: this.state.recipientId,
        status: "Yes",
      });
      if (response && response.errCode === 0) {
        this.setState({
          arrCollectionForms: response.appointments,
          scheduleData: response.appointments.scheduleData.id,
          giverData: response.appointments.scheduleData.giverData,
          recipientData: response.appointments.recipientData,
          productData: response.appointments.scheduleData.productData,
          addressData: response.appointments.scheduleData.addressData,
          statusData: response.appointments.scheduleData.statusData,
          timeTypeData: response.appointments.scheduleData.timeTypeData,
          phone: response.appointments.scheduleData.phone,
          date: response.appointments.scheduleData.date,
          // status: response.appointments.statusData.keyMap,
          amount: response.appointments.scheduleData.amount,
          avataGiver: response.appointments.scheduleData.giverData?.image?.data,
          avataRecipient: response.appointments.recipientData?.image?.data,
        });
      }
    }
  };

  getAllAddressOfUserFromReact = async () => {
    let response = await getAllAddressOfUser(this.state.recipientData.id);
    if (response && response.errCode === 0) {
      this.setState({
        addressRecipient: response.addresses,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatuses = this.props.statusRedux;
      // console.log(arrStatuses)
      this.setState({
        statusArr: arrStatuses,
        status:
          arrStatuses && arrStatuses.length > 0 ? arrStatuses[3].keyMap : "",
      });
    }
  }

  handleMap = () => {
    this.setState({
      isShowMap: !this.state.isShowMap,
    });
  };

  handleUpdate = async (id) => {
    console.log("id", id);
    let recipientId = this.props.userInfo.id;
    let response = await saveUpdateStatic({
      id: id,
      status: this.state.status,
    });

    if (response && response.errCode === 0) {
      let res = await saveUpdateRecivedDate({
        scheduleId: id,
        status: "Yes",
        receivedDate: new Date(),
      });

      toast.success("Cập nhật trạng thái thành công!");
      await this.getCollectionFormDeatailReact();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 0);
    } else {
      toast.error("Cập nhật không thành công!");
    }
  };

  render() {
    let {
      scheduleData,
      giverData,
      recipientData,
      productData,
      addressData,
      addressRecipient,
      timeTypeData,
      statusData,
      date,
      status,
      amount,
      avataGiver,
      avataRecipient,
      isShowMap,
    } = this.state;

    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    let imageBase64Giver = "";
    if (avataGiver) {
      imageBase64Giver = new Buffer(avataGiver, "base64").toString("binary");
    }
    let imageBase64Recipient = "";
    if (avataRecipient) {
      imageBase64Recipient = new Buffer(avataRecipient, "base64").toString(
        "binary"
      );
    }

    return (
      <>
        <ScrollUp />

        <div className="collection-form">
          <div className="title-collection-form">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="container-collection-form-status shadow-lg">
            <div className="d-flex wrapper-link">
              <NavLink
                to="/recipient/check-calendar"
                className="d-flex"
                activeStyle={{
                  background: "white",
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <BsIcons.BsCalendar2Week />
                </div>
                <span className="mt-1">Xem lịch</span>
              </NavLink>
              <NavLink
                to="/recipient/collection-form-status-s2"
                className="d-flex"
                activeStyle={{
                  background: "white",
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <BsIcons.BsCollection />
                </div>
                <span className="mt-1">Chờ xác nhận</span>
              </NavLink>
              <NavLink
                to="/recipient/collection-form-status-s3"
                className="d-flex"
                activeStyle={{
                  background: "white",
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <BsIcons.BsCollection />
                </div>
                <span className="mt-1">Chờ thu gom</span>
              </NavLink>
              <NavLink
                to="/recipient/collection-form-status-s5"
                className="d-flex"
                activeStyle={{
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <BsIcons.BsCalendar2X />
                </div>
                <span className="mt-1">Đơn bị hủy</span>
              </NavLink>
              <NavLink
                to="/recipient/collection-history"
                className="d-flex"
                activeStyle={{
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <BsIcons.BsClipboardCheck />
                </div>
                <span className="mt-1 title-history">Đã thu gom</span>
                <div className="icon mr-0">
                  <MdIcons.MdOutlineNavigateNext />
                </div>
              </NavLink>
            </div>
            <div className="title">CHI TIẾT ĐƠN THU GOM</div>
            <div className="row  ">
              {addressRecipient &&
                addressRecipient.map((item, index) => {
                  return (
                    <div className="collection-form shadow">
                      <div className="d-flex ">
                        <div className="col-6">
                          <div className="row info-giver-recipient">
                            <img
                              src={imageBase64Giver}
                              className="col-5 img-pro"
                            />
                            <div className="col-7">
                              <p className="row">
                                <FaIcons.FaUserAlt className="icon " />
                                Người cho: {giverData?.firstName}{" "}
                                {giverData?.lastName}
                              </p>
                              <p className="row">
                                <HiIcons.HiOutlineMail className="icon" />
                                {giverData?.email}{" "}
                              </p>
                              <p className="row">
                                <BsIcons.BsTelephoneInbound className="icon " />
                                {giverData?.phone}{" "}
                              </p>
                            </div>
                            <p>
                              <LocationOnIcon className="icon mb-2" />
                              {addressData?.address_name} -{" "}
                              {addressData?.ward_name} -{" "}
                              {addressData?.district_name} -{" "}
                              {addressData?.city_name}
                            </p>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row info-giver-recipient">
                            <img
                              src={imageBase64Recipient}
                              className=" col-5 img-pro"
                            />
                            <div className="col-7">
                              <p className="row">
                                <FaIcons.FaUserAlt className="icon " />
                                Người nhận: {recipientData?.firstName}{" "}
                                {recipientData?.lastName}
                              </p>
                              <p className="row">
                                <HiIcons.HiOutlineMail className="icon" />
                                {recipientData?.email}{" "}
                              </p>
                              <p className="row">
                                <BsIcons.BsTelephoneInbound className="icon " />
                                {recipientData?.phone}{" "}
                              </p>
                            </div>
                            <p>
                              {" "}
                              <LocationOnIcon className="icon sm mb-2" />
                              {item?.address_name} - {item?.ward_name} -{" "}
                              {item?.district_name} - {item?.city_name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="info-collection">
                        <div className="d-flex">
                          <span className="info mr-1">
                            <RiIcons.RiProductHuntLine className="icon mt-1" />{" "}
                            Sản phẩm:{" "}
                          </span>
                          <p>{productData?.product_name} </p>
                          <span className="info ml-2 mr-1"> - Mô tả: </span>
                          <p>{productData?.description}</p>
                        </div>
                        <div className="d-flex">
                          <span className="info mr-1">
                            <ShoppingCartIcon className="icon sm" /> Số lượng:
                          </span>
                          <p>{amount}</p>
                        </div>
                        <div className="d-flex">
                          <div className="d-flex">
                            <span className="info mr-1">
                              <LocationOnIcon className="icon " /> Địa chỉ thu
                              gom:{" "}
                            </span>

                            <p>
                              {addressData?.address_name} -{" "}
                              {addressData?.ward_name} -{" "}
                              {addressData?.district_name} -{" "}
                              {addressData?.city_name}
                            </p>
                          </div>

                          <button
                            className="btn btn-map "
                            onClick={() => this.handleMap()}
                          >
                            <NearMeIcon className="icon" />
                            Chỉ đường
                          </button>
                        </div>
                        {isShowMap === true ? (
                          <>
                            <div className="mb-3">
                              <iframe
                                width="890"
                                height="300"
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                                id="gmap_canvas"
                                src={`https://maps.google.com/maps?width=706&height=320&hl=en&q=${addressData?.address_name}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                              ></iframe>
                              {/* <a href="https://maps-generator.com/">Maps Generator</a> */}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="d-flex">
                          <span className="info mr-1">
                            <BsIcons.BsCalendarDate className="icon" /> Thu gom
                            từ ngày:{" "}
                          </span>
                          <p>{date}</p>
                          <span className="info ml-2 mr-1"> - Thời gian: </span>
                          <p>{timeTypeData?.valueVi}</p>
                        </div>
                        <div className="d-flex">
                          {statusData?.valueVi === "Chờ xác nhận" ||
                          statusData?.valueVi === "Chờ thu gom" ? (
                            <button className="btn status-s2">
                              <PriorityHighIcon className="icon mr-1 mb-1" />
                              {statusData?.valueVi}
                            </button>
                          ) : (
                            <>
                              {statusData?.valueVi === "Đơn bị hủy" ? (
                                <button className="btn status-s5">
                                  <BsIcons.BsX className="icon mb-1" />{" "}
                                  {statusData?.valueVi}
                                </button>
                              ) : (
                                <>
                                  {statusData?.valueVi === "Đã thu gom" ? (
                                    <button className="btn status-s4">
                                      <CheckCircleOutlineIcon className="icon mr-1 " />
                                      {statusData?.valueVi}
                                    </button>
                                  ) : (
                                    <button className="btn status-s1">
                                      <PriorityHighIcon className="icon mr-1 mb-1" />
                                      {statusData?.valueVi}
                                    </button>
                                  )}
                                </>
                              )}
                            </>
                          )}

                          <div className="d-flex update-status">
                            {statusData?.valueVi === "Chờ thu gom" ? (
                              <>
                                <select
                                  id="status"
                                  class="form-control col-8"
                                  onChange={(e) => {
                                    this.handleOnChangeInput(e, "status");
                                  }}
                                  value={status}
                                >
                                  <option value="S4">Đã thu gom</option>
                                  <option value="S5">Hủy đơn</option>
                                </select>
                                <button
                                  className="btn btn-update-status col-6"
                                  onClick={() =>
                                    this.handleUpdate(scheduleData)
                                  }
                                >
                                  Cập nhật
                                </button>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Footer />
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
  connect(mapStateToProps, mapDispatchToProps)(DetailCollectionForm)
);
