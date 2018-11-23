import {
	MENU_CLOSE,
	MENU_REQUEST,
	MENU_SUCCESS,
	MENU_FAILURE,
	PHOTOVIEW_OPEN,
	MENU_REMOVE_OPEN,
	MENU_REMOVE_CLOSE,
	MENU_REMOVE_SUCCESS,
	MENU_IN_WINDOW_SUCCESS,
	MENU_ACTIONS_FOLLOWING_SUCCESS
} from './types'
import config from '../config'
import { handleError } from './handleError'
import { photoViewGetPageData } from './photoView'

export const menuSuccess = (data, inWindow) => {
	const menuSuccessType = inWindow ? MENU_IN_WINDOW_SUCCESS : MENU_SUCCESS;
	return { 
		type: menuSuccessType,
		payload: data
	}
}
export const menuClose = () => ({ type: MENU_CLOSE })
export const menuRequest = () => ({ type: MENU_REQUEST })
export const menuFailure = () => ({ type: MENU_FAILURE })

export const photoViewOpen = (postId) => dispatch => {
	dispatch(photoViewGetPageData(postId))
	dispatch(menuClose())
	
	return { type: PHOTOVIEW_OPEN }
}

export const getMenuData = (userData, inWindow = false) => dispatch => {
	dispatch(menuRequest())
	fetch(`${config.serverUrl}/menu/checkFollowing?userId=${userData.userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(menuFailure())
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(menuSuccess({...data, ...userData}, inWindow))
	})
}

export const menuRemoveOpen = (itemType, postId, itemId, key) => ({ 
	type: MENU_REMOVE_OPEN,
	payload: {
		key: key,
		postId: postId,
		itemId: itemId,
		itemType: itemType,
	}
})
export const menuRemoveClose = () => ({ type: MENU_REMOVE_CLOSE })
export const menuRemoveSuccess = (key) => ({ 
	type: MENU_REMOVE_SUCCESS,
	payload: {
		key: key
	}
})

export const menuRemovePost = (postId) => dispatch => {
	fetch(`${config.serverUrl}/photoview/deletePost`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({
			postId: postId
		})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(menuClose())
		dispatch(menuRemoveClose())
		window.location.replace('/user')
	})
}

export const menuRemoveComment = (postId, itemId, key) => dispatch => {
	fetch(`${config.serverUrl}/photoview/deleteComment`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({
			postId: postId,
			commentId: itemId
		})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(menuRemoveClose())
		dispatch(menuRemoveSuccess(key))
	})
}

export const menuActionsFollowingSuccess = (data) => ({ 
	type: MENU_ACTIONS_FOLLOWING_SUCCESS,
	payload: data
})

export const menuActionsFollowing = (userId) => dispatch => {
	fetch(`${config.serverUrl}/menu/actionsFollowing?userId=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(menuActionsFollowingSuccess(data))
	})
}