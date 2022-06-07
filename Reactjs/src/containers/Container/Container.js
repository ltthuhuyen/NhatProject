import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Container.scss'
import banner1 from "../../assets/images/banner1.jpg";
import chainhua from "../../assets/images/chainhua.jpg";
import hopgiay from "../../assets/images/hopgiay.jpg";
import lynhua from "../../assets/images/istockphoto-1185249418-170667a.jpg";
import lonnhom from "../../assets/images/3110_bottledwater.jpg"
import thungcatton from "../../assets/images/thunggiay.png"
import chaithuytinh from "../../assets/images/chaithuytinh.jpg"
import {getAllProducts} from '../../services/productService';
import SlideShow from '../SlideShow/SlideShow';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions"
import {  saveBulkScheduleAppoinment } from '../../services/appointmentService';
import {createNewTemp} from '../../services/appointmentService'
import { toast } from 'react-toastify'
class Container extends Component {
    constructor(props) {
      super(props);
      this.state = {
        arrProducts: [],
        giverId: '',
        isOpenModalProduct: false,
      }
    }


      async componentDidMount() {
          await this.getAllProductsFromReact()

          this.props.fetchAllTemp(this.state.giverId)
      }

      getAllProductsFromReact = async () => {
          let response = await getAllProducts('ALL');
          if(response && response.errCode == 0){
              this.setState({
                  arrProducts: response.products
              })
          }
      }
    
    
    handleOnChangeClick =(e, id) => {
      let copyState = {...this.state};
      copyState[id] = e.target.value;
      this.setState({
          ...copyState
      })
    }

    handleClickProduct = async (product) => {
      // console.log("check item ", product)
      this.props.history.push(`/giver/cart/${product.id}`);
      createNewTemp ({
        productId: product.id,
        giverId: this.state.giverId,
        date: product.date,
        timeType: product.timeType,
      })
      this.props.fetchAllTemp(this.state.giverId)
    }
    
    render() {
      let arrProducts = this.state.arrProducts;
      
      if(this.props.userInfo)
      {
          this.state.giverId = this.props.userInfo.id;
      }
      console.log("giverId",  this.state.giverId)
      console.log("check temps", this.props.temps)
        return (
            <>
            <div className="slide-show">
              <div className="home-header-banner slide-show img-wrap img container"> <SlideShow /></div>
              {/* <img src={banner1} className=""  alt="" width="200"></img> */}
             
            </div>
            <div className="container-product ">
                  <div className="row">
                  {
                    arrProducts && arrProducts.map((item, index) => {
                    let imageBase64 =''
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                    }
                    return (
                      <div className="col-4 product" key={index}>
                        <div className="product-item">
                            <div className="img">
                              <img src={imageBase64} className='img-pro'/>
                            </div>
                            <div className="btn-give" >
                              {/* <Link to="/giver/appointment-schedule">
                                <button type="button" className="btn product-name">{item.product_name}</button>
                              </Link> */}

                                <button type="button" className="btn product-name" onClick={() => this.handleClickProduct(item)}>
                                  {item.product_name}
                                </button>
                            </div>
                          </div> 
                        </div>
                                
                     ) 
                    })
                }
                </div>
            </div>
            </>

        )
  }
}
const mapStateToProps = state => {
  return {
      // language: state.app.language,
      // systemMenuPath: state.app.systemMenuPath,
      // allTime: state.admin.allTime,
      // allProduct: state.admin.allProduct,
      userInfo: state.user.userInfo,
      temps: state.admin.temps,
      
  };
};

const mapDispatchToProps = dispatch => {
  return {
      // fetchAllAppointmentTime:() => dispatch(actions.fetchAllAppointmentTime()),
      // fetchAllProduct:() => dispatch(actions.fetchAllProduct()),
      fetchAllTemp:(giverId) => dispatch(actions.fetchAllTemp(giverId)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
