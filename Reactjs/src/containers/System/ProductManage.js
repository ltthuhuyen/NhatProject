import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import './Manage.scss';
import {getAllProducts, createNewProductService, editProductService, deleteProductSerVice} from '../../services/productService';
import {getAllCollectionForm} from '../../services/collectionformService'
import  {emitter} from '../../utils/emitter';
import {LANGUAGES} from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import Header from '../../containers/Header/Admin/Header';
import ModalProduct from './ModalProduct';
import ModalEditProduct from './ModalEditProduct';
import NavAdmin from '../../components/NavAdmin';

class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProducts: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            productEdit: {},
            arrCollectionForms: []
        }
    }
  
    async componentDidMount() {
      
        await this.getAllProductsFromReact()
        await this.getAllCollectionFormReact()
    }

    getAllProductsFromReact = async () => {
        let response = await getAllProducts('ALL');
        console.log(response)
        if(response && response.errCode == 0){
            this.setState({
                arrProducts: response.products
            })
        }
        
    }

    getAllCollectionFormReact = async () => {
        let response = await getAllCollectionForm('ALL');
        console.log('getAllCollectionForm',response)
        if(response && response.errCode == 0){
            this.setState({
                arrCollectionForms: response.appointments
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

    toggleEditProductModal = () =>{
        this.setState({
            isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
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
        let arrCollectionForms = this.state.arrCollectionForms;
        const { processLogout , userInfo } = this.props;
        let imageBase64 =''
        if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')  
        }   
        return (
            <>
            <NavAdmin />
            <div className="main_content">
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
                <div className='row header'>
                    <div className='d-flex'>
                        <div className="img">
                            <img src={imageBase64} className='img-img'/>
                        </div>
                        <div className='profile-info'>Xin chào {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }</div>
                    </div> 
                </div>
                <div className='row title d-flex'>
                    <div className='col-10 title-manage'>QUẢN LÝ SẢN PHẨM</div>
                    <div className='serach_field-area d-flex align-items-center'>
                        <input type="text" placeholder="Search here..."
                            onChange={(e) => {this.handleOnChangeInput(e, 'search')}}/>
                        <button type="search" className="btn btn-search rounded-pill"
                            onClick = {() => this.handleSearch()}
                        ><BsIcons.BsSearch/> Tìm</button>
                    </div>
                    <button 
                        className='col-1 btn btn-create'
                        onClick={this.handleAddNewProduct}
                        >
                        <MdIcons.MdOutlineCreate/> <FormattedMessage id='manage-user.add'/>
                    </button>
                </div>
               <div className='row content'>
                    <div className="table">
                    <Table >
                        <thead className='thead'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col"><FormattedMessage id="manage-product.product_name"/></th>
                                <th scope="col"><FormattedMessage id="manage-product.image"/></th>
                                <th scope="col"><FormattedMessage id="manage-product.description"/></th>
                                <th scope="col"><FormattedMessage id="manage-product.action"/></th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {
                                arrProducts && arrProducts.map((item, index) => {
                                    let imageBase64 =''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                                        console.log('item',imageBase64)
                                    }
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.product_name}</td>
                                        <td>
                                            <div className="img">
                                                <img src={imageBase64} className='img-img'/>
                                            </div>
                                        </td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button type="button" className="btn btn-edit mx-3" onClick={() => this.handleEditProduct(item)}><AiIcons.AiOutlineEdit /></button>
                                            <button 
                                                type="button" 
                                                className="btn btn-delete" 
                                                onClick={() => this.handleDeleteProduct(item)}
                                                disabled={arrCollectionForms.map(prd=>prd.productId).includes(item.id)}
                                                >
                                                <AiIcons.AiOutlineDelete /></button>
                                        </td>
                                    
                                    </tr>
                                        )
                                })
                            }
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
            </>

            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
