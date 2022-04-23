import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {emitter} from '../../utils/emitter'
import { FormattedMessage } from 'react-intl';
import './Create.scss'
import * as actions from "../../store/actions"
import * as GrIcons from 'react-icons/gr';
import {getAllCodeService} from "../../services/userService"
import {LANGUAGES , CommonUtils} from "../../utils"
import { changeLanguageApp } from '../../store/actions'
import { Row } from 'reactstrap';
import * as BsIcons from 'react-icons/bs';
import Lightbox from 'react-image-lightbox';

class ModalUser extends Component {
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
            avatar: '',
            lastName: '',
            gender: '',
            phone: '',
            roleId: '',
            address: '',
        }
        this.listenToEmiiter()

    }

    listenToEmiiter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.state = ({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
                gender: '',
                roleId: '',
                address: '',
                avatar: ''
            })
        })
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: ''
            })
        }
    }

    toggle = () => { 
        this.props.toggleFromParent();
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

    handleOnChangeInput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
         }, () => {
            console.log('check good state' , this.state)
        } )
    }


    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName' , 'lastName' , 'phone' , 'address']
        for(let i = 0; i < arrInput.length; i++){
            console.log('input',this.state[arrInput[i]])
            if (!this.state[arrInput[i]]){
                isValid = false;
                alert('Đối số không hợp lệ ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }   

    handleSaveUser = () => {
        let isValid = this.checkValideInput()
        if(isValid === false) return ;
        this.props.createNewUser ({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.roleId,
            avatar: this.state.avatar
        })
    }

    openPreviewImage =() =>{
        this.setState({
            isOpen: true
        })

    }

    render() {
        let language = this.props.language;
      //  console.log('check state:', this.state)
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
                <ModalHeader toggle={() => {this.toggle()}}>  <FormattedMessage id="manage-user.add"/> </ModalHeader>
                <ModalBody>
                <form className='form-create-edit'>
                <div class="form-row">
                    <div class="form-group col-md-7">
                        <label for="inputEmail4"> <FormattedMessage id="manage-user.email"/> </label>
                        <input type="email" class="form-control" id="email"
                            onChange={(e) => {this.handleOnChangeInput(e, 'email')}}
                            value={email}
                        />
                        </div>
                        <div class="form-group col-md-5">
                        <label for="inputPassword4"> <FormattedMessage id="manage-user.password"/> </label>
                        <input type="password" class="form-control" id="password"
                           onChange={(e) => {this.handleOnChangeInput(e, 'password')}}
                           value={password}
                        />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="text"> <FormattedMessage id="manage-user.fName"/> </label>
                        <input type="text" class="form-control" id="firstName"
                           onChange={(e) => {this.handleOnChangeInput(e, 'firstName')}}
                           value={firstName}/>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="text"> <FormattedMessage id="manage-user.lName"/> </label>
                        <input type="text" class="form-control" id="lastName"
                           onChange={(e) => {this.handleOnChangeInput(e, 'lastName')}}
                           value={lastName}
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputState"><FormattedMessage id="manage-user.gender"/> </label>
                        <select id="gender" class="form-control"
                            onChange={(e) => {this.handleOnChangeInput(e, 'gender')}}
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
                  
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="inputZip"><FormattedMessage id="manage-user.phone"/> </label>
                        <input type="text" class="form-control" id="phone"
                            onChange={(e) => {this.handleOnChangeInput(e, 'phone')}}
                            value={phone}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState"> <FormattedMessage id="manage-user.roleID"/></label>
                        <select id="roleId" class="form-control"
                            onChange={(e) => {this.handleOnChangeInput(e, 'roleId')}}
                        >
                            { roles && roles.length > 0 && 
                                roles.map((item, index) => {
                                    return (
                                        <option key= {index} value={item.keyMap}>
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
                            <label className="upload-file" htmlFor="previewImg">Tải ảnh</label>
                            <div className='preview-image'
                                style ={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick= {() => this.openPreviewImage()}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-row'>
                    <div class="form-group col-md-12">
                        <label for="inputAddress"><FormattedMessage id="manage-user.address"/></label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                            onChange={(e) => {this.handleOnChangeInput(e, 'address')}}
                            value={address}
                        />
                    </div>
                </div>
                {/* <div className='form-row'>
                    <div class="form-group ">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" for="gridCheck">
                                Check me out
                            </label>
                        </div>
                    </div>
                </div> */}
                
                <button type="submit" class="btn btn-save" 
                    onClick = {() => this.handleSaveUser()}
                    ><FormattedMessage id="manage-user.save"/>
                  
                </button>
              
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            
            </form>
          
                </ModalBody>
                {/* <ModalFooter>   
                    <Button className='btn-save px-2' onClick={() => {this. handleSaveUser()}}>Lưu</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Thoát</Button>
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
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);