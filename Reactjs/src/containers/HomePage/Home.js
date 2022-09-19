// import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from "../../store/actions";
// import * as FaIcons from 'react-icons/fa';
// import * as FiIcons from 'react-icons/fi';
// import { FormattedMessage } from 'react-intl';
// // import './HomePageHeader.scss';
// import ModalEditUser from '../System/ModalEditUser';
// class Home extends Component {
//     changeLanguage = (language) => {
//         this.props.changeLanguageAppRedux(language)
//     }

//     constructor(props){
//         super(props);
//         this.state = {
//             isOpenModalEditUser: false,
//             userEdit: {},
//         }
//     }

//     toggleEditUserModal = () =>{
//         this.setState({
//             isOpenModalEditUser: !this.state.isOpenModalEditUser,
//         })
//     }

//     handleEditUserInfo = (userId) =>{
//         console.log('check userId',userId )
//         this.setState({
//             isOpenModalEditUser: true,
//             userEdit: userId
//         })
//     }
    
//     render() {
//         const { processLogout , isLoggedIn, userInfo } = this.props;
//         let language = this.props.language;
//         console.log(isLoggedIn)
//         return (
//           <div >
//             {
//                 this.state.isOpenModalEditUser &&
//                 <ModalEditUser 
//                     isOpen = {this.state.isOpenModalEditUser}
//                     toggleFromParent = {this.toggleEditUserModal}
//                     currentUser = {this.state.userEdit}
//                 />
//             }

//             <div className="home-header">
//                 <div className='row t'>
//                 <div className='col-4'></div>
//                 {/* <div className='col-4 title'>R E C Y C L E   C O L L E C T I O N</div> */}
//                 <div className="col-4 d-flex flex-row-reverse">
//                     <div className="login-register-content">
//                         {isLoggedIn === false ? (
//                             <>
//                                 <div className="btn-content">
//                                     <Link to ='/login'>
//                                         <button className='btn btn-login-register'><FormattedMessage id="login.login"/></button>
//                                     </Link> 
//                                 </div>
//                                 <div className="btn-content">
//                                     <Link to ='/register'>
//                                         <button className='btn btn-login-register'><FormattedMessage id="register.register"/></button>
//                                     </Link> 
//                                 </div>
//                             </>
//                         ) :<>
//                                 <div className='container-welcome' onClick={() => this.handleEditUserInfo(userInfo)}>  

//                                     <div className='icon-user'>
//                                         <FaIcons.FaUserAlt/> 
//                                     </div>

//                                     <div className='ten'>
//                                         {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }
//                                     </div>
//                                     <div className="btn btn-logout" onClick={processLogout}>
//                                         <FiIcons.FiLogOut/>
//                                     </div>

//                                 </div>

                               
//                            </>
//                         }
//                     </div>
//                     {/* <div class="tool"> 
//                         <>
//                             <AiIcons.AiOutlineQuestionCircle size={"23px"} className="m-1 "/> 
//                             Hỗ trợ
//                         </>
//                         <>
//                             <BsIcons.BsFacebook size={"20px"} className="m-2" />
//                             Kết nối
//                         </>
                       
                       
//                     </div> */}
            
//                 </div>
//                 </div>
//                 <div className="row content p-0">
//                     {/* <div className="left-content">
//                         <h1><a className='font header-logo' href="">Nhặt</a></h1>
//                     </div> */}
//                     <div className=" center-content">
//                         <div className="child-content">
//                             <Link to ='/home' className='link-homepage'>
//                                 <FormattedMessage id="homeheader.page"/>
//                             </Link>
//                         </div>
//                         <div className="child-content">
//                             <Link to ='/giver/cart/:id' className='link-homepage'>
//                                 <FormattedMessage id="homeheader.appointment-schedule"/>
//                             </Link>
//                         </div>
//                         <div className="child-content">
//                             <Link to ='/giver/collection-form' className='link-homepage'>
//                                 <FormattedMessage id="homeheader.collection-history"/>
//                             </Link>
//                         </div>
//                         <div className="child-content">
//                             <Link to ='/giver/news' className='link-homepage'>
//                                 <FormattedMessage id="homeheader.news"/>
//                             </Link>
//                         </div>
//                         <div className="right-content">
//                             <input type="text" class="form-control rounded-pill" id="exampleInputPassword1"></input>
//                             <button type="search" class="btn btn-search rounded-pill">Tìm kiếm</button>
//                         </div>
                            
//                     </div>
//                 </div>
//             </div>

            
              
//         </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.user.isLoggedIn,
//         userInfo: state.user.userInfo,
//         language: state.app.language,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         processLogout: () => dispatch(actions.processLogout()),
    
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);