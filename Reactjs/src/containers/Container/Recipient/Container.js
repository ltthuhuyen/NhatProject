import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SlideShow from "../../SlideShow/SlideShow";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "./Container.scss";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import { getNewCollectionForm } from "../../../services/collectionformService";
import { saveUpdateStaticS2 } from "../../../services/appointmentService";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCollectionFormsStatusS1: [],
      addressUser: [],
    };
  }

  async componentDidMount() {
    await this.getCollectionFormStatusS1();
  }

  getCollectionFormStatusS1 = async () => {
    let response = await getNewCollectionForm("ALL");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrCollectionFormsStatusS1: response.appointments,
        },
        () => {
          // console.log("this.state.addressUser",this.state.addressUser)
        }
      );
    }
  };

  handleUpdate = async (id, recipientId) => {
    let response = await saveUpdateStaticS2({
      id: id.id,
      recipientId: this.props.userInfo.id,
    });
    if (response && response.errCode == 0) {
      toast.success("Đăng ký đơn thu gom thành công!");
    }
    this.props.history.push(`/recipient/collection-form-status-s2/`);
  };

  render() {
    let { arrCollectionFormsStatusS1, addressUser } = this.state;
    if (this.props.userInfo) {
      this.state.recipientId = this.props.userInfo.id;
    }
    // console.log('RecipientID',this.state.recipientId)
    return (
      <div className="container">
        <div>
          <div className="title-news">ĐĂNG KÝ THU GOM</div>
          <div className="line"></div>
        </div>
        <div className="container-collection-form shadow-lg">
          {arrCollectionFormsStatusS1 &&
            arrCollectionFormsStatusS1.map((item, index) => {
              // console.log("item", item);
              let imageBase64 = "";
              if (item.giverData.image) {
                imageBase64 = new Buffer(
                  item.giverData.image,
                  "base64"
                ).toString("binary");
              }

              return (
                <>
                  <div className="row shadow" aria-hidden="true">
                    <div className="col-3">
                      <img src={imageBase64} className="img-pro" />
                    </div>
                    <div className="col-9 mt-3">
                      <p className="info-giver">
                        {item.giverData.firstName} {item.giverData.lastName} -{" "}
                        <HiIcons.HiOutlineMail /> Email: {item.giverData.email}
                      </p>
                      <div className="d-flex">
                        <span className="info-collection mr-1">
                          <RiIcons.RiProductHuntLine className=" icon" /> Sản
                          phẩm thu gom:{" "}
                        </span>
                        <p>{item.productData.product_name}</p>
                      </div>
                      <div className="d-flex">
                        <span className="info-collection mr-1">
                          <BsIcons.BsTelephoneInbound className="icon" /> Điện
                          thoại:{" "}
                        </span>
                        <p> {item.giverData.phone}</p>
                      </div>
                      <div className="d-flex">
                        <span className="info-collection mr-1">
                          <FiIcons.FiMapPin className="icon" /> Địa chỉ thu gom:{" "}
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
                          <BsIcons.BsCalendarDate className="icon" /> Ngày:{" "}
                        </span>
                        <p>{item.date}</p>
                        <span className="info-collection ml-1 mr-1">
                          {" "}
                          - Thời gian:{" "}
                        </span>
                        <p>{item.timeTypeData.valueVi}</p>
                      </div>
                    </div>
                    <button
                      className="btn-register-receive"
                      onClick={() => this.handleUpdate(item)}
                    >
                      <IoIcons.IoMdArrowRoundForward /> Đăng ký
                    </button>
                  </div>
                </>
              );
            })}
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
