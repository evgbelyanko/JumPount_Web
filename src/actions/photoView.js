import {
	MENU_OPEN,
	SET_PAGE_CONF,
	PHOTOVIEW_CLOSE,
	PHOTOVIEW_REQUEST,
	PHOTOVIEW_SUCCESS,
	PHOTOVIEW_FAILURE,
	GET_MORE_COMMENTS,
	GET_COMMENT_SUCCESS
} from './types'
import config from '../config'
import { getMenuData } from './menu'
import { handleError } from './handleError'
import { setTypeDevice } from './setTypeDevice'

export const setPageConf = () => {
	const name = setTypeDevice() === 'mobile' ? { name: 'follows' } : null;

	return {
		type: SET_PAGE_CONF,
		payload: {
			...name,
			device: setTypeDevice()
		}
	}
}

export const menuOpen = (data) => dispatch => {
	dispatch(getMenuData(data, true))
	
	return { type: MENU_OPEN }
}

export const photoViewSuccess = (data) => ({ 
	type: PHOTOVIEW_SUCCESS,
	payload: data
})
export const photoViewClose = () => ({ type: PHOTOVIEW_CLOSE })
export const photoViewRequest = () => ({ type: PHOTOVIEW_REQUEST })
export const photoViewFailure = () => ({ type: PHOTOVIEW_FAILURE })


export const photoViewGetPageData = (postId) => dispatch => {
	dispatch(photoViewRequest())
	fetch(`${config.serverUrl}/photoview/post?id=${postId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(photoViewFailure())
			dispatch(handleError(data.error))
			return false;
		}
		data.postId = postId;
		dispatch(photoViewSuccess(data))
		dispatch(setPageConf())
	})
}

export const getCommentSuccess = (data) => ({ 
	type: GET_COMMENT_SUCCESS,
	payload: data
})

export const sendComment = (postId, commentText) => dispatch => {
	fetch(`${config.serverUrl}/photoview/sendComment`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({
			postId: postId,
			commentText: commentText
		})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getCommentSuccess(data))
	})
}

export const getMoreComments = (data) => ({ 
	type: GET_MORE_COMMENTS,
	payload: data
})

export const loadMoreComments = (postId, startLimit, countLimit) => dispatch => {
	fetch(`${config.serverUrl}/photoview/loadMoreComments?postId=${postId}&startLimit=${startLimit}&countLimit=${countLimit}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getMoreComments(data))
	})
}