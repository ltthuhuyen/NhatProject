import actionTypes from '../actions/actionTypes';

const initialState = {
    News: []
}

const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_All_NEWS_SUCCESS:
            state.News = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_All_NEWS_FAILED:
            state.News = [];
            return {
                ...state,
            }        
        default:
            return state;
    }
}

export default NewsReducer;