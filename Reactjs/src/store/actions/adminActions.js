import actionTypes from './actionTypes';
import {createNewUserService, getAllCodeService} from "../../services/userService"
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
                console.log('sdjfsdfskdjfsd',res.data)
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

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);   
            if (res && res.errCode === 0) {
                toast.success('Thêm người dùng thành công!')
                dispatch(saveUserSuccess(res.data));
            } else {
                dispatch(saveUserFailded());
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