import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Manage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import Header from '../../containers/Header/Admin/Header'
import {getAllUsers, getUserRoleIDService, createNewUserService, editUserService, deleteUserSerVice} from '../../services/userService';
import { IconContext } from 'react-icons';
import { Table } from 'reactstrap';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import  {emitter} from '../../utils/emitter'
import { ToastContainer, toast } from 'react-toastify';



class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
      
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser  = () =>{
        this.setState({
            isOpenModalUser: true,
        })

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

    handleEditUser = async (user) => {
        //console.log('edit user ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
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
                await this.getAllUsersFromReact()
            }
            else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserSerVice(user.id)
            if(res && res.errCode === 0){
                toast.success('Xóa người dùng thành công!')
                await this.getAllUsersFromReact()
            }
            else{
                alert(res.errMessange)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    render() {
        // console.log('check render ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="container">
                <Header />
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
                <div className="title text-center">
                    <FormattedMessage id='manage-user.title'/>
                </div>
                <button 
                        className='btn btn-create'
                             onClick={this.handleAddNewUser}
                    >
                          <GrIcons.GrAddCircle  />  <FormattedMessage id='manage-user.add'/>
                </button>
             
                <div className="table" >
                    <Table bordered>
                    <tbody>
                        <tr className='thead'>
                            <th scope="col">ID</th>
                            <th scope="col"><FormattedMessage id="manage-user.roleID"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.email"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.fullName"/> </th>
                            <th scope="col"><FormattedMessage id="manage-user.gender"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.image"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.phone"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.address"/></th>
                            <th scope="col"><FormattedMessage id="manage-user.action"/></th>
                        </tr>
                    {
                           arrUsers &&arrUsers.map((item, index) => {
                               console.log('arrUsers', arrUsers)
                                let imageBase64 =''
                                if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                                }
                                return (
                                    <tr>  
                                        <td>{index+1}</td>
                                        <td>{item.roleId }</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName} {item.lastName}</td>
                                      
                                        <td>{item.gender}</td>
                                        <td>
                                            <div className="img">
                                                <img src={imageBase64} className='img-img'/>
                                            </div>
                                        </td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button type="button" className="btn btn-edit px-2 mx-3" onClick={() => this.handleEditUser(item)}><AiIcons.AiOutlineEdit /></button>
                                            <button type="button" className="btn btn-delete px-2" onClick={() => this.handleDeleteUser(item)}><AiIcons.AiOutlineDelete /></button>
                                        </td>
                                    </tr>
                                    )
                                })
                        }
                    </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);