import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Manage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import {searchUser, getAllUsers, createNewUserService, editUserService, deleteUserSerVice} from '../../services/userService';
import {getAllAddressOfUser} from '../../services/addressService'
import { Table } from 'reactstrap';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import  {emitter} from '../../utils/emitter'
import { toast } from 'react-toastify';
import NavAdmin from '../../components/NavAdmin';
//import { Navigate } from "react-router-dom";



class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            roleIdData: '',
            genderData: '',
            search: '',
            arrSearchUser: []
        }
    }

    async componentDidMount() {  
        await this.getAllUsersFromReact()
        // await this.getAllAddressFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    // getAllAddressFromReact = async () =>{
    //     let response = await getAllAddressOfUser(this.state.userEdit);
    //     console.log('address', response)
    //     if (response) {
    //         this.setState({
    //             arrAddresses: response.addresses,
               
    //         }) 
    //     }
    // }

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
        let response = await searchUser(this.state.search); 
        if(response ){
            this.setState({
                arrSearchUser: response.data,
                
            })
        }
        this.props.history.push(`/system/search-user/${this.state.search}`) 
    }

    handleDetailUser = async (item) => {
        this.props.history.push(`/system/user-manage-detail/${item.id}`) 
       
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
       
        // console.log('check data from child: ', data)
    }



    render() {
        let arrUsers = this.state.arrUsers;
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
                    <div className='col-6 title-manage'>QUẢN LÝ NGƯỜI DÙNG</div>
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
                            <th scope="col">Quyền</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ảnh đại diện</th>
                            <th scope="col">Họ tên</th>
                            <th scope='col'>SĐT</th>
                            <th scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className='tbody'>
                    {
                            arrUsers && arrUsers.map((item, index) => {
                                let imageBase64 =''
                                if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                                }
                                return (
                                    <tr>  
                                            <td>{item.id}</td>
                                            <td>{item.roleIdData.valueVi}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <div className="img">
                                                    <img src={imageBase64} className='img-img'/>
                                                </div>
                                            </td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.phone}</td>
                                            <td className='z-index'>
                                                <button type="button" className="btn btn-detail  " onClick={() => this.handleDetailUser(item)}><BsIcons.BsThreeDots /></button>
                                                {/* <button type="button" className="btn btn-edit mx-2 " onClick={() => this.handleEditUser(item)}><AiIcons.AiOutlineEdit /></button>
                                                <button type="button" className="btn btn-delete  " onClick={() => this.handleDeleteUser(item)}><AiIcons.AiOutlineDelete /></button> */}
                                            </td>
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManage));