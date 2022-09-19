
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES , CommonUtils} from "../../../utils"
import * as BiIcons from 'react-icons/bi';
import * as actions from "../../../store/actions"
import { Table } from 'reactstrap';
import './CollectionFormManage.scss';
import { withRouter } from 'react-router';
import Moment from 'react-moment';
import {getAllCollectionForm} from '../../../services/collectionformService'
class CollectionFormManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionForms: [],
            statusArr: [],
            status: '',
            statusType: '',
            recipientId: ''
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
        let response = await getAllCollectionForm('ALL');
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
       console.log("",this.state.arrCollectionForms)
       if(this.props.userInfo)
       {
           this.state.recipientId = this.props.userInfo.id;
       }
       console.log('RecipientID', this.props.userInfo.id)
        return (
            <>  
            <div className="container">
                <div className="title text-center">
                    <FormattedMessage id='manage-collection-form.title'/>
                </div>
                <div className="table-recipient">
                <Table >
                    <thead className='thead'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col" colSpan='3'>Thông tin người cho</th>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Ngày thu gom</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                    {
                            arrCollectionForms && arrCollectionForms.map((item, index) => {
                               
                             return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.giverData.firstName} {item.giverData.lastName}</td>
                                    <td>{item.giverData.email}</td>
                                    <td>{item.giverData.phone}</td>
                                    <td>{item.productData.product_name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.timeTypeData.valueVi}</td>
                                    {/* <td>{item.giverData.address}</td> */}
                                  
                                
                                    <td>{language === LANGUAGES.VI ? item.statusTypeData.valueVi : item.statusTypeData.valueEn}</td>
                                
                                    <td><button type="button" className="btn btn-detail px-2 " onClick={() => this.handleLook(item)}><BiIcons.BiMessageDetail/> Chi tiết</button></td>
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
        systemMenuPath: state.app.systemMenuPath,
        statusRedux: state.admin.statuses,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStatusStart: () => dispatch(actions.fetchStatusStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionFormManage));
