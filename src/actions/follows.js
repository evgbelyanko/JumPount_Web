import {
	MENU_OPEN,
	SET_PAGE_CONF,
	FOLLOWS_CLOSE,
	FOLLOWS_REQUEST,
	FOLLOWS_SUCCESS,
	FOLLOWS_FAILURE,
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

export const followsSuccess = (data) => ({ 
	type: FOLLOWS_SUCCESS,
	payload: data
})
export const followsClose = () => ({ type: FOLLOWS_CLOSE })
export const followsRequest = () => ({ type: FOLLOWS_REQUEST })
export const followsFailure = () => ({ type: FOLLOWS_FAILURE })


export const followsGetPageData = (page, userId) => dispatch => {
	dispatch(followsRequest())
	fetch(`${config.serverUrl}/follows/users?page=${page}&userid=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(followsFailure())
			dispatch(handleError(data.error))
			return false;
		}
		data.page = page;
		data.userId = userId;
		dispatch(followsSuccess(data))
		dispatch(setPageConf())
	})
}