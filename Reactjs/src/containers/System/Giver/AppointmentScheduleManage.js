import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import { dateFormat } from "../../../utils";
import { toast } from "react-toastify";
import moment from "moment";
import * as MdIcons from "react-icons/md";
import "./AppointmentScheduleManage.scss";
import ModalAddress from "./ModalAddress";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import ScrollUp from "../../../components/ScrollUp";
import Footer from "../../Footer/Footer";
import {
  saveBulkScheduleAppoinment,
  deleteAllTempOfGiverSerVice,
} from "../../../services/appointmentService";
import {
  getAllAddressOfUser,
  createNewAddressService,
} from "../../../services/addressService";

class AppointmentScheduleManage extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.state = {
      isOpenModalAddress: false,
      currentDate: "",
      giverId: "",
      addressId: "",
      rangeTime: [],
      arrTemps: [],
      statusType: "",
      date: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllAppointmentTime();
    this.props.fetchAllTemp(this.state.giverId);
    this.getAllAddressOfUserFromReact();
  }

  getAllAddressOfUserFromReact = async () => {
    let response = await getAllAddressOfUser(this.state.giverId);
    console.log(response);
    if (response) {
      this.setState({
        addressUser: response.addresses,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.allTime !== this.props.allTime) {
      let dataTime = this.props.allTime;
      if (dataTime && dataTime.length > 0) {
        dataTime = dataTime.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: dataTime,
      });
    }
    if (prevProps.allProduct !== this.props.allProduct) {
      let dataSelect = this.buildDataInputSelect(this.props.allProduct);
      this.setState({
        arrProducts: dataSelect,
        productId: dataSelect && dataSelect.length > 0 ? dataSelect[0].id : "",
      });
    }
    if (prevProps.allStatus !== this.props.allStatus) {
      let dataSelect = this.buildDataInputSelect(this.props.allStatus);
      this.setState({
        arrProducts: dataSelect,
        productId: dataSelect && dataSelect.length > 0 ? dataSelect[0].id : "",
      });
    }
  }

  handleClickAddress = (e) => {
    this.setState({
      addressId: e.target.value,
    });
  };

  handleCreateAddress = () => {
    this.setState({
      isOpenModalAddress: true,
    });
  };

  toggleAddressModal = () => {
    this.setState({
      isOpenModalAddress: !this.state.isOpenModalAddress,
    });
  };

  handleOnChangeDataPicker = (date) => {
    this.setState({
      currentDate: moment(date[0]).format(dateFormat.SEND_TO_SERVER),
    });
  };

  handleClickSchedule = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      let data = rangeTime;
      data = data.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState(
        {
          timeType: time.keyMap,
        },
        () => {
          console.log("timeType", this.state.timeType);
        }
      );
    }
  };

  handleConfirm = async () => {
    let { addressId, currentDate, timeType } = this.state;
    if (!addressId || !currentDate || !timeType) {
      toast.error("Vui lòng chọn đủ thông tin!");
      return;
    }
    let arrTemps = this.props.temps;
    if (arrTemps && arrTemps.length > 0) {
      arrTemps = arrTemps.map((item) => {
        item.addressId = addressId;
        item.date = currentDate;
        item.timeType = timeType;
        item.statusType = "S1";
        //recipientId = "";
        return item;
      });
      console.log(arrTemps);
    }

    await saveBulkScheduleAppoinment({
      arrSchedule: arrTemps,
    });

    await deleteAllTempOfGiverSerVice(this.state.giverId);
    toast.success("Đặt lịch thu gom thành công");
    this.props.history.push("/giver/collection-form");
  };

  createAddress = async (data) => {
    try {
      let response = await createNewAddressService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessange);
      } else {
        toast.success("Thêm địa chỉ thành công!");
        await getAllAddressOfUser(this.state.giverId);
        this.setState({
          isOpenModalAddress: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { addressUser, rangeTime } = this.state;
    console.log("rangeTime", rangeTime);
    if (this.props.userInfo) {
      this.state.giverId = this.props.userInfo.id;
    }
    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <ModalAddress
          isOpen={this.state.isOpenModalAddress}
          toggleFromParent={this.toggleAddressModal}
          createAddress={this.createAddress}
        />
        <div className="schedule">
          <div className="title-schedule">ĐẶT LỊCH THU GOM</div>
          <div className="line"></div>
          <div className="row">
            <div className="col-3 form-group"></div>
            <div className="col-4 form-group">
              <label>Địa chỉ thu gom</label>
              <select
                id="citiesId"
                class="form-control"
                onChange={(e) => this.handleClickAddress(e, "addressId")}
              >
                <option>Chọn địa chỉ</option>
                {addressUser &&
                  addressUser.length > 0 &&
                  addressUser.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.address_name} - {item.ward_name} -{" "}
                        {item.district_name} - {item.city_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-2 form-group">
              <button
                className="btn btn-create-address"
                onClick={this.handleCreateAddress}
              >
                <MdIcons.MdOutlineCreate /> Thêm địa chỉ
              </button>
            </div>
            <div className="col-3 form-group"></div>
          </div>
          <div className="row ">
            <div className="col-3 form-group"></div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.appointment-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDataPicker}
                className="form-control date"
                placeholder="Chọn ngày"
                value={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-3 form-group"></div>
          </div>
          <div className="row ">
            <div className="col-3 form-group"></div>
            <div className="col-6 form-group">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        this.state.timeType === item.keyMap
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      checked={this.state.timeType === item.keyMap}
                      onClick={() => this.handleClickSchedule(item)}
                    >
                      {item.valueVi}
                    </button>
                  );
                })}
            </div>
            <div className="col-3 form-group"></div>
          </div>
          <div className="row">
            <div className="col-6 form-group"></div>
            <div className="col-6 form-group">
              <button
                className="btn btn-confirm"
                onClick={() => this.handleConfirm()}
              >
                Xác nhận
              </button>
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
    allTime: state.admin.allTime,
    allProduct: state.admin.allProduct,
    userInfo: state.user.userInfo,
    temps: state.admin.temps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAppointmentTime: () => dispatch(actions.fetchAllAppointmentTime()),
    fetchAllTemp: (giverId) => dispatch(actions.fetchAllTemp(giverId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentScheduleManage);
