import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Lightbox from "react-image-lightbox";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import { saveUpdateStatic } from "../../services/appointmentService";
import { getAllAddressOfUser } from "../../services/addressService";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "./ModalDetailCollectForm.scss";
import {
  getAllCollectionForm,
  getAllCollectionFormBySchedule,
} from "../../services/collectionformService";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";

class ModalDetailCollectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: {},
      responseCollect: [],
      statusArr: [],
      status: "",
      statusData: {},
      giverData: {},
      recipientData: {},
      productData: {},
      statusTypeData: {},
      timeTypeData: {},
      date: "",
      phone: "",
      currentCollectId: "",
      detail: {},
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentCollectId !== this.props?.currentCollect?.id) {
      this.setState({
        currentCollectId: this.props.currentCollect.id,
        detail: this.props.currentCollect,
      });
      if (this.state.detail) {
        this.setState({
          detailCollect: this.state.detail?.appointments,
          giverData: this.state.detail?.scheduleData?.giverData,
          addressData: this.state.detail?.scheduleData?.addressData,
          recipientData: this.state.detail?.recipientData,
          recipientId: this.state.detail?.recipientId,
          addressData: this.state.detail?.scheduleData?.addressData,
          productData: this.state.detail?.scheduleData?.productData,
          amount: this.state.detail?.scheduleData?.amount,
          statusData: this.state.detail?.scheduleData?.statusData,
          date: this.state.detail?.scheduleData?.date,
          timeTypeData: this.state.detail?.scheduleData?.timeTypeData,
        });
        let response = await getAllAddressOfUser(
          this.state.detail?.recipientData?.id
        );

        if (response && response.errCode === 0) {
          this.setState({
            addressRecipient: response.addresses,
          });
        }
      }
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
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
      giverData,
      addressData,
      recipientData,
      recipientId,
      productData,
      responseCollect,
      amount,
      timeTypeData,
      date,
      statusData,
      addressRecipient,
      status,
      detail,
    } = this.state;
    let statuses = this.state.statusArr;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        // centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          CHI TIẾT ĐƠN THU GOM
        </ModalHeader>
        <ModalBody>
          <form className="modal-detail-collect">
            {this.state.detail.scheduleData ? (
              <>
                <div className="form-row">
                  <p className="col-6 d-flex">
                    <div className="lable">Người cho:</div>
                    <div className="text">
                      {giverData?.firstName} {giverData?.lastName}
                    </div>
                  </p>
                  <p className="col-6 d-flex">
                    <div className="lable">Người nhận:</div>
                    <div className="text">
                      {recipientData?.firstName} {recipientData?.lastName}
                    </div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-6 d-flex">
                    <div className="lable">Email:</div>
                    <div className="text">{giverData?.email}</div>
                  </p>
                  <p className="col-6 d-flex">
                    <div className="lable">Email:</div>
                    <div className="text">{recipientData?.email}</div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-6 d-flex">
                    <div className="lable">SĐT:</div>
                    <div className="text">{giverData?.phone}</div>
                  </p>
                  <p className="col-6 d-flex">
                    <div className="lable">SĐT:</div>
                    <div className="text">{recipientData?.phone}</div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-6 d-flex">
                    <div className="lable">
                      {" "}
                      <FiIcons.FiMapPin className="icon " />{" "}
                    </div>
                    <div className="text">
                      {addressData?.address_name}
                      {" - "}
                      {addressData?.ward_name}
                      {"- "}
                      {addressData?.district_name}
                      {" - "}
                      {addressData?.city_name}
                    </div>
                  </p>
                  <p className="col-6 d-flex">
                    <div className="lable">
                      {" "}
                      <FiIcons.FiMapPin className="icon " />{" "}
                    </div>
                    {addressRecipient &&
                      addressRecipient.length > 0 &&
                      addressRecipient.map((item, index) => {
                        return (
                          <div className="text">
                            {item.address_name} {" - "}
                            {item.ward_name} {" - "}
                            {item.district_name} {" - "}
                            {item.city_name}
                          </div>
                        );
                      })}
                  </p>
                </div>
                <hr></hr>
                <div className="form-row">
                  <p className="col-12 d-flex">
                    <div className="lable">Sản phẩm:</div>
                    <div className="text">{productData?.product_name}</div>
                    <div className="lable"> - Mô tả:</div>
                    <div className="text">{productData?.description}</div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-12 d-flex">
                    <div className="lable">Só lượng: </div>
                    <div className="text">{amount}</div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-12 d-flex">
                    <div className="lable">
                      {" "}
                      <FiIcons.FiMapPin className="icon " />{" "}
                    </div>
                    <div className="text">
                      {addressData?.address_name}
                      {" - "}
                      {addressData?.ward_name}
                      {"- "}
                      {addressData?.district_name}
                      {" - "}
                      {addressData?.city_name}
                    </div>
                  </p>
                </div>
                <div className="form-row">
                  <p className="col-12 d-flex">
                    <div className="lable">Thu gom từ ngày:</div>
                    <div className="text">{date}</div>
                    <div className="lable"> - Thời gian:</div>
                    <div className="text">{timeTypeData?.valueVi}</div>
                  </p>
                </div>
                <div className="form-row">
                  {statusData?.valueVi === "Chờ xác nhận" ||
                  statusData?.valueVi === "Chờ thu gom" ? (
                    <button className="btn status-s2">
                      <PriorityHighIcon className="icon" />{" "}
                      {statusData?.valueVi}
                    </button>
                  ) : (
                    <>
                      {statusData?.valueVi === "Đơn bị hủy" ? (
                        <button className="btn status-s5">
                          <BsIcons.BsX className="icon" /> {statusData?.valueVi}
                        </button>
                      ) : (
                        <>
                          {statusData?.valueVi === "Đã thu gom" ? (
                            <button className="btn status-s4">
                              <CheckCircleOutlineIcon className="icon mr-1" />
                              {statusData?.valueVi}
                            </button>
                          ) : (
                            <button className="btn status-s1">
                              <PriorityHighIcon className="icon mr-1" />
                              {statusData?.valueVi}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <> </>
            )}

            {/* <button
              type="submit"
              class="btn btn-save"
              onClick={() => this.handleSaveProduct()}
            >
              {" "}
              Lưu
            </button> */}

            {this.state.isOpen === true && (
              <Lightbox
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </form>
        </ModalBody>
        {/* <ModalFooter>   
                    <Button color="primary" className='px-2' onClick={() => {this.handleSaveProduct()}}>Lưu</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter> */}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    statusRedux: state.admin.statuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusStart: () => dispatch(actions.fetchStatusStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDetailCollectForm);
