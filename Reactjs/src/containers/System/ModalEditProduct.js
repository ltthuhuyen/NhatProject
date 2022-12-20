import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import Lightbox from "react-image-lightbox";
import { CRUD_ACTIONS, CommonUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import Grid from "@mui/material/Grid";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
class ModalEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,
      product_name: "",
      image: "",
      description: "",
    };
  }
  componentDidMount() {
    let product = this.props.currentProduct;
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = new Buffer(product.image, "base64").toString("binary");
    }
    if (product && !_.isEmpty(product)) {
      // lấy giá trị hiện tại
      this.setState({
        id: product.id,
        product_name: product.product_name,
        image: imageBase64,
        description: product.description,
      });
    }
    console.log("didmount edit modal", this.props.currentProduct);
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

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    console.log("data", data);
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["product_name", "description"];
    for (let i = 0; i < arrInput.length; i++) {
      console.log("input", this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Đối số không hợp lệ " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveProduct = () => {
    this.props.editProduct(this.state);
  };

  render() {
    let { product_name, description } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        //centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="manage-product.edit" />
        </ModalHeader>
        <ModalBody>
          <form className="form-create-edit">
            <div className="form-row">
              <div className="col-8">
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  value={product_name}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "product_name");
                  }}
                />
              </div>

              <div className="col-4">
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="upload-file" htmlFor="previewImg">
                    <BsIcons.BsCamera size={"20px"} /> Tải ảnh
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{ backgroundImage: `url(${this.state.image})` }}
                    onClick={() => this.openPreviewImage()}
                  >
                    {/* <img src={thisimage} className='img-img'/> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-12">
                <label>Mô tả sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  value={description}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "description");
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-save"
              onClick={() => this.handleSaveProduct()}
            >
              {" "}
              Lưu
            </button>

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct);
