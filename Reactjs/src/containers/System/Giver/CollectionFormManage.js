
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES , CommonUtils} from "../../../utils"
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as actions from "../../../store/actions"
import { Table } from 'reactstrap';
import './CollectionFormManage.scss';
import { withRouter } from 'react-router';
import Moment from 'react-moment';
import {getCollectionFormOfGiver} from '../../../services/collectionformService'
class CollectionFormManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionForms: [],
            statusArr: [],
            status: '',
            statusType: '',
            giverId: ''
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
        let response = await getCollectionFormOfGiver(this.state.giverId);
        console.log('response',response)
        if(response && response.errCode == 0){
            this.setState({
                arrCollectionForms: response.appointments
            })
            
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.statusRedux !== this.props.statusRedux) {
            let arrStatuses = this.props.statusRedux
            console.log(arrStatuses)
            this.setState({
                statusArr: arrStatuses,
                status: arrStatuses && arrStatuses.length > 0 ? arrStatuses[0].keyMap: ''
            })
        }
    }

    handleLook = async (schedule) => {
        this.props.history.push(`/recipient/collection-form-detail/${schedule.id}`);
    }

    render() {
        let arrCollectionForms = this.state.arrCollectionForms;
        // let statuses = this.state.statusArr;
        let language = this.props.language;
        if(this.props.userInfo)
        {
            this.state.giverId = this.props.userInfo.id;
        }
       console.log("",this.state.arrCollectionForms)
        return (
            <>  
            <div className="container">
                <div className="title text-center">
                    <FormattedMessage id='manage-collection-form.title'/>
                </div>
                <div className="table">
                <Table  bordered hover>
                    <thead className='thead'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.giver"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.email"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.phone"/></th>
                            <th scope="col"><FormattedMessage id="manage-product.product_name"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.appointment-date"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.time"/></th>
                            <th scope="col"><FormattedMessage id="manage-collection-form.status"/></th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                            arrCollectionForms && arrCollectionForms.map((item, index) => {
                               
                             return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.giverData.firstName} {item.giverData.lastName}</td>
                                    <td>{item.giverData.email}</td>
                                    <td>{item.giverData.phone}</td>
                                    {/* <td>{item.giverData.address}</td> */}
                                    <td>{item.productData.product_name}</td>
                                    <td>{item.date}</td>
                                    <td>{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</td>  
                                    <td>{language === LANGUAGES.VI ? item.statusTypeData.valueVi : item.statusTypeData.valueEn}</td>
                                

                                </tr>
                                    )
                            })
                        }
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
        userInfo: state.user.userInfo,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionFormManage));
