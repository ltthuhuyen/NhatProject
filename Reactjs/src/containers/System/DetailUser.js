import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Manage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import Header from '../Header/Admin/Header';
import {searchUser, getAllUsers, createNewUserService, editUserService, deleteUserSerVice} from '../../services/userService';
import {getAllAddressOfUser} from '../../services/addressService'
import { Table } from 'reactstrap';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import  {emitter} from '../../utils/emitter'
import { toast } from 'react-toastify';
import NavAdmin from '../../components/NavAdmin';
//import { Navigate } from "react-router-dom";



class DetailUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: {},
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            roleIdData: {},
            genderData: {},
            image: {},
            search: '',
            arrSearchUser: [],
            arrAddresses: [],
            userData: {}
        }
    }

    componentDidMount() {  
        this.getAllUsersFromReact()
        this.getAllAddressFromReact()
    }

    getAllUsersFromReact = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let userId = this.props.match.params.id
            console.log('userId',this.props.match.params.id)
            let response = await getAllUsers(this.props.match.params.id);
            if (response && response.errCode === 0) {
                this.setState({
                    arrUsers: response.users,
                    // roleIdData: response.users.roleIdData,
                    // image: response.users.image
                }, () => {
                    console.log('arrUsers', this.state.arrUsers)
                })
            }
        }
       
      
    }

    getAllAddressFromReact = async () =>{
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let userId = this.props.match.params.id
            console.log('userId1',userId)
            let response = await getAllAddressOfUser(userId);
            console.log('address', response)
            if (response) {
                this.setState({
                    arrAddresses: response.addresses,
                //    userData: response.addresses.userData
                }, () => {
                    console.log('arrAddresses', this.state.arrAddresses)
                }) 
            }
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

    handleAddNewUser  = () =>{
        this.setState({
            isOpenModalUser: true,
        })

    }

    handleSearch = async (search) => {
        this.props.history.push(`/system/search-user/${this.state.search}`) 
        let response = await searchUser(this.state.search); 
        console.log('response searchUser', response)
        if(response ){
            this.setState({
                arrSearchUser: response.data,
                
            })

        }
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModal = () =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewuser = async (data) =>{
        try {
            let response = await createNewUserService(data)
            if(response && response.errCode !==0){
                alert(response.errMessange)
            }else{
                toast.success('Thêm người dùng thành công!')
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        }, () => {
            console.log('user', user)
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            console.log('res', res)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                toast.success('Sửa thông tin người dùng thành công!')
                await this.getAllAddressFromReact()
            }
            else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    handleDeleteUser = async (user) => {
        console.log('user', user)
        // try {
        //     let res = await deleteUserSerVice(user.id)
        //     if(res && res.errCode === 0){
        //         toast.success('Xóa người dùng thành công!')
        //         await this.getAllUsersFromReact()
        //     }
        //     else{
        //         alert(res.errMessange)
        //     }
        // } catch (error) {
        //     console.log(error)
            
        // }
    }
    render() {
        let { arrUsers, arrAddresses } = this.state
        const { processLogout , userInfo } = this.props;
        let imageBase64 =''
        if (userInfo.image) {
        imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')  
        }   
        return (
            <>
            <NavAdmin />
            <div className="main_content">
               
               <ModalUser 
                   isOpen = {this.state.isOpenModalUser}
                   toggleFromParent = {this.toggleUserModal}
                   createNewuser = {this.createNewuser}
               />
               {
                   this.state.isOpenModalEditUser &&
                   <ModalEditUser 
                   isOpen = {this.state.isOpenModalEditUser}
                   toggleFromParent = {this.toggleEditUserModal}
                   currentUser = {this.state.userEdit}
                   editUser = {this.doEditUser}
               />
               }
            
                <div className='row header'>
                    <div className='d-flex'>
                        <div className="img">
                            <img src={imageBase64} className='img-img'/>
                        </div>
                        <div className='profile-info'>Xin chào {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }</div>
                    </div>  
                </div>
                <div className='row title d-flex'>
                    <div className='col-10 title-manage'>CHI TIẾT NGƯỜI DÙNG</div>
                    <div className='serach_field-area d-flex align-items-center'>
                        <input type="text" placeholder="Search here..."
                            onChange={(e) => {this.handleOnChangeInput(e, 'search')}}/>
                        <button type="search" className="btn btn-search rounded-pill"
                            onClick = {() => this.handleSearch()}
                        ><BsIcons.BsSearch/> Tìm</button>
                    </div>
                    <button 
                        className='col-1 btn btn-create '
                        onClick={this.handleAddNewUser}
                        >
                        <MdIcons.MdOutlineCreate/> <FormattedMessage id='manage-user.add'/>
                    </button>
                </div>               
             
              
                <div className='row content'>
                    <div className="table" >
                        <Table >
                        <thead className='thead'>
                            <tr >
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">SĐT</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Hành động</th>
                            </tr>
                            </thead>
                            <tbody className='tbody'>
                        {
                          
                                    <tr>
                                        <td>{arrUsers.id}</td>
                                        <td>{arrUsers.email}</td>
                                        <td>{arrUsers.firstName} {arrUsers.lastName}</td>
                                        <td>{arrUsers.phone}</td>
                                        <td>{arrAddresses.address_name} - {arrAddresses.ward_name} - {arrAddresses.district_name} - {arrAddresses.city_name}</td>
                                        <td className='z-index'>
                                            <button type="button" className="btn btn-edit mx-2 " onClick={() => this.handleEditUser(arrAddresses)}><AiIcons.AiOutlineEdit /></button>
                                            <button type="button" className="btn btn-delete  " onClick={() => this.handleDeleteUser(arrAddresses)}><AiIcons.AiOutlineDelete /></button>
                                        </td>
                                    </tr>
                           
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export  default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailUser));