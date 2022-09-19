import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import * as actions from "../../../store/actions"
import * as AiIcons from 'react-icons/ai';
import './CartManage.scss';
import Header from '../../Header/Giver/Header'
import { getAllTemps, deleteTempSerVice, saveBulkScheduleAppoinment } from '../../../services/appointmentService';
import { toast } from 'react-toastify'
import _, { result } from 'lodash'
import moment from 'moment';
import { Table } from 'reactstrap';

class CartManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            productId: '',
            product_name: '',
            description: '',
            giverId: '',
            arrTemps: [],
            productData: {},

        }
    }

    async componentDidMount(){
        await this.props.fetchAllTemp(this.state.giverId)
        this.setState({
            arrTemps : this.props.temps
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.temps !== this.props.temps){
            this.setState({
                arrTemps : this.props.temps
            })
        }
    }
    // getAllTempsFromReact = async () => {
    //     let response = await getAllTemps(this.state.giverId);
    //     console.log('arrTemps', response)
    //     if(response && response.errCode == 0){
    //         this.setState({
    //             arrTemps: this.props.temps
    //         })
           
    //     }
        
    // }
    
    handleOnChangeClick = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleDeleteTemp = async (tempId) => {
        console.log('productId',tempId)
        try {
            let linhsua = await deleteTempSerVice(tempId.id)
            
            if(linhsua && linhsua.errCode == 0){
                await this.props.fetchAllTemp(this.state.giverId)
            }
            else{
                alert(linhsua.errMessange)
            }
        } catch (error) {
            console.log(error)    
        }
    }  
       
    handleClickGive = async () => {
        let {productId} = this.state;
     
        let result = []
       
        if (productId && productId.length >0){
                productId.map((schedule,index) => {
                    let object ={};
                    object.productId = productId;
                    object.statusType = 'S1'
                    result.push(object)
                    console.log("check object",object)
                
                })
            } else {
                toast.error("Vui lòng chọn sản phẩm");
                return;
            }
        
        let response = await saveBulkScheduleAppoinment({
            arrSchedule: result
            
        });   
    }

    render() {
        let {productId , product_name , description , arrTemps} = this.state;
        let {language} = this.props;
        console.log("check temps", this.props.temps)
        if(this.props.userInfo)
        {
            this.state.giverId = this.props.userInfo.id;
        }
        
        console.log("Check giverId", this.state.giverId)
        return (
            <>
                <Header />
                <div className="container-cart">
                    <div className="title text-center">
                        <FormattedMessage id='manage-collection-form.title'/>
                    </div>
                    <div className="table-cart">
                    <Table bordered>
                        <thead className='thead'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col"><FormattedMessage id="manage-product.product_name"/></th>
                                <th scope="col"><FormattedMessage id="manage-product.description"/></th>
                                <th scope="col"><FormattedMessage id="manage-collection-form.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrTemps && arrTemps.map((item, index) => {        
                                return (
                                    <tr>
                                        <td>{item.productId}</td>
                                        <td>{item.productTemp.product_name}</td>
                                       
                                        <td>{item.productTemp.description}</td>
                                        <td>
                                            <button type="button" className="btn btn-delete px-2" onClick={() => this.handleDeleteTemp(item)}><AiIcons.AiOutlineDelete /></button>
                                        </td>
                                    </tr>
                                        )
                                })
                            }
                        </tbody>
                    </Table>
                    </div>
                    <div className="row text-center">
                        <div className='col-md-6'>
                            <button className='btn btn-booking'>
                                <Link className='link' to = "/giver/home"><FormattedMessage id="common.choose-continue"/></Link>
                            </button>
                        </div>
                        <div className='col-md-6'>
                            <button className='btn btn-booking'>
                                <Link className='link' to = "/giver/appointment-schedule"><FormattedMessage id="common.booking"/></Link> 
                            </button>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // language: state.app.language,
        // systemMenuPath: state.app.systemMenuPath,
        // allTime: state.admin.allTime,
        // allProduct: state.admin.allProduct,
        userInfo: state.user.userInfo,
        temps: state.admin.temps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllAppointmentTime:() => dispatch(actions.fetchAllAppointmentTime()),
        fetchAllTemp:(giverId) => dispatch(actions.fetchAllTemp(giverId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
