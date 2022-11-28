import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import { Table } from "reactstrap";
import { saveUpdateStatic } from "../../services/appointmentService";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import "./Manage.scss";
import { getAllCollectionForm } from "../../services/collectionformService";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

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
      isShowNotification: false,
    };
  }

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  async componentDidMount() {
    await this.getAllCollectionFormReact();
    await this.props.getStatusStart();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  getAllCollectionFormReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let scheduleId = this.props.match.params.id;
      let response = await getAllCollectionForm(scheduleId);
      console.log("response", response);
      if (response && response.errCode === 0) {
        this.setState(
          {
            arrCollectionForms: response.appointments,
            giverData: response.appointments.scheduleData?.giverData,
            addressData: response.appointments.scheduleData.addressData,
            recipientData: response.appointments.scheduleData.recipientData,
            productData: response.appointments.scheduleData.productData,
            statusData: response.appointments.scheduleData.statusData,
            timeTypeData: response.appointments.scheduleData.timeTypeData,
            phone: response.appointments.scheduleData.phone,
            date: response.appointments.scheduleData.date,
            status: response.appointments.statusTypeData.keyMap,
          },
          () => {
            console.log("giverData", this.state.giverData);
          }
        );
      }
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();

    let response = await getCollectionFormStatusByCurrentDate({
      date: moment(today).format(dateFormat.FORMAT_DATE),
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
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

  handleUpdate = async (id, status) => {
    let response = await saveUpdateStatic({
      id: id,
      status: status,
    });
    this.props.history.push(`/system/collection-form-manage/`);
  };
  render() {
    let {
      arrCollectionForms,
      giverData,
      addressData,
      recipientData,
      timeTypeData,
      date,
      status,
      arrCollectsStatusByCurrentDate,
      isShowNotification,
    } = this.state;
    let statuses = this.state.statusArr;
    const { processLogout, userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }

    return (
      <>
        <NavAdmin />
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
                                return (
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
                                    </div>
                                  </div>
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
          <div className="row title d-flex">
            <div className="col-10 title-manage">ĐƠN THU GOM MỚI </div>
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
          </div>
          <div className="row content">
            <Table>
              <thead className="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col" colspan="2">
                    Thông tin người nhận thu gom
                  </th>
                  <th scope="col">Thu gom từ ngày</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">Địa chỉ thu gom</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr>
                  <td>{arrCollectionForms.id}</td>
                  <td>{recipientData.email}</td>
                  <td>{recipientData.phone}</td>
                  <td>{date}</td>
                  <td>{timeTypeData.valueVi}</td>
                  <td>
                    {addressData?.address_name} - {addressData?.ward_name} -
                    {addressData?.district_name} - {addressData?.city_name}
                  </td>
                  <td>
                    <select
                      id="status"
                      class="form-control"
                      onChange={(e) => {
                        this.handleOnChangeInput(e, "status");
                      }}
                      value={status}
                    >
                      {statuses &&
                        statuses.length > 0 &&
                        statuses.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {item.valueVi}
                            </option>
                          );
                        })}
                    </select>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-update"
                      onClick={() =>
                        this.handleUpdate(this.props.match.params.id, status)
                      }
                    >
                      <FormattedMessage id="common.update" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
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
  connect(mapStateToProps, mapDispatchToProps)(DetailCollectionForm)
);
