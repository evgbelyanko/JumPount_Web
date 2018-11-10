import {
	MENU_CLOSE,
	MENU_REQUEST,
	MENU_SUCCESS,
	MENU_FAILURE,
	PHOTOVIEW_OPEN,
	MENU_ACTIONS_FOLLOWING_SUCCESS
} from './types'
import { userLogout } from './auth/logout'
import { photoViewGetPageData } from './photoView'

export const menuSuccess = (data) => ({ 
	type: MENU_SUCCESS,
	payload: data
})
export const menuClose = () => ({ type: MENU_CLOSE })
export const menuRequest = () => ({ type: MENU_REQUEST })
export const menuFailure = () => ({ type: MENU_FAILURE })


export const getMenuData = (userData) => dispatch => {
	dispatch(menuRequest())
	fetch(`/menu/checkFollowing?userId=${userData.userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(menuFailure())
			dispatch(userLogout())
			return false;
		}
		dispatch(menuSuccess({...data, ...userData}))
	})
}

export const menuActionsFollowingSuccess = (data) => ({ 
	type: MENU_ACTIONS_FOLLOWING_SUCCESS,
	payload: data
})

export const menuActionsFollowing = (userId) => dispatch => {
	fetch(`/menu/actionsFollowing?userId=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(userLogout())
			return false;
		}
		dispatch(menuActionsFollowingSuccess(data))
	})
}

export const photoViewOpen = (postId) => dispatch => {
	dispatch(photoViewGetPageData(postId))
	dispatch(menuClose())
	
	return { type: PHOTOVIEW_OPEN }
}