import actionTypes from './actionTypes';
import {createNewUserService, getAllCodeService, editUserService} from "../../services/userService"
import {getAllProducts} from "../../services/productService"
import { getAllTemps } from '../../services/appointmentService';
import { ToastContainer, toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFAILDED());
            }
        } catch (e) {
            dispatch(fetchGenderFAILDED())
            console.log('fetchGenderStart error',e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFAILDED = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED,
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");

            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
              
            } else {
                dispatch(fetchRoleFAILDED());
            }
        } catch (e) {
            dispatch(fetchRoleFAILDED())
            console.log('fetchRoleStart error',e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFAILDED = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
})

export const fetchAllAppointmentTime = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            // console.log('res',res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_APPOINTMENT_TIME_SUCCESS,
                    dataTime: res.data
                });
              
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_APPOINTMENT_TIME_FAILDED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_APPOINTMENT_TIME_FAILDED
            });
            console.log('fetchRoleStart error',e);
        }
    }
}

export const fetchAllProduct = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProducts("ALL");
            // console.log('res',res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
                    dataProduct: res.data
                });
              
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCT_FAILDED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCT_FAILDED
            });
            console.log('fetchRoleStart error',e);
        }
    }
}


export const fetchAllTemp = (giverId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTemps(giverId);
            // console.log('resssss',res.temps)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEMP_SUCCESS,
                    dataTemp: res.temps
                });
              
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEMP_FAILDED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_TEMP_FAILDED
            });
            console.log('fetchRoleStart error',e);
        }
    }
}

export const fetchStatusStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("STATUS");
            if (res && res.errCode === 0) {
                dispatch(fetchStatusSuccess(res.data));
            } else {
                dispatch(fetchStatusFAILDED());
            }
        } catch (e) {
            dispatch(fetchStatusFAILDED())
            console.log('fetchStatusStart error',e);
        }
    }
}

export const fetchStatusSuccess = (statusData) => ({
    type: actionTypes.FETCH_STATUS_SUCCESS,
    data: statusData,
})

export const fetchStatusFAILDED = () => ({
    type: actionTypes.FETCH_STATUS_FAILDED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);   
            if (res && res.errCode === 0) {
                toast.success('Thêm người dùng thành công!')
                dispatch(saveUserSuccess(res.data));
            } else if ( res && res.errCode === 1) {
                toast.error('Email này đã tồn tại')
            }
            else if ( res && res.errCode === 2 ) {
                toast.error('Vui lòng điền đầy đủ thông tin')
            }
        } catch (e) {
            dispatch(saveUserFailded())
            console.log('fetchRoleStart error',e);
        }
    }
}

export const saveUserSuccess = ()=> ({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailded = () => ({
    type: 'CREATE_USER_FAILDED'
})

export const doEditUser = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(inputData)   
            if (res && res.errCode === 0) {
                toast.success('Thêm người dùng thành công!')
                dispatch(saveUserSuccess(res.user));
                await this.getAllUsersFromReact()
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded())
            console.log('fetchRoleStart error',e);
        }
    }
}