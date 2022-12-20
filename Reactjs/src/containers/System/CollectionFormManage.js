import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import BarChartIcon from "@mui/icons-material/BarChart";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import * as actions from "../../store/actions";
import { Table } from "reactstrap";
import "./Manage.scss";
import { withRouter } from "react-router";
import { getAllCollectionForm } from "../../services/collectionformService";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";
import {
  getAllSchedule,
  getAllCollectionFormBySchedule,
  getCollectionFormStatusByCurrentDate,
} from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import CloseIcon from "@mui/icons-material/Close";
import ModalDetailAllCollect from "./ModalDetailAllCollect";

class CollectionFormManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectsStatusByCurrentDate: [],
      arrSchedule: [],
      arrCollectStatusYes: [],
      arrCollect: [],
      statusArr: [],
      status: "",
      statusType: "",
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
      isOpenModalDetailCollect: false,
      detailCollect: {},
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
    await this.getAllCollectionFormReact();
    await this.props.getStatusStart();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  getAllCollectionFormReact = async () => {
    let responseSchedlue = await getAllSchedule("ALL");
    if (responseSchedlue && responseSchedlue.errCode == 0) {
      this.setState(
        {
          arrSchedule: responseSchedlue.appointments,
        },
        () => {
          console.log("arrSchedule", this.state.arrSchedule);
        }
      );
    }
    let { arrSchedule } = this.state;
    let arr = [];
    let responseCollect;
    for (let i = 0; i < arrSchedule.length; i++) {
      responseCollect = await getAllCollectionFormBySchedule({
        scheduleId: arrSchedule[i].id,
      });
      if (responseCollect) {
        this.setState({
          arrCollect: responseCollect.appointments,
        });
      }
      let { arrCollect } = this.state;
      for (let i = 0; i < arrCollect.length; i++) {
        if (arrCollect[i].statusType == "Yes") {
          arr.push(arrCollect[i]);
        }
      }
      if (arr) {
        this.setState(
          {
            arrCollectStatusYes: arr,
          },
          () => {
            console.log("arrCollectStatusYes", this.state.arrCollectStatusYes);
          }
        );
      }
    }
  };

  // getAllCollectFormStatusByCurrentDateFromReact = async () => {
  //   let today = new Date();
  //   let response = await getCollectionFormStatusByCurrentDate({
  //     date: moment(today).format(dateFormat.FORMAT_DATE),
  //     status: "S1",
  //   });

  //   if (response) {
  //     this.setState(
  //       {
  //         arrCollectsStatusByCurrentDate: response.collects,
  //       },
  //       () => {
  //         console.log(
  //           "arrCollectsStatusByCurrentDate",
  //           this.state.arrCollectsStatusByCurrentDate
  //         );
  //       }
  //     );
  //   }
  // };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let currentDate = moment(today).format("YYYY-MM-DD");
    var currentTime =
      today.getHours() +
      ":" +
      ("0" + today.getMinutes()).slice(-2) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    let currentDateTimeBegin = currentDate + " " + "00:00:00";
    let currentDateTimeStop = currentDate + " " + currentTime;
    // console.log("moment", currentDate);
    // console.log("moment", currentTime);
    // console.log("currentDateTimeBegin", currentDateTimeBegin);
    // console.log("currentDateTimeStop", currentDateTimeStop);
    let response = await getCollectionFormStatusByCurrentDate({
      currentDateBegin: currentDateTimeBegin,
      currentDateStop: currentDateTimeStop,
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
        currentDateTimeBegin: currentDateTimeBegin,
        currentDateTimeStop: currentDateTimeStop,
      });
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

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleLook = (schedule) => {
    // console.log("schedule", schedule);
    this.setState({
      isOpenModalDetailCollect: true,
      detailCollect: schedule,
    });
  };

  toggleDetailCollectModal = () => {
    this.setState({
      isOpenModalDetailCollect: !this.state.isOpenModalDetailCollect,
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  // handleLook = async (schedule) => {
  //   console.log(schedule);
  //   this.props.history.push(`/system/collection-form-detail/${schedule.id}`);
  // };

  render() {
    let {
      arrSchedule,
      arrCollectStatusYes,
      isShowNotification,
      arrCollectsStatusByCurrentDate,
      currentDateTimeStop,
    } = this.state;

    currentDateTimeStop = moment(currentDateTimeStop);

    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrSchedule.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrSchedule.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const { processLogout, userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }

    return (
      <>
        <NavAdmin />
        <ModalDetailAllCollect
          isOpen={this.state.isOpenModalDetailCollect}
          toggleFromParent={this.toggleDetailCollectModal}
          currentCollect={this.state.detailCollect}
        />
        <div className="main_content">
          <div className="container-fluid  ">
            <div className=" header_right justify-content-between align-items-center">
              <div className="d-flex">
                <div className="d-flex wrapper-welcome">
                  <div
                    className="btn btn-logout"
                    onClick={(e) => this.handleNotifications(e)}
                  >
                    <NotificationsNoneIcon />
                    {isShowNotification ? (
                      <div className="wrapper-notification shadow rounded">
                        <div className="title-notification">
                          Thông báo
                          <CloseIcon
                            className="icon-close"
                            onClick={(e) => this.handleNotifications(e)}
                          />
                        </div>
                        <CustomScrollbars style={{ height: "180px" }}>
                          {arrCollectsStatusByCurrentDate.length > 0 &&
                            arrCollectsStatusByCurrentDate.map(
                              (item, index) => {
                                let t = moment(item.createdAt);
                                // console.log("t", t);
                                let tt = moment(`${t}`);
                                // console.log("tt", tt);
                                return (
                                  <>
                                    <div
                                      className="info-notification"
                                      onClick={(e) =>
                                        this.handleDetailCollectForm(item)
                                      }
                                    >
                                      {item.giverData.firstName} {""}
                                      {item.giverData.lastName}{" "}
                                      <div>
                                        đặt lịch thu gom{" "}
                                        {item.productData.product_name} {""}
                                        tại {item.addressData.address_name} {""}
                                        {item.addressData.ward_name}
                                        {/* {currentDateTimeStop} */}
                                        {/* {item.createdAt} */}
                                      </div>
                                      <div className="text-minutes">
                                        {currentDateTimeStop.diff(
                                          tt,
                                          "minutes"
                                        ) > 60 ? (
                                          <>
                                            {Math.floor(
                                              currentDateTimeStop.diff(
                                                tt,
                                                "minutes"
                                              ) / 60
                                            )}{" "}
                                            giờ trước
                                          </>
                                        ) : (
                                          <>
                                            {currentDateTimeStop.diff(
                                              tt,
                                              "minutes"
                                            )}{" "}
                                            phút trước
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            )}
                        </CustomScrollbars>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="img">
                    <img src={imageBase64} className="img-img" />
                  </div>
                  <div className="profile-info">
                    {userInfo && userInfo.firstName + userInfo.lastName
                      ? userInfo.firstName + " " + userInfo.lastName
                      : ""}
                  </div>
                  <div className="btn btn-logout" onClick={processLogout}>
                    <FiIcons.FiLogOut />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper-manage  ">
            <div className="row title d-flex">
              <div className="col-10 title-manage">QUẢN LÝ ĐƠN THU GOM</div>
              <div className="serach_field-area d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search here..."
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "search");
                  }}
                />
                <button
                  type="search"
                  className="btn btn-search rounded-pill"
                  onClick={() => this.handleSearch()}
                >
                  <BsIcons.BsSearch /> Tìm
                </button>
              </div>
              <button className="col-1 btn btn-hidden "></button>
            </div>
            <div className="row content ">
              <div className="wrapper-title-sum-statistic d-flex">
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">{arrSchedule.length} đơn</div>
                </span>
              </div>
              <Table className="shadow table">
                <thead className="thead">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col" colspan="3">
                      Thông tin người cho
                    </th>
                    <th scope="col">Sản phẩm</th>
                    {/* <th scope="col">Ngày thu gom</th>
                                <th scope="col">Thời gian</th> */}
                    <th scope="col">Người nhận thu gom</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Hành động</th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {currentTodos && currentTodos.length > 0 ? (
                    <>
                      {" "}
                      {currentTodos &&
                        currentTodos.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>
                                {item?.giverData?.firstName}{" "}
                                {item?.giverData?.lastName}
                              </td>
                              <td>{item.giverData.email}</td>
                              <td>{item.giverData.phone}</td>
                              <td>{item.productData.product_name}</td>

                              {/* <td>{item.timeTypeData.valueVi}</td>  */}
                              <td>
                                {arrCollectStatusYes &&
                                  arrCollectStatusYes.map(
                                    (arrCollectStatusYes, index) => {
                                      if (
                                        arrCollectStatusYes.scheduleId ===
                                        item.id
                                      ) {
                                        return (
                                          arrCollectStatusYes.recipientData
                                            .firstName +
                                          " " +
                                          arrCollectStatusYes.recipientData
                                            .lastName
                                        );
                                      }
                                    }
                                  )}
                              </td>
                              <td>
                                {item.statusData.valueVi === "Chờ xác nhận" ||
                                item.statusData.valueVi === "Chờ thu gom" ? (
                                  <button className="btn status-s2">
                                    <PriorityHighIcon className="icon mr-1" />
                                    {item.statusData.valueVi}
                                  </button>
                                ) : (
                                  <>
                                    {item.statusData.valueVi ===
                                    "Đơn bị hủy" ? (
                                      <button className="btn status-s5">
                                        <BsIcons.BsX className="icon" />{" "}
                                        {item.statusData.valueVi}
                                      </button>
                                    ) : (
                                      <>
                                        {item.statusData.valueVi ===
                                        "Đã thu gom" ? (
                                          <button className="btn status-s4">
                                            <CheckCircleOutlineIcon className="icon mr-1" />
                                            {item.statusData.valueVi}
                                          </button>
                                        ) : (
                                          <button className="btn status-s1">
                                            <PriorityHighIcon className="icon mr-1" />
                                            {item.statusData.valueVi}
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-detail-form px-2 "
                                  onClick={() => this.handleLook(item)}
                                >
                                  <BsIcons.BsInfoCircle /> Chi tiết
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {arrSchedule &&
                        arrSchedule.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>
                                {item.scheduleData.giverData.firstName}{" "}
                                {item.scheduleData.giverData.lastName}
                              </td>
                              <td>{item.scheduleData.giverData.email}</td>
                              <td>{item.scheduleData.giverData.phone}</td>
                              <td>
                                {item.scheduleData.productData.product_name}
                              </td>
                              {/* <td>{item.scheduleData.date}</td>
                                        <td>{item.scheduleData.timeTypeData.valueVi}</td>  */}
                              <td>
                                {arrCollectStatusYes &&
                                  arrCollectStatusYes.map(
                                    (arrCollectStatusYes, index) => {
                                      if (
                                        arrCollectStatusYes.scheduleId ===
                                        item.id
                                      ) {
                                        return (
                                          arrCollectStatusYes.recipientData
                                            .firstName +
                                          " " +
                                          arrCollectStatusYes.recipientData
                                            .lastName
                                        );
                                      }
                                    }
                                  )}
                              </td>
                              <td>
                                {item.statusTypeData.valueVi ===
                                  "Chờ xác nhận" ||
                                item.statusTypeData.valueVi ===
                                  "Chờ thu gom" ? (
                                  <button className="btn status-s2">
                                    <PriorityHighIcon className="icon mr-1" />
                                    {item.statusTypeData.valueVi}
                                  </button>
                                ) : (
                                  <>
                                    {item.statusTypeData.valueVi ===
                                    "Đơn bị hủy" ? (
                                      <button className="btn status-s5">
                                        <BsIcons.BsX className="icon" />{" "}
                                        {item.statusTypeData.valueVi}
                                      </button>
                                    ) : (
                                      <>
                                        {item.statusTypeData.valueVi ===
                                        "Đã thu gom" ? (
                                          <button className="btn status-s4">
                                            <CheckCircleOutlineIcon className="icon mr-1" />
                                            {item.statusTypeData.valueVi}
                                          </button>
                                        ) : (
                                          <button className="btn status-s1">
                                            <PriorityHighIcon className="icon mr-1" />
                                            {item.statusTypeData.valueVi}
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-detail-form px-2 "
                                  onClick={() => this.handleLook(item)}
                                >
                                  <BsIcons.BsInfoCircle /> Chi tiết
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
            <div className="row btn-pageNumber d-flex">
              {pageNumbers.map((number) => {
                return (
                  <button
                    className="btn btn-prev-next d-flex"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    activeStyle={{ background: "red" }}
                  >
                    {number}
                  </button>
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
    isLoggedIn: state.user.isLoggedIn,
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
