import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import './Manage.scss';
import {getAllProducts, createNewProductService, editProductService, deleteProductSerVice} from '../../services/productService';
import  {emitter} from '../../utils/emitter';
import {LANGUAGES} from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import Header from '../../containers/Header/Admin/Header';
import ModalProduct from './ModalProduct';
import ModalEditProduct from './ModalEditProduct';
class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProducts: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            productEdit: {}
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

    handleAddNewProduct  = () =>{
        this.setState({
            isOpenModalProduct: true,
        })

    }

    toggleProductModal = () =>{
        this.setState({
            isOpenModalProduct: !this.state.isOpenModalProduct,
        })
    }

    createNewproduct = async (data) =>{
        try {
            let response = await createNewProductService(data)
            if(response && response.errCode !==0){
                alert(response.errMessange)
            }else{
                await this.getAllProductsFromReact()
                this.setState({
                    isOpenModalProduct: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditProduct = async (product) => {
        this.setState({
            isOpenModalEditProduct: true,
            productEdit: product
        })
    }

    doEditProduct = async (product) => {
        try {
            let res = await editProductService(product)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditProduct: false
                })
                await this.getAllProductsFromReact()
            }
            else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
       
        // console.log('save product')
    }
    
    handleDeleteProduct = async (product) => {
        try {
            let res = await deleteProductSerVice(product.id)
            if(res && res.errCode === 0){
                await this.getAllProductsFromReact()
            }
            else{
                alert(res.errMessange)
            }
        } catch (error) {
            console.log(error)    
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let arrProducts = this.state.arrProducts;
        let language = this.props.language;
        return (
            <>
            <div className="container">
                <Header />
                <ModalProduct
                    isOpen = {this.state.isOpenModalProduct}
                    toggleFromParent = {this.toggleProductModal}
                    createNewproduct = {this.createNewproduct}
                />
                {
                this.state.isOpenModalEditProduct &&
                <ModalEditProduct 
                    isOpen = {this.state.isOpenModalEditProduct}
                    toggleFromParent = {this.toggleEditProductModal}
                    currentProduct = {this.state.productEdit}
                    editProduct = {this.doEditProduct}
                />
                }
                <div className="title text-center">
                    <FormattedMessage id='manage-product.title'/>
                </div>
                <button 
                    className='btn btn-create px-2'
                    onClick={this.handleAddNewProduct}
                >
              
                    <div className='title-create'>
                        <GrIcons.GrAddCircle  /> Thêm
                    </div>
                      
                </button>
             

          
                <div className="table">
                <Table bordered>
                    <thead className='thead'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col"><FormattedMessage id="manage-product.product_name"/></th>
                            <th scope="col"><FormattedMessage id="manage-product.image"/></th>
                            <th scope="col"><FormattedMessage id="manage-product.description"/></th>
                            <th scope="col"><FormattedMessage id="manage-product.action"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrProducts && arrProducts.map((item, index) => {
                                let imageBase64 =''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                                }
                             return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <div className="img">
                                            <img src={imageBase64} className='img-img'/>
                                        </div>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-edit px-2 mx-3" onClick={() => this.handleEditProduct(item)}><AiIcons.AiOutlineEdit /></button>
                                        <button type="button" className="btn btn-delete px-2" onClick={() => this.handleDeleteProduct(item)}><AiIcons.AiOutlineDelete /></button>
                                    </td>
                                </tr>
                                    )
                            })
                        }
                    </tbody>
                </Table>
                </div>
            </div>
            </>

            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
