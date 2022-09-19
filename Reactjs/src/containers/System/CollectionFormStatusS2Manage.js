
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import * as BsIcons from 'react-icons/bs';
import * as actions from "../../store/actions";
import { Table } from 'reactstrap';
import './Manage.scss';
import { withRouter } from 'react-router';
import {getRegisteredCollectionForm} from '../../services/collectionformService'
import NavAdmin from '../../components/NavAdmin';

class CollectionFormStatusS2Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionForms: [],
            statusArr: [],
            status: '',
            statusType: ''
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
        this.getCollectionFormStatusS2();    
        this.props.getStatusStart();
        

    }
    
    getCollectionFormStatusS2 = async () => {
        let response = await getRegisteredCollectionForm('ALL');
        console.log('collection-form S2', response)
        if(response && response.errCode == 0){
            this.setState({
                arrCollectionFormsStatusS2: response.appointments
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
        console.log(schedule)
        this.props.history.push(`/system/collection-form-detail/${schedule.id}`);
    }

    render() {
        let arrCollectionFormsStatusS2 = this.state.arrCollectionFormsStatusS2
        console.log('arrCollectionFormsStatusS2', arrCollectionFormsStatusS2)
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
                    <div className='d-flex'>
                        <div className="img">
                            <img src={imageBase64} className='img-img'/>
                        </div>
                        <div className='profile-info'>Xin chào {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }</div>
                    </div>   
                </div>
                <div className='row title d-flex'>
                    <div className='col-10 title-manage'>ĐƠN THU GOM MỚI </div>
                    <div className='serach_field-area d-flex align-items-center'>
                        <input type="text" placeholder="Search here..."
                            onChange={(e) => {this.handleOnChangeInput(e, 'search')}}/>
                        <button type="search" className="btn btn-search rounded-pill"
                            onClick = {() => this.handleSearch()}
                        ><BsIcons.BsSearch/> Tìm</button>
                    </div>
                </div>
                <div className='row content'>
                    <div className="table">
                    <Table >
                        <thead className='thead'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col"colspan='3'>Thông tin người cho</th>
                                <th scope="col">Sản phẩm</th>
                                {/* <th scope="col">Ngày thu gom</th>
                                <th scope="col">Thời gian</th> */}
                                <th scope="col">Người nhận thu gom</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                        {
                                arrCollectionFormsStatusS2 && arrCollectionFormsStatusS2.map((item, index) => {
                                
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.giverData.firstName} {item.giverData.lastName}</td>
                                        <td>{item.giverData.email}</td>
                                        <td>{item.giverData.phone}</td>
                                        <td>{item.productData.product_name}</td>
                                        {/* <td>{item.date}</td>
                                        <td>{item.timeTypeData.valueVi}</td>  */}
                                        <td>{item.recipientData.firstName} {item.recipientData.lastName}</td>
                                        <td>{item.statusTypeData.valueVi}</td>
                                    
                                        <td><button type="button" className="btn btn-detail px-2 " onClick={() => this.handleLook(item)}><BsIcons.BsInfoCircle/> Chi tiết</button></td>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionFormStatusS2Manage));