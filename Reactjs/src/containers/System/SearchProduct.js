import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { toast } from "react-toastify";
import { changeLanguageApp } from "../../store/actions";
import "./Manage.scss";
import {
  getAllProducts,
  createNewProductService,
  editProductService,
  deleteProductSerVice,
} from "../../services/productService";
import { getAllCollectionForm } from "../../services/collectionformService";
import { searchProduct } from "../../services/searchService";
import { FormattedMessage } from "react-intl";
import ModalProduct from "./ModalProduct";
import ModalEditProduct from "./ModalEditProduct";
import NavAdmin from "../../components/NavAdmin";
import * as FiIcons from "react-icons/fi";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      isOpenModalProduct: false,
      isOpenModalEditProduct: false,
      productEdit: {},
      arrCollectionForms: [],
      search: "",
      arrSearchProduct: [],
    };
  }

  async componentDidMount() {
    await this.getAllProductsFromReact();
    await this.getAllCollectionFormReact();
    await this.getAllSearchProductFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  getAllProductsFromReact = async () => {
    let response = await getAllProducts("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrProducts: response.products,
      });
    }
  };

  getAllCollectionFormReact = async () => {
    let response = await getAllCollectionForm("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCollectionForms: response.appointments,
      });
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let currentDate = moment(today).format("YYYY-MM-DD");
    var currentTime =
      today.getHours() +
      ":" +
      ("0" + today.getMinutes()).slice(-2) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    let currentDateTimeBegin = currentDate + " " + "00:00:00";
    let currentDateTimeStop = currentDate + " " + currentTime;
    // console.log("moment", currentDate);
    // console.log("moment", currentTime);
    // console.log("currentDateTimeBegin", currentDateTimeBegin);
    // console.log("currentDateTimeStop", currentDateTimeStop);
    let response = await getCollectionFormStatusByCurrentDate({
      currentDateBegin: currentDateTimeBegin,
      currentDateStop: currentDateTimeStop,
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
        currentDateTimeBegin: currentDateTimeBegin,
        currentDateTimeStop: currentDateTimeStop,
      });
    }
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("input", this.state.search);
      }
    );
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleSearch = async () => {
    let response = await searchProduct(this.state.search);
    if (response) {
      this.setState({
        arrSearchProduct: response,
      });
    }
  };

  getAllSearchProductFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.search
    ) {
      let search = this.props.match.params.search;
      let response = await searchProduct(search);
      if (response) {
        this.setState({
          arrSearchProduct: response,
        });
      }
    }
  };

  handleAddNewProduct = () => {
    this.setState({
      isOpenModalProduct: true,
    });
  };

  toggleProductModal = () => {
    this.setState({
      isOpenModalProduct: !this.state.isOpenModalProduct,
    });
  };

  createNewproduct = async (data) => {
    try {
      let res = await createNewProductService(data);
      if (res && res.errCode === 0) {
        toast.success(res.errMessage);
        this.setState({
          isOpenModalProduct: false,
        });
        await this.getAllProductsFromReact();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else if (res && res.errCode === 2) {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    } catch (error) {}
  };

  handleEditProduct = async (product) => {
    this.setState({
      isOpenModalEditProduct: true,
      productEdit: product,
    });
  };

  toggleEditProductModal = () => {
    this.setState({
      isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    });
  };

  doEditProduct = async (product) => {
    try {
      let res = await editProductService(product);
      if (res && res.errCode === 0) {
        toast.success("Sửa sản phẩm thành công");
        await this.getAllProductsFromReact();
        this.setState({
          isOpenModalEditProduct: false,
        });
      } else if (res && res.errCode === 1) {
        toast.error("Không tìm thấy sản phẩm");
      } else if (res && res.errCode === 2) {
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    } catch (error) {}
  };

  handleDeleteProduct = async (product) => {
    try {
      let res = await deleteProductSerVice(product.id);
      if (res && res.errCode === 0) {
        await this.getAllProductsFromReact();
      } else {
        alert(res.errMessange);
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let {
      arrSearchProduct,
      arrCollectionForms,
      isShowNotification,
      arrCollectsStatusByCurrentDate,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    const { processLogout, userInfo } = this.props;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <>
        <NavAdmin />
        <div className="main_content">
          <ModalProduct
            isOpen={this.state.isOpenModalProduct}
            toggleFromParent={this.toggleProductModal}
            createNewproduct={this.createNewproduct}
          />
          {this.state.isOpenModalEditProduct && (
            <ModalEditProduct
              isOpen={this.state.isOpenModalEditProduct}
              toggleFromParent={this.toggleEditProductModal}
              currentProduct={this.state.productEdit}
              editProduct={this.doEditProduct}
            />
          )}
          <div className="container-fluid ">
            <div className="">
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
                                  let t = moment(item.createdAt);
                                  console.log("t", t);
                                  let tt = moment(`${t}`);
                                  console.log("tt", tt);
                                  return (
                                    <>
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
                                          tại {
                                            item.addressData.address_name
                                          }{" "}
                                          {""}
                                          {item.addressData.ward_name}
                                          {/* {currentDateTimeStop} */}
                                          {/* {item.createdAt} */}
                                        </div>
                                        <div className="text-minutes">
                                          {currentDateTimeStop.diff(
                                            tt,
                                            "minutes"
                                          ) > 60 ? (
                                            <>
                                              {Math.floor(
                                                currentDateTimeStop.diff(
                                                  tt,
                                                  "minutes"
                                                ) / 60
                                              )}{" "}
                                              giờ trước
                                            </>
                                          ) : (
                                            <>
                                              {currentDateTimeStop.diff(tt)}{" "}
                                              phút trước
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </>
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
          </div>
          <div className="wrapper-manage shadow-sm ">
            <div className="row title d-flex">
              <div className="col-10 title-manage">TÌM KIẾM SẢN PHẨM</div>
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
              <button
                className="col-1 btn btn-create"
                onClick={this.handleAddNewProduct}
              >
                <MdIcons.MdOutlineCreate />{" "}
                <FormattedMessage id="manage-user.add" />
              </button>
            </div>
            <div className="row content">
              <Table>
                <thead className="thead">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">
                      <FormattedMessage id="manage-product.product_name" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-product.image" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-product.description" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="manage-product.action" />
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {arrSearchProduct &&
                    arrSearchProduct.map((item, index) => {
                      let imageBase64 = "";
                      if (item.image) {
                        imageBase64 = new Buffer(item.image, "base64").toString(
                          "binary"
                        );
                      }
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.product_name}</td>
                          <td>
                            <div className="img">
                              <img src={imageBase64} className="img-img" />
                            </div>
                          </td>
                          <td>{item.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-edit mx-3"
                              onClick={() => this.handleEditProduct(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
                            <button
                              type="button"
                              className="btn btn-delete"
                              onClick={() => this.handleDeleteProduct(item)}
                              disabled={arrCollectionForms
                                .map((prd) => prd.productId)
                                .includes(item.id)}
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
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
