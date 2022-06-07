
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES , CommonUtils} from "../../utils"
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as actions from "../../store/actions"
import { withRouter } from 'react-router';
import { Table } from 'reactstrap';
import {  saveUpdateStatic } from '../../services/appointmentService';
import './Manage.scss';
import Header from '../Header/Header';
import {getAllCollectionForm} from '../../services/collectionformService'
class DetailCollectionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionForms: {},
            statusArr: [],
            status: '',
            statusType: '',
            giverData: {},
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
            if (response && response.errCode === 0) {
                this.setState({
                    arrCollectionForms: response.appointments,
                    giverData: response.appointments.giverData,
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
        let {arrCollectionForms , giverData, timeTypeData , statusTypeData , date , status} = this.state;
        let statuses = this.state.statusArr;
        let language = this.props.language;

        return (
            <>  
            <Header />
            <div className="container">
                <div className="title text-center">
                    <FormattedMessage id='manage-collection-form.title'/>
                </div>
                <div className="table">
                <Table bordered>
                    <thead className='thead'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col"><FormattedMessage id="manage-user.address"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.appointment-date"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.time"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.status"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.action"/></th>
                        </tr>
                    </thead>
                    <tbody>

                                <tr>
                                    <td>{arrCollectionForms.id}</td>
                                    <td>{giverData.address}</td>
                                    <td>{date}</td>
                                    <td>{language === LANGUAGES.VI ? timeTypeData.valueVi : timeTypeData.valueEn}</td>  
                                    <td> 
                                        <select id="status" class="form-control"
                                            onChange = {(e) => {this.handleOnChangeInput(e, 'status')}}
                                            value = {status}
                                        >
                                            {statuses && statuses.length > 0 && 
                                                statuses.map((item, index) => {
                                                    return (
                                                        <option key= {index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        statusRedux: state.admin.statuses,
        // roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStatusStart: () => dispatch(actions.fetchStatusStart()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCollectionForm));

