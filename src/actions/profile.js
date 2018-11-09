import {
	MENU_OPEN,
	FOLLOWS_OPEN,
	SET_PAGE_CONF,
	PHOTOVIEW_OPEN,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
} from './types'
import { getMenuData } from './menu'
import { userLogout } from './auth/logout'
import { followsGetPageData } from './follows'
import { setTypeDevice } from './setTypeDevice'
import { photoViewGetPageData } from './photoView'

export const setPageConf = () => {
	return {
		type: SET_PAGE_CONF,
		payload: {
			name: 'profile',
			device: setTypeDevice()
		}
	}
}

export const menuOpen = (data) => dispatch => {
	dispatch(getMenuData(data))
	
	return { type: MENU_OPEN }
}

export const followsOpen = (page, userId) => dispatch => { 
	dispatch(followsGetPageData(page, userId))

	return { type: FOLLOWS_OPEN }
}


export const photoViewOpen = (postId) => dispatch => {
	dispatch(photoViewGetPageData(postId))
	
	return { type: PHOTOVIEW_OPEN }
}


export const getPageDataSuccess = (data) => ({
	type: GET_PAGE_DATA_SUCCESS,
	payload: data
})
export const getPageDataRequest = () => ({ type: GET_PAGE_DATA_REQUEST })
export const getPageDataFailure = () => ({ type: GET_PAGE_DATA_FAILURE })
export const getPageData = (userId) => dispatch => {
	dispatch(getPageDataRequest())
	fetch(`/profile/getInfo?id=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(getPageDataFailure())
			dispatch(userLogout())
			return false;
		}
		dispatch(getPageDataSuccess(data))
		dispatch(setPageConf())
	})
}