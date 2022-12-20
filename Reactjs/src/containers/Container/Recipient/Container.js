import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SlideShow from "../../SlideShow/SlideShow";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "./Container.scss";
import moment from "moment";
import avata from "../../../assets/images/avata.jpg";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getAllScheduleBetweenTwoStatus,
  registerCollectionForm,
} from "../../../services/collectionformService";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrScheduleStatusS1: [],
      addressUser: [],
      currentPage: 1,
      todosPerPage: 4,
      active: 1,
    };
  }

  async componentDidMount() {
    await this.getScheduleNew();
  }

  getScheduleNew = async () => {
    let response = await getAllScheduleBetweenTwoStatus({
      status1: "S1",
      status2: "S2",
    });
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrScheduleStatusS1: response.appointments,
        },
        () => {
          console.log("arrScheduleStatusS1", this.state.arrScheduleStatusS1);
        }
      );
    }
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
      isClick: true,
    });
  };

  handleRegisterCollectionForm = async (schedule) => {
    let response = await registerCollectionForm({
      scheduleId: schedule.id,
      recipientId: this.props.userInfo.id,
      registerDate: new Date(),
      receivedDate: "",
      status: "S2",
    });
    if (response && response.errCode == 0) {
      toast.success("Đăng ký đơn thu gom thành công!");
    }
    this.props.history.push(`/recipient/collection-form-status-s2/`);
  };

  render() {
    let { arrScheduleStatusS1, addressUser } = this.state;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrScheduleStatusS1.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(arrScheduleStatusS1.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="container">
        <div>
          <div className="title-news">ĐĂNG KÝ THU GOM</div>
          <div className="line"></div>
        </div>
        <div className="container-collection-form shadow-lg">
          {currentTodos && currentTodos.length > 0 ? (
            <>
              {" "}
              {currentTodos &&
                currentTodos.map((item, index) => {
                  let imageBase64 = "";
                  if (item.giverData?.image) {
                    imageBase64 = new Buffer(
                      item.giverData.image,
                      "base64"
                    ).toString("binary");
                  }

                  return (
                    <>
                      <div className="row shadow" aria-hidden="true">
                        <div className="col-4 mt-2">
                          <div>
                            <iframe
                              width="280"
                              height="230"
                              frameborder="0"
                              scrolling="no"
                              marginheight="0"
                              marginwidth="0"
                              id="gmap_canvas"
                              src={`https://maps.google.com/maps?width=706&height=320&hl=en&q=${item.addressData.address_name}''${item.addressData.ward_name}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                            ></iframe>
                            {/* <a href="https://maps-generator.com/">Maps Generator</a> */}
                          </div>
                        </div>
                        <div className="col-8 mt-3">
                          <p className="info-giver">
                            {item.giverData.firstName} {item.giverData.lastName}{" "}
                            - <HiIcons.HiOutlineMail /> Email:{" "}
                            {item.giverData.email}
                          </p>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <RiIcons.RiProductHuntLine className=" icon" />{" "}
                              Sản phẩm thu gom:{" "}
                            </span>
                            <p>{item.productData.product_name}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsTelephoneInbound className="icon" />{" "}
                              Điện thoại:{" "}
                            </span>
                            <p> {item.giverData.phone}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsCalendarDate className="icon" /> Đến
                              thu gom từ ngày:{" "}
                            </span>
                            <p>{item.date}</p>
                            <span className="info-collection ml-1 mr-1">
                              {" "}
                              - Thời gian:{" "}
                            </span>
                            <p>{item.timeTypeData.valueVi}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <FiIcons.FiMapPin className="icon" />
                            </span>
                            <p>
                              {item.addressData.address_name} -{" "}
                              {item.addressData.ward_name} -{" "}
                              {item.addressData.district_name} -{" "}
                              {item.addressData.city_name}
                            </p>
                          </div>
                        </div>
                        {item.soluongdangky >= 3 ? (
                          <>
                            {" "}
                            <button
                              disabled
                              className="btn-register-receive"
                              onClick={() =>
                                this.handleRegisterCollectionForm(item)
                              }
                            >
                              <IoIcons.IoMdArrowRoundForward /> Đăng ký
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <button
                              className="btn-register-receive"
                              onClick={() =>
                                this.handleRegisterCollectionForm(item)
                              }
                            >
                              <IoIcons.IoMdArrowRoundForward /> Đăng ký
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              {arrScheduleStatusS1 &&
                arrScheduleStatusS1.map((item, index) => {
                  // console.log("item", item);
                  let imageBase64 = "";
                  if (item.giverData.image) {
                    imageBase64 = new Buffer(
                      item.giverData.image.data,
                      "base64"
                    ).toString("binary");
                  } else {
                    imageBase64 = avata;
                  }

                  return (
                    <>
                      <div className="row shadow" aria-hidden="true">
                        <div className="col-3">
                          <img src={imageBase64} className="img-pro" />
                        </div>
                        <div className="col-9 mt-3">
                          <p className="info-giver">
                            {item.giverData.firstName} {item.giverData.lastName}{" "}
                            - <HiIcons.HiOutlineMail /> Email:{" "}
                            {item.giverData.email}
                          </p>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <RiIcons.RiProductHuntLine className=" icon" />{" "}
                              Sản phẩm thu gom:{" "}
                            </span>
                            <p>{item.productData.product_name}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsTelephoneInbound className="icon" />{" "}
                              Điện thoại:{" "}
                            </span>
                            <p> {item.giverData.phone}</p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <FiIcons.FiMapPin className="icon" />
                            </span>
                            <p>
                              {item.addressData.address_name} -{" "}
                              {item.addressData.ward_name} -{" "}
                              {item.addressData.district_name} -{" "}
                              {item.addressData.city_name}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span className="info-collection mr-1">
                              <BsIcons.BsCalendarDate className="icon" /> Thu
                              gom:{" "}
                            </span>
                            <p>{item.date}</p>
                            <span className="info-collection ml-1 mr-1">
                              {" "}
                              - Thời gian:{" "}
                            </span>
                            <p>{item.timeTypeData.valueVi}</p>
                          </div>
                        </div>
                        {item.soluongdangky >= 3 ? (
                          <>
                            {" "}
                            <button
                              disabled
                              className="btn-register-receive"
                              onClick={() =>
                                this.handleRegisterCollectionForm(item)
                              }
                            >
                              <IoIcons.IoMdArrowRoundForward /> Đăng ký
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <button
                              className="btn-register-receive"
                              onClick={() =>
                                this.handleRegisterCollectionForm(item)
                              }
                            >
                              <IoIcons.IoMdArrowRoundForward /> Đăng ký
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </>
          )}
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    temps: state.admin.temps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTemp: (giverId) => dispatch(actions.fetchAllTemp(giverId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Container)
);
