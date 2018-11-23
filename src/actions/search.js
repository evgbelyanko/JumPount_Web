import {
	MENU_OPEN,
	SET_PAGE_CONF,
	PHOTOVIEW_OPEN,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	GET_SEARCH_USERS_REQUEST,
	GET_SEARCH_USERS_SUCCESS,
	GET_SEARCH_USERS_FAILURE,
} from './types'
import config from '../config'
import { getMenuData } from './menu'
import { handleError } from './handleError'
import { setTypeDevice } from './setTypeDevice'
import { photoViewGetPageData } from './photoView'

export const setPageConf = () => ({
	type: SET_PAGE_CONF,
	payload: {
		name: 'search',
		device: setTypeDevice()
	}
})

export const menuOpen = (data) => dispatch => {
	dispatch(getMenuData(data))
	
	return { type: MENU_OPEN }
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
export const getPageData = () => dispatch => {
	dispatch(getPageDataRequest())
	fetch(`${config.serverUrl}/search/recent`, {
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


export const getSearchUsersSuccess = (data) => ({
	type: GET_SEARCH_USERS_SUCCESS,
	payload: data
})
export const getSearchUsersRequest = () => ({ type: GET_SEARCH_USERS_REQUEST })
export const getSearchUsersFailure = () => ({ type: GET_SEARCH_USERS_FAILURE })
export const getSearchUsers = (inputField) => dispatch => {
	dispatch(getSearchUsersRequest())
	fetch(`${config.serverUrl}/search/users?name=${inputField}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(getSearchUsersFailure())
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getSearchUsersSuccess(data))
	})
}