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
import * as actions from "../../../store/actions";
import avata from "../../../assets/images/avata.jpg";
import moment from "moment";
import "./CollectionFormStatus.scss";
import {
  getCollectionFormOfCancelledRecipient,
  getCollectionExpire,
  getAllScheduleStatus,
  getAllCollectionFormBySchedule,
  getCollectionFormByCurrentDate,
  getCollectionFormOfWaittingRecipient,
  getCollectionFormStatusByCurrentDate,
} from "../../../services/collectionformService";

import { saveUpdateStatic } from "../../../services/appointmentService";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
class CollectionFormStatusS5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrScheduleStatusS5: [],
      collectStatusS5: {},
      arrCollect: [],
      arrCollectionFormsExpire: [],
      statusArr: [],
      status: "",
      statusType: "",
      recipientId: "",
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
    await this.getScheduleS5();
    await this.getAllCollectionByScheduleOfRecipient();
    await this.props.getStatusStart();
    await this.getCollectionFormOfRecipientByExpire();
  }

  // getCollectionFormOfRecipientStatusS5 = async () => {
  //   let response = await getCollectionFormOfCancelledRecipient({
  //     recipientId: this.state.recipientId,
  //     status: "S5",
  //   });

  //   if (response && response.errCode == 0) {
  //     this.setState({
  //       arrCollectionFormsStatusS5: response.appointments,
  //     });
  //   }
  // };

  getScheduleS5 = async () => {
    let response = await getAllScheduleStatus("S5");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrScheduleStatusS5: response.appointments,
        },
        () => {
          console.log("arrScheduleStatusS5", this.state.arrScheduleStatusS5);
        }
      );
    }
  };

  getAllCollectionByScheduleOfRecipient = async () => {
    let { arrScheduleStatusS5 } = this.state;
    let response;
    let arr = [];
    let temp = [];
    if (arrScheduleStatusS5) {
      for (let i = 0; i < arrScheduleStatusS5.length; i++) {
        arr.push(arrScheduleStatusS5[i].id);
      }
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          console.log("arrSchedule1", arr);
          response = await getAllCollectionFormBySchedule({
            scheduleId: arr[i],
            recipientId: this.state.recipientId,
            status: "Yes",
          });
          if (response) {
            this.setState(
              {
                collectStatusS5: response.appointments,
              },
              () => {
                console.log("arrCollectStatusS4", this.state.collectStatusS5);
              }
            );
            if (this.state.collectStatusS5 != null) {
              temp.push(this.state.collectStatusS5);
              console.log("temp", temp);
            }
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

  getCollectionFormOfRecipientByExpire = async () => {
    let response = await getCollectionExpire("ALL");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrCollectionFormsExpire: response.appointments,
        },
        () => {
          console.log(
            "arrCollectionFormsExpire",
            this.state.arrCollectionFormsExpire
          );
        }
      );
      let arrCollectionFormsExpire = this.state.arrCollectionFormsExpire;
      arrCollectionFormsExpire = arrCollectionFormsExpire.filter(
        (item) => item.recipientId == this.state.recipientId
      );
      console.log("arrCollectionFormsExpire", arrCollectionFormsExpire);

      for (let i = 0; i < arrCollectionFormsExpire.length; i++) {
        let response = await saveUpdateStatic({
          id: arrCollectionFormsExpire[i].id,
          status: "S5",
          recipientId: this.state.recipientId,
        });

        if (response) {
          await this.getCollectionFormOfRecipientStatusS5();
        }
      }
    }
  };

  // getCollectionFormOfRecipientStatusS3 = async () => {
  //   let today = new Date();
  //   let currentDate = moment(today).format("DD/MM/YYYY");

  //   let response = await getCollectionFormOfWaittingRecipient(
  //     this.state.recipientId
  //   );
  //   if (response && response.errCode == 0) {
  //     this.setState({
  //       arrCollectionFormsStatusS3: response.appointments,
  //     });
  //   }
  //   let arrCollectionFormsStatusS3 = this.state.arrCollectionFormsStatusS3;
  //   if (arrCollectionFormsStatusS3) {
  //     arrCollectionFormsStatusS3.map((item, index) => {
  //       var currentDate = moment(currentDate);
  //       console.log("currentDate", currentDate);
  //       let date = moment(`${item.date}`, "DD/MM/YYYY");

  //       console.log("date", item.date);

  //       // var currentDate = moment("17/11/2022", "DD/MM/YYYY");
  //       // console.log("startTime", currentDate);
  //       // var date = moment("17/11/2022", "DD/MM/YYYY");
  //       // console.log("date", date);

  //       let days = currentDate.diff(date, "days");
  //       console.log("days", days);
  //       // return endTime.diff(startTime, "days");
  //     });
  //   }
  // };

  // getAllCollectFormStatusS3ByCurrentDateFromReact = async () => {
  //   let today = new Date();
  //   console.log("today", today);
  //   let currentDate = moment(today).format("DD/MM/YYYY");
  //   var currentTime =
  //     today.getHours() +
  //     ":" +
  //     ("0" + today.getMinutes()).slice(-2) +
  //     ":" +
  //     ("0" + today.getSeconds()).slice(-2);
  //   let currentDateTimeBegin = currentDate + " " + "00:00:00";
  //   let currentDateTimeStop = currentDate + " " + currentTime;

  //   console.log("moment", currentDate);
  //   console.log("moment", currentTime);
  //   console.log("currentDateTimeBegin", currentDateTimeBegin);
  //   console.log("currentDateTimeStop", currentDateTimeStop);

  //   var startTime = moment("10/11/2022", "DD/MM/YYYY");
  //   console.log("startTime", startTime);
  //   var endTime = moment("17/11/2022", "DD/MM/YYYY");
  //   console.log("endTime", endTime);
  //   var daysDiff = endTime.diff(startTime, "days");
  //   console.log("days:", daysDiff);

  //   // let tttt = currentTime.diff(tt, "minutes");
  //   // console.log("tttt", tttt);
  //   let response = await getCollectionFormByCurrentDate({
  //     date: currentDate,
  //     status: "S3",
  //     recipientId: this.state.recipientId,
  //   });

  //   if (response) {
  //     this.setState(
  //       {
  //         arrCollectsStatusS3ByCurrentDate: response.collects,
  //         // currentDateTimeBegin: currentDateTimeBegin,
  //         // currentDateTimeStop: currentDateTimeStop,
  //       },
  //       () => {
  //         console.log(
  //           "arrCollectsStatusS3ByCurrentDate",
  //           this.state.arrCollectsStatusS3ByCurrentDate
  //         );
  //       }
  //     );
  //   }
  // };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatuses = this.props.statusRedux;
      console.log(arrStatuses);
      this.setState({
        statusArr: arrStatuses,
        status:
          arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap : "",
      });
    }
  }

  handleLook = async (schedule) => {
    this.props.history.push(`/recipient/collection-form-detail/${schedule.id}`);
  };

  render() {
    let arrCollect = this.state.arrCollect;
    let statusArr = this.state.statusArr;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
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
                <span className="mt-1 title-history">Xem lịch sử thu gom</span>
                <div className="icon mr-0">
                  <MdIcons.MdOutlineNavigateNext />
                </div>
              </NavLink>
            </div>
            <div className="title">ĐƠN BỊ HỦY</div>
            <div className="row ">
              {arrCollect &&
                arrCollect.map((item, index) => {
                  let imageBase64 = "";
                  if (item.scheduleData.giverData.image.data) {
                    imageBase64 = new Buffer(
                      item.scheduleData.giverData.image.data,
                      "base64"
                    ).toString("binary");
                  }
                  return (
                    <div className="col-5 collection-form shadow " key={index}>
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
                          <button className="btn status-s5">
                            <BsIcons.BsX className="icon" />{" "}
                            {item.scheduleData.statusData.valueVi}
                          </button>
                          <button
                            className="btn btn-detail "
                            onClick={() => this.handleLook(item)}
                          >
                            Chi tiết
                          </button>
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
  connect(mapStateToProps, mapDispatchToProps)(CollectionFormStatusS5)
);
