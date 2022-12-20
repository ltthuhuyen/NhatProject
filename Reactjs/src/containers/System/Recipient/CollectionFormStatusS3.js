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
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import * as actions from "../../../store/actions";
import avata from "../../../assets/images/avata.jpg";
import "./CollectionFormStatus.scss";
import {
  getAllScheduleStatus,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
class CollectionFormStatusS3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrScheduleStatusS3: [],
      collectStatusS3: {},
      arrCollect: [],
      statusArr: [],
      status: "",
      statusType: "",
      recipientId: "",
      temp: "",
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
    await this.getScheduleS3();
    await this.getAllCollectionByScheduleOfRecipient();
    await this.props.getStatusStart();
  }

  // getCollectionFormOfRecipientStatusS3 = async () => {
  //   let response = await getCollectionFormOfWaittingRecipient({
  //     recipientId: this.state.recipientId,
  //     status: "S3",
  //   });
  //   console.log("response", response);
  //   if (response && response.errCode == 0) {
  //     this.setState({
  //       arrCollect: response.appointments,
  //     });
  //   }
  // };

  getScheduleS3 = async () => {
    let response = await getAllScheduleStatus("S3");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrScheduleStatusS3: response.appointments,
        },
        () => {
          console.log("arrScheduleStatusS3", this.state.arrScheduleStatusS3);
        }
      );
    }
  };

  getAllCollectionByScheduleOfRecipient = async () => {
    let { arrScheduleStatusS3 } = this.state;
    let response;
    let arr = [];
    let temp = [];
    if (arrScheduleStatusS3) {
      for (let i = 0; i < arrScheduleStatusS3.length; i++) {
        arr.push(arrScheduleStatusS3[i].id);
      }
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          response = await getAllCollectionFormBySchedule({
            scheduleId: arr[i],
            recipientId: this.state.recipientId,
            status: "Yes",
          });
          if (response) {
            this.setState(
              {
                collectStatusS3: response.appointments,
              },
              () => {
                console.log("arrCollectStatusS3", this.state.collectStatusS3);
              }
            );
            if (this.state.collectStatusS3 != null) {
              temp.push(this.state.collectStatusS3);
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
    console.log("statusArr", statusArr);
    // console.log("arrCollectionFormsStatusS2",this.state.arrCollectionFormsStatusS2)
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
            <div className="title">CHỜ THU GOM</div>
            <div className="wrapper-title-sum-statistic d-flex">
              <span className="wrapper-sum d-flex">
                <div className="">Tổng cộng:</div>
                <div className="text-sum">{arrCollect.length} đơn</div>
              </span>
            </div>
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
                          <button className="btn status-s2">
                            <PriorityHighIcon className="icon mr-1" />
                            {item.scheduleData.statusData.valueVi}
                          </button>
                          <button
                            className="btn btn-detail "
                            onClick={() => this.handleLook(item.scheduleData)}
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
  connect(mapStateToProps, mapDispatchToProps)(CollectionFormStatusS3)
);
