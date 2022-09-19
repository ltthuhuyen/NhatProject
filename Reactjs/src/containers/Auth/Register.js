import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import imgRegister from '../../assets/images/banner4.jpg'
import './Register.scss';


class Register extends Component {
    constructor(props) {
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
    }

    handleOnChangeInput = (e,id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
         }, () => {
            console.log('check input' , this.state)
        } )
       
    }

    handleRegister =  () =>{
        this.props.createNewUser ({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.roleId,

        })
     

    } 

    componentDidMount() {
        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: ''
            })
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        console.log('check event', event)
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleregister();
        }
    }
    render() {
        let genders = this.state.genderArr;
        return (
            <div className='register'>
                <div className='register-header'>
                Website "NHẶT"
                </div>
                <div className='register-background row'>
                    <img
                        className="imgregister object-cover col-8"
                        src={imgRegister}
                      
                    />
                    <div className='register-container col-3 shadow'>
                        <div className='register-content row '>
                                <div className='col-12 text-register'>ĐĂNG KÝ THÀNH VIÊN</div>
                                <div className='col-6 register-input'>
                                    <label>Họ </label>
                                    <div className='d-flex'>
                                        <input className='input' 
                                            type='text' 
                                            placeholder='Nhập họ..'
                                            value={this.state.firstName}
                                            onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                                        ></input>
                                    </div>        
                                </div>
                                <div className='col-6 register-input'>
                                    <label>Tên </label>
                                    <div className='d-flex'>
                                         <input className='input' 
                                            type='text' 
                                            placeholder='Nhập tên..'
                                            value={this.state.lastName}
                                            onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                                        ></input>
                                    </div>
                                </div>
                                <div className='col-6 register-input'>
                                    <label>Giới tính </label>
                                    <div className='d-flex'>
                                        <select id="gender" class="form-control"
                                            onChange={(e) => {this.handleOnChangeInput(e, 'gender')}}
                                        >
                                            {genders && genders.length > 0 && 
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key= {index} value={item.keyMap}>
                                                        {item.valueVi }
                                                        </option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                   
                                </div>
                                <div className='col-6 register-input'>
                                    <label>SĐT </label>
                                    <div className='d-flex'>
                                        <input className='input' 
                                            type='text' 
                                            placeholder='Nhập điện thoại..'
                                            value={this.state.phone}
                                            onChange={(e) => {this.handleOnChangeInput(e, 'phone')}}
                                            // value={phone}
                                        ></input>
                                    </div>
                                </div>
                                <div className='col-6 register-input'>
                                    <label>Tên đăng nhập</label>
                                    <div className='d-flex'>
                                        <input className='input' 
                                            type='text' 
                                            placeholder='Nhập email..'
                                            value={this.state.email}
                                            onChange={(e) => {this.handleOnChangeInput(e, 'email')}}
                                            // value={email}
                                        ></input>
                                    </div>
                                </div>
                                <div className='col-6 register-input'>
                                    <label>Mật khẩu</label>
                                    <div className='d-flex custom-input-password'>
                                      
                                        <input className='input' 
                                            type= {this.state.isShowPassword ? 'text' : 'password'}
                                            placeholder='Nhập mật khẩu..'
                                            onChange={(e) => {this.handleOnChangeInput(e, 'password')}}
                                            value={this.state.password}
                                            // onKeyDown={(event) => this.handleKeyDown(event)}
                                        ></input>
                                    <span
                                        onClick={() => { this.handleShowHidePassword()
                                        }}
                                    ><i className= {this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                                    </div>
                                </div>
                                <div className='col-12 register-input'>
                                    <label>Địa chỉ</label>
                                    <div className='d-flex'></div>
                                        <input className='input' 
                                            type='text' 
                                            placeholder='Nhập địa chỉ..'
                                            value={this.state.address}
                                            onChange={(e) => {this.handleOnChangeInput(e, 'address')}}
                                        ></input>
                                </div>
                                <div className='col-12  register-input'>
                                    <label>Chọn thành viên</label>
                                    <div className='d-flex' onClick={(e) => this.handleOnChangeInput(e , 'roleId')}>
                                        <input  type="radio" clasName='mx-2' value="R2" />
                                        <label className='mt-2 mx-2'> Người cho</label>
                                        <input  type="radio" clasName='mx-2' value="R3" />
                                        <label className='mt-2 mx-2'> Người nhận thu gom</label>
                                    </div>
                                </div>
                                <div className='col-12' style={{color:'red'}}>
                                    {this.state.errMessage}
                                </div>
                                <div className='col-12 text-center'>
                                <button className='btn btn-register
                                ' onClick={() => {this.handleRegister()}}>Đăng ký</button>
                                </div>
                                
                                {/* <div className='col-12'>
                                    <span className='forgot-password'>Quên mật khẩu</span>
                                </div>
                                <div className='col-12 text-center mt-3'>
                                <span className='text-order-register'>Đăng nhập bằng cách khác</span> 
                                </div>
                                <div className='col-12  icon'>
                                    <label><i className="fab fa-facebook"></i></label>
                                    <label><i className="fab fa-google-plus-g"></i></label>
                                    <label><i className="fab fa-twitter"></i></label>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
