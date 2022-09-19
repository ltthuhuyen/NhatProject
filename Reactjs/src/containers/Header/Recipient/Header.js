import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { FormattedMessage } from 'react-intl';
import '../Giver/Header.scss';
import ModalEditUser from '../../System/ModalEditUser';
import { editUserService } from '../../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    constructor(props){
        super(props);
        this.state = {
            isOpenModalEditUser: false,
            userEdit: {},
            search: ''
        }
    }

    toggleEditUserModal = () =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
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

    handleEditUserInfo = (userId) =>{
        // console.log('check edit userId',userId )
        this.setState({
            isOpenModalEditUser: true,
            userEdit: userId
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                toast.success('Sửa thông tin người dùng thành công!')
            }
            else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { processLogout , isLoggedIn, userInfo } = this.props;
        let language = this.props.language;
        console.log(isLoggedIn)
        let imageBase64 =''
        if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')  
        }   
        return (
          <div >
            {
                this.state.isOpenModalEditUser &&
                // <ModalEditUser 
                //     isOpen = {this.state.isOpenModalEditUser}
                //     toggleFromParent = {this.toggleEditUserModal}
                //     currentUser = {this.state.userEdit}
                // />
                <ModalEditUser 
                isOpen = {this.state.isOpenModalEditUser}
                toggleFromParent = {this.toggleEditUserModal}
                currentUser = {this.state.userEdit}
                editUser = {this.doEditUser}
                />
            }

            <div className="home-header">
                <div className='row t'>
                <div className='col-4'></div>
                <div className='col-4 title'>R E C Y C L E   C O L L E C T I O N</div>
                <div className="col-4 d-flex ">
                    <div class="tool"> 
                        <>
                            <AiIcons.AiOutlineQuestionCircle size={"20px"} className="m-1"/> 
                            Hỗ trợ
                        </>
                        <>
                            <BsIcons.BsFacebook size={"16px"} className="m-2" />
                            Kết nối
                        </>
                       
                       
                    </div>
                    <div className="login-register-content">
                        {isLoggedIn === false ? (
                            <>
                                <div className="btn-content">
                                    <Link to ='/login'>
                                        <button className='btn btn-login-register'><FormattedMessage id="login.login"/></button>
                                    </Link> 
                                </div>
                                <div className="btn-content">
                                    <Link to ='/register'>
                                        <button className='btn btn-login-register'><FormattedMessage id="register.register"/></button>
                                    </Link> 
                                </div>
                            </>
                        ) :<>
                                <div className='container-welcome' onClick={() => this.handleEditUserInfo(userInfo)}>  
                                    <div className='d-flex'>
                                        <div className="img">
                                            <img src={imageBase64} className='img-img'/>
                                        </div>
                                        <div className='profile-info'>Xin chào  {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }</div>
                                    </div>
                                   

                                </div>
                                <div className="btn btn-logout" onClick={processLogout}>
                                    <FiIcons.FiLogOut/>
                                </div>

                               

                               
                           </>
                        }
                    </div>
                    
            
                </div>
                </div>
                <div className="row content">
                    {/* <div className="left-content">
                        <h1><a className='font header-logo' href="">Nhặt</a></h1>
                    </div> */}
                    <div className="center-content">
                        <div className="child-content">
                            <Link to ='/recipient/home' className='link-homepage'>
                                TRANG CHỦ
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/recipient/collection-form-status-s2' className='link-homepage'>
                                ĐƠN THU GOM
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/news' className='link-homepage'>
                                TIN TỨC
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/contest' className='link-homepage'>
                                CUỘC THI
                            </Link>
                        </div>
                        <div className="child-content">
                            <Link to ='/giver/contest' className='link-homepage'>
                                NHẬN DẠNG
                            </Link>
                        </div>
                        {/* <div className="right-content">
                            <input type="text" class="form-control rounded-pill" id="exampleInputPassword1"
                                onChange={(e) => {this.handleOnChangeInput(e, 'search')}}

                            />
                           
                            <button type="search" class="btn btn-search rounded-pill">Tìm kiếm</button>
                        </div> */}
                            
                    </div>
                </div>
            </div>

            
              
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);