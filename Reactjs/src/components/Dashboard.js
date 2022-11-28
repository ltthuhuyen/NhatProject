import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { changeLanguageApp } from "../store/actions";
import { toast } from "react-toastify";
import DatePicker from "./Input/DatePicker";
import moment from "moment";
import { dateFormat } from "../utils";
import "./Dashboard.scss";
import { Table } from "reactstrap";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomScrollbars from "./CustomScrollbars";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import avata from "../../src/assets/images/header-banner.jpg";
import { countUser, userStatistic } from "../services/userService";
import DetailCollectionForm from "../containers/System/DetailCollectionForm";
// import {getCollectionStatisticWeek} from "../services/collectionformService"
import {
  countCollect,
  getCollectionFormByCurrentDate,
  collectFormStatisticByStatusOfCurrentDate,
  getCollectionFormStatusByCurrentDate,
  collectFormStatisticByCurrentDate,
  collectFormStatistic,
  getCollectionStatisticWeek,
} from "../services/collectionformService";
import { countSubmission } from "../services/submissionService";
import NavAdmin from "./NavAdmin";
import Chart from "./Chart";
import { cloneDeep } from "lodash";
import ModalDetailCollectForm from "../containers/System/ModalDetailCollectForm";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var currentDate =
      ("0" + today.getDate()).slice(-2) +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let time = today.setHours(0, 0, 0, 0);
    console.log("time", currentTime);
    this.state = {
      status: "",
      countUser: [],
      countCollect: [],
      countSubmission: [],
      currentDate: currentDate,
      isShowNotification: false,
      isShowAlert: false,
      isOpenModalDetailCollect: false,
      arrCollectsStatusS4CurrentDate: [],
      arrCollectionFormStatisticByCurrentDate: [],
      arrCollectsStatusByCurrentDate: [],
      collectsStatisticOneAgo: {},
      userStatisticOneAgo: {},
      detailCollect: {},
      currentPage: 1,
      todosPerPage: 10,
      date: "",
      label1: [],
      label2: [],
      data: {},
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  async componentDidMount() {
    await this.props.getStatusStart();
    await this.countAllCountUserFromReact();
    await this.countAllCountCollectFromReact();
    await this.countAllCountSubmissionFromReact();
    await this.collectFormStatisticByStatusOfCurrentDateFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
    await this.collectFormStatisticOneAgoFromReact();
    await this.userStatisticOneAgoFromReact();
    await this.labelArr();
    // await this.getAllCollectFormStatisticWeekFromReact();

    if (this.state.label1) {
      let response = await getCollectionStatisticWeek(1);
      console.log("res pon đi mount", response.res1);
      this.setState(
        {
          labels: this.state.label1,
          data: {
            labels: this.state.label1,
            datasets: [
              {
                label: "7 ngày gần nhất",
                data: response?.res1?.data?.map((item, index) => {
                  return item;
                }),
                backgroundColor: "rgba(255, 99, 132, 0.8)",
              },
            ],
          },
        },
        () => {
          console.log("labels", this.state.label1);
          console.log("labels", this.state.label2);
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatuses = this.props.statusRedux;
      this.setState({
        statusArr: arrStatuses,
        // status:
        //   arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap : "",
      });
    }
  }

  collectFormStatisticByStatusOfCurrentDateFromReact = async () => {
    let response = await collectFormStatisticByStatusOfCurrentDate({
      status: "S4",
    });
    if (response) {
      this.setState(
        {
          arrCollectsStatusS4CurrentDate: response.collects,
        },
        () => {
          console.log(
            "arrCollectsByCurrentDate1",
            this.state.arrCollectsStatusS4CurrentDate
          );
        }
      );
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    console.log("today", today);
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
    console.log("currentDateTimeStop", currentDateTimeStop);

    // let tttt = currentTime.diff(tt, "minutes");
    // console.log("tttt", tttt);
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

  //Thống kê người dùng so với tháng trước
  userStatisticOneAgoFromReact = async () => {
    let today = new Date();
    let response = await userStatistic();
    if (response) {
      this.setState({
        userStatisticOneAgo: response.users,
      });
    }
  };

  //Thống kê đơn so với tháng trước
  collectFormStatisticOneAgoFromReact = async () => {
    let today = new Date();
    let response = await collectFormStatistic();
    if (response) {
      this.setState({
        collectsStatisticOneAgo: response.collects,
      });
    }
  };

  countAllCountUserFromReact = async () => {
    let res = await countUser("ALL");
    if (res) {
      this.setState({
        countUser: res.users,
      });
    }
  };

  countAllCountCollectFromReact = async () => {
    let res = await countCollect("ALL");
    if (res) {
      this.setState({
        countCollect: res.collects,
      });
    }
  };

  countAllCountSubmissionFromReact = async () => {
    let res = await countSubmission("ALL");
    if (res) {
      this.setState({
        countSubmission: res.submissions,
      });
    }
  };

  labelArr = async () => {
    let arr1 = [];
    let arr2 = [];

    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date())
        .subtract(i, "days")
        .locale("en")
        .format("dddd - DD/MM");
      obj.label2 = moment(new Date())
        .subtract(i, "days")
        .locale("en")
        .format("DD/MM");
      obj.label3 = moment(new Date())
        .subtract(i + 7, "days")
        .locale("en")
        .format("DD/MM");

      arr1.push(obj.label);
      arr2.push(obj.label2 + " - " + obj.label3);
    }

    this.setState({
      label1: arr1,
      label2: arr2,
    });
  };

  getAllCollectFormStatisticWeekFromReact = async () => {
    let response = await getCollectionStatisticWeek(1);

    if (response) {
      this.setState({
        arrCollectsByWeek: response.res1,
      });
    }
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleAlert = () => {
    this.setState({
      isShowAlert: !this.state.isShowAlert,
    });
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("status", this.state);
      }
    );
  };

  handleOnChangeDataPicker = (date) => {
    this.setState(
      {
        dateStart: date[0],
      },
      () => {
        let date = moment(this.state.dateStart).format("YYYY-MM-DD");
        this.setState(
          {
            date: date + " " + "00:00:00",
          },
          () => {
            console.log("date", this.state.date);
          }
        );
      }
    );
  };

  handleStatistic = async () => {
    if (this.state.date && this.state.status) {
      let response = await collectFormStatisticByStatusOfCurrentDate(
        {
          status: this.state.status,
          dateTimeBegin: this.state.date,
        },
        () => {
          console.log("response", response);
        }
      );
      if (response) {
        this.setState({
          arrCollectionFormStatisticByCurrentDate: response.collects,
        });
      } else {
        toast.error("Vui lòng chọn ngày bắt đầu thống kê");
      }
    }
  };

  handleLookDetail = (collect) => {
    console.log("collect", collect);
    this.setState({
      isOpenModalDetailCollect: true,
      detailCollect: collect,
    });
  };

  toggleDetailCollectModal = () => {
    this.setState({
      isOpenModalDetailCollect: !this.state.isOpenModalDetailCollect,
    });
  };

  // handleLookDetail = async (schedule) => {
  //   this.props.history.push(`/system/collection-form-detail/${schedule.id}`);
  // };

  render() {
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
    let {
      statusArr,
      countUser,
      countCollect,
      countSubmission,
      isShowNotification,
      isShowAlert,
      arrCollectionFormStatisticByCurrentDate,
      arrCollectsStatusS4CurrentDate,
      arrCollectsStatusByCurrentDate,
      collectsStatisticOneAgo,
      userStatisticOneAgo,
      currentDateTimeStop,
    } = this.state;
    console.log(
      "arrCollectsStatusByCurrentDate",
      this.state.arrCollectsStatusByCurrentDate
    );
    currentDateTimeStop = moment(currentDateTimeStop);

    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrCollectsStatusS4CurrentDate.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(arrCollectsStatusS4CurrentDate.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    let { userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    const { processLogout, isLoggedIn } = this.props;
    return (
      <>
        <NavAdmin />

        <ModalDetailCollectForm
          isOpen={this.state.isOpenModalDetailCollect}
          toggleFromParent={this.toggleDetailCollectModal}
          currentCollect={this.state.detailCollect}
        />
        <section className="main_content_dashboard ">
          <div className="container-fluid ">
            <div className="header_right_dashboard">
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
                          arrCollectsStatusByCurrentDate.map((item, index) => {
                            let t = moment(`${item.createdAt}`).format(
                              "YYYY-MM-DD hh:mm:ss"
                            );
                            console.log("t", t);
                            let tt = moment(`${t}`);
                            console.log("tt", tt);
                            console.log(item.createdAt);
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
                                    {currentDateTimeStop.diff(tt, "minutes") >
                                    60 ? (
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
                                        {currentDateTimeStop.diff(tt)} phút
                                        trước
                                      </>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
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

          <div className="wrapper-statistic-main">
            <div className="wrapper-statistic-content1">
              {countUser.length > 0 &&
                countUser.map((item, index) => {
                  return (
                    <div className="shadow content-col-3">
                      <div className="d-flex">
                        <div className="icon">
                          <FaIcons.FaUserAlt />
                        </div>
                        <div className="text d-flex">
                          Người dùng:
                          <div className="count">{item.count}</div>
                        </div>
                      </div>

                      {userStatisticOneAgo.tang === true ? (
                        <>
                          {" "}
                          <div className="d-flex">
                            <div className="icon">
                              <FaIcons.FaUserAlt />
                            </div>
                            <div className="text d-flex">
                              Tăng:
                              <div className="count">
                                {userStatisticOneAgo.phantramTang} %
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="d-flex">
                            <div className="icon">
                              <FaIcons.FaUserAlt />
                            </div>
                            <div className="text d-flex">
                              Giảm:
                              <div className="count">
                                {userStatisticOneAgo.phantramTang} %
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              {countCollect.length > 0 &&
                countCollect.map((item, index) => {
                  return (
                    <div className=" shadow content-col-3">
                      <div className="d-flex">
                        {" "}
                        <div className="icon">
                          <GrIcons.GrUnorderedList />
                        </div>
                        <div className="text d-flex">
                          Đơn thu gom:
                          <div className="count">{item.count}</div>
                        </div>
                      </div>
                      <div className="d-flex">
                        {collectsStatisticOneAgo.tang === true ? (
                          <>
                            {" "}
                            <div className="d-flex">
                              <div className="icon">
                                <FaIcons.FaUserAlt />
                              </div>
                              <div className="text d-flex">
                                Tăng:
                                <div className="count">
                                  {collectsStatisticOneAgo.phantramTang} %
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="d-flex">
                              <div className="icon">
                                <FaIcons.FaUserAlt />
                              </div>
                              <div className="text d-flex">
                                Giảm:
                                <div className="count">
                                  {collectsStatisticOneAgo.phantramTang} %
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              {countSubmission.length > 0 &&
                countSubmission.map((item, index) => {
                  return (
                    <div className="shadow content-col-3">
                      <div className="d-flex">
                        <div className="icon">
                          <GrIcons.GrUnorderedList />
                        </div>
                        <div className="text d-flex">
                          Bài dự thi:
                          <div className="count">{item.count}</div>
                        </div>
                      </div>
                      <div className="d-flex">
                        {collectsStatisticOneAgo.tang === true ? (
                          <>
                            {" "}
                            <div className="d-flex">
                              <div className="icon">
                                <FaIcons.FaUserAlt />
                              </div>
                              <div className="text d-flex">
                                Tăng:
                                <div className="count">
                                  {collectsStatisticOneAgo.phantramTang} %
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="d-flex">
                              <div className="icon">
                                <FaIcons.FaUserAlt />
                              </div>
                              <div className="text d-flex">
                                Giảm:
                                <div className="count">
                                  {collectsStatisticOneAgo.phantramTang} %
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="wrapper-chart">
              {this.state.data &&
              this.state.data.labels &&
              this.state.data.datasets ? (
                <Chart data={this.state.data} />
              ) : null}
              {/* thong ke */}
            </div>
            <div className="wrapper-statistic-content2 shadow">
              <div className="row-1 d-flex">
                <div className="row1-content2 d-flex">
                  <div className="icon mr-2">
                    <TrendingUpIcon />
                  </div>
                  <div className="title">THỐNG KÊ</div>
                </div>
                <div className="row1-content2 d-flex">
                  <label className="lable">Từ ngày :</label>
                  <DatePicker
                    onChange={this.handleOnChangeDataPicker}
                    className="select"
                    placeholder="Chọn ngày"
                    maxDate={new Date()}
                  />
                </div>
                <div className="row1-content2 d-flex">
                  <label className="lable">Đến hôm nay :</label>
                  <div className="select mt-1">{this.state.currentDate}</div>
                </div>
                <div className="row1-content2 d-flex">
                  <label className="lable">Trạng thái :</label>
                  <select
                    id="status"
                    className="select"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "status");
                    }}
                  >
                    <option selected>Tất cả</option>
                    {statusArr &&
                      statusArr.length > 0 &&
                      statusArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.valueVi}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="row1-content2 d-flex">
                  <div
                    className="btn btn-statistic"
                    onClick={() => this.handleStatistic()}
                  >
                    Thống kê
                  </div>
                </div>
              </div>
              <hr></hr>
              {arrCollectsStatusS4CurrentDate &&
              arrCollectsStatusS4CurrentDate.length > 0 ? (
                <>
                  <div className="row-2 wrapper-title-sum-statistic d-flex">
                    <span className="wrapper-sum d-flex">
                      <div className="">Tổng cộng:</div>
                      <div className="text-sum">
                        {arrCollectsStatusS4CurrentDate.length} đơn
                      </div>
                    </span>
                  </div>
                  <div className="row-3 d-flex">
                    <Table className="shadow table">
                      <thead className="thead">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col" colspan="3">
                            Thông tin người cho
                          </th>
                          <th scope="col">Sản phẩm</th>
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
                                      {item.scheduleData.giverData?.firstName}{" "}
                                      {item.scheduleData.giverData?.lastName}
                                    </td>
                                    <td>
                                      {item.scheduleData.giverData?.email}
                                    </td>
                                    <td>
                                      {item.scheduleData.giverData?.phone}
                                    </td>
                                    <td>
                                      {
                                        item.scheduleData.productData
                                          ?.product_name
                                      }
                                    </td>
                                    {/* <td>{item.date}</td>
                                        <td>{item.timeTypeData.valueVi}</td>  */}
                                    <td>
                                      {item.recipientData.firstName}{" "}
                                      {item.recipientData.lastName}
                                    </td>
                                    <td>
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
                                          {item.scheduleData.statusData
                                            .valueVi === "Đơn bị hủy" ? (
                                            <button className="btn status-s5">
                                              <BsIcons.BsX className="icon" />{" "}
                                              {
                                                item.scheduleData.statusData
                                                  .valueVi
                                              }
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
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-detail-form px-2 "
                                        onClick={() =>
                                          this.handleLookDetail(item)
                                        }
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
                            {arrCollectsStatusS4CurrentDate &&
                              arrCollectsStatusS4CurrentDate.map(
                                (item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{item.id}</td>
                                      <td>
                                        {item.scheduleData.giverData.firstName}{" "}
                                        {item.scheduleData.giverData.lastName}
                                      </td>
                                      <td>
                                        {item.scheduleData.giverData.email}
                                      </td>
                                      <td>
                                        {item.scheduleData.giverData.phone}
                                      </td>
                                      <td>
                                        {item.scheduleData.giverData.email}
                                      </td>
                                      <td>
                                        {item.scheduleData.giverData.email}
                                      </td>
                                      <td>
                                        {
                                          item.scheduleData.productData
                                            .product_name
                                        }
                                      </td>
                                      {/* <td>{item.date}</td>
                                        <td>{item.timeTypeData.valueVi}</td>  */}
                                      <td>
                                        {item.recipientData.firstName}{" "}
                                        {item.recipientData.lastName}
                                      </td>
                                      <td>
                                        {item.scheduleData.statusData
                                          .valueVi === "Chờ xác nhận" ||
                                        item.scheduleData.statusData.valueVi ===
                                          "Chờ thu gom" ? (
                                          <button className="btn status-s2">
                                            <PriorityHighIcon className="icon mr-1" />
                                            {
                                              item.scheduleData.statusData
                                                .valueVi
                                            }
                                          </button>
                                        ) : (
                                          <>
                                            {item.scheduleData.statusData
                                              .valueVi === "Đơn bị hủy" ? (
                                              <button className="btn status-s5">
                                                <BsIcons.BsX className="icon" />{" "}
                                                {
                                                  item.scheduleData.statusData
                                                    .valueVi
                                                }
                                              </button>
                                            ) : (
                                              <>
                                                {item.scheduleData.statusData
                                                  .valueVi === "Đã thu gom" ? (
                                                  <button className="btn status-s4">
                                                    <CheckCircleOutlineIcon className="icon mr-1" />
                                                    {
                                                      item.scheduleData
                                                        .statusData.valueVi
                                                    }
                                                  </button>
                                                ) : (
                                                  <button className="btn status-s1">
                                                    <PriorityHighIcon className="icon mr-1" />
                                                    {
                                                      item.scheduleData
                                                        .statusData.valueVi
                                                    }
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
                                          onClick={() =>
                                            this.handleLookDetail(item)
                                          }
                                        >
                                          <BsIcons.BsInfoCircle /> Chi tiết
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </>
              ) : (
                <>
                  {arrCollectionFormStatisticByCurrentDate &&
                  arrCollectionFormStatisticByCurrentDate.length > 0 ? (
                    <>
                      <div className="row-2 wrapper-title-sum-statistic d-flex">
                        <span className="wrapper-sum d-flex">
                          <div className="">Tổng cộng:</div>
                          <div className="text-sum">
                            {arrCollectionFormStatisticByCurrentDate.length} đơn
                          </div>
                        </span>
                      </div>
                      <div className="row-3 d-flex">
                        <Table className="shadow table">
                          <thead className="thead">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col" colspan="3">
                                Thông tin người cho
                              </th>
                              <th scope="col">Sản phẩm</th>
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
                                          {
                                            item.scheduleData.giverData
                                              ?.firstName
                                          }{" "}
                                          {
                                            item.scheduleData.giverData
                                              ?.lastName
                                          }
                                        </td>
                                        <td>
                                          {item.scheduleData.giverData?.email}
                                        </td>
                                        <td>
                                          {item.scheduleData.giverData?.phone}
                                        </td>
                                        <td>
                                          {
                                            item.scheduleData.productData
                                              ?.product_name
                                          }
                                        </td>
                                        {/* <td>{item.date}</td>
                                        <td>{item.timeTypeData.valueVi}</td>  */}
                                        <td>
                                          {item.recipientData.firstName}{" "}
                                          {item.recipientData.lastName}
                                        </td>
                                        <td>
                                          {item.scheduleData.statusData
                                            .valueVi === "Chờ xác nhận" ||
                                          item.scheduleData.statusData
                                            .valueVi === "Chờ thu gom" ? (
                                            <button className="btn status-s2">
                                              <PriorityHighIcon className="icon mr-1" />
                                              {
                                                item.scheduleData.statusData
                                                  .valueVi
                                              }
                                            </button>
                                          ) : (
                                            <>
                                              {item.scheduleData.statusData
                                                .valueVi === "Đơn bị hủy" ? (
                                                <button className="btn status-s5">
                                                  <BsIcons.BsX className="icon" />{" "}
                                                  {
                                                    item.scheduleData.statusData
                                                      .valueVi
                                                  }
                                                </button>
                                              ) : (
                                                <>
                                                  {item.scheduleData.statusData
                                                    .valueVi ===
                                                  "Đã thu gom" ? (
                                                    <button className="btn status-s4">
                                                      <CheckCircleOutlineIcon className="icon mr-1" />
                                                      {
                                                        item.scheduleData
                                                          .statusData.valueVi
                                                      }
                                                    </button>
                                                  ) : (
                                                    <button className="btn status-s1">
                                                      <PriorityHighIcon className="icon mr-1" />
                                                      {
                                                        item.scheduleData
                                                          .statusData.valueVi
                                                      }
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
                                            onClick={() =>
                                              this.handleLookDetail(item)
                                            }
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
                                {arrCollectionFormStatisticByCurrentDate &&
                                  arrCollectionFormStatisticByCurrentDate.map(
                                    (item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{item.id}</td>
                                          <td>
                                            {
                                              item.scheduleData.giverData
                                                .firstName
                                            }{" "}
                                            {
                                              item.scheduleData.giverData
                                                .lastName
                                            }
                                          </td>
                                          <td>
                                            {item.scheduleData.giverData.email}
                                          </td>
                                          <td>
                                            {item.scheduleData.giverData.phone}
                                          </td>

                                          <td>
                                            {
                                              item.scheduleData.productData
                                                .product_name
                                            }
                                          </td>
                                          {/* <td>{item.date}</td>
                                        <td>{item.timeTypeData.valueVi}</td>  */}
                                          <td>
                                            {item.recipientData.firstName}{" "}
                                            {item.recipientData.lastName}
                                          </td>
                                          <td>
                                            {item.scheduleData.statusData
                                              .valueVi === "Chờ xác nhận" ||
                                            item.scheduleData.statusData
                                              .valueVi === "Chờ thu gom" ? (
                                              <button className="btn status-s2">
                                                <PriorityHighIcon className="icon mr-1" />
                                                {
                                                  item.scheduleData.statusData
                                                    .valueVi
                                                }
                                              </button>
                                            ) : (
                                              <>
                                                {item.scheduleData.statusData
                                                  .valueVi === "Đơn bị hủy" ? (
                                                  <button className="btn status-s5">
                                                    <BsIcons.BsX className="icon" />{" "}
                                                    {
                                                      item.scheduleData
                                                        .statusData.valueVi
                                                    }
                                                  </button>
                                                ) : (
                                                  <>
                                                    {item.scheduleData
                                                      .statusData.valueVi ===
                                                    "Đã thu gom" ? (
                                                      <button className="btn status-s4">
                                                        <CheckCircleOutlineIcon className="icon mr-1" />
                                                        {
                                                          item.scheduleData
                                                            .statusData.valueVi
                                                        }
                                                      </button>
                                                    ) : (
                                                      <button className="btn status-s1">
                                                        <PriorityHighIcon className="icon mr-1" />
                                                        {
                                                          item.scheduleData
                                                            .statusData.valueVi
                                                        }
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
                                              onClick={() =>
                                                this.handleLookDetail(item)
                                              }
                                            >
                                              <BsIcons.BsInfoCircle /> Chi tiết
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                              </>
                            )}
                          </tbody>
                        </Table>
                      </div>{" "}
                    </>
                  ) : (
                    <>
                      <div className="alert-infomation">
                        Hôm nay chưa có đơn thu gom
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    statusRedux: state.admin.statuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getStatusStart: () => dispatch(actions.fetchStatusStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
