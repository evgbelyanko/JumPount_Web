import {
	MENU_OPEN,
	FOLLOWS_OPEN,
	SET_PAGE_CONF,
	PHOTOVIEW_OPEN,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	GET_PROFILE_MORE_POSTS,
} from './types'
import config from '../config'
import { getMenuData } from './menu'
import { handleError } from './handleError'
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
	fetch(`${config.serverUrl}/profile/getInfo?id=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(getPageDataFailure())
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getPageDataSuccess(data))
		dispatch(setPageConf())
	})
}

export const getProfileMorePosts = (data) => ({ 
	type: GET_PROFILE_MORE_POSTS,
	payload: data
})

export const loadProfileMorePosts = (userId, startLimit, countLimit) => dispatch => {
	fetch(`${config.serverUrl}/profile/loadMorePosts?id=${userId}&startLimit=${startLimit}&countLimit=${countLimit}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getProfileMorePosts(data.profilePosts))
	})
}