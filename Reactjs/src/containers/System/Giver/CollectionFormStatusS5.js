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
import ClearIcon from "@mui/icons-material/Clear";
import * as actions from "../../../store/actions";
import avata from "../../../assets/images/avata.jpg";
import "./CollectionFormManage.scss";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import {
  getScheduleOfGiver,
  getAllCollectionFormBySchedule,
} from "../../../services/collectionformService";

class CollectionFormStatusS5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrScheduleStatusS5: [],
      arrCollect: [],
      statusArr: [],
      status: "",
      statusType: "",
      giverId: "",
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
    await this.getAllScheduleOfGiver();
    await this.getAllCollectionByScheduleOfGiver();
    await this.props.getStatusStart();
  }

  getAllScheduleOfGiver = async () => {
    let response = await getScheduleOfGiver({
      giverId: this.state.giverId,
      status: "S5",
    });
    if (response && response.errCode == 0) {
      this.setState({
        arrScheduleStatusS5: response.appointments,
      });
    }
  };

  getAllCollectionByScheduleOfGiver = async () => {
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
          response = await getAllCollectionFormBySchedule({
            scheduleId: arr[i],

            status: "Yes",
          });
          temp.push(response.appointments);
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
    this.props.history.push(`/giver/collection-form-detail/${schedule.id}`);
  };

  render() {
    let { arrCollect } = this.state;

    if (this.props.userInfo) {
      this.state.giverId = this.props.userInfo.id;
    }

    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="collection-form">
          <div className="title-collection-form">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="container-collection-form-status shadow-lg ">
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
                <span className="mt-1 title-history">Xem lịch sử thu gom</span>
                <div className="icon mr-0">
                  <MdIcons.MdOutlineNavigateNext />
                </div>
              </NavLink>
            </div>
            <div className="title">ĐƠN BỊ HỦY</div>
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
                  if (item.scheduleData.giverData.image) {
                    imageBase64 = new Buffer(
                      item.scheduleData.giverData.image.data,
                      "base64"
                    ).toString("binary");
                  } else {
                    imageBase64 = avata;
                  }
                  return (
                    <div className="col-5 collection-form shadow " key={index}>
                      <div className="row info-giver-recipient">
                        <img src={imageBase64} className=" col-5 img-pro" />
                        <div className="col-7">
                          <p className="row">
                            <FaIcons.FaUserAlt className="icon " />
                            {item.scheduleData.giverData.firstName}{" "}
                            {item.scheduleData.giverData.lastName}
                          </p>
                          <p className="row">
                            <HiIcons.HiOutlineMail className="icon " />
                            {item.scheduleData.giverData.email}
                          </p>
                          <p className="row">
                            <BsIcons.BsTelephoneInbound className="icon " />
                            {item.scheduleData.giverData.phone}
                          </p>
                        </div>
                      </div>
                      <div className="info-collection">
                        <div className="d-flex">
                          <span className="info mr-1">
                            <RiIcons.RiProductHuntLine className="icon" /> Sản
                            phẩm:{" "}
                          </span>
                          <p>{item.scheduleData.productData.product_name}</p>
                        </div>
                        <div className="d-flex">
                          <span className="info mr-1 mb-1">
                            <BiIcons.BiUser className="icon" /> Người nhận thu
                            gom:{" "}
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
