import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Manage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import Header from '../../containers/Header/Recipient/Header'
import {getAllUsers, createNewUserService, editUserService, deleteUserSerVice} from '../../services/userService';
import { IconContext } from 'react-icons';
import { Table } from 'reactstrap';




class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

  
    render() {
       
        return (
            <div className="container">
                <Header />
               
                
                <div className="title text-center">
                    Manage users with
                </div>
                <button 
                        className='btn btn-light  btn-create px-2'
                             onClick={this.handleAddNewUser}
                    >

                        <div className='title-create'>
                            <GrIcons.GrAddCircle  /> Thêm 
                        </div>

                </button>
             
                <div className="table" >

                    <Table bordered>
                    <tbody>
                        <tr className='thead'>
                            <th scope="col">STT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Họ</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    {
                                    arrUsers && arrUsers.map((item, index) => {
                                        
                                        return (
                                            <tr>  
                                                <td>{index+1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.gender}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);