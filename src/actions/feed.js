import {
	OPEN_MENU,
	CLOSE_MENU,
	SET_PAGE_CONF,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
} from './types'
import { userLogout } from './auth/logout';
import { setTypeDevice } from './setTypeDevice';

export const setPageConf = () => ({
	type: SET_PAGE_CONF,
	payload: {
		name: 'feed',
		device: setTypeDevice()
	}
})

export const openMenu = () => ({ type: OPEN_MENU })
export const closeMenu = () => ({ type: CLOSE_MENU })


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
	fetch(`/feed/posts`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(getPageDataFailure())
			dispatch(userLogout());
			return false;
		}
		dispatch(getPageDataSuccess(data))
	})

	dispatch(setPageConf())
}