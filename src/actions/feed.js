import {
	MENU_OPEN,
	SET_PAGE_CONF,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
} from './types'
import config from '../config'
import { getMenuData } from './menu'
import { handleError } from './handleError'
import { setTypeDevice } from './setTypeDevice'

export const setPageConf = () => ({
	type: SET_PAGE_CONF,
	payload: {
		name: 'feed',
		device: setTypeDevice()
	}
})

export const menuOpen = (data) => dispatch => {
	dispatch(getMenuData(data))
	
	return { type: MENU_OPEN }
}

export const getPageDataSuccess = (data) => {
	return { 
		type: GET_PAGE_DATA_SUCCESS,
		payload: data
	}
}
export const getPageDataRequest = () => ({ type: GET_PAGE_DATA_REQUEST })
export const getPageDataFailure = () => ({ type: GET_PAGE_DATA_FAILURE })

export const getPageData = () => dispatch => {
	dispatch(getPageDataRequest())
	fetch(`${config.serverUrl}/feed/posts`, {
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
	})

	dispatch(setPageConf())
}