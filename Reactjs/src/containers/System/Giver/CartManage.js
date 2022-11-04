import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import * as AiIcons from "react-icons/ai";
import "./CartManage.scss";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import {
  getAllTemps,
  deleteProductInTempSerVice,
  saveBulkScheduleAppoinment,
} from "../../../services/appointmentService";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import { Table } from "reactstrap";

class CartManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      product_name: "",
      description: "",
      giverId: "",
      arrTemps: [],
      productData: {},
    };
  }

  async componentDidMount() {
    await this.getAllTempsFromReact();
    await this.props.fetchAllTemp(this.state.giverId);
    this.setState({
      arrTemps: this.props.temps,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.temps !== this.props.temps) {
      this.setState({
        arrTemps: this.props.temps,
      });
    }
  }
  getAllTempsFromReact = async () => {
    let response = await getAllTemps(this.state.giverId);
    console.log("arrTemps", response);
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrTemps: this.props.temps,
        },
        () => {
          console.log("arrTemps", this.state.arrTemps);
        }
      );
    }
  };

  handleOnChangeClick = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleDeleteProductInTemp = async (item) => {
    alert(
      `Bạn muốn xóa sản phẩm ${item.productTemp.product_name} phải không ?`
    );
    try {
      let linhsua = await deleteProductInTempSerVice(item.productId);

      if (linhsua && linhsua.errCode == 0) {
        await this.props.fetchAllTemp(this.state.giverId);
        toast.success("Xóa sản phẩm thành công");
      } else {
        alert(linhsua.errMessange);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleClickGive = async () => {
  //     let {productId} = this.state;
  //     console.log('productId',productId)
  //     let result = []

  //     if (productId && productId.length >0){
  //             productId.map((schedule,index) => {
  //                 let object ={};
  //                 object.productId = productId;
  //                 object.statusType = 'S1'
  //                 result.push(object)
  //             })
  //         } else {
  //             toast.error("Vui lòng chọn sản phẩm");
  //             return;
  //         }

  //     let response = await saveBulkScheduleAppoinment({
  //         arrSchedule: result

  //     });
  // }

  handleMakeAnAppointment = async () => {
    if (this.state.arrTemps.length > 0) {
      this.props.history.push("/giver/appointment-schedule");
    } else {
      toast.error("Vui lòng chọn sản phẩm thu gom");
    }
  };

  render() {
    let { productId, product_name, description, arrTemps } = this.state;
    let { language } = this.props;
    if (this.props.userInfo) {
      this.state.giverId = this.props.userInfo.id;
    }
    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="container-cart">
          <div className="title-cart">ĐƠN THU GOM</div>
          <div className="line"></div>
          <div className="table-cart">
            <Table>
              <thead className="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Hình đại diện</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Mô tả sản phẩm</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {arrTemps &&
                  arrTemps.map((item, index) => {
                    let imageBase64 = "";
                    if (item.productTemp.image) {
                      imageBase64 = new Buffer(
                        item.productTemp.image,
                        "base64"
                      ).toString("binary");
                    }
                    return (
                      <tr key={index}>
                        <td>{item.productId}</td>
                        <td className="img">
                          <img src={imageBase64} className="img-img" />
                        </td>
                        <td>{item.productTemp.product_name}</td>

                        <td>{item.productTemp.description}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-delete px-2"
                            onClick={() => this.handleDeleteProductInTemp(item)}
                          >
                            <AiIcons.AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          <div className="row text-center">
            <div className="col-md-6">
              <button className="btn btn-booking">
                <Link className="link" to="/giver/home">
                  <FormattedMessage id="common.choose-continue" />
                </Link>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-booking"
                onClick={() => this.handleMakeAnAppointment()}
              >
                ĐẶT LỊCH HẸN
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
    userInfo: state.user.userInfo,
    temps: state.admin.temps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllAppointmentTime:() => dispatch(actions.fetchAllAppointmentTime()),
    fetchAllTemp: (giverId) => dispatch(actions.fetchAllTemp(giverId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
