import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from "../../../store/actions"
import { LANGUAGES , dateFormat} from '../../../utils';
import './AppointmentScheduleManage.scss'
import { getAllProducts } from '../../../services/productService'
import {  saveBulkScheduleAppoinment } from '../../../services/giverService';
import { toast } from 'react-toastify'
import _, { result } from 'lodash'
import moment from 'moment';

class AppointmentScheduleManage extends Component {
    constructor(props){
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            currentDate: '',
            rangeTime: [],
            arrProducts: [],
            productId: '1',
        }
    }

    componentDidMount(){
        this.props.fetchAllAppointmentTime();
      //  this.props.fetchAllProduct();
        this.getAllProductsFromReact()
        
    }
    
    getAllProductsFromReact = async () => {
        let response = await getAllProducts('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrProducts: response.products
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.map((item , index) => {
                let object = {};
                object.label = item.product_name;
                object.value = item.productId;
                result.push(object);
            })
         
        }
        console.log('inputData', result)
        return result;
       
    }
    componentDidUpdate(prevProps){
        if (prevProps.allTime !== this.props.allTime) {
            let dataTime = this.props.allTime
            if(dataTime && dataTime.length >0 ){
                dataTime = dataTime.map(item => ({ item, isSelected: false}))
            }
            this.setState({
                rangeTime: this.props.allTime
            })
        }
        if (prevProps.allProduct !== this.props.allProduct) {
            let dataSelect = this.buildDataInputSelect(this.props.allProduct)
            this.setState({
                arrProducts: dataSelect,
                productId: dataSelect && dataSelect.length > 0 ? dataSelect[0].id : ''
              
            })
            
        }
    }

    handleOnChangeDataPicker =(date) => {
       this.setState({
           currentDate: date[0]
       })
    }

    handleOnChangeSelect =(e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleClickSchedule = (time) => {
        let {rangeTime} = this.state ;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected =  !item.isSelected;
                return item; 
              
            })
        
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    
    handleConfirm = async () => {
        let {rangeTime , currentDate , productId, arrProducts} = this.state;
     
        let result = []
        if (!currentDate) {
            toast.error("Vui lòng chọn ngày hẹn !");
            return;
        }
        if (productId && _.isEmpty(productId)){
            toast.error("Vui lòng chọn sản phẩm !");
            return;
        }
        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length >0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            console.log('selectedTime',selectedTime)
            if (selectedTime && selectedTime.length >0){
                selectedTime.map((schedule,index) => {
                    let object ={};
                    object.productId = arrProducts[index].id;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                
                })
            } else {
                toast.error("Vui lòng chọn thời gian !");
                return;
            }
        }
        console.log('result avb', result.productId)
       // let timetest = result
        // console.log('result avb', timetest.time)
        
        let res = await saveBulkScheduleAppoinment({
            arrSchedule: result
        });
      
        
    }

    render() {
        let {rangeTime, arrProducts, productId} = this.state;
        let {language} = this.props;

      console.log('state', this.state)

        return (
            <>
                <div className="title text-center">
                    <FormattedMessage id='manage-schedule.title'/>
                </div>
                <div className='schedule'> 
                    <div className='row '>
                        <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.appointment-date"/></label>
                        {/* <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.arrProducts}
                            placeholder={'Chọn sản phẩm'}
                        /> */}

                            <select id="product" class="form-control"
                                onChange={(e) => {this.handleOnChangeSelect(e, 'productId')}}
                                value={productId}
                            >
                                {arrProducts && arrProducts.length > 0 && 
                                    arrProducts.map((item, index) => {
                                        return (
                                            <option key= {index} value={item.id} style={{color: "black"}}>
                                                {/* {language === LANGUAGES.VI ? item.valueVi : item.valueEn} */}
                                            {item.product_name}
                                            </option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.appointment-date"/></label>
                            <DatePicker
                                onChange = {this.handleOnChangeDataPicker}
                                className = 'form-control'
                                value = {this.state.currentDate}
                                minDate = {new Date()}
                            />
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-6 form-group'>
                        
                        </div>
                        <div className='col-6 form-group'>
                            { rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item , index) => {
                                    return (
                                        <button 
                                            className= {
                                                item.isSelected === true  ? 'btn btn-schedule active' : 'btn btn-schedule' }
                                            key={index}
                                            onClick={() => this.handleClickSchedule(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                } )
                            }
                        </div>     
                    </div>
                    <div className='row'>
                        <div className='col-6 form-group'>
                        
                        </div>
                        <div className='col-6 form-group'>
                            <button className='btn btn-confirm' 
                                onClick={() => this.handleConfirm()}
                            >
                                Xác nhận
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
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        allTime: state.admin.allTime,
        allProduct: state.admin.allProduct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAppointmentTime:() => dispatch(actions.fetchAllAppointmentTime()),
        fetchAllProduct:() => dispatch(actions.fetchAllProduct())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScheduleManage);
