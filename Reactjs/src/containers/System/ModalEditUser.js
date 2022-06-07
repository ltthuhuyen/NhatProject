import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import {CRUD_ACTIONS, LANGUAGES , CommonUtils} from "../../utils"
import * as actions from "../../store/actions"
import './Create.scss'
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            gender: '',
            roleId: '',
            address: '',
            avatar: '',
            action: ''
        }
    }
   
    componentDidMount() {
        let user = this.props.currentUser;
        console.log('user', user)
        this.props.getGenderStart();
        this.props.getRoleStart();
        let imageBase64 = '';
        if (user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
           
        }
        if (user && !_.isEmpty(user)){
            // lấy giá trị hiện tại
            this.setState({
                id: user.id,
                email: user.email,
                password: 'HARDCODES',
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                roleId: user.roleId,
                address: user.address,
                avatar: '',
                previewImgURL: imageBase64,
                action: CRUD_ACTIONS.EDIT

            } )

        }
        console.log('didmount edit modal' , this.props.currentUser)
    }


    toggle = () => {
        this.props.toggleFromParent();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
    }

    handleOnChangeInput =(e ,id) =>{
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        }, () => {
          //  console.log('check good state' , this.state)
        } )
    }

    
    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName' , 'lastName' , 'phone' , 'address']
        for(let i = 0; i < arrInput.length; i++){
            if (!this.state[arrInput[i]]){
                isValid = false;
                alert('Đối số không hợp lệ ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }   

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true){
        // call API edit user
            this.props.editUser(this.state)
        }
    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let { email , password , firstName , lastName ,
            phone , address
        } = this.state
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                //centered
            >
                <ModalHeader toggle={() => {this.toggle()}}> <FormattedMessage id="manage-user.edit"/> </ModalHeader>
                <ModalBody>
                    <div className='form-create-edit'>
                        <div className="form-row">
                            <div className="input-container col-8">
                                <label for="inputEmail4"> <FormattedMessage id="manage-user.email"/> </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'email')}}
                                    value={email}
                                    disabled
                                />
                            </div>
                            <div className="form-group input-container col-4">
                                <label for=""> <FormattedMessage id="manage-user.password"/> </label>
                                <div className="custom-icon">
                                    <input
                                        className="form-control" 
                                        type='password'
                                        onChange={(e) => {this.handleOnChangeInput(e, 'password')}}
                                        value={password}
                                        disabled
                                   />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group input-container col-5">
                                <label for=""> <FormattedMessage id="manage-user.fName"/> </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'firstName')}}
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group input-container col-5">
                                <label for=""> <FormattedMessage id="manage-user.lName"/> </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'lastName')}}
                                    value={lastName}
                                />
                            </div>
                            <div className="form-group input-container col-2">
                                <label for=""> <FormattedMessage id="manage-user.gender"/> </label>
                                <select id="gender" class="form-control"
                                    onChange={(e) => {this.handleOnChangeInput(e, 'gender')}}
                                    value={this.props.currentUser.gender}
                                >
                                    {genders && genders.length > 0 && 
                                        genders.map((item, index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                }
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group input-container col-md-4">
                                <label for=""> <FormattedMessage id="manage-user.phone"/> </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'phone')}}
                                    value={phone}
                                />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"> <FormattedMessage id="manage-user.roleID"/> </label>
                                <select id="roleId" class="form-control"
                                    onChange={(e) => {this.handleOnChangeInput(e, 'roleId')}}
                                    value ={this.props.currentUser.roleId}
                                >
                                    { roles && roles.length > 0 && 
                                        roles.map((item, index) => {
                                            return (
                                                <option key= {index} value={item.keyMap} >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                }
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputZip"> <FormattedMessage id="manage-user.image"/> </label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" accept='image/*' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="upload-file" htmlFor="previewImg"><FormattedMessage id="common.upload-image"/> <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style ={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick= {() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group input-container col-12">
                                <label for=""> <FormattedMessage id="manage-user.address"/> </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'address')}}
                                    value={address}
                                />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-save" 
                            onClick = {() => this.handleSaveUser()}>
                            <FormattedMessage id="manage-user.save"/>
                        </button>
                    </div>
                </ModalBody>
                {/* <ModalFooter>   
                    <Button color="primary" className='px-2' onClick={() => {this.handleSaveUser()}}>Lưu</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter> */}
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);