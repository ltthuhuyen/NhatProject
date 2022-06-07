import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from "../../../store/actions"
import { LANGUAGES , dateFormat} from '../../../utils';
import Home from '../../HomePage/Home'
import './AppointmentScheduleManage.scss'
import { getAllProducts } from '../../../services/productService'
import {  saveBulkScheduleAppoinment } from '../../../services/appointmentService';
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
            giverId: '',
            rangeTime: [],
            arrTemps: [],
            statusType: '',
            date: '',
            timeType: '',
           
        }
    }

    componentDidMount(){
        this.props.fetchAllAppointmentTime();
        this.props.fetchAllTemp(this.state.giverId)
        
    }

    // buildDataInputSelect = (inputData) => {
    //     let result = [];
    //     if(inputData && inputData.length > 0){
    //         inputData.map((item , index) => {
    //             let object = {};
    //             object.label = item.product_name;
    //             object.value = item.productId;
    //             result.push(object);
    //         })
         
    //     }
    //     console.log('inputData', result)
    //     return result;
       
    // }
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
        if (prevProps.allStatus !== this.props.allStatus) {
            let dataSelect = this.buildDataInputSelect(this.props.allStatus)
            this.setState({
                arrProducts: dataSelect,
                productId: dataSelect && dataSelect.length > 0 ? dataSelect[0].id : ''
              
            })
            
        }
    }

    handleOnChangeDataPicker =(date) => {
       this.setState({
           currentDate:moment( date[0]).format(dateFormat.SEND_TO_SERVER)
           
       })
      // console.log('currentDate', this.state.currentDate)
    }

    handleOnChangeSelect =(e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleClickSchedule = (time) => {
        // console.log('time', time)
        // // let {rangeTime} = this.state ;
        // // if(rangeTime && rangeTime.length > 0){
        // //     rangeTime = rangeTime.map(item => {
        // //         if(item.id === time.id) item.isSelected =  !item.isSelected;
        // //         return item; 
               
        // //     })
        
            this.setState({
                timeType: time.keyMap
            })
     
        
    }
    
    handleConfirm = async () => {
        let {currentDate , timeType} = this.state;
        if (!currentDate) {
            toast.error("Vui lòng chọn ngày hẹn !");
            return;
        }
        let arrTemps = this.props.temps
        if(arrTemps && arrTemps.length>0)
        {
            arrTemps = arrTemps.map(item =>{               
            item.date = currentDate
            item.timeType = timeType
            item.statusType = "S1"
            return item;
            })
           
        }
        // console.log("check result",result)
        let response = await saveBulkScheduleAppoinment({
            arrSchedule: arrTemps
            
        
        });  
        toast.success("Đặt lịch thu gom thành công") 
    }

    render() {
        let {rangeTime, arrTemps } = this.state;
        let {language} = this.props;
        if(this.props.userInfo)
        {
            this.state.giverId = this.props.userInfo.id;
        }
        
        // console.log("Check state", this.state)
        // console.log("check temps", this.props.temps)
        return (
            <>
                <div className="title text-center">
                    <FormattedMessage id='manage-schedule.title'/>
                </div>
                <div className='schedule'> 
                    <div className='row '>
                        <div className='col-3 form-group'></div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.appointment-date"/></label>
                            <DatePicker
                                onChange = {this.handleOnChangeDataPicker}
                                className = 'form-control date'
                                value = {this.state.currentDate}
                                minDate = {new Date()}
                            />
                        </div>
                        <div className='col-3 form-group'></div>
                    </div>
                    <div className='row '>
                        <div className='col-3 form-group'></div>
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
                        <div className='col-3 form-group'></div>  
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
        allProduct: state.admin.allProduct,
        userInfo: state.user.userInfo,
        temps: state.admin.temps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAppointmentTime:() => dispatch(actions.fetchAllAppointmentTime()),
        fetchAllTemp:(giverId) => dispatch(actions.fetchAllTemp(giverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScheduleManage);
