import actionTypes from './actionTypes';
import { allNews, saveNews, deleteNews, editNews } from '../../services/newsService';
import { toast } from "react-toastify"

export const getAllNews = () => {
    return async (dispatch, getState) => {
        try {
            let res = await allNews("ALL");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_All_NEWS_SUCCESS,
                    data: res.news.reverse(),
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_All_NEWS_FAILED
                })
            }
        } catch (e) {
            console.log("FETCH_All_NEWS_FAILED", e);
            dispatch({
                type: actionTypes.FETCH_All_NEWS_FAILED
            })
        }
    }
}

export const saveNewsStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveNews(data);
            console.log('check res save news', res)
            if (res && res.errCode === 0) {
                
                toast.success("Thêm tin tức thành công");
                dispatch(getAllNews())
                dispatch({
                    
                    type: actionTypes.SAVE_NEWS_SUCCESS,
                });
            } else {
                toast.error('Thêm tin tức không thành công');
                dispatch({
                    type: actionTypes.SAVE_NEWS_FAILED
                })
            }
        } catch (e) {
            toast.error("Thêm tin tức không thành công");
            console.log("SAVE_news_FAILED", e);
            dispatch({
                type: actionTypes.SAVE_NEWS_FAILED
            })
        }
    }
}

export const DeleteNewStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNews(data);
            if (res && res.errCode === 0) {
                toast.success("Xóa tin tức thành công");
                dispatch(getAllNews())
                dispatch({
                    type: actionTypes.DELETE_NEWS_SUCCESS,
                });
            } else {
                toast.error("Xóa tin tức không thành công");
                dispatch({
                    type: actionTypes.DELETE_NEWS_FAILED
                })
            }
        } catch (e) {
            toast.error("Xóa tin tức không thành công");
            console.log("Xóa tin tức không thành công", e);
            dispatch({
                type: actionTypes.DELETE_NEWS_FAILED
            })
        }
    }
}

export const editNewsStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editNews(data);
            if (res && res.errCode === 0) {
                toast.success("Sửa thông tin tin tức thành công");
                dispatch(getAllNews())
                dispatch({
                    type: actionTypes.EDIT_NEWS_SUCCESS,
                })
            } else {
                toast.error("Sửa thông tin tin tức không thành công");
                dispatch({
                    type: actionTypes.EDIT_NEWS_FAILED,
                });
            }
        } catch (e) {
            toast.error("Sửa thông tin tin tức không thành công");
            dispatch({type: actionTypes.EDIT_NEWS_FAILED,})
            console.log('Sửa thông tin tin tức không thành công',e);
        }
    }
}