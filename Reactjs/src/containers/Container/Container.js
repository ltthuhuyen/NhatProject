import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

class Container extends Component {
      constructor(props) {
        super(props);
        this.state = {
            arrProducts: [],
            isOpenModalProduct: false,
        }
    }


    async componentDidMount() {
      
        await this.getAllProductsFromReact()
    }

    getAllProductsFromReact = async () => {
        let response = await getAllProducts('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrProducts: response.products
            })
        }
    }

    render() {
      let arrProducts = this.state.arrProducts;
        return (
            <>
            <div className="home-header-banner img-wrap img container">
              <img src={banner1} className=""  alt="" width="200"></img>
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
                      <div className="col-4 product">
                        <div className="product-item">
                            <div className="img">
                              <img src={imageBase64} className='img-pro'/>
                            </div>
                            <div className="btn-give" >
                              <button type="button" className="btn product-name">{item.product_name}</button>
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
export default (Container);