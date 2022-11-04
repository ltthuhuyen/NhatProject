import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Container.scss";
import { getAllProducts } from "../../services/productService";
import SlideShow from "../SlideShow/SlideShow";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import { createNewTemp } from "../../services/appointmentService";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      giverId: "",
      isOpenModalProduct: false,
    };
  }

  async componentDidMount() {
    await this.getAllProductsFromReact();
    this.props.fetchAllTemp(this.state.giverId);
  }

  getAllProductsFromReact = async () => {
    let response = await getAllProducts("ALL");
    console.log(response);
    if (response && response.errCode == 0) {
      this.setState({
        arrProducts: response.products,
      });
    }
  };

  handleOnChangeClick = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleClickProduct = async (product) => {
    let res = await createNewTemp({
      productId: product.id,
      giverId: this.state.giverId,
      date: product.date,
      timeType: product.timeType,
    });

    this.props.fetchAllTemp(this.state.giverId);
    this.props.history.push("/giver/cart");
  };

  render() {
    let arrProducts = this.state.arrProducts;
    if (this.props.userInfo) {
      this.state.giverId = this.props.userInfo.id;
    }

    return (
      <div className="container">
        <div>
          <div className="title-news">THU GOM TẬN NƠI</div>
          <div className="line"></div>
        </div>

        <div className="container-product shadow-lg">
          <div className="row">
            {arrProducts &&
              arrProducts.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div className="col-5 product shadow" key={index}>
                    <div className="row">
                      <div className="col-6 img">
                        <img src={imageBase64} className="img-pro" />
                      </div>
                      <div className="row col-6">
                        <div className="col-12 ">
                          <span className="description-pro">Mô tả:</span>
                          <p>{item.description}</p>
                        </div>
                        <button
                          type="button"
                          className="col-11 btn product-name"
                          onClick={() => this.handleClickProduct(item)}
                        >
                          {item.product_name}
                        </button>
                      </div>
                    </div>
                  </div>
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
