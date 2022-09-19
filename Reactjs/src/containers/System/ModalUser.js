import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {emitter} from '../../utils/emitter'
import { FormattedMessage } from 'react-intl';
import './Create.scss'
import * as actions from "../../store/actions"
import * as HiIcons from 'react-icons/hi';
import {LANGUAGES , CommonUtils} from "../../utils"
import {getAllCities , getAllDistricts , getAllWards, } from '../../services/addressService'
import { faArrowUp19 } from '@fortawesome/free-solid-svg-icons';


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
            city: '',
            district: '',
            ward: '',
            city_name: '',
            district_name: '',
            ward_name: ''
           
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
        this.getAllCitiesFromReact()
        this.getAllDistrictsFromReact()
        this.getAllWardFromReact()
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

    getAllCitiesFromReact = async () => {
        let response = await getAllCities();
        if(response){
            this.setState({
                arrCities: response
            })
        }
    }

    getAllDistrictsFromReact = async () => {
        let response = await getAllDistricts();
        if(response){
            this.setState({
                arrDistricts: response
            })
        }
    }

    getAllWardFromReact = async () => {
        let response= await getAllWards();
        if(response){
            this.setState({
                arrWards: response
            })
        }
    }
    
    handleClickCity = (e) => {
        let {arrCities , arrDistricts} = this.state;
        const idx = e.target.value;
        let kq = arrDistricts.filter(item => item.province_code == idx);
        let kq2 = arrCities.filter(item => item.code == idx);
        this.setState({
            districts: kq,
            city_name:  kq2[0].name
        })
       
           
    }    

    handleClickDistrict = (e) => {
        let {arrDistricts , arrWards} = this.state;
        const idx = e.target.value;
        let kq = arrWards.filter(item => item.district_code == idx);
        let kq2 = arrDistricts.filter(item => item.code == idx)
        this.setState({
            wards: kq,
            district_name: kq2[0].name
        })
       
    }   

    handleClickWard = (e) => {
        let {arrWards} = this.state;
        const idx = e.target.value;
        let kq2 = arrWards.filter(item => item.code == idx)
        this.setState({
            ward_name: kq2[0].name
        })
        
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
            avatar: this.state.avatar,
            city_name: this.state.city_name,
            district_name: this.state.district_name,
            ward_name: this.state.ward_name,
            address_name: this.state.address,

        })
      
    }

    openPreviewImage =() =>{
        this.setState({
            isOpen: true
        })

    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let arrCities = this.state.arrCities;
        let { email , password , firstName , lastName ,
             phone , address , districts , wards, diachi
        } = this.state
       
       
     
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                //centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>THÊM MỚI NGƯỜI DÙNG </ModalHeader>
                <ModalBody>
                <form className='form-create-edit'>     
                    <div className='form-row'>
                        <div className="col-8">
                            <label > <FormattedMessage id="manage-user.email"/> </label>
                            <input 
                                type="text" 
                                class="form-control" 
                                onChange={(e) => {this.handleOnChangeInput(e, 'email')}}
                                value={email}
                                
                            />
                        </div>
                        <div className="col-4">
                            <label >Password</label>
                            <input
                                type='password'
                                class="form-control" 
                                onChange={(e) => {this.handleOnChangeInput(e, 'password')}}
                                value={password}
                                                        
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="col-5">
                            <label>Họ</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                value={firstName}
                                onChange={(e) => {this.handleOnChangeInput(e, 'firstName')}}    
                            />
                        </div>
                        <div className="col-5">
                            <label>Tên</label>
                            <input
                                type='text'
                                class="form-control" 
                                onChange={(e) => {this.handleOnChangeInput(e, 'lastName')}}
                                value={lastName}                             
                            />
                        </div>
                        <div className='col-2'>
                            <label>Giới tính</label>
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
                    <div className='form-row'>
                        <div className='col-4'>
                            <label >Số điện thoại</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                onChange={(e) => {this.handleOnChangeInput(e, 'phone')}}
                                value={phone}
                            />
                        </div>
                        <div className='col-4'>
                            <label >Quyền</label>
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
                        <div className='col-4'>
                            <div className="preview-img-container">
                                <input id="previewImg" type="file" accept='image/*' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className="upload-file" htmlFor="previewImg">Tải ảnh <HiIcons.HiOutlineCamera className='icon'/></label>
                                <div className='preview-image'
                                    style ={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick= {() => this.openPreviewImage()}>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className='form-row'>
                        <div className='col-3'>
                            <label >Thành phố</label>
                            <select id="citiesId" class="form-control"
                            onChange={(e) => this.handleClickCity(e, 'citiesId')}

                            >
                            <option selected>Chọn thành phố</option>
                            { arrCities && arrCities.length > 0 && 
                                arrCities.map((item, index) => {
                                    return (
                                        <option key= {index} value={item.code}>
                                            {item.name}
                                        </option>)
                                })
                            }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label >Quận</label>
                            <select id="districtId" class="form-control"
                                onChange={(e) => this.handleClickDistrict(e, 'districtId')}
                            >
                            <option selected>Chọn quận huyện</option> 
                            { districts && districts.length > 0 && 
                                districts.map((item, index) => {
                                    return (
                                        <>
                                        <option key= {index} value={item.code}>
                                            {item.name}
                                        </option>
                                        </>
                                        )
                                })
                            }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label >Phường</label>
                            <select id="wardId" class="form-control"
                                onChange={(e) => {this.handleClickWard(e, 'wardId')}}
                            >
                            <option selected>Chọn xã phường</option> 
                            { wards && wards.length > 0 && 
                                wards.map((item, index) => {
                                    return (
                                        <>
                                        <option key= {index} value={item.code}>
                                            {item.name}
                                        </option>
                                        </>
                                        )
                                })
                            }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label for="inputAddress">Địa chỉ</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                onChange={(e) => {this.handleOnChangeInput(e, 'address')}}
                                value={address}
                             />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-save" 
                        onClick = {() => this.handleSaveUser()}>
                        <FormattedMessage id="manage-user.save"/>
                    </button>
                </form>
                </ModalBody>
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