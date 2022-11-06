import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "./CollectionFormStatus.scss";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScrollUp from "../../../components/ScrollUp";
import Footer from "../../Footer/Footer";
import { saveUpdateStatic } from "../../../services/appointmentService";
import { getAllCollectionForm } from "../../../services/collectionformService";
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
      let response = await getAllCollectionForm(scheduleId);
      if (response && response.errCode === 0) {
        this.setState({
          arrCollectionForms: response.appointments,
          giverData: response.appointments.giverData,
          recipientData: response.appointments.recipientData,
          productData: response.appointments.productData,
          addressData: response.appointments.addressData,
          statusTypeData: response.appointments.statusTypeData,
          timeTypeData: response.appointments.timeTypeData,
          phone: response.appointments.phone,
          date: response.appointments.date,
          status: response.appointments.statusTypeData.keyMap,
          avataGiver: response.appointments.giverData.image.data,
          avataRecipient: response.appointments.recipientData.image.data,
        });
      }
    }
  };

  getAllAddressOfUserFromReact = async () => {
    let response = await getAllAddressOfUser(this.state.recipientData.id);
    if (response && response.errCode === 0) {
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

  handleUpdate = async (id) => {
    let recipientId = this.props.userInfo.id;
    let response = await saveUpdateStatic({
      id: id,
      status: this.state.status,
      recipientId: recipientId,
    });
    if (response && response.errCode === 0) {
      toast.success("Cập nhật trạng thái thành công!");
      await this.getCollectionFormDeatailReact();
    } else {
      toast.error("Cập nhật không thành công!");
    }
  };

  render() {
    let {
      giverData,
      recipientData,
      productData,
      addressData,
      addressRecipient,
      timeTypeData,
      statusTypeData,
      date,
      status,
      avataGiver,
      avataRecipient,
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
                                Người cho: {giverData.firstName}{" "}
                                {giverData.lastName}
                              </p>
                              <p className="row">
                                <HiIcons.HiOutlineMail className="icon" />
                                {giverData.email}{" "}
                              </p>
                              <p className="row">
                                <BsIcons.BsTelephoneInbound className="icon " />
                                {giverData.phone}{" "}
                              </p>
                            </div>
                            <p>
                              <FiIcons.FiMapPin className="icon mb-2" />
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
                                Người nhận: {recipientData.firstName}{" "}
                                {recipientData.lastName}
                              </p>
                              <p className="row">
                                <HiIcons.HiOutlineMail className="icon" />
                                {recipientData.email}{" "}
                              </p>
                              <p className="row">
                                <BsIcons.BsTelephoneInbound className="icon " />
                                {recipientData.phone}{" "}
                              </p>
                            </div>
                            <p>
                              {" "}
                              <FiIcons.FiMapPin className="icon mb-2" />
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
                            <RiIcons.RiProductHuntLine /> Sản phẩm:{" "}
                          </span>
                          <p>{productData.product_name} </p>
                          <span className="info ml-2 mr-1"> - Mô tả: </span>
                          <p>{productData.description}</p>
                        </div>
                        <div className="d-flex">
                          <span className="info mr-1">
                            <FiIcons.FiMapPin className="icon " /> Địa chỉ thu
                            gom:{" "}
                          </span>
                          <p>
                            {addressData?.address_name} -{" "}
                            {addressData?.ward_name} -{" "}
                            {addressData?.district_name} -{" "}
                            {addressData?.city_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <span className="info mr-1">
                            <BsIcons.BsCalendarDate className="icon" /> Ngày:{" "}
                          </span>
                          <p>{date}</p>
                          <span className="info ml-2 mr-1"> - Thời gian: </span>
                          <p>{timeTypeData.valueVi}</p>
                        </div>
                        <div className="d-flex">
                          {statusTypeData.valueVi === "Chờ xác nhận" ||
                          statusTypeData.valueVi === "Chờ thu gom" ? (
                            <p className="status-s2">
                              <RiIcons.RiErrorWarningLine className="icon" />{" "}
                              {statusTypeData.valueVi}
                            </p>
                          ) : (
                            <p className="status-s4">
                              <CheckCircleOutlineIcon className="icon mr-1" />
                              {statusTypeData.valueVi}
                            </p>
                          )}

                          <div className="d-flex update-status">
                            {statusTypeData.valueVi === "Chờ thu gom" ? (
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
                                    this.handleUpdate(
                                      this.props.match.params.id
                                    )
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
