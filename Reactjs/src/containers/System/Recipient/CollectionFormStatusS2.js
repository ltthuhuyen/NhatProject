
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as actions from "../../../store/actions"
import './CollectionFormStatus.scss';
import { getCollectionFormOfRegisteredRecipient } from '../../../services/collectionformService'
class CollectionFormStatusS2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrCollectionFormsStatusS2: [],
            statusArr: [],
            status: '',
            statusType: '',
            recipientId: '',

            temp:"",
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
        this.getCollectionFormOfRecipientStatusS2(); 
        // if(this.props.statusRedux){
        //     this.state.temp  = this.props.statusRedux
        // }   
        this.props.getStatusStart();
    }
    
    getCollectionFormOfRecipientStatusS2 = async () => {
        let response = await getCollectionFormOfRegisteredRecipient(this.state.recipientId);
        console.log('response',response)
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
        this.props.history.push(`/recipient/collection-form-detail/${schedule.id}`);
    }

    render() {
        let arrCollectionFormsStatusS2 = this.state.arrCollectionFormsStatusS2;
        let statusArr = this.state.statusArr
        console.log('statusArr',statusArr)
        // console.log("arrCollectionFormsStatusS2",this.state.arrCollectionFormsStatusS2)
        if(this.props.userInfo)
        {
            this.state.recipientId = this.props.userInfo.id;
        }
       
        return (
            <>
        
            <div className='container-collection-form-status shadow-lg '>
                <div className='d-flex'>
                    <Link to='/recipient/home' className='d-flex'>
                        <div className='icon'><AiIcons.AiOutlineUnorderedList/></div>
                        <span className='mt-1'>Đơn thu gom</span>
                    </Link>   
                    <Link to='/recipient/collection-form-status-s2' className='d-flex'>
                        <div className='icon'><BsIcons.BsCollection/></div>
                        <span className='mt-1'>Chờ xác nhận</span>
                    </Link>    
                    <Link to='/recipient/collection-form-status-s3' className='d-flex'>
                        <div className='icon'><BsIcons.BsCollection/></div>
                        <span className='mt-1'>Chờ thu gom</span>
                    </Link>
                    <Link to='/recipient/collection-form-status-s5' className='d-flex'>
                        <div className='icon'><BsIcons.BsCalendar2X/></div>
                        <span className='mt-1'>Đơn bị hủy</span>
                    </Link>
                    <Link to='/recipient/collection-history' className='d-flex'>
                        <div className='icon'><BsIcons.BsClipboardCheck/></div>
                        <span className='mt-1 title-history'>Xem lịch sử thu gom</span>
                        <div className='icon'><MdIcons.MdOutlineNavigateNext/></div>
                    </Link>
                </div>
               
                <div className='title'>ĐƠN THU GOM</div>
                <div className='row '>
                {
                    arrCollectionFormsStatusS2 && arrCollectionFormsStatusS2.map((item, index) => {
                    let imageBase64 =''
                    if (item.giverData.image.data) {
                        imageBase64 = new Buffer(item.giverData.image.data, 'base64').toString('binary') 
                    }
                    return (
                        <div className="col-5 collection-form shadow " key={index}>
                            <div className='row info-giver'>
                                <img src={imageBase64} className=' col-5 img-pro'/>
                                <div className='col-7'>
                                    <p className='row'>
                                        <FaIcons.FaUserAlt className='icon mt-1 mr-2'/>
                                        {item.giverData.firstName} {item.giverData.lastName}
                                    </p>
                                    <p className='row'>
                                        <HiIcons.HiOutlineMail className='icon mt-1 mr-2'/> 
                                        {item.giverData.email} 
                                    </p>
                                    <p className='row'>
                                        <BsIcons.BsTelephoneInbound className='icon mt-1 mr-2'/>
                                        {item.giverData.phone} 
                                    </p>
                                </div>
                            </div>
                            <div className='info-collection'>
                                <div className='d-flex'>
                                    <span className='info mr-1'><RiIcons.RiProductHuntLine/> Sản phẩm: </span>
                                    <p>{item.productData.product_name}</p>
                                </div>
                                <div className='d-flex'>
                                    <span className='info mr-1 mb-1'><BiIcons.BiUser/> Người nhận thu gom: </span>
                                    <p>{item.recipientData.firstName} {item.recipientData.lastName}</p>
                                </div>
                                <div className='d-flex'>
                                    {
                                        item.statusTypeData.valueVi === "Chờ xác nhận" ?
                                        
                                        <p className='status-s2'><RiIcons.RiErrorWarningLine className='icon'/> {item.statusTypeData.valueVi}</p>
                                        : 
                                        <p className='status-s3'>{item.statusTypeData.valueVi}</p>
                                    
                                    }
                                    <button className='btn btn-detail ' onClick={() => this.handleLook(item)}>Chi tiết</button>
                                </div>
                            </div>
                        </div>
                                
                    ) 
                    })
                }
              </div>
            </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionFormStatusS2));