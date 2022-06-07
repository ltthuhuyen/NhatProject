import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingRole: false,
    roles: [],
    allTime: [],
    statuses: [],
    temps: []
    
}

const  adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_APPOINTMENT_TIME_SUCCESS:
            state.allTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_APPOINTMENT_TIME_FAILDED:
            state.allTime = [];
            return {
                ...state,
            }   
        case actionTypes.FETCH_STATUS_SUCCESS:
            state.statuses = action.data;
            return {
                 ...state,
            }
        case actionTypes.FETCH_STATUS_FAILDED:
            state.statuses = [];
            return {
                ...state,
            } 
        case actionTypes.FETCH_ALL_TEMP_SUCCESS:
            state.temps = action.dataTemp;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALL_TEMP_FAILDED:
            state.temps = [];
            return {
                ...state,
        }
        default:
            return state;
    }
}

export default adminReducer;
