import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import TodayIcon from "@mui/icons-material/Today";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import * as actions from "../../../store/actions";
import avata from "../../../assets/images/avata.jpg";
import "./CollectionFormStatus.scss";
import {
  getAllSchedule,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
class CollectionFormManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: [],
      arrSchedule: [],
      arrCollect: [],
      collect: {},
      statusArr: [],
      status: "",
      statusType: "",
      recipientId: "",
      currentPage: 1,
      todosPerPage: 10,
    };
  }
  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  async componentDidMount() {
    await this.getSchedule();
    await this.getAllCollectionByScheduleOfRecipient();
    await this.props.getStatusStart();
  }

  // getAllCollectionOfRecipientFormReact = async () => {
  //   let recipient = this.props.userInfo;
  //   let response = await getAllSchedule(recipient.id);
  //   console.log("response", response);
  //   if (response && response.errCode == 0) {
  //     this.setState({
  //       arrCollectionFormsOfRecipient: response.appointments,
  //     });
  //   }
  // };

  getSchedule = async () => {
    let response = await getAllSchedule("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrSchedule: response.appointments,
      });
    }
  };

  getAllCollectionByScheduleOfRecipient = async () => {
    let { arrSchedule } = this.state;
    let response = {};
    let arr = [];
    let scheduleId;
    let temp = [];
    if (arrSchedule) {
      for (let i = 0; i < arrSchedule.length; i++) {
        arr.push(arrSchedule[i].id);
      }
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].statusType === "S3" ||
            arr[i].statusType === "S4" ||
            arr[i].statusType === "S5"
          )
            response = await getAllCollectionFormBySchedule({
              scheduleId: arr[i],
              recipientId: this.state.recipientId,
              status: "Yes",
            });

          if (response) {
            this.setState({
              collect: response.appointments,
            });
            if (this.state.collect != null) {
              temp.push(this.state.collect);
            }
          }
        }
      }
      if (temp) {
        this.setState({
          arrCollect: temp,
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatuses = this.props.statusRedux;
      this.setState({
        statusArr: arrStatuses,
        status:
          arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap : "",
      });
    }
  }

  handleLook = async (schedule) => {
    console.log("schedule", schedule);
    // this.props.history.push(`/recipient/collection-form-detail/${schedule.id}`);
  };

  render() {
    let { arrCollect } = this.state;
    // let statuses = this.state.statusArr;
    let language = this.props.language;

    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrCollect.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrCollect.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <ScrollUp />
        <div className="collection-form">
          <div className="title-collection-form">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="container-collection-form-status shadow-lg ">
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
                to="/recipient/collection-form"
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
            <div className="title">ĐƠN THU GOM</div>
            <div className="wrapper-title-sum-statistic d-flex">
              <span className="wrapper-sum d-flex">
                <div className="">Tổng cộng:</div>
                <div className="text-sum">{arrCollect.length} đơn</div>
              </span>
            </div>
            <div className="row ">
              {currentTodos && currentTodos.length > 0 ? (
                <>
                  {currentTodos.map((item, index) => {
                    let imageBase64 = "";
                    if (item.scheduleData.giverData.image.data) {
                      imageBase64 = new Buffer(
                        item.scheduleData.giverData.image.data,
                        "base64"
                      ).toString("binary");
                    }
                    return (
                      <div
                        className="col-5 collection-form shadow "
                        key={index}
                      >
                        {item.scheduleData.statusType == "S3" ||
                        item.scheduleData.statusType == "S4" ||
                        (item.scheduleData.statusType == "S5" &&
                          item.statusType === "Yes") ? (
                          <>
                            {" "}
                            <div className="row info-giver-recipient">
                              <img
                                src={imageBase64}
                                className=" col-5 img-pro"
                              />
                              <div className="col-7">
                                <p className="row">
                                  <FaIcons.FaUserAlt className="icon mt-1 mr-2" />
                                  {item.scheduleData.giverData.firstName}{" "}
                                  {item.scheduleData.giverData.lastName}
                                </p>
                                <p className="row">
                                  <HiIcons.HiOutlineMail className="icon mt-1 mr-2" />
                                  {item.scheduleData.giverData.email}
                                </p>
                                <p className="row">
                                  <BsIcons.BsTelephoneInbound className="icon mt-1 mr-2" />
                                  {item.scheduleData.giverData.phone}
                                </p>
                              </div>
                            </div>
                            <div className="info-collection">
                              <div className="d-flex">
                                <span className="info mr-1">
                                  <RiIcons.RiProductHuntLine /> Sản phẩm:{" "}
                                </span>
                                <p>
                                  {item.scheduleData.productData.product_name}
                                </p>
                              </div>
                              <div className="d-flex">
                                <span className="info mr-1 mb-1">
                                  <BiIcons.BiUser /> Người nhận thu gom:{" "}
                                </span>
                                <p>
                                  {item.recipientData.firstName}{" "}
                                  {item.recipientData.lastName}
                                </p>
                              </div>
                              <div className="d-flex">
                                {item.scheduleData.statusData.valueVi ===
                                  "Chờ xác nhận" ||
                                item.scheduleData.statusData.valueVi ===
                                  "Chờ thu gom" ? (
                                  <button className="btn status-s2">
                                    <PriorityHighIcon className="icon mr-1" />
                                    {item.scheduleData.statusData.valueVi}
                                  </button>
                                ) : (
                                  <>
                                    {item.scheduleData.statusData.valueVi ===
                                    "Đơn bị hủy" ? (
                                      <button className="btn status-s5">
                                        <BsIcons.BsX className="icon" />{" "}
                                        {item.scheduleData.statusData.valueVi}
                                      </button>
                                    ) : (
                                      <>
                                        {item.scheduleData.statusData
                                          .valueVi === "Đã thu gom" ? (
                                          <button className="btn status-s4">
                                            <CheckCircleOutlineIcon className="icon mr-1" />
                                            {
                                              item.scheduleData.statusData
                                                .valueVi
                                            }
                                          </button>
                                        ) : (
                                          <button className="btn status-s1">
                                            <PriorityHighIcon className="icon mr-1" />
                                            {
                                              item.scheduleData.statusData
                                                .valueVi
                                            }
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                <button
                                  className="btn btn-detail "
                                  onClick={() =>
                                    this.handleLook(item.scheduleId)
                                  }
                                >
                                  Chi tiết
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {arrCollect.map((item, index) => {
                    let imageBase64 = "";
                    if (item.scheduleData.giverData.image.data) {
                      imageBase64 = new Buffer(
                        item.scheduleData.giverData.image.data,
                        "base64"
                      ).toString("binary");
                    }
                    return (
                      <div
                        className="col-5 collection-form shadow "
                        key={index}
                      >
                        <div className="row info-giver-recipient">
                          <img src={imageBase64} className=" col-5 img-pro" />
                          <div className="col-7">
                            <p className="row">
                              <FaIcons.FaUserAlt className="icon mt-1 mr-2" />
                              {item.scheduleData.giverData.firstName}{" "}
                              {item.scheduleData.giverData.lastName}
                            </p>
                            <p className="row">
                              <HiIcons.HiOutlineMail className="icon mt-1 mr-2" />
                              {item.scheduleData.giverData.email}
                            </p>
                            <p className="row">
                              <BsIcons.BsTelephoneInbound className="icon mt-1 mr-2" />
                              {item.scheduleData.giverData.phone}
                            </p>
                          </div>
                        </div>
                        <div className="info-collection">
                          <div className="d-flex">
                            <span className="info mr-1">
                              <RiIcons.RiProductHuntLine /> Sản phẩm:{" "}
                            </span>
                            <p>{item.scheduleData.productData.product_name}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info mr-1 mb-1">
                              <BiIcons.BiUser /> Người nhận thu gom:{" "}
                            </span>
                            <p>
                              {item.recipientData.firstName}{" "}
                              {item.recipientData.lastName}
                            </p>
                          </div>
                          <div className="d-flex">
                            {item.scheduleData.statusData.valueVi ===
                              "Chờ xác nhận" ||
                            item.scheduleData.statusData.valueVi ===
                              "Chờ thu gom" ? (
                              <button className="btn status-s2">
                                <PriorityHighIcon className="icon mr-1" />
                                {item.scheduleData.statusData.valueVi}
                              </button>
                            ) : (
                              <>
                                {item.scheduleData.statusData.valueVi ===
                                "Đơn bị hủy" ? (
                                  <button className="btn status-s5">
                                    <BsIcons.BsX className="icon" />{" "}
                                    {item.scheduleData.statusData.valueVi}
                                  </button>
                                ) : (
                                  <>
                                    {item.scheduleData.statusData.valueVi ===
                                    "Đã thu gom" ? (
                                      <button className="btn status-s4">
                                        <CheckCircleOutlineIcon className="icon mr-1" />
                                        {item.scheduleData.statusData.valueVi}
                                      </button>
                                    ) : (
                                      <button className="btn status-s1">
                                        <PriorityHighIcon className="icon mr-1" />
                                        {item.scheduleData.statusData.valueVi}
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            <button
                              className="btn btn-detail "
                              onClick={() => this.handleLook(item.scheduleId)}
                            >
                              Chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="btn-pageNumber d-flex">
              {pageNumbers.map((number) => {
                return (
                  <>
                    <button
                      className="btn btn-prev-next"
                      active={this.state.active === number}
                      key={number}
                      id={number}
                      onClick={(event) => this.handleClick(event)}
                    >
                      {number}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
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
  connect(mapStateToProps, mapDispatchToProps)(CollectionFormManage)
);
