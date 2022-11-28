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

class ModalDetailCollectFormStatusS1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionForms: {},
      responseCollect: [],
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
      currentCollectId: "",
      detail: {},
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentCollectId !== this.props?.currentCollect?.id) {
      this.setState(
        {
          currentCollectId: this.props.currentCollect.id,
          detail: this.props.currentCollect,
        },
        () => {
          console.log("currentCollectId", this.state.detail);
        }
      );
      if (this.state.detail) {
        this.setState({
          detailCollect: this.state.detail?.appointments,
          giverData: this.state.detail?.scheduleData?.giverData,
          addressData: this.state.detail?.scheduleData?.addressData,
          productData: this.state.detail?.scheduleData?.productData,
          amount: this.state.detail?.scheduleData?.amount,
          statusData: this.state.detail?.scheduleData?.statusData,
          date: this.state.detail?.scheduleData?.date,
          timeTypeData: this.state.detail?.scheduleData?.timeTypeData,
        });
      }
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

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
            <>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Người cho:</div>
                  <div className="text">
                    {detail.giverData?.firstName} {detail.giverData?.lastName}
                  </div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Email:</div>
                  <div className="text">{detail.giverData?.email}</div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">SĐT:</div>
                  <div className="text">{detail.giverData?.phone}</div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable d-flex">Địa chỉ:</div>
                  <div className="text">
                    {detail.addressData?.address_name}
                    {" - "}
                    {detail.addressData?.ward_name}
                    {"- "}
                    {detail.addressData?.district_name}
                    {" - "}
                    {detail.addressData?.city_name}
                  </div>
                </p>
              </div>
              <hr></hr>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Sản phẩm:</div>
                  <div className="text">{detail.productData?.product_name}</div>
                  <div className="lable"> - Mô tả:</div>
                  <div className="text">{detail.productData?.description}</div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Só lượng: </div>
                  <div className="text">{detail.amount}</div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Địa chỉ: </div>
                  <div className="text">
                    {detail.addressData?.address_name}
                    {" - "}
                    {detail.addressData?.ward_name}
                    {"- "}
                    {detail.addressData?.district_name}
                    {" - "}
                    {detail.addressData?.city_name}
                  </div>
                </p>
              </div>
              <div className="form-row">
                <p className="col-12 d-flex">
                  <div className="lable">Thu gom từ ngày:</div>
                  <div className="text">{detail.date}</div>
                  <div className="lable"> - Thời gian:</div>
                  <div className="text">{detail.timeTypeData?.valueVi}</div>
                </p>
              </div>
              <div className="form-row">
                <button className="btn status-s1">
                  <PriorityHighIcon className="icon mr-1" />
                  {detail.statusData?.valueVi}
                </button>
              </div>
            </>
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
)(ModalDetailCollectFormStatusS1);
