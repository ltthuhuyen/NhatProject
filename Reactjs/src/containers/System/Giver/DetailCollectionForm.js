import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
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
// import "./CollectionFormManage.scss";
import "./DetailCollectionFormManage.scss";
import avata from "../../../assets/images/avata.jpg";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import moment from "moment";
import { toast } from "react-toastify";
import {
  getAllSchedule,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import { getAllAddressOfUser } from "../../../services/addressService";
import { saveUpdateRegistrationStatus } from "../../../services/appointmentService";
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
      amount: "",
      phone: "",
      recipientId: "",
      img: "",
      schedule: {},
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
    await this.getAllCollectionFormReact();
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

      let response = await getAllSchedule(scheduleId);
      console.log("response", response);
      if (response && response.appointments) {
        this.setState({
          schedule: response.appointments,
        });
      }

      if (this.state.schedule) {
        let responseCollect = await getAllCollectionFormBySchedule({
          scheduleId: this.state.schedule.id,
        });
        if (responseCollect) {
          this.setState(
            {
              arrCollect: responseCollect.appointments,
            },
            () => {
              console.log("arrCollect", this.state.arrCollect);
            }
          );
          let response = await getAllAddressOfUser(
            this.state.detail?.recipientData?.id
          );

          if (response && response.errCode === 0) {
            this.setState({
              addressRecipient: response.addresses,
            });
          }
        }
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
        // status: arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap: ''
      });
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
    }
  };
  render() {
    let {
      schedule,
      arrCollect,
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
      receivedDate,
      avataGiver,
      avataRecipient,
    } = this.state;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }

    let imageBase64Giver = "";
    if (avataGiver) {
      imageBase64Giver = new Buffer(avataGiver, "base64").toString("binary");
    } else {
      imageBase64Giver = avata;
    }
    let imageBase64Recipient = "";
    if (avataRecipient) {
      imageBase64Recipient = new Buffer(avataRecipient, "base64").toString(
        "binary"
      );
    } else {
      imageBase64Recipient = avata;
    }
    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="collection-form-detail">
          <div className="title-collection-form">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="container-collection-form-status shadow-lg">
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
              {schedule.statusType == "S1" ||
              schedule.statusType == "S3" ||
              schedule.statusType == "S4" ||
              schedule.statusType == "S5" ? (
                <>
                  <div className="collection-form shadow">
                    <div className="d-flex ">
                      <div className="col-6">
                        <div className="row info-giver-recipient">
                          <div className="col-5 img-pro"></div>
                          <div className="col-7">
                            <p className="row">
                              <FaIcons.FaUserAlt className="icon " />
                              Người cho: {schedule.giverData?.firstName}{" "}
                              {schedule.giverData?.lastName}
                            </p>
                            <p className="row">
                              <HiIcons.HiOutlineMail className="icon" />
                              {schedule.giverData?.email}{" "}
                            </p>
                            <p className="row">
                              <BsIcons.BsTelephoneInbound className="icon " />
                              {schedule.giverData?.phone}{" "}
                            </p>
                          </div>
                          <p>
                            <FiIcons.FiMapPin className="icon mb-2" />
                            {schedule.addressData?.address_name} -{" "}
                            {schedule.addressData?.ward_name} -{" "}
                            {schedule.addressData?.district_name} -{" "}
                            {schedule.addressData?.city_name}
                          </p>
                        </div>
                      </div>

                      <div className="col-6">
                        {arrCollect &&
                          arrCollect.length > 0 &&
                          arrCollect.map((arrCollect, index) => {
                            if (
                              arrCollect.scheduleId == schedule.id &&
                              arrCollect.statusType == "Yes"
                            ) {
                              return recipientData ? (
                                <div className="row info-giver-recipient">
                                  <img
                                    src={imageBase64Recipient}
                                    className=" col-5 img-pro"
                                  />
                                  <div className="col-7">
                                    <p className="row">
                                      <FaIcons.FaUserAlt className="icon " />
                                      Người nhận:{" "}
                                      {arrCollect.recipientData.firstName}{" "}
                                      {arrCollect.recipientData.lastName}
                                    </p>
                                    <p className="row">
                                      <HiIcons.HiOutlineMail className="icon" />
                                      {arrCollect.recipientData.email}{" "}
                                    </p>
                                    <p className="row">
                                      <BsIcons.BsTelephoneInbound className="icon " />
                                      {arrCollect.recipientData.phone}{" "}
                                    </p>
                                  </div>
                                  <p>
                                    {" "}
                                    <FiIcons.FiMapPin className="icon mb-2" />
                                    {
                                      arrCollect.recipientData.userData
                                        ?.address_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.ward_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.district_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.city_name
                                    }
                                  </p>
                                </div>
                              ) : (
                                ""
                              );
                            }
                          })}
                      </div>
                    </div>
                    <hr></hr>
                    <div className="info-collection">
                      <div className="d-flex">
                        <span className="info mr-1">
                          <RiIcons.RiProductHuntLine /> Sản phẩm:{" "}
                        </span>
                        <p>{schedule.productData?.product_name} </p>
                        <span className="info ml-2 mr-1"> - Mô tả: </span>
                        <p>{schedule.productData?.description}</p>
                      </div>
                      <div className="d-flex">
                        <span className="info mr-1">
                          <ShoppingCartIcon className="icon sm" /> Số lượng:
                        </span>
                        <p>{schedule.amount}</p>
                      </div>
                      <div className="d-flex">
                        <span className="info mr-1">
                          <FiIcons.FiMapPin className="icon " /> Địa chỉ thu
                          gom:{" "}
                        </span>
                        <p>
                          {schedule.addressData?.address_name} -{" "}
                          {schedule.addressData?.ward_name} -{" "}
                          {schedule.addressData?.district_name} -{" "}
                          {schedule.addressData?.city_name}
                        </p>
                      </div>
                      <div className="d-flex">
                        <span className="info mr-1">
                          <BsIcons.BsCalendarDate className="icon" /> Thu gom từ
                          ngày:{" "}
                        </span>
                        <p>{schedule.date}</p>
                        <span className="info ml-2 mr-1"> - Thời gian: </span>
                        <p>{schedule.timeTypeData?.valueVi}</p>
                      </div>
                      <div className="d-flex">
                        {schedule.statusData?.valueVi === "Chờ xác nhận" ||
                        schedule.statusData?.valueVi === "Chờ thu gom" ? (
                          <button className="btn status-s3">
                            <PriorityHighIcon className="icon mr-1" />
                            {schedule.statusData?.valueVi}
                          </button>
                        ) : (
                          <>
                            {schedule.statusData?.valueVi === "Đơn bị hủy" ? (
                              <button className="btn status-s5">
                                <BsIcons.BsX className="icon" />{" "}
                                {schedule.statusData?.valueVi}
                              </button>
                            ) : (
                              <>
                                {schedule.statusData?.valueVi ===
                                "Đã thu gom" ? (
                                  <>
                                    <button className="btn status-s4">
                                      <CheckCircleOutlineIcon className="icon mr-1" />
                                      {schedule.statusData?.valueVi}
                                    </button>
                                    <span className="info-receivedDate">
                                      {" "}
                                      {moment(receivedDate).format(
                                        "DD/MM/YYYY - hh:mm:ss"
                                      )}
                                    </span>
                                  </>
                                ) : (
                                  <button className="btn status-s1">
                                    <PriorityHighIcon className="icon mr-1" />
                                    {schedule.statusData?.valueVi}
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {/* <div className="d-flex update-status">
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
                              this.handleUpdate(this.props.match.params.id)
                            }
                          >
                            Cập nhật
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div> */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                          <RiIcons.RiProductHuntLine className="icon mb-1" />{" "}
                          Sản phẩm:{" "}
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
                          <FiIcons.FiMapPin className="icon " /> Địa chỉ thu
                          gom:{" "}
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
                                {schedule?.statusData?.valueVi ===
                                "Đã thu gom" ? (
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
                    <div className="title-collect">
                      DANH SÁCH ĐĂNG KÝ THU GOM
                    </div>
                    <hr></hr>
                    {arrCollect &&
                      arrCollect.length > 0 &&
                      arrCollect.map((arrCollect, index) => {
                        imageBase64Recipient = new Buffer(
                          arrCollect.recipientData.image,
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
                                      Người nhận:{" "}
                                      {arrCollect.recipientData?.firstName}{" "}
                                      {arrCollect.recipientData?.lastName}
                                    </p>
                                    <p className="row">
                                      <HiIcons.HiOutlineMail className="icon" />
                                      {arrCollect.recipientData?.email}{" "}
                                    </p>
                                    <p className="row">
                                      <BsIcons.BsTelephoneInbound className="icon " />
                                      {arrCollect.recipientData?.phone}{" "}
                                    </p>
                                  </div>
                                  <p>
                                    {" "}
                                    <FiIcons.FiMapPin className="icon mb-2" />
                                    {
                                      arrCollect.recipientData.userData
                                        ?.address_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.ward_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.district_name
                                    }
                                    -{" "}
                                    {
                                      arrCollect.recipientData.userData
                                        ?.city_name
                                    }
                                  </p>
                                  {arrCollect.statusType === "Yes" &&
                                  arrCollect.scheduleData.statusType ===
                                    "S3" ? (
                                    <>
                                      {" "}
                                      <button className="btn status-recived">
                                        <CheckCircleOutlineIcon className="icon mb-1 mr-1" />
                                        Cho thu gom
                                      </button>
                                      <div className="update-status">
                                        <button
                                          className="btn btn-update-status"
                                          onClick={(e) =>
                                            this.handleUpdate(arrCollect)
                                          }
                                          disabled
                                        >
                                          Xác nhận
                                        </button>
                                      </div>
                                    </>
                                  ) : arrCollect.statusType === "No" &&
                                    arrCollect.scheduleData.statusType ===
                                      "S2" ? (
                                    <>
                                      <div className="text-registerDate">
                                        {moment(arrCollect.registerDate).format(
                                          "DD/MM/YYYY HH:mm"
                                        )}
                                      </div>
                                      <div className="update-status">
                                        <button
                                          className="btn btn-update-status"
                                          onClick={(e) =>
                                            this.handleUpdate(arrCollect)
                                          }
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
                                          onClick={(e) =>
                                            this.handleUpdate(arrCollect)
                                          }
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
                </>
              )}
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
