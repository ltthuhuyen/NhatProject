
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions"
import { withRouter } from 'react-router';
import { Table } from 'reactstrap';
import {  saveUpdateStatic } from '../../services/appointmentService';
import * as BsIcons from 'react-icons/bs';
import './Manage.scss';
import {getAllCollectionForm} from '../../services/collectionformService'
import NavAdmin from '../../components/NavAdmin';

class DetailCollectionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionForms: {},
            statusArr: [],
            status: '',
            statusType: '',
            giverData: {},
            recipientData: {},
            productData: {},
            statusTypeData: {},
            timeTypeData: {},
            date: '',
            phone: ''
           
        }
    }
    handleOnChangeInput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
         }, () => {
            console.log('check good state' , this.state)
        } )
    }

    componentDidMount(){
        this.getAllCollectionFormReact();    
        this.props.getStatusStart();

    }
    
    getAllCollectionFormReact = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let scheduleId = this.props.match.params.id;
            let response = await getAllCollectionForm (scheduleId);
            console.log('response', response)
            if (response && response.errCode === 0) {
                this.setState({
                    arrCollectionForms: response.appointments,
                    giverData: response.appointments.giverData,
                    recipientData: response.appointments.recipientData,
                    productData: response.appointments.productData,
                    statusTypeData: response.appointments.statusTypeData,
                    timeTypeData: response.appointments.timeTypeData,
                    phone: response.appointments.phone,
                    date: response.appointments.date,
                    status: response.appointments.statusTypeData.keyMap
                })
            }
          
        }
        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.statusRedux !== this.props.statusRedux) {
            let arrStatuses = this.props.statusRedux
            // console.log(arrStatuses)
            this.setState({
                statusArr: arrStatuses,
                // status: arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap: ''
            })
        }
    }

    handleUpdate = async (id, status) => {
        let response = await saveUpdateStatic({
            id : id,
            status: status
        });   
        this.props.history.push(`/recipient/collection-form/`);
    }
    render() {
        let {arrCollectionForms , giverData, recipientData ,timeTypeData , date , status} = this.state;
        let statuses = this.state.statusArr;
        const { processLogout , userInfo } = this.props;
        let imageBase64 =''
        if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')  
        }  

        return (
            <>  
            <NavAdmin />
            <div className="main_content">
                <div className='row header'>
                    <div className='col-6 header_iner d-flex justify-content-between align-items-center'>
                        <div className='serach_field-area d-flex align-items-center'>
                            <input type="text" placeholder="Search here..."
                                onChange={(e) => {this.handleOnChangeInput(e, 'search')}}/>
                            <button type="search" className="btn btn-search rounded-pill"
                                onClick = {() => this.handleSearch()}
                                ><BsIcons.BsSearch/> Tìm</button>
                        </div>
                        </div>
                        <div className='col-6 header_right justify-content-between align-items-center'>
                            <div className='d-flex'>
                                <div className="img">
                                    <img src={imageBase64} className='img-img'/>
                                </div>
                                <div className='profile-info'>Xin chào {userInfo && userInfo.lastName ? userInfo.lastName : ''} </div>
                            </div>
                    </div>      
                </div>
                <div className='row title d-flex'>
                    <div className='col-10 title-manage'>ĐƠN THU GOM MỚI </div>     
                </div>
                <div className='row content'>
                    <div className="table">
                    <Table >
                        <thead className='thead'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col" colspan='2'>Thông tin người nhận thu gom</th>
                                <th scope="col">Ngày thu gom</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col">Địa chỉ thu gom</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>

                                    <tr>
                                        <td>{arrCollectionForms.id}</td>
                                        <td>{recipientData.email}</td>
                                        <td>{recipientData.phone}</td>
                                        <td>{date}</td>
                                        <td>{timeTypeData.valueVi}</td>  
                                        <td>{giverData.address}</td>
                                        <td> 
                                            <select id="status" class="form-control"
                                                onChange = {(e) => {this.handleOnChangeInput(e, 'status')}}
                                                value = {status}
                                            >
                                                {statuses && statuses.length > 0 && 
                                                    statuses.map((item, index) => {
                                                        return (
                                                            <option key= {index} value={item.keyMap}>
                                                                {item.valueVi }
                                                            </option>)
                                                    })
                                            }
                                            </select>
                                        </td>
                                        <td> <button className="btn btn-update"  onClick={() => this.handleUpdate(this.props.match.params.id, status)}><FormattedMessage id="common.update"/></button></td>
                                    </tr>
                                
                            
                        </tbody>
                    </Table>
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
        statusRedux: state.admin.statuses,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStatusStart: () => dispatch(actions.fetchStatusStart()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCollectionForm));

