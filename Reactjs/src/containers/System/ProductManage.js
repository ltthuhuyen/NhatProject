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
      currentPage: 1,
      todosPerPage: 10,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getAllProductsFromReact();
    this.getAllCollectionFormReact();
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
    let arrProducts = this.state.arrProducts;
    let arrCollectionForms = this.state.arrCollectionForms;
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
          <div className="row header">
            <div className="d-flex">
              <div className="img">
                <img src={imageBase64} className="img-img" />
              </div>
              <div className="profile-info">
                Xin chào{" "}
                {userInfo && userInfo.firstName + userInfo.lastName
                  ? userInfo.firstName + " " + userInfo.lastName
                  : ""}
              </div>
            </div>
          </div>
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
            <div className="table">
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
