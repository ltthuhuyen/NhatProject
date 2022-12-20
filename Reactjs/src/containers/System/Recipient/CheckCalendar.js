import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { Table } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
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
import { getCollectionFormByAppointmentDate } from "../../../services/collectionformService";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
class CheckCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: [],
      arrSchedule: [],
      arrCollect: [],
      arrCollectionFormsByAppointmentDate: [],
      collect: {},
      statusArr: [],
      status: "",
      statusType: "",
      recipientId: "",
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
    await this.getAllCollectionFormByAppointmentDateFormReact();
  }

  // Xem lịch thu gom theo ngày hẹn
  getAllCollectionFormByAppointmentDateFormReact = async () => {
    let res = await getCollectionFormByAppointmentDate({
      status: "S3",
      recipientId: this.state.recipientId,
    });
    if (res && res.errCode === 0) {
      this.setState({
        arrCollectionFormsByAppointmentDate: res.collects,
      });
    }
  };

  handleLook = async (schedule) => {
    this.props.history.push(`/recipient/collection-form-detail/${schedule}`);
  };

  handleOnChangeDataPicker = (date) => {
    this.setState(
      {
        dateStart: date[0],
      },
      () => {
        let date = moment(this.state.dateStart).format("DD/MM/YYYY");
        this.setState(
          {
            date: date,
          },
          () => {
            console.log("date", date);
          }
        );
      }
    );
  };

  handleSeeCalendar = async () => {
    let res = await getCollectionFormByAppointmentDate({
      status: "S3",
      recipientId: this.state.recipientId,
      date: this.state.date,
    });
    if (res && res.errCode === 0) {
      this.setState(
        {
          arrCollectionFormsByAppointmentDate: res.collects,
        },
        () => {
          console.log(
            "arrCollectionFormsByAppointmentDate",
            this.state.arrCollectionFormsByAppointmentDate
          );
        }
      );
    }
  };

  render() {
    let {
      arrCollectionFormsByAppointmentDate,
      arrCollectionFormsByAppointmentDate_CurrentDate,
    } = this.state;
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
            <div className="title">LỊCH THU GOM</div>
            <div className="row1-content2 d-flex">
              <label className="lable">Từ ngày :</label>
              <DatePicker
                onChange={this.handleOnChangeDataPicker}
                className="select"
                placeholder="Chọn ngày"
                maxDate={new Date()}
              />
              <button
                className="btn btn-detail ml-5"
                onClick={() => this.handleSeeCalendar()}
              >
                Xem
              </button>
            </div>
            <div className="wrapper-title-sum-statistic d-flex">
              <span className="wrapper-sum d-flex">
                <div className="">Tổng cộng:</div>
                <div className="text-sum">
                  {arrCollectionFormsByAppointmentDate.length} đơn
                </div>
              </span>
            </div>
            <div className="row ">
              <div className="col-11 collection-form shadow ">
                <Table className="shadow table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Thời gian hẹn thu gom</th>
                      <th scope="col">Sản phẩm thu gom</th>
                      <th scope="col">Người cho thu gom</th>
                      <th></th>
                    </tr>
                  </thead>
                  {arrCollectionFormsByAppointmentDate &&
                    arrCollectionFormsByAppointmentDate.length > 0 &&
                    arrCollectionFormsByAppointmentDate.map((item, index) => {
                      return (
                        <tbody>
                          <tr>
                            <td>{item.scheduleData.timeTypeData.valueVi}</td>
                            <td>
                              {item.scheduleData.productData.product_name}
                            </td>
                            <td>
                              {item.scheduleData.giverData.firstName}{" "}
                              {item.scheduleData.giverData.lastName}
                            </td>
                            <td>
                              <button
                                className="btn btn-detail "
                                onClick={() => this.handleLook(item.scheduleId)}
                              >
                                Chi tiết
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </Table>
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
  connect(mapStateToProps, mapDispatchToProps)(CheckCalendar)
);
