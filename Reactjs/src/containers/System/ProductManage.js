import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import { toast } from "react-toastify";
import { changeLanguageApp } from "../../store/actions";
import "./Manage.scss";
import {
  getAllProducts,
  createNewProductService,
  editProductService,
  deleteProductSerVice,
} from "../../services/productService";
import { searchProduct } from "../../services/searchService";
import { FormattedMessage } from "react-intl";
import ModalProduct from "./ModalProduct";
import ModalEditProduct from "./ModalEditProduct";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import { dateFormat } from "../../utils";
import {
  getAllSchedule,
  getCollectionFormStatusByCurrentDate,
} from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      arrSchedule: [],
      isOpenModalProduct: false,
      isOpenModalEditProduct: false,
      productEdit: {},
      arrCollectionForms: [],
      search: "",
      arrSearchProduct: [],
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllProductsFromReact();
    await this.getAllCollectionFormReact();
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
    let responseSchedlue = await getAllSchedule("ALL");
    if (responseSchedlue && responseSchedlue.errCode == 0) {
      this.setState(
        {
          arrSchedule: responseSchedlue.appointments,
        },
        () => {
          console.log("arrSchedule", this.state.arrSchedule);
        }
      );
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

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleSearch = async (search) => {
    let response = await searchProduct(this.state.search);
    if (response) {
      this.setState({
        arrSearchProduct: response,
      });
    }
    this.props.history.push(`/system/search-product/${this.state.search}`);
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
    let res = await createNewProductService(data);
    console.log("res", res);
    if (res && res.errCode == 0) {
      toast.success("Thêm sản phẩm thành công");
      await this.getAllProductsFromReact();
    } else if (res && res.errCode == 1) {
      toast.error("Sản phẩm này đã tồn tại");
    } else if (res && res.errCode == 2) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
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
      arrProducts,
      arrSchedule,
      arrCollectsStatusByCurrentDate,
      isShowNotification,
      currentDateTimeStop,
    } = this.state;
    let arrCollectionForms = this.state.arrCollectionForms;

    currentDateTimeStop = moment(currentDateTimeStop);
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrProducts.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrProducts.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

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
                                // console.log("t", t);
                                let tt = moment(`${t}`);
                                // console.log("tt", tt);
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
                                    <div className="text-minutes">
                                      {currentDateTimeStop.diff(tt, "minutes") >
                                      60 ? (
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
                                          {currentDateTimeStop.diff(
                                            tt,
                                            "minutes"
                                          )}{" "}
                                          phút trước
                                        </>
                                      )}
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
          <div className="wrapper-manage shadow-sm ">
            <div className="row title d-flex">
              <div className="col-10 title-manage">QUẢN LÝ SẢN PHẨM</div>
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
              <div className="wrapper-title-sum-statistic d-flex">
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">{arrProducts.length} sản phẩm</div>
                </span>
              </div>
              <Table className="shadow">
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
                  {currentTodos &&
                    currentTodos.map((item, index) => {
                      let imageBase64 = "";
                      if (item.image) {
                        imageBase64 = new Buffer(item.image, "base64").toString(
                          "binary"
                        );
                      }
                      return (
                        <tr>
                          <td>{item?.id}</td>
                          <td>{item?.product_name}</td>
                          <td>
                            <div className="img">
                              <img src={imageBase64} className="img-img" />
                            </div>
                          </td>
                          <td>{item?.description}</td>
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
                              disabled={arrSchedule
                                .map((prd) => prd.id)
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
            <div className="row btn-pageNumber d-flex">
              {pageNumbers.map((number) => {
                return (
                  <button
                    className="btn btn-prev-next d-flex"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                  >
                    {number}
                  </button>
                );
              })}
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
