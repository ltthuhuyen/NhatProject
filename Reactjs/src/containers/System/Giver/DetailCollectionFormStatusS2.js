import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import moment from "moment";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./DetailCollectionFormManage.scss";
import { toast } from "react-toastify";
import avata from "../../../assets/images/avata.jpg";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import {
  getAllCollectionForm,
  getAllSchedule,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import { getAllAddressOfUser } from "../../../services/addressService";
import {
  saveUpdateStatic,
  saveUpdateRegistrationStatus,
} from "../../../services/appointmentService";
class DetailCollectionFormStatusS2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: {},
      arrCollectionForms: {},
      arrCollect: [],
      arrRegistration: [],
      addressRecipient: [],
      statusArr: [],
      status: "",
      statusType: "",
      scheduleData: {},
      giverData: {},
      recipientData: {},
      productData: {},
      statusTypeData: {},
      timeTypeData: {},
      date: "",
      amount: "",
      phone: "",
      recipientId: "",
      img: "",
      avataGiver: {},
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
    // await this.getAllCollectionFormReact();
    // await this.getAllCollectionByScheduleOfGiver();
    await this.props.getStatusStart();
    await this.getAllAddressOfUserFromReact();
  }

  getAllCollectionFormReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let scheduleId = this.props.match.params.id;
      let response = await getAllCollectionFormBySchedule({
        scheduleId: scheduleId,
        status: "No",
      });

      if (response && response.errCode === 0) {
        this.setState({
          arrCollectionForms: response?.appointments,
          scheduleData: response.appointments?.scheduleData,
          giverData: response?.appointments?.scheduleData?.giverData,
          recipientData: response?.appointments?.recipientData,
          productData: response?.appointments?.scheduleData?.productData,
          addressData: response?.appointments?.scheduleData?.addressData,
          statusData: response?.appointments?.scheduleData?.statusData,
          timeTypeData: response?.appointments?.scheduleData?.timeTypeData,
          phone: response?.appointments?.scheduleData?.phone,
          date: response?.appointments?.scheduleData?.date,
          amount: response?.appointments?.scheduleData?.amount,
          avataGiver: response?.appointments?.scheduleData?.giverData?.image,
          avataRecipient: response?.appointments?.recipientData?.image,
        });
      }
    }
  };

  // getAllCollectionByScheduleOfGiver = async () => {
  //   let scheduleData = this.state.scheduleData;
  //   let response;
  //   if (scheduleData) {
  //     response = await getAllCollectionFormBySchedule({
  //       scheduleId: scheduleData.id,
  //     });
  //     if (response) {
  //       this.setState(
  //         {
  //           arrRegistration: response.appointments,
  //         },
  //         () => {
  //           console.log("arrRegistration", this.state.arrRegistration);
  //         }
  //       );
  //     }
  //   }
  // };

  getAllAddressOfUserFromReact = async () => {
    let { arrRegistration } = this.state;

    let response;
    for (let i = 0; i < arrRegistration.length; i++) {
      response = await getAllAddressOfUser(arrRegistration[i].recipientId);
      console.log("response", response);
    }

    if (response) {
      this.setState(
        {
          addressRecipient: response.addresses,
        },
        () => {
          console.log("addressRecipient", this.state.addressRecipient);
        }
      );
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatuses = this.props.statusRedux;
      this.setState({
        statusArr: arrStatuses,
        // status: arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap: ''
      });
    }
    if (prevState.currentCollectId !== this.props.match.params.id) {
      this.setState({
        currentCollectId: this.props.match.params.id,
      });
      let responseSchedule = await getAllSchedule(this.state.currentCollectId);
      if (responseSchedule && responseSchedule.errCode == 0) {
        this.setState({
          schedule: responseSchedule.appointments,
        });
      }
      let responseCollect = await getAllCollectionFormBySchedule({
        scheduleId: this.state.currentCollectId,
      });
      console.log("responseCollect", responseCollect);
      if (responseCollect && responseCollect.errCode === 0) {
        this.setState({
          arrCollectionForms: responseCollect?.appointments,
          scheduleData: responseCollect.appointments?.scheduleData,
          giverData: responseCollect?.appointments?.scheduleData?.giverData,
          recipientData: responseCollect?.appointments?.recipientData,
          productData: responseCollect?.appointments?.scheduleData?.productData,
          addressData: responseCollect?.appointments?.scheduleData?.addressData,
          statusData: responseCollect?.appointments?.scheduleData?.statusData,
          timeTypeData:
            responseCollect?.appointments?.scheduleData?.timeTypeData,
          phone: responseCollect?.appointments?.scheduleData?.phone,
          date: responseCollect?.appointments?.scheduleData?.date,
          // status: responseCollect?.appointments?.statusTypeData.keyMap,
          avataGiver:
            responseCollect?.appointments?.scheduleData?.giverData?.image,
          avataRecipient: responseCollect?.appointments?.recipientData?.image,
        });
      }
    }
  }

  handleUpdate = async (collect) => {
    let response = await saveUpdateRegistrationStatus({
      id: collect.id,
    });
    if (response && response.errCode === 0) {
      await getAllSchedule(this.props.match.params.id);
      await this.getAllCollectionFormReact();
      toast.success("Xác nhận thành công!");
      window.location.reload();
    }
  };
  render() {
    let {
      schedule,
      arrCollectionForms,
      arrRegistration,
      giverData,
      recipientData,
      productData,
      addressData,
      addressRecipient,
      arrCollect,
      timeTypeData,
      statusData,
      date,
      status,
      amount,
      avataGiver,
      avataRecipient,
    } = this.state;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    console.log("avataGiver", avataGiver);

    let imageBase64Giver = "";
    if (avataGiver) {
      // imageBase64Giver = new Buffer(avataGiver, "base64").toString("binary");
    } else {
      imageBase64Giver = avata;
    }
    let imageBase64Recipient = "";
    // if (avataRecipient) {
    //   imageBase64Recipient = new Buffer(avataRecipient, "base64").toString(
    //     "binary"
    //   );
    // } else {
    //   imageBase64Recipient = avata;
    // }
    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="collection-form-detail">
          <div className="title-collection-form">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="container-collection-form-status-detail shadow-lg">
            <div className="d-flex wrapper-link">
              <NavLink
                to="/giver/collection-form"
                className="d-flex"
                activeStyle={{
                  background: "white",
                  color: "#019117",
                  paddingBottom: "6px",
                  borderBottom: "2px solid",
                }}
              >
                <div className="icon">
                  <AiIcons.AiOutlineUnorderedList />
                </div>
                <span className="mt-1">Đơn thu gom</span>
              </NavLink>
              <NavLink
                to="/giver/collection-form-status-s2"
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
                to="/giver/collection-form-status-s3"
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
                to="/giver/collection-form-status-s5"
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
                to="/giver/collection-history"
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
            <div className="row d-flex">
              <div className="collection-form-detail shadow col-6">
                <div className="title-collect">ĐƠN THU GOM</div>
                <hr></hr>
                <div className="d-flex ">
                  <div className="col-12">
                    <div className="row info-giver-recipient-detail">
                      <div className="col-5 img-pro"></div>
                      <div className="col-7">
                        <p className="row">
                          <FaIcons.FaUserAlt className="icon " />
                          Người cho: {schedule?.giverData?.firstName}{" "}
                          {schedule?.giverData?.lastName}
                        </p>
                        <p className="row">
                          <HiIcons.HiOutlineMail className="icon" />
                          {schedule?.giverData?.email}{" "}
                        </p>
                        <p className="row">
                          <BsIcons.BsTelephoneInbound className="icon " />
                          {schedule?.giverData?.phone}{" "}
                        </p>
                      </div>
                      <p>
                        <FiIcons.FiMapPin className="icon mb-2" />
                        {schedule?.addressData?.address_name} -{" "}
                        {schedule?.addressData?.ward_name} -{" "}
                        {schedule?.addressData?.district_name} -{" "}
                        {schedule?.addressData?.city_name}
                      </p>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="info-collection-detail">
                  <div className="col-12 d-flex">
                    <span className="info mr-1">
                      <RiIcons.RiProductHuntLine className="icon mb-1" /> Sản
                      phẩm:{" "}
                    </span>
                    <p>{schedule?.productData?.product_name} </p>
                  </div>
                  <div className="col-12 ">
                    <span className="info ml-2 mr-1"> Mô tả: </span>
                    <p>{schedule?.productData?.description}</p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="info mr-1">
                      <ShoppingCartIcon className="icon sm" /> Số lượng:
                    </span>
                    <p>{schedule?.amount}</p>
                  </div>
                  <div className="col-12 ">
                    <span className="info mr-1">
                      <FiIcons.FiMapPin className="icon " /> Địa chỉ thu gom:{" "}
                    </span>
                    <p>
                      {schedule?.addressData?.address_name} -{" "}
                      {schedule?.addressData?.ward_name} -{" "}
                      {schedule?.addressData?.district_name} -{" "}
                      {schedule?.addressData?.city_name}
                    </p>
                  </div>
                  <div className="col-12 d-flex">
                    <span className="info mr-1">
                      <BsIcons.BsCalendarDate className="icon" /> Thu gom từ
                      ngày:{" "}
                    </span>
                    <p>{schedule?.date}</p>
                    <span className="info ml-2 mr-1"> - Thời gian: </span>
                    <p>{schedule?.timeTypeData?.valueVi}</p>
                  </div>
                  <div className="col-12 d-flex">
                    {schedule?.statusData?.valueVi === "Chờ xác nhận" ||
                    schedule?.statusData?.valueVi === "Chờ thu gom" ? (
                      <button className="btn status-s3">
                        <PriorityHighIcon className="icon mr-1" />
                        {schedule?.statusData?.valueVi}
                      </button>
                    ) : (
                      <>
                        {schedule?.statusData?.valueVi === "Đơn bị hủy" ? (
                          <button className="btn status-s5">
                            <BsIcons.BsX className="icon" />{" "}
                            {schedule?.statusData?.valueVi}
                          </button>
                        ) : (
                          <>
                            {schedule?.statusData?.valueVi === "Đã thu gom" ? (
                              <button className="btn status-s4">
                                <CheckCircleOutlineIcon className="icon mr-1" />
                                {schedule?.statusData?.valueVi}
                              </button>
                            ) : (
                              <button className="btn status-s1">
                                <PriorityHighIcon className="icon mr-1" />
                                {schedule?.statusData?.valueVi}
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="collection-form-detail shadow col-5">
                <div className="title-collect">DANH SÁCH ĐĂNG KÝ THU GOM</div>
                <hr></hr>
                {arrCollectionForms &&
                  arrCollectionForms.length > 0 &&
                  arrCollectionForms.map((item, index) => {
                    imageBase64Recipient = new Buffer(
                      item.recipientData.image,
                      "base64"
                    ).toString("binary");
                    return (
                      <>
                        <div className="d-flex ">
                          <div className="col-12">
                            <div className="d-flex info-giver-recipient-detail">
                              <img
                                src={imageBase64Recipient}
                                className="col-4 img-pro"
                              />
                              <div className="col-8">
                                <p className="row">
                                  <FaIcons.FaUserAlt className="icon " />
                                  Người nhận: {
                                    item.recipientData?.firstName
                                  }{" "}
                                  {item.recipientData?.lastName}
                                </p>
                                <p className="row">
                                  <HiIcons.HiOutlineMail className="icon" />
                                  {item.recipientData?.email}{" "}
                                </p>
                                <p className="row">
                                  <BsIcons.BsTelephoneInbound className="icon " />
                                  {item.recipientData?.phone}{" "}
                                </p>
                              </div>
                              <p>
                                {addressRecipient &&
                                  addressRecipient.map((jtem, index) => {
                                    if (jtem.userId === item.recipientId) {
                                      return (
                                        <>
                                          <FiIcons.FiMapPin className="icon mb-2" />
                                          {item?.address_name} -{" "}
                                          {item?.ward_name} -{" "}
                                          {item?.district_name} -{" "}
                                          {item?.city_name}
                                        </>
                                      );
                                    }
                                  })}
                              </p>
                              {item.statusType === "Yes" &&
                              item.scheduleData.statusType === "S3" ? (
                                <>
                                  {" "}
                                  <button className="btn status-recived">
                                    <CheckCircleOutlineIcon className="icon mb-1 mr-1" />
                                    Cho thu gom
                                  </button>
                                  <div className="update-status">
                                    <button
                                      className="btn btn-update-status"
                                      onClick={(e) => this.handleUpdate(item)}
                                      disabled
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </>
                              ) : item.statusType === "No" &&
                                item.scheduleData.statusType === "S2" ? (
                                <>
                                  <div className="text-registerDate">
                                    {moment(item.registerDate).format(
                                      "DD/MM/YYYY HH:mm"
                                    )}
                                  </div>
                                  <div className="update-status">
                                    <button
                                      className="btn btn-update-status"
                                      onClick={(e) => this.handleUpdate(item)}
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="update-status">
                                    <button
                                      className="btn btn-update-status"
                                      onClick={(e) => this.handleUpdate(item)}
                                      disabled
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                      </>
                    );
                  })}

                {/* <hr></hr>
                <div className="info-collection">
                  <div className="col-6 d-flex">
                    <span className="info mr-1">
                      <RiIcons.RiProductHuntLine /> Sản phẩm:{" "}
                    </span>
                    <p>{productData?.product_name} </p>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="info ml-2 mr-1"> Mô tả: </span>
                    <p>{productData?.description}</p>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="info mr-1">
                      <ShoppingCartIcon className="icon sm" /> Số lượng:
                    </span>
                    <p>{arrSchedule.amount}</p>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="info mr-1">
                      <FiIcons.FiMapPin className="icon " /> Địa chỉ thu gom:{" "}
                    </span>
                    <p>
                      {addressData?.address_name} - {addressData?.ward_name} -{" "}
                      {addressData?.district_name} - {addressData?.city_name}
                    </p>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="info mr-1">
                      <BsIcons.BsCalendarDate className="icon" /> Thu gom từ
                      ngày:{" "}
                    </span>
                    <p>{date}</p>
                    <span className="info ml-2 mr-1"> - Thời gian: </span>
                    <p>{timeTypeData?.valueVi}</p>
                  </div>
                </div> */}
              </div>
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
  connect(mapStateToProps, mapDispatchToProps)(DetailCollectionFormStatusS2)
);
